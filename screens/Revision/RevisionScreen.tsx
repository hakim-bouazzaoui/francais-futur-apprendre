import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider } from 'react-native-paper';
import { theme } from '../../constants/theme';

// Mock data - This would come from your SRS system later
const revisionItems = [
  {
    id: '1',
    type: 'Histoire',
    question: 'Quand a eu lieu la Révolution française ?',
    dueDate: new Date(),
    lastReviewed: '2 jours',
  },
  {
    id: '2',
    type: 'Institutions',
    question: 'Qui élit le Président de la République ?',
    dueDate: new Date(),
    lastReviewed: '5 jours',
  },
];

const RevisionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Stats Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Statistiques de révision</Title>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>12</Paragraph>
                <Paragraph style={styles.statLabel}>À réviser</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>85%</Paragraph>
                <Paragraph style={styles.statLabel}>Précision</Paragraph>
              </View>
              <View style={styles.statItem}>
                <Paragraph style={styles.statNumber}>45</Paragraph>
                <Paragraph style={styles.statLabel}>Révisés</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Due for Review Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>À réviser aujourd'hui</Title>
            <List.Section>
              {revisionItems.map(item => (
                <React.Fragment key={item.id}>
                  <List.Item
                    title={item.question}
                    description={`${item.type} • Dernière révision: ${item.lastReviewed}`}
                    left={props => (
                      <List.Icon {...props} icon="clock-outline" color={theme.colors.primary} />
                    )}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </List.Section>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.button}
            >
              Commencer la révision
            </Button>
          </Card.Content>
        </Card>

        {/* Tips Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Conseils de révision</Title>
            <Paragraph>
              La révision espacée vous aide à mémoriser efficacement. Révisez régulièrement 
              pour de meilleurs résultats.
            </Paragraph>
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
  },
  button: {
    marginTop: 16,
  },
});

export default RevisionScreen;