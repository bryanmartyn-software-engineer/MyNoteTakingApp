import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from '../context/NotesContext';

export default function SettingsScreen() {
  const { darkMode, setDarkMode, notes, clearNotes } = useContext(NotesContext);

  const handleClearNotes = () => {
    Alert.alert(
      'Clear All Notes',
      'Are you sure you want to delete all notes? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete All', 
          onPress: clearNotes,
          style: 'destructive'
        },
      ]
    );
  };

  const stats = [
    {
      icon: 'note',
      label: 'Total Notes',
      value: notes.length,
      color: '#6C63FF',
    },
    {
      icon: 'favorite',
      label: 'Favorites',
      value: notes.filter(n => n.favorite).length,
      color: '#FF6B6B',
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, darkMode && styles.darkContainer]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons 
            name="settings" 
            size={32} 
            color={darkMode ? '#6C63FF' : '#6C63FF'} 
          />
          <Text style={[styles.headerTitle, darkMode && styles.darkText]}>
            Settings
          </Text>
        </View>

        {/* Appearance Section */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Appearance
          </Text>
          <View style={[styles.settingItem, darkMode && styles.darkSettingItem]}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(108, 99, 255, 0.1)' }]}>
                <MaterialIcons 
                  name={darkMode ? 'dark-mode' : 'light-mode'} 
                  size={20} 
                  color="#6C63FF" 
                />
              </View>
              <View>
                <Text style={[styles.settingLabel, darkMode && styles.darkText]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingDescription, darkMode && styles.darkSubText]}>
                  Switch between light and dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e0', true: 'rgba(108, 99, 255, 0.3)' }}
              thumbColor={darkMode ? '#6C63FF' : '#f5f5f5'}
              ios_backgroundColor="#e0e0e0"
            />
          </View>
        </View>

        {/* Statistics Section */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Statistics
          </Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statCard, darkMode && styles.darkStatCard]}>
                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                  <MaterialIcons name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={[styles.statValue, darkMode && styles.darkText]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, darkMode && styles.darkSubText]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Data Management Section */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            Data Management
          </Text>
          <TouchableOpacity 
            style={[styles.dangerButton, darkMode && styles.darkDangerButton]} 
            onPress={handleClearNotes}
            activeOpacity={0.7}
          >
            <View style={styles.dangerButtonContent}>
              <MaterialIcons name="delete-sweep" size={24} color="#FF6B6B" />
              <View>
                <Text style={[styles.dangerButtonText, darkMode && styles.darkDangerButtonText]}>
                  Clear All Notes
                </Text>
                <Text style={[styles.dangerButtonDescription, darkMode && styles.darkSubText]}>
                  Permanently delete all your notes
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[styles.section, darkMode && styles.darkSection, styles.lastSection]}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkSubText]}>
            About
          </Text>
          <View style={styles.aboutContent}>
            <MaterialIcons name="note" size={40} color="#6C63FF" />
            <Text style={[styles.appName, darkMode && styles.darkText]}>
              Notes App
            </Text>
            <Text style={[styles.appVersion, darkMode && styles.darkSubText]}>
              Version 1.0.0
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkSettingItem: {
    backgroundColor: 'transparent',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  settingDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    letterSpacing: 0.2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  darkStatCard: {
    backgroundColor: '#2c2c2c',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    letterSpacing: 0.2,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff5f5',
    borderRadius: 16,
    padding: 16,
  },
  darkDangerButton: {
    backgroundColor: '#2c1a1a',
  },
  dangerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  darkDangerButtonText: {
    color: '#FF6B6B',
  },
  dangerButtonDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    letterSpacing: 0.2,
  },
  aboutContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  appVersion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  darkText: {
    color: '#ecf0f1',
  },
  darkSubText: {
    color: '#bdc3c7',
  },
});