import { useState, useEffect } from 'react';
import { dataSync, CONTENT_EVENTS } from '../services/dataSync';
import { contentRegistry } from '../services/contentRegistry';
import ContentTestHelper from '../services/contentTestHelper';

interface ContentSyncState {
  loading: boolean;
  error: string | null;
  contentAnalysis: any;
  fileStatus: any;
  events: Array<{
    event: string;
    timestamp: number;
    details?: any;
  }>;
}

export const useContentSync = () => {
  const [state, setState] = useState<ContentSyncState>({
    loading: true,
    error: null,
    contentAnalysis: null,
    fileStatus: null,
    events: [],
  });

  useEffect(() => {
    initializeSync();
    const unsubscribe = subscribeToEvents();
    return () => unsubscribe();
  }, []);

  const initializeSync = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Initialize content registry
      await contentRegistry.initialize();
      
      // Start monitoring content
      ContentTestHelper.startListening();
      ContentTestHelper.clearEventLog();
      
      // Get initial analysis
      const analysis = await ContentTestHelper.verifyContentIntegrity();
      const fileStatus = await ContentTestHelper.verifyAllFilesLoaded();
      
      setState(prev => ({
        ...prev,
        loading: false,
        contentAnalysis: analysis,
        fileStatus,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  };

  const subscribeToEvents = () => {
    const handlers = [
      { event: CONTENT_EVENTS.CONTENT_UPDATED, handler: handleContentUpdated },
      { event: CONTENT_EVENTS.CONTENT_ERROR, handler: handleContentError },
      { event: CONTENT_EVENTS.FILE_LOADED, handler: handleFileLoaded },
      { event: CONTENT_EVENTS.FILE_ERROR, handler: handleFileError }
    ];

    handlers.forEach(({ event, handler }) => {
      dataSync.subscribe(event, handler);
    });

    return () => {
      handlers.forEach(({ event, handler }) => {
        dataSync.unsubscribe(event, handler);
      });
    };
  };

  const handleContentUpdated = async (data: any) => {
    addEvent(CONTENT_EVENTS.CONTENT_UPDATED, `${data.loadedFiles.length} files loaded`);
    await refreshAnalysis();
  };

  const handleContentError = (error: Error) => {
    addEvent(CONTENT_EVENTS.CONTENT_ERROR, error.message);
    setState(prev => ({ ...prev, error: error.message }));
  };

  const handleFileLoaded = (data: { file: string; itemCount: number }) => {
    addEvent(CONTENT_EVENTS.FILE_LOADED, `${data.file}: ${data.itemCount} items`);
  };

  const handleFileError = (data: { file: string; error: string }) => {
    addEvent(CONTENT_EVENTS.FILE_ERROR, `${data.file}: ${data.error}`);
  };

  const addEvent = (event: string, details?: any) => {
    setState(prev => ({
      ...prev,
      events: [
        { event, timestamp: Date.now(), details },
        ...prev.events,
      ].slice(0, 100), // Keep last 100 events
    }));
  };

  const refreshAnalysis = async () => {
    try {
      const analysis = await ContentTestHelper.verifyContentIntegrity();
      const fileStatus = await ContentTestHelper.verifyAllFilesLoaded();
      setState(prev => ({ ...prev, contentAnalysis: analysis, fileStatus }));
    } catch (error) {
      console.error('Error refreshing analysis:', error);
    }
  };

  const forceRefresh = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await dataSync.forceRefresh();
      await refreshAnalysis();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const clearCache = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await ContentTestHelper.clearCache();
      await dataSync.forceRefresh();
      await refreshAnalysis();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    ...state,
    forceRefresh,
    clearCache,
    refreshAnalysis,
  };
};