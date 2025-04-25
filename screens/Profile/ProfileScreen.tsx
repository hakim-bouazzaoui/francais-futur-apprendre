import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, List, Avatar, Divider } from 'react-native-paper';
import { theme } from '../../constants/theme';

// Mock user data - This would come from your state management later
const userData = {
  name: 'Jean Dupont',
  joinedDate: '15 avril 2024',
  stats: {
    totalLessons: 8,
    totalQuestions: 45,
    correctAnswers: 38,
    accuracy: 84,
    streak: 3,
  },
  srsStats: {
    itemsLearned: 32,
    itemsMastered: 12,
    upcomingReviews: 5,
    averageAccuracy: 88,
  },
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <Card style={styles.headerCard}>
          <Card.Content style={styles.headerContent}>
            <Avatar.Text size={80} label="JD" style={styles.avatar} />
            <Title style={styles.name}>{userData.name}</Title>
            <Paragraph style={styles.joinDate}>Membre depuis {userData.joinedDate}</Paragraph>
          </Card.Content>
        </Card>

        {/* Learning Stats */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Statistiques d'apprentissage</Title>
            <List.Section>
              <List.Item
                title="Leçons complétées"
                right={() => <Paragraph>{userData.stats.totalLessons}</Paragraph>}
              />
              <Divider />
              <List.Item
                title="Questions répondues"
                right={() => <Paragraph>{userData.stats.totalQuestions}</Paragraph>}
              />
              <Divider />
              <List.Item
                title="Précision"
                right={() => <Paragraph>{userData.stats.accuracy}%</Paragraph>}
              />
              <Divider />
              <List.Item
                title="Série actuelle"
                right={() => <Paragraph>{userData.stats.streak} jours</Paragraph>}
              />
            </List.Section>
          </Card.Content>
        </Card>

        {/* SRS Stats */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Statistiques de révision</Title>
            <List.Section>
              <List.Item
                title="Concepts appris"
                right={() => <Paragraph>{userData.srsStats.itemsLearned}</Paragraph>}
              />
              <Divider />
              <List.Item
                title="Concepts maîtrisés"
                right={() => <Paragraph>{userData.srsStats.itemsMastered}</Paragraph>}
              />
              <Divider />
              <List.Item
                title="Révisions à venir"
                right={() => <Paragraph>{userData.srsStats.upcomingReviews}</Paragraph>}
              />
              <Divider />
              <List.Item
                title="Précision moyenne"
                right={() => <Paragraph>{userData.srsStats.averageAccuracy}%</Paragraph>}
              />
            </List.Section>
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
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
    backgroundColor: theme.colors.primary,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  name: {
    color: '#fff',
    marginBottom: 4,
  },
  joinDate: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
});

export default ProfileScreen;