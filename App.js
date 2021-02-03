import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens'


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from './screens/SplashScreen';
import Movie from './screens/TabScreens/Movie';
import AddMovieScreen from './screens/AddMovieScreen';
import axiosInstance from './screens/axiosInstance';
import * as SecureStore from 'expo-secure-store';

import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

enableScreens()

function AppHeader() {
  const navigation = useNavigation()
  const logout = async () => {
    axiosInstance
    .post('logout/blacklist/', JSON.stringify({
      refresh_token: await SecureStore.getItemAsync('refresh_token'),
    }))
    .catch((error) => {alert(error)});
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;

    navigation.navigate('Login')
  }
  return (
    <Header

      containerStyle={{
        backgroundColor: 'transparent',
      }}

      leftComponent={
        < TouchableOpacity >
          <Icon name='menu' size={30} color='blue' onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
        </TouchableOpacity >
      }
      centerComponent={
        < View style={{ flexDirection: 'row' }} >
          <TextInput
            placeholder='search'
            style={{
              padding: 10,
              borderWidth: 2,
              width: '100%',
              borderRadius: 25,
              height: 35,
              borderColor: 'blue',
              backgroundColor: '#fff'
            }}
          />
        </View >
      }
      rightComponent={
        < TouchableOpacity >
          <Icon name='person' size={30} color='blue' onPress={logout}/>
        </TouchableOpacity >
      }
    />
  )
}
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const StackComponent = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ header: ({ }) => { } }}
        component={AddMovieScreen}
        name="AddMovieScreen"
      />
      <Stack.Screen
        options={{ header: ({ }) => <AppHeader /> }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        // options={{ header: ({ }) => <AppHeader /> }}
        name="Movie"
        component={Movie}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          options={{ header: ({ }) => { } }}
          component={SplashScreen}
          name="SpalshScreen"
        />

        <Drawer.Screen
          options={{ header: ({ }) => <AppHeader /> }}
          name="Stack"
          component={StackComponent}
        />
      </Drawer.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
