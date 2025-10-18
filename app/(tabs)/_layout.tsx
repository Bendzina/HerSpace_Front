import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useLanguage } from '../LanguageContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.tabIconDefault,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: colors.text,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ paddingHorizontal: 12 }}
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={22} color={colors.text} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.getParent()?.navigate('SettingsScreen')}
            style={{ paddingHorizontal: 12 }}
            accessibilityLabel="Open settings"
          >
            <Ionicons name="settings" size={22} color={colors.text} />
          </TouchableOpacity>
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.common.start,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: t.profile.title,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: t.journal,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={22} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="dagi-ai"
        options={{
          title: 'Dagi AI',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dagi-ai/tarot"
        options={{
          href: null,
          title: 'Tarot Reading',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: t.community,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}