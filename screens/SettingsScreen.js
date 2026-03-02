import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from '../context/NotesContext';

export default function SettingsScreen() {
  const { darkMode, setDarkMode, clearNotes } = useContext(NotesContext);

  const handleClearNotes = () => {
    Alert.alert(
      'Clear All Notes',
      'Are you sure you want to delete all notes? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: clearNotes,
          style: 'destructive'
        },
      ]
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
        <View style={styles.settingInfo}>
          <MaterialIcons 
            name={darkMode ? 'dark-mode' : 'light-mode'} 
            size={24} 
            color={darkMode ? '#fff' : '#333'} 
          />
          <Text style={[styles.settingText, darkMode && styles.darkText]}>
            Dark Mode
          </Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#767577', true: '#6C63FF' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, darkMode && styles.darkButton]} 
        onPress={handleClearNotes}
      >
        <MaterialIcons name="delete-sweep" size={24} color="#FF6B6B" />
        <Text style={[styles.buttonText, darkMode && styles.darkButtonText]}>
          Clear All Notes
        </Text>
      </TouchableOpacity>

      <View style={[styles.infoContainer, darkMode && styles.darkInfoContainer]}>
        <Text style={[styles.infoText, darkMode && styles.darkSubText]}>
          Total Notes: {useContext(NotesContext).notes.length}
        </Text>
        <Text style={[styles.infoText, darkMode && styles.darkSubText]}>
          Favorites: {useContext(NotesContext).notes.filter(n => n.favorite).length}
        </Text>
      </View>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  darkSettingItem: {
    backgroundColor: '#1e1e1e',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  darkButton: {
    backgroundColor: '#1e1e1e',
  },
  buttonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  darkButtonText: {
    color: '#FF6B6B',
  },
  infoContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  darkInfoContainer: {
    backgroundColor: '#1e1e1e',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  darkSubText: {
    color: '#aaa',
  },
});