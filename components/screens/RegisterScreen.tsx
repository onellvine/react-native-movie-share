import { Link } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import {
    Button,
    Keyboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as Yup from 'yup';
import { ThemedText } from '../themed-text';


export default function RegisterScreen() {

    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .required('You must provide a username'),       
        phone: Yup
            .string()
            .required('You must provide a phone number')
            .test(
                'is-valid-phone',
                'Number must start with 0 and be ten digits',
                (val?: string): boolean => {
                    if (!val) return false;

                    return val.startsWith('0') && val.length === 10 && /^\d+$/.test(val);
                }
            ),
        password1: Yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        password2: Yup
            .string()
            .oneOf([Yup.ref('password1')], 'Passwords do not match')
      });
    
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <ThemedText type='title' style={styles.title}>Movie Shop Register an Account</ThemedText>
            <Formik 
                initialValues = {{
                    username: '', phone: '', password1: '', password2: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    console.log(values);
                    actions.resetForm()
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <ThemedText style={styles.label}>Username</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder='Username'
                                onChangeText={props.handleChange('username')}
                                onBlur={props.handleBlur('username')}
                                value={props.values.username}
                            />
                            <ThemedText style={styles.error}>{props.touched.username && props.errors.username}</ThemedText>

                            <ThemedText style={styles.label}>Phone</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder='phone number'
                                onChangeText={props.handleChange('phone')}
                                onBlur={props.handleBlur('phone')}
                                value={props.values.phone}
                            />
                            <ThemedText style={styles.error}>{props.touched.phone && props.errors.phone}</ThemedText>

                            <ThemedText style={styles.label}>Password</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder='set a strong password'
                                secureTextEntry
                                onChangeText={props.handleChange('password1')}
                                onBlur={props.handleBlur('password1')}
                                value={props.values.password1}
                            />
                            <ThemedText style={styles.error}>{props.touched.password1 && props.errors.password1}</ThemedText>

                            <ThemedText style={styles.label}>Confirm password</ThemedText>
                            <TextInput
                                style={styles.input}
                                placeholder='re-enter the password'
                                secureTextEntry
                                onChangeText={props.handleChange('password2')}
                                onBlur={props.handleBlur('password2')}
                                value={props.values.password2}
                            />
                            <ThemedText style={styles.error}>{props.touched.password2 && props.errors.password2}</ThemedText>

                            <Button title="Register" onPress={() => props.handleSubmit} />
                            <ThemedText style={styles.info} >
                                Already have an account? <Link style={styles.link} href={"./signin"}>Sign in here</Link></ThemedText>
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
        fontWeight:'bold',
        marginTop: 10,
    },
    label: {
        marginLeft: 10,
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
