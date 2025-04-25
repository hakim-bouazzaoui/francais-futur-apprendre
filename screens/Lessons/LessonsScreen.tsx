import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../../constants/theme';
import type { RootStackParamList } from '../../navigation/types';

type LessonsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const modules = [
  {
    id: 'history',
    title: 'Histoire Française',
    description: 'Les événements clés qui ont façonné la France moderne',
    progress: 0.25,
    lessons: [
      'La Révolution française',
      'Napoléon et l\'Empire',
      'Les Guerres mondiales',
      'La Ve République'
    ]
  },
  {
    id: 'institutions',
    title: 'Institutions Républicaines',
    description: 'Structure et fonctionnement du gouvernement français',
    progress: 0.16,
    lessons: [
      'La Constitution',
      'Le Président',
      'L\'Assemblée nationale',
      'Le Sénat',
      'Le système judiciaire',
      'Les collectivités territoriales'
    ]
  }
];

const LessonsScreen = () => {
  const navigation = useNavigation<LessonsScreenNavigationProp>();

  const handleLessonPress = (moduleId: string, lessonTitle: string) => {
    navigation.navigate('LessonDetail', {
      moduleId,
      lessonTitle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {modules.map(module => (
          <Card key={module.id} style={styles.moduleCard}>
            <Card.Content>
              <Title>{module.title}</Title>
              <Paragraph style={styles.description}>{module.description}</Paragraph>
              
              <View style={styles.progressContainer}>
                <ProgressBar
                  progress={module.progress}
                  color={theme.colors.primary}
                  style={styles.progressBar}
                />
                <Paragraph style={styles.progressText}>
                  {`${Math.round(module.progress * 100)}% complété`}
                </Paragraph>
              </View>

              <List.Section>
                <List.Subheader>Leçons</List.Subheader>
                {module.lessons.map((lesson, index) => (
                  <List.Item
                    key={index}
                    title={lesson}
                    left={props => <List.Icon {...props} icon="book-open-page-variant" />}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => handleLessonPress(module.id, lesson)}
                  />
                ))}
              </List.Section>
            </Card.Content>
          </Card>
        ))}
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
  moduleCard: {
    margin: 16,
    elevation: 2,
  },
  description: {
    marginBottom: 16,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});

export default LessonsScreen;