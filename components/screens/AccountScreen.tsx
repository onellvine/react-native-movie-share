import { useRouter } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import axiosInstance from '@/constants/axiosInstance';
import { ThemedText } from '../themed-text';

export default function SettingsScreen() {

    const router = useRouter();

    const logout = async () => {
        axiosInstance
            .post('logout/blacklist/', JSON.stringify({
                refresh_token: await SecureStore.getItemAsync('refresh_token'),
            }))
            .catch((error) => { alert(error) });
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;

        router.navigate('/(auth)/signin');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <ThemedText type='title' style={{marginLeft: 20}}>Settings</ThemedText>

            </View>
            <View>
                <TouchableOpacity 
                    onPress={() => {
                        logout();
                        router.navigate("/(auth)/signin");
                    }}
                >
                    <ThemedText type='link' style={{textAlign: 'center'}}>
                        Logout
                    </ThemedText>                    
                </TouchableOpacity >                

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
