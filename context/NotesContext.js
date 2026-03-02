import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [notes, darkMode]);

  const loadData = async () => {
    const storedNotes = await AsyncStorage.getItem('notes');
    const storedTheme = await AsyncStorage.getItem('darkMode');

    if (storedNotes) setNotes(JSON.parse(storedNotes));
    if (storedTheme) setDarkMode(JSON.parse(storedTheme));
  };

  const saveData = async () => {
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
  };

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      favorite: false,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, title, content) => {
    setNotes(notes.map(n => n.id === id ? { ...n, title, content } : n));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleFavorite = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, favorite: !n.favorite } : n));
  };

  const clearNotes = () => setNotes([]);

  return (
    <NotesContext.Provider value={{
      notes,
      darkMode,
      setDarkMode,
      addNote,
      updateNote,
      deleteNote,
      toggleFavorite,
      clearNotes,
    }}>
      {children}
    </NotesContext.Provider>
  );
};