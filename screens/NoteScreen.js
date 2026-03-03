import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
      Alert.alert('Missing Title', 'Please enter a title for your note');
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
    <KeyboardAvoidingView 
      style={[styles.container, darkMode && styles.darkContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.inputCard, darkMode && styles.darkInputCard]}>
          <View style={styles.inputWrapper}>
            <MaterialIcons 
              name="title" 
              size={20} 
              color={darkMode ? '#6C63FF' : '#6C63FF'} 
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Note Title"
              placeholderTextColor={darkMode ? '#666' : '#999'}
              style={[
                styles.input,
                styles.titleInput,
                darkMode && styles.darkInput,
                darkMode && styles.darkText
              ]}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              returnKeyType="next"
              onSubmitEditing={() => contentInputRef.focus()}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.inputWrapper}>
            <MaterialIcons 
              name="notes" 
              size={20} 
              color={darkMode ? '#6C63FF' : '#6C63FF'} 
              style={styles.inputIcon}
            />
            <TextInput
              ref={ref => contentInputRef = ref}
              placeholder="Write your note here..."
              placeholderTextColor={darkMode ? '#666' : '#999'}
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
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveNote}
          activeOpacity={0.8}
        >
          <MaterialIcons name="save" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>
            {note ? 'Update Note' : 'Save Note'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  inputCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkInputCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 50,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#2c3e50',
    letterSpacing: 0.3,
  },
  titleInput: {
    fontWeight: '600',
  },
  contentInput: {
    minHeight: 200,
    textAlignVertical: 'top',
  },
  darkInput: {
    color: '#ecf0f1',
  },
  darkText: {
    color: '#ecf0f1',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});