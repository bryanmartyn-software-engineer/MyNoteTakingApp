import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { NotesContext } from '../context/NotesContext';

export default function NoteScreen({ navigation, route }) {
  const { addNote, updateNote, darkMode } = useContext(NotesContext);
  const note = route.params?.note;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, []);

  const saveNote = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (note) {
      updateNote(note.id, title.trim(), content.trim());
    } else {
      addNote(title.trim(), content.trim());
    }

    navigation.goBack();
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <TextInput
        placeholder="Title"
        placeholderTextColor={darkMode ? '#888' : '#999'}
        style={[
          styles.input,
          styles.titleInput,
          darkMode && styles.darkInput,
          darkMode && styles.darkText
        ]}
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      <TextInput
        placeholder="Content"
        placeholderTextColor={darkMode ? '#888' : '#999'}
        style={[
          styles.input,
          styles.contentInput,
          darkMode && styles.darkInput,
          darkMode && styles.darkText
        ]}
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  input: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  titleInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontWeight: '500',
  },
  contentInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    maxHeight: 300,
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
    color: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});