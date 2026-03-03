import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar, View, Text, TouchableOpacity } from 'react-native';

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
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#2c3e50',
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
    text: '#ecf0f1',
    border: '#333333',
    notification: '#FF6B6B',
  },
};

function Tabs() {
  const { darkMode } = useContext(NotesContext);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'All Notes') {
            iconName = focused ? 'note' : 'note-alt';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'favorite' : 'favorite-border';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: darkMode ? '#888' : '#95a5a6',
        tabBarStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          borderTopColor: darkMode ? '#333' : '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          letterSpacing: 0.3,
        },
        headerStyle: {
          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          letterSpacing: 0.3,
        },
      })}>
      <Tab.Screen 
        name="All Notes" 
        component={AllNotesScreen}
        options={{
          title: 'All Notes',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
        }}
      />
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
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: darkMode ? '#333' : '#e0e0e0',
        },
        headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          letterSpacing: 0.3,
        },
        contentStyle: {
          backgroundColor: darkMode ? '#121212' : '#f8f9fa',
        },
      }}>
      <Stack.Screen 
        name="Home" 
        component={Tabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Note" 
        component={NoteScreen}
        options={({ route }) => ({
          title: route.params?.note ? 'Edit Note' : 'New Note',
          headerBackTitle: 'Back',
          headerBackVisible: true,
        })}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { darkMode } = useContext(NotesContext);
  
  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#1e1e1e' : '#ffffff' }}>
      <View style={{ padding: 20, paddingTop: 40 }}>
        <MaterialIcons name="note" size={40} color="#6C63FF" />
        <Text style={{ 
          fontSize: 24, 
          fontWeight: '700', 
          color: darkMode ? '#ecf0f1' : '#2c3e50',
          marginTop: 8,
          letterSpacing: 0.5,
        }}>
          Notes App
        </Text>
      </View>
      <DrawerItem 
        label="Notes"
        icon="note"
        onPress={() => props.navigation.navigate('Notes')}
        darkMode={darkMode}
      />
      <DrawerItem 
        label="Settings"
        icon="settings"
        onPress={() => props.navigation.navigate('Settings')}
        darkMode={darkMode}
      />
    </View>
  );
}

function DrawerItem({ label, icon, onPress, darkMode }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 12,
      }}
      activeOpacity={0.7}
    >
      <MaterialIcons 
        name={icon} 
        size={22} 
        color={darkMode ? '#ecf0f1' : '#2c3e50'} 
      />
      <Text style={{
        marginLeft: 16,
        fontSize: 16,
        fontWeight: '500',
        color: darkMode ? '#ecf0f1' : '#2c3e50',
        letterSpacing: 0.3,
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function AppContent() {
  const { darkMode } = useContext(NotesContext);

  return (
    <>
      <StatusBar 
        barStyle={darkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={darkMode ? '#1e1e1e' : '#ffffff'}
      />
      <NavigationContainer theme={darkMode ? CustomDarkTheme : CustomLightTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: darkMode ? '#333' : '#e0e0e0',
            },
            headerTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 18,
              letterSpacing: 0.3,
            },
            drawerStyle: {
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
              width: 280,
            },
            drawerActiveTintColor: '#6C63FF',
            drawerInactiveTintColor: darkMode ? '#ecf0f1' : '#2c3e50',
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: '500',
              letterSpacing: 0.3,
            },
          }}>
          <Drawer.Screen 
            name="Notes" 
            component={MainStack}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="note" size={22} color={color} />
              ),
              title: 'My Notes',
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