import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import AppHeader from '@/components/app-header';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        header: () => <AppHeader />,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Latest',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="play.rectangle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          title: 'TV Shows',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tv.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
