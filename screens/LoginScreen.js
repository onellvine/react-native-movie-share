import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView, View, TextInput, Button, StatusBar } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store';
import  axiosInstance  from './axiosInstance';

export default function LoginScreen({ navigation }) {
    console.log("axios instance",axiosInstance)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text style={styles.title}>Movie Shop Login</Text>
            <Formik
                initialValues={{ phone: '', password: '' }}
                onSubmit={async (values, actions) => {
                    console.log(JSON.stringify({
                        phone: values.phone,
                        password: values.password

                    }))
                    await axiosInstance
                        .post('token/', JSON.stringify({
                            phone: values.phone,
                            password: values.password

                        })).then(async (response) => {
                            await SecureStore.setItemAsync('access_token', response.data.access)
                            await SecureStore.setItemAsync('refresh_token', response.data.refresh)
                            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + await SecureStore.getItemAsync('access_token')
                            
                            navigation.navigate('Home')
                        }).catch((error) => {
                            console.log(error)
                            alert(error)
                        })
                    actions.resetForm()
                }}
            >
                {(props) => (
                    <View>
                        <Text>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Phone number'
                            onChangeText={props.handleChange('phone')}
                            value={props.values.phone}
                        />
                        <Text>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />

                        <Button title="Login" onPress={props.handleSubmit} />
                        <Text style={styles.info} >
                            No account? Register
                    <Text
                                style={styles.link}
                                onPress={() => { navigation.navigate("Register") }}
                            > Here
                    </Text>
                     or Continue as 
                    <Text
                                style={styles.link}
                                onPress={() => { navigation.navigate("Home") }}
                            >
                                 Guest
                    </Text>
                        </Text>
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
        fontWeight: 'bold'
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
