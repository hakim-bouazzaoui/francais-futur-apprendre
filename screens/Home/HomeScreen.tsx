import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../../constants/theme';

const HomeScreen = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.subtitle}>Continuez votre apprentissage</Text>
          </View>
        </View>

        {/* Progress Card */}
        <Card style={[styles.card, { backgroundColor: theme.colors.primary }]}>
          <Card.Content>
            <Title style={styles.whiteText}>À réviser aujourd'hui</Title>
            <Paragraph style={styles.whiteText}>
              Vous n'avez pas encore de révisions programmées.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Learning Modules Section */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Modules d'apprentissage</Title>
          
          {/* Module Cards */}
          <Card style={styles.moduleCard}>
            <Card.Content>
              <Title>Histoire Française</Title>
              <Paragraph>Les événements clés qui ont façonné la France moderne</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.moduleCard}>
            <Card.Content>
              <Title>Institutions Républicaines</Title>
              <Paragraph>Comprendre la structure du gouvernement français</Paragraph>
            </Card.Content>
          </Card>
        </View>
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
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  whiteText: {
    color: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  moduleCard: {
    marginBottom: 12,
    elevation: 2,
  },
});

export default HomeScreen;