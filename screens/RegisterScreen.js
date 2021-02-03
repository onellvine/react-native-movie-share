import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    Text, 
    ScrollView, 
    View, 
    TextInput, 
    Button, 
    StatusBar, 
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from './axiosInstance';


const getUsers = ()  => {
    let usernames =[]
    fetch("http://192.168.100.7:8000/movie_api/users/")
    .then(async res => {
        const users = await res.json()
        for(var i = 0; i < users.length; i++) {
            var obj = users[i];                
            usernames.push(obj.username);                   
            }
        console.log(usernames)
        return usernames

    }).catch(err => alert(err))
    return usernames
}
const usernames = getUsers()

export default function RegisterScreen({navigation}) {
    

    console.log("user names", usernames)

    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .required('You must provide a username')
            .notOneOf(usernames, 'This username is taken'),        
        phone: Yup
            .string()
            .required('You must provide a phone number')
            .test('is-valid-phone', 'Number must start with 0 and be ten digits', (val) => {
                return val && val.startsWith('0') && val.length == 10 && Number.isInteger(parseInt(val))
            }),
        password1: Yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        password2: Yup
            .string()
            .oneOf([Yup.ref('password1'), null], 'Passwords do not match')
      });
    
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text style={styles.title}>Movie Shop Register an Account</Text>
            <Formik 
                initialValues = {{
                    username: '', phone: '', password1: '', password2: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    
                    axiosInstance
                    .post('register/', JSON.stringify({
                        phone: values.phone,
                        username: values.username,
                        password: values.password1
                    }))
                    .then((response) => {
                        console.log('response', JSON.stringify(response))
                        navigation.navigate('Login')
                    }).catch((error) => {
                        console.log(error)
                        alert(error)
                    })
                   
                    actions.resetForm()
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <Text>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Username'
                                onChangeText={props.handleChange('username')}
                                onBlur={props.handleBlur('username')}
                                value={props.values.username}
                            />
                            <Text style={styles.error}>{props.touched.username && props.errors.username}</Text>

                            <Text>Phone</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='phone number'
                                onChangeText={props.handleChange('phone')}
                                onBlur={props.handleBlur('phone')}
                                value={props.values.phone}
                            />
                            <Text style={styles.error}>{props.touched.phone && props.errors.phone}</Text>

                            <Text>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='set a strong password'
                                secureTextEntry
                                onChangeText={props.handleChange('password1')}
                                onBlur={props.handleBlur('password1')}
                                value={props.values.password1}
                            />
                            <Text style={styles.error}>{props.touched.password1 && props.errors.password1}</Text>

                            <Text>Confirm password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='re-enter the password'
                                secureTextEntry
                                onChangeText={props.handleChange('password2')}
                                onBlur={props.handleBlur('password2')}
                                value={props.values.password2}
                            />
                            <Text style={styles.error}>{props.touched.password2 && props.errors.password2}</Text>

                            <Button title="Register" onPress={props.handleSubmit} />
                            <Text style={styles.info} >Already have an account? <Text style={styles.link} onPress={() => { navigation.navigate('Login')}}>Sign in here</Text></Text>
                        </View>
                    </TouchableWithoutFeedback>
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
        textAlign: 'center',
        fontWeight:'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#212121',
        padding: 8,
        margin: 10,
        width: 330
    },
    info: {
        textAlign: 'center',
        margin: 20
    },
    link: {
        color: '#1976D2'
    },
    error:{
        color: 'red',
        fontSize: 14,
        fontStyle: 'italic',
        marginLeft: 15,
        marginBottom: 10
    }

})
