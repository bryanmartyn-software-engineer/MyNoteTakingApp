import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from '../context/NotesContext';

export default function FavoritesScreen({ navigation }) {
  const { notes, darkMode } = useContext(NotesContext);
  const favorites = notes.filter(n => n.favorite);

  const renderItem = ({ item }) => {
    const formattedDate = new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <TouchableOpacity
        style={[styles.card, darkMode && styles.darkCard]}
        onPress={() => navigation.navigate('Note', { note: item })}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.title, darkMode && styles.darkText]} numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            <View style={styles.favoriteBadge}>
              <MaterialIcons name="favorite" size={16} color="#FF6B6B" />
            </View>
          </View>
          <Text style={[styles.content, darkMode && styles.darkSubText]} numberOfLines={2}>
            {item.content || 'No content'}
          </Text>
          <View style={styles.cardFooter}>
            <MaterialIcons 
              name="access-time" 
              size={12} 
              color={darkMode ? '#666' : '#999'} 
            />
            <Text style={[styles.date, darkMode && styles.darkSubText]}>
              {formattedDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.emptyListContent
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconContainer, darkMode && styles.darkEmptyIconContainer]}>
              <MaterialIcons name="favorite" size={48} color="#FF6B6B" />
            </View>
            <Text style={[styles.emptyText, darkMode && styles.darkText]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
              Swipe right on notes to add them to your favorites
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  listContent: {
    padding: 16,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
    letterSpacing: 0.3,
  },
  favoriteBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: '#95a5a6',
    letterSpacing: 0.2,
  },
  darkText: {
    color: '#ecf0f1',
  },
  darkSubText: {
    color: '#bdc3c7',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  darkEmptyIconContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  emptySubText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});