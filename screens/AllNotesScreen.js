import React, { useContext, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from '../context/NotesContext';

const { width } = Dimensions.get('window');

export default function AllNotesScreen({ navigation }) {
  const { notes, deleteNote, toggleFavorite, darkMode } = useContext(NotesContext);
  const swipeableRefs = useRef(new Map());
  const currentlyOpenSwipeableId = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      closeAllSwipeables();
    });
    return unsubscribe;
  }, [navigation]);

  const closeAllSwipeables = () => {
    if (currentlyOpenSwipeableId.current) {
      const swipeableRef = swipeableRefs.current.get(currentlyOpenSwipeableId.current);
      if (swipeableRef) {
        swipeableRef.close();
      }
      currentlyOpenSwipeableId.current = null;
    }
  };

  const closeSwipeable = (itemId) => {
    const ref = swipeableRefs.current.get(itemId);
    if (ref) {
      ref.close();
      if (currentlyOpenSwipeableId.current === itemId) {
        currentlyOpenSwipeableId.current = null;
      }
    }
  };

  const handleFavorite = (item) => {
    closeSwipeable(item.id);
    toggleFavorite(item.id);
  };

  const handleDelete = (item) => {
    closeSwipeable(item.id);
    deleteNote(item.id);
  };

  const onSwipeableOpen = (itemId) => {
    if (currentlyOpenSwipeableId.current && currentlyOpenSwipeableId.current !== itemId) {
      const previousRef = swipeableRefs.current.get(currentlyOpenSwipeableId.current);
      if (previousRef) {
        previousRef.close();
      }
    }
    currentlyOpenSwipeableId.current = itemId;
  };

  const renderRightActions = (item) => (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.favoriteButton]}
        onPress={() => handleFavorite(item)}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name={item.favorite ? "favorite" : "favorite-border"} 
          size={24} 
          color="#fff" 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(item)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item, index }) => {
    const formattedDate = new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <Swipeable 
        ref={ref => {
          if (ref) {
            swipeableRefs.current.set(item.id, ref);
          } else {
            swipeableRefs.current.delete(item.id);
          }
        }}
        renderRightActions={() => renderRightActions(item)}
        overshootRight={false}
        friction={2}
        rightThreshold={40}
        onSwipeableOpen={() => onSwipeableOpen(item.id)}
        containerStyle={styles.swipeableContainer}
      >
        <TouchableOpacity
          style={[styles.card, darkMode && styles.darkCard]}
          onPress={() => {
            closeAllSwipeables();
            navigation.navigate('Note', { note: item });
          }}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={[styles.title, darkMode && styles.darkText]} numberOfLines={1}>
                {item.title || 'Untitled'}
              </Text>
              {item.favorite && (
                <View style={styles.favoriteBadge}>
                  <MaterialIcons name="favorite" size={16} color="#FF6B6B" />
                </View>
              )}
            </View>
            <Text 
              style={[styles.content, darkMode && styles.darkSubText]} 
              numberOfLines={2}
            >
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
      </Swipeable>
    );
  };

  const handleScreenTap = () => {
    closeAllSwipeables();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={[styles.container, darkMode && styles.darkContainer]}>
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={closeAllSwipeables}
          scrollEventThrottle={16}
          contentContainerStyle={[
            styles.listContent,
            notes.length === 0 && styles.emptyListContent
          ]}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={[styles.emptyIconContainer, darkMode && styles.darkEmptyIconContainer]}>
                <MaterialIcons name="note" size={48} color={darkMode ? '#6C63FF' : '#6C63FF'} />
              </View>
              <Text style={[styles.emptyText, darkMode && styles.darkText]}>
                No notes yet
              </Text>
              <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
                Tap the + button to create your first note!
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            closeAllSwipeables();
            navigation.navigate('Note');
          }}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    paddingBottom: 80,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeableContainer: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
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
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    gap: 8,
    paddingRight: 16,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteButton: {
    backgroundColor: '#6C63FF',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
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
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  darkEmptyIconContainer: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
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