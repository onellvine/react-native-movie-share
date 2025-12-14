import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "react-native"; // @/hooks/use-color-scheme

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '' }} />
          <Stack.Screen name="movie/[id]" options={{ title: 'Watch' }} />
          <Stack.Screen name="account" options={{ title: 'Profile'}} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'modal' }} />
        </Stack>
        <StatusBar  backgroundColor='transparent' style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
