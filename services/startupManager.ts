import { logger } from './logger';
import { runConfigTests, getEnvironmentInfo } from './configTester';
import { diagnoseEnvironment, validateContentLoading } from './debug';
import { dataSync } from './dataSync';
import { contentRegistry } from './contentRegistry';

interface StartupResult {
  success: boolean;
  error?: string;
  configTests?: any;
  envInfo?: any;
  summary?: any;
}

export const initializeApp = async (): Promise<StartupResult> => {
  try {
    logger.info('Starting app initialization');
    const startTime = Date.now();

    // Step 1: Environment Check
    logger.debug('Checking environment');
    const envInfo = getEnvironmentInfo();
    logger.info('Environment info', envInfo);

    // Step 2: Configuration Tests
    logger.debug('Running configuration tests');
    const configTests = await runConfigTests();
    logger.info('Configuration test results', configTests);

    if (!configTests.jsonImport || !configTests.fileSystem) {
      throw new Error('Critical configuration tests failed');
    }

    // Step 3: Content System
    logger.debug('Initializing content system');
    await contentRegistry.initialize();
    logger.info('Content registry initialized');

    // Step 4: Data Sync
    logger.debug('Starting data synchronization');
    await dataSync.checkForUpdates();
    const loadedFiles = dataSync.getLoadedFiles();
    logger.info('Data sync complete', { loadedFiles });

    // Step 5: Diagnostics
    if (__DEV__) {
      logger.debug('Running diagnostics');
      await diagnoseEnvironment();
      await validateContentLoading();
      logger.info('Diagnostics complete');
    }

    // Completion
    const endTime = Date.now();
    const duration = endTime - startTime;
    const summary = {
      duration,
      loadedFiles: loadedFiles.length,
      ...logger.getStartupSummary()
    };

    logger.info('App initialization complete', summary);

    return {
      success: true,
      configTests,
      envInfo,
      summary
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';
    logger.error('App initialization failed', { error: errorMessage });
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export const monitorAppHealth = () => {
  setInterval(() => {
    const summary = logger.getStartupSummary();
    const loadedFiles = dataSync.getLoadedFiles();
    const contentCount = contentRegistry.getContent().length;
    
    logger.debug('App health check', {
      logs: summary,
      content: {
        files: loadedFiles.length,
        items: contentCount
      }
    });
  }, 30000); // Check every 30 seconds
};