import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from '../context/NotesContext';

export default function FavoritesScreen({ navigation }) {
  const { notes, darkMode } = useContext(NotesContext);
  const favorites = notes.filter(n => n.favorite);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, darkMode && styles.darkCard]}
      onPress={() => navigation.navigate('Note', { note: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.title, darkMode && styles.darkText]}>{item.title}</Text>
        <MaterialIcons name="favorite" size={20} color="#FF6B6B" />
      </View>
      <Text style={[styles.content, darkMode && styles.darkSubText]} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="favorite-border" size={64} color={darkMode ? '#444' : '#ccc'} />
            <Text style={[styles.emptyText, darkMode && styles.darkSubText]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
              Swipe right on notes to add them to favorites
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
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  content: {
    color: '#666',
    fontSize: 14,
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});