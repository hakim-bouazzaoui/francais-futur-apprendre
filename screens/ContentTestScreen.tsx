import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { runContentTests, analyzeContent } from '../services/contentTester';
import type { ContentStats } from '../services/contentManager';
import { theme } from '../constants/theme';

const ContentTestScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [lastTestTime, setLastTestTime] = useState<string>('');

  const runTests = () => {
    setLoading(true);
    try {
      // Run tests and get stats
      runContentTests();
      const contentStats = analyzeContent();
      setStats(contentStats);
      setLastTestTime(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error running content tests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Paragraph style={styles.loadingText}>Analyzing content...</Paragraph>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Content Analysis Results</Title>
            <Paragraph>Last tested: {lastTestTime}</Paragraph>
            
            {stats && (
              <>
                <Title style={styles.sectionTitle}>Total Items: {stats.totalItems}</Title>
                
                {Object.entries(stats.byCategory).map(([category, data]) => (
                  <View key={category} style={styles.categorySection}>
                    <Title style={styles.categoryTitle}>{category}</Title>
                    <Paragraph>Total in category: {data.total}</Paragraph>
                    
                    {Object.entries(data.byType).map(([type, count]) => (
                      count > 0 && (
                        <Paragraph key={type} style={styles.typeCount}>
                          {type}: {count}
                        </Paragraph>
                      )
                    ))}
                  </View>
                ))}
              </>
            )}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={runTests}
          style={styles.button}
        >
          Run Tests Again
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 16,
  },
  categorySection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  categoryTitle: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  typeCount: {
    marginLeft: 16,
  },
  button: {
    margin: 16,
  },
});

export default ContentTestScreen;