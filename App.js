import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'react-native';

import { NotesProvider, NotesContext } from './context/NotesContext';
import AllNotesScreen from './screens/AllNotesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import NoteScreen from './screens/NoteScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom themes for better dark/light mode
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6C63FF',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    border: '#e0e0e0',
    notification: '#FF6B6B',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6C63FF',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
    notification: '#FF6B6B',
  },
};

function Tabs() {
  const { darkMode } = useContext(NotesContext);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'All Notes' ? 'note' : 'favorite';
          return <MaterialIcons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: darkMode ? '#888' : '#666',
        tabBarStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          borderTopColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        },
        headerTintColor: darkMode ? '#ffffff' : '#333333',
      })}>
      <Tab.Screen name="All Notes" component={AllNotesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

function MainStack() {
  const { darkMode } = useContext(NotesContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        },
        headerTintColor: darkMode ? '#ffffff' : '#333333',
        contentStyle: {
          backgroundColor: darkMode ? '#121212' : '#f5f5f5',
        },
      }}>
      <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen 
        name="Note" 
        component={NoteScreen}
        options={({ route }) => ({
          title: route.params?.note ? 'Edit Note' : 'New Note',
        })}
      />
    </Stack.Navigator>
  );
}

function AppContent() {
  const { darkMode } = useContext(NotesContext);

  return (
    <>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={darkMode ? CustomDarkTheme : CustomLightTheme}>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            },
            headerTintColor: darkMode ? '#ffffff' : '#333333',
            drawerStyle: {
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            },
            drawerActiveTintColor: '#6C63FF',
            drawerInactiveTintColor: darkMode ? '#ffffff' : '#333333',
          }}>
          <Drawer.Screen 
            name="Notes" 
            component={MainStack}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="note" size={22} color={color} />
              ),
            }}
          />
          <Drawer.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="settings" size={22} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <NotesProvider>
      <AppContent />
    </NotesProvider>
  );
}