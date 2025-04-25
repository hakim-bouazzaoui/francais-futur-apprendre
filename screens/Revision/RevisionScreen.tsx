import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider, Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../constants/theme';
import { 
  getDueItems, 
  getItemStats, 
  SRSItem, 
  getNextReviewText 
} from '../../services/srs';
import { clearAllData, printSRSItems, addTestItems } from '../../services/debug';
import type { RootStackParamList } from '../../navigation/types';

type RevisionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const IS_DEVELOPMENT = true; // Set to false for production

const RevisionScreen = () => {
  const navigation = useNavigation<RevisionScreenNavigationProp>();
  const [dueItems, setDueItems] = useState<SRSItem[]>([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    dueItems: 0,
    masteredItems: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [items, itemStats] = await Promise.all([
        getDueItems(),
        getItemStats(),
      ]);
      setDueItems(items);
      setStats(itemStats);
    } catch (error) {
      console.error('Error loading revision data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reload data when screen comes into focus
  useFocusEffect(useCallback(() => {
    loadData();
  }, [loadData]));

  const handleStartRevision = () => {
    if (dueItems.length > 0) {
      navigation.navigate('SRSReview', { items: dueItems });
    }
  };

  // Debug functions
  const handleClearData = async () => {
    await clearAllData();
    loadData();
  };

  const handlePrintItems = async () => {
    await printSRSItems();
  };

  const handleAddTestItems = async () => {
    await addTestItems();
    loadData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Stats Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Vue d'ensemble</Title>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalItems}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.dueItems}</Text>
                <Text style={styles.statLabel}>À réviser</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.masteredItems}</Text>
                <Text style={styles.statLabel}>Maîtrisés</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Due Items */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Révisions en attente</Title>
            {dueItems.length > 0 ? (
              <>
                <List.Section>
                  {dueItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <List.Item
                        title={item.question}
                        description={`${item.lessonTitle} • ${getNextReviewText(item.nextReview)}`}
                        left={props => (
                          <List.Icon {...props} icon="clock-outline" />
                        )}
                      />
                      {index < dueItems.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List.Section>
                <Button
                  mode="contained"
                  onPress={handleStartRevision}
                  style={styles.button}
                >
                  Commencer la révision ({dueItems.length})
                </Button>
              </>
            ) : (
              <Paragraph style={styles.emptyMessage}>
                Pas de révisions en attente pour le moment.
              </Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Study Tips */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Conseils d'étude</Title>
            <Paragraph>
              La révision espacée vous aide à mémoriser efficacement. Les questions 
              réussies seront revues moins fréquemment, tandis que celles manquées 
              seront revues plus souvent.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Debug Menu (Development Only) */}
        {IS_DEVELOPMENT && (
          <Card style={[styles.card, styles.debugCard]}>
            <Card.Content>
              <Title>Debug Menu</Title>
              <Button
                mode="outlined"
                onPress={handleAddTestItems}
                style={styles.debugButton}
              >
                Add Test Items
              </Button>
              <Button
                mode="outlined"
                onPress={handlePrintItems}
                style={styles.debugButton}
              >
                Print Items
              </Button>
              <Button
                mode="outlined"
                onPress={handleClearData}
                style={styles.debugButton}
              >
                Clear All Data
              </Button>
            </Card.Content>
          </Card>
        )}
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
    marginBottom: 8,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  button: {
    marginTop: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
  },
  debugCard: {
    backgroundColor: '#ffebee',
  },
  debugButton: {
    marginTop: 8,
  },
});

export default RevisionScreen;