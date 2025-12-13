import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
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
        <Slot />
        <StatusBar  backgroundColor='transparent' style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
