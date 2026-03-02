import React, { useContext, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from '../context/NotesContext';

export default function AllNotesScreen({ navigation }) {
  const { notes, deleteNote, toggleFavorite, darkMode } = useContext(NotesContext);
  const swipeableRefs = useRef(new Map());
  const currentlyOpenSwipeableId = useRef(null);

  // Close any open swipeable when tapping outside
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
    // Close previously open swipeable
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
      >
        <MaterialIcons 
          name={item.favorite ? "favorite" : "favorite-border"} 
          size={28} 
          color="#fff" 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(item)}
      >
        <MaterialIcons name="delete" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
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
        containerStyle={{ marginBottom: 10 }}
      >
        <TouchableOpacity
          style={[styles.card, darkMode && styles.darkCard]}
          onPress={() => {
            closeAllSwipeables();
            navigation.navigate('Note', { note: item });
          }}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.title, darkMode && styles.darkText]} numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            {item.favorite && (
              <MaterialIcons name="favorite" size={20} color="#FF6B6B" />
            )}
          </View>
          <Text 
            style={[styles.content, darkMode && styles.darkSubText]} 
            numberOfLines={2}
          >
            {item.content || 'No content'}
          </Text>
          <Text style={[styles.date, darkMode && styles.darkSubText]}>
            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
          </Text>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="note" size={64} color={darkMode ? '#444' : '#ccc'} />
              <Text style={[styles.emptyText, darkMode && styles.darkSubText]}>
                No notes yet
              </Text>
              <Text style={[styles.emptySubText, darkMode && styles.darkSubText]}>
                Tap the + button to create your first note!
              </Text>
            </View>
          }
          contentContainerStyle={[
            notes.length === 0 && styles.emptyList,
            { flexGrow: 1 }
          ]}
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
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  content: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    gap: 8,
    paddingRight: 8,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyList: {
    flex: 1,
  },
});