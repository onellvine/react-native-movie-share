import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MoviesScreen from './TabScreens/MoviesScreen';
import SeriesScreen from './TabScreens/SeriesScreen';
import LatestScreen from './TabScreens/LatestScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        < Tab.Navigator initialRouteName="Latest" tabBarOptions={{ showIcon: true, showLabel: true }}>
            <Tab.Screen
                name="Latest" component={LatestScreen}
                options={{
                    tabBarIcon: props => (
                        <Ionicons name="flash" size={props.size} color={props.color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Movies" component={MoviesScreen}
                options={{
                    tabBarIcon: props => (
                        <Ionicons name="videocam" size={props.size} color={props.color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Series" component={SeriesScreen}
                options={{
                    tabBarIcon: props => (
                        <Ionicons name="film" size={props.size} color={props.color} />
                    ),
                }}
            />
        </Tab.Navigator >

    )
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30
    }
})
