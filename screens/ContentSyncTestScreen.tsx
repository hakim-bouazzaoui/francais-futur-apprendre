import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider, Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dataSync, CONTENT_EVENTS } from '../services/dataSync';
import { contentRegistry } from '../services/contentRegistry';
import { ContentTestHelper } from '../services/__tests__/contentTestHelper';
import { theme } from '../constants/theme';

interface FileStatus {
  file: string;
  itemCount: number;
  loaded: boolean;
}

const ContentSyncTestScreen = () => {
  const [events, setEvents] = useState<Array<{ event: string; timestamp: number }>>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [testSyncResult, setTestSyncResult] = useState<any>(null);
  const [fileStatus, setFileStatus] = useState<{
    totalConfigured: number;
    totalWithContent: number;
    fileDetails: FileStatus[];
    allFilesLoaded: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start listening to content events
    ContentTestHelper.startListening();
    ContentTestHelper.clearEventLog();

    // Subscribe to content events
    const handlers = Object.values(CONTENT_EVENTS).map(event => {
      const handler = () => {
        setEvents(current => [...current, { event, timestamp: Date.now() }]);
      };
      dataSync.subscribe(event, handler);
      return { event, handler };
    });

    // Initial analysis
    updateAnalysis();
    verifyTestSync();
    checkFileStatus();

    return () => {
      // Cleanup event handlers
      handlers.forEach(({ event, handler }) => {
        dataSync.unsubscribe(event, handler);
      });
    };
  }, []);

  const updateAnalysis = async () => {
    const result = await ContentTestHelper.verifyContentIntegrity();
    setAnalysis(result);
  };

  const verifyTestSync = async () => {
    const result = await ContentTestHelper.verifyTestSyncContent();
    setTestSyncResult(result);
  };

  const checkFileStatus = async () => {
    const result = await ContentTestHelper.verifyAllFilesLoaded();
    setFileStatus(result);
  };

  const handleSimulateChanges = async () => {
    setLoading(true);
    try {
      await ContentTestHelper.simulateContentChanges();
      await updateAnalysis();
      await verifyTestSync();
      await checkFileStatus();
    } catch (error) {
      console.error('Error simulating changes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForceRefresh = async () => {
    setLoading(true);
    try {
      await dataSync.forceRefresh();
      await updateAnalysis();
      await verifyTestSync();
      await checkFileStatus();
    } catch (error) {
      console.error('Error forcing refresh:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    setLoading(true);
    try {
      await ContentTestHelper.clearCache();
      await dataSync.forceRefresh();
      await updateAnalysis();
      await verifyTestSync();
      await checkFileStatus();
    } catch (error) {
      console.error('Error clearing cache:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* File Status */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>État des Fichiers JSON</Title>
            {fileStatus && (
              <>
                <List.Item
                  title="Fichiers configurés"
                  description={fileStatus.totalConfigured.toString()}
                  right={() => (
                    <Badge
                      style={[
                        styles.badge,
                        { backgroundColor: fileStatus.allFilesLoaded ? '#4CAF50' : '#FF9800' }
                      ]}
                    >
                      {fileStatus.totalWithContent}/{fileStatus.totalConfigured}
                    </Badge>
                  )}
                />
                <Divider />
                {fileStatus.fileDetails.map((detail, index) => (
                  <React.Fragment key={detail.file}>
                    <List.Item
                      title={detail.file}
                      description={`${detail.itemCount} éléments`}
                      right={() => (
                        <Badge
                          style={[
                            styles.badge,
                            { backgroundColor: detail.loaded ? '#4CAF50' : '#FF5252' }
                          ]}
                        >
                          {detail.loaded ? '✓' : '✗'}
                        </Badge>
                      )}
                    />
                    {index < fileStatus.fileDetails.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </>
            )}
          </Card.Content>
        </Card>

        {/* Content Analysis */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Analyse du Contenu</Title>
            {analysis && (
              <>
                <List.Item
                  title="Nombre total d'éléments"
                  description={analysis.contentCount}
                />
                <Divider />
                <List.Item
                  title="Catégories"
                  description={analysis.categoriesCount}
                />
                <Divider />
                <List.Item
                  title="Types de contenu"
                  description={analysis.typesCount}
                />
                <Divider />
                <List.Item
                  title="Intégrité"
                  description={analysis.isConsistent ? '✅ OK' : '❌ Erreurs'}
                />
              </>
            )}
          </Card.Content>
        </Card>

        {/* Test Sync Results */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Test de Synchronisation</Title>
            {testSyncResult && (
              <>
                <List.Item
                  title="Contenu de test trouvé"
                  description={testSyncResult.found ? '✅ Oui' : '❌ Non'}
                />
                <Divider />
                <List.Item
                  title="Éléments de test"
                  description={`${testSyncResult.itemCount} éléments`}
                />
                {testSyncResult.items.map((item: any) => (
                  <List.Item
                    key={item.id}
                    title={item.id}
                    description={`Type: ${item.type}`}
                  />
                ))}
              </>
            )}
          </Card.Content>
        </Card>

        {/* Test Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Actions de Test</Title>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSimulateChanges}
                loading={loading}
                style={styles.button}
              >
                Simuler des Changements
              </Button>
              <Button
                mode="contained"
                onPress={handleForceRefresh}
                loading={loading}
                style={styles.button}
              >
                Forcer la Synchronisation
              </Button>
              <Button
                mode="outlined"
                onPress={handleClearCache}
                loading={loading}
                style={styles.button}
              >
                Effacer le Cache
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Event Log */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Journal des Événements</Title>
            {events.map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Paragraph style={styles.eventType}>{event.event}</Paragraph>
                <Paragraph style={styles.eventTime}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </Paragraph>
              </View>
            ))}
            {events.length === 0 && (
              <Paragraph style={styles.noEvents}>Aucun événement</Paragraph>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventType: {
    flex: 1,
    fontSize: 14,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
  },
  noEvents: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginTop: 16,
  },
  badge: {
    alignSelf: 'center',
  },
});

export default ContentSyncTestScreen;