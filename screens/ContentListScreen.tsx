import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar, Chip, Title, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentItem } from '../models/ContentTypes';
import ContentRenderer from '../components/ContentRenderer';
import ContentErrorBoundary from '../components/ContentErrorBoundary';
import { getContentItems, getCategories } from '../services/contentManager';
import { theme } from '../constants/theme';

const ContentListScreen: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const contentItems = getContentItems();
      setItems(contentItems);
      setCategories(getCategories());
    } catch (err) {
      setError('Erreur lors du chargement du contenu');
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Get unique types from items
  const types = Array.from(new Set(items.map(item => item.type)));

  // Filter items based on search query, category, and type
  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type === 'Quiz' && item.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.type === 'Flashcard' && (
        item.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.back.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
      (item.type === 'Term' && (
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
      (item.type === 'Lesson' && item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesType = !selectedType || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ContentErrorBoundary onRetry={loadContent}>
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Rechercher..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <Chip
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
            style={styles.filterChip}
          >
            Toutes les catégories
          </Chip>
          {categories.map(category => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.filterChip}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>

        {/* Type filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <Chip
            selected={selectedType === null}
            onPress={() => setSelectedType(null)}
            style={styles.filterChip}
          >
            Tous les types
          </Chip>
          {types.map(type => (
            <Chip
              key={type}
              selected={selectedType === type}
              onPress={() => setSelectedType(type)}
              style={styles.filterChip}
            >
              {type}
            </Chip>
          ))}
        </ScrollView>

        <ScrollView style={styles.content}>
          {error ? (
            <Title style={styles.errorText}>{error}</Title>
          ) : filteredItems.length === 0 ? (
            <Title style={styles.noResults}>Aucun résultat trouvé</Title>
          ) : (
            filteredItems.map(item => (
              <ContentRenderer key={item.id} item={item} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ContentErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 32,
    color: theme.colors.error,
  },
});

export default ContentListScreen;