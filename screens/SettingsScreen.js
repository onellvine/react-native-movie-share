import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'

export default function SettingsScreen() {
    return (
        <View>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
