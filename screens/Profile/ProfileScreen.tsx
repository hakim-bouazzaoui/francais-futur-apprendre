import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../constants/theme';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Profil</Title>
            <Paragraph>Gérez votre profil et vos paramètres</Paragraph>
          </Card.Content>
        </Card>

        {/* Debug Section */}
        {__DEV__ && (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Outils de Développement</Title>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('ContentTest')}
                  style={styles.button}
                >
                  Tester le Contenu
                </Button>
                <Paragraph style={styles.buttonDescription}>
                  Analyser la distribution et la structure du contenu
                </Paragraph>

                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('ContentSyncTest')}
                  style={styles.button}
                >
                  Test de Synchronisation
                </Button>
                <Paragraph style={styles.buttonDescription}>
                  Tester la synchronisation automatique du contenu
                </Paragraph>
              </View>
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
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginVertical: 8,
  },
  buttonDescription: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    marginBottom: 16,
  },
});

export default ProfileScreen;