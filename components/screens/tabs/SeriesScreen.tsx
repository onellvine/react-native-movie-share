import axiosInstance from '@/constants/axiosInstance';
import { Movie } from '@/constants/models';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

const mediaURL = "http://192.168.1.100:8000"

const SeriesScreen = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axiosInstance.get('category/SER/')
            .then((response) => response.data)
            .then((response) => setMovies(response))
            .catch((error) => alert(error))
            .finally(() => setLoading(false))
    }, [])

    const renderItem = ({ item } : { item: Movie}) => {
        
        return (
            <TouchableOpacity
                style={{
                    marginBottom: 10,
                    marginTop: 10
                }}
                onPress={() => router.navigate({ pathname: "./movie", params: { movieId: item?.id }})}
            >
                <View
                    style={{
                        marginBottom: 10
                    }}
                >
                    <Image
                        source={{ uri: mediaURL+`${item.cover_photo}` }}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 25
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <ThemedText type='subtitle'>{item.title}</ThemedText>
                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            right: 5
                        }}
                    >
                        <Ionicons
                            name="people"
                            size={19}
                            color='black'
                        />
                        <ThemedText>{item.comments}</ThemedText>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        flexDirection: 'row'
                    }}
                >
                    <Ionicons name="star" size={15} color='yellow' style={{ marginRight: 7 }} />
                    <ThemedText style={{ fontSize: 20 }}>{item.rating}</ThemedText>
                    <View
                        style={{
                            position: 'absolute',
                            right: 0
                        }}
                    >
                        <ThemedText style={{ fontWeight: '900' }}>{item?.genre?.join(" / ")}</ThemedText>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <ThemedText type='title' style={styles.mainTitle}>Available</ThemedText>
            <ThemedText type='title' style={styles.mainTitle}>and Latest Series</ThemedText>
            {isLoading ? <ActivityIndicator /> : <FlatList

                data={movies}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingBottom: 30
                }}
            />}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    mainTitle: {
        // textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 35
    },
    title: {
        fontWeight: 'bold',
        color: '#212121',
        fontSize: 20
    },
    movie: {
        borderWidth: 2,
        borderColor: '#212121',
        borderRadius: 10,
        margin: 10,
        height: 300
    },
    coverPhoto: {
        width: '100 %',
        height: 250
    }
})

export default SeriesScreen;
