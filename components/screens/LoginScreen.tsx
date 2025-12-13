import { Formik } from 'formik';
import React from 'react';
import { Button, ScrollView, StatusBar, StyleSheet, TextInput, View } from 'react-native';

import { Link } from 'expo-router';
import { ThemedText } from '../themed-text';

export default function LoginScreen() {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <ThemedText type='title' style={styles.title}>Movie Shop Login</ThemedText>
            <Formik
                initialValues={{ phone: '', password: '' }}
                onSubmit={async (values, actions) => {
                    console.log(JSON.stringify({
                        phone: values.phone,
                        password: values.password

                    }))

                    actions.resetForm()
                }}
            >
                {(props) => (
                    <View>
                        <ThemedText style={styles.label}>Username</ThemedText>
                        <TextInput
                            style={styles.input}
                            placeholder='Phone number'
                            onChangeText={props.handleChange('phone')}
                            value={props.values.phone}
                        />
                        <ThemedText style={styles.label}>Password</ThemedText>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />

                        <Button title="Login" onPress={() => props.handleSubmit} />
                        <ThemedText style={styles.info} >
                            No account? Register
                            <Link href={"/(auth)"} style={styles.link}> Here </Link>
                            or Continue as <Link href={"/(tabs)/home"} style={styles.link}> Guest </Link>
                        </ThemedText>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        color: '#FFFFFF'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
    },
    label: {
        marginLeft: 10,
    },    
    input: {
        borderWidth: 1,
        borderColor: '#212121',
        padding: 8,
        margin: 10
    },
    info: {
        textAlign: 'center',
        margin: 20
    },
    link: {
        color: '#1976D2',
        padding: 15
    }

})
