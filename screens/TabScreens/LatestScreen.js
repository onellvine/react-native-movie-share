import React, { useState, useEffect } from 'react'
import { FlatList, Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from '../axiosInstance'


const LatestScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axiosInstance.get('movies/')
            .then((response) => response.data)
            .then((response) => setMovies(response))
            .catch((error) => alert(error))
            .finally(() => setLoading(false))
    }, [])

    const renderItem = ({ item }) => {
        
        return (
            <TouchableOpacity
                style={{
                    marginBottom: 10,
                    marginTop: 10
                }}
                onPress={() => navigation.navigate("Movie", { item })}
            >
                <View
                    style={{
                        marginBottom: 10
                    }}
                >
                    <Image
                        source={{ uri: `${item.cover_photo}` }}
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
                    <Text style={styles.title}>{item.title}</Text>
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
                        <Text>{item.comments}</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        flexDirection: 'row'
                    }}
                >
                    <Ionicons name="star" size={15} color='yellow' style={{ marginRight: 7 }} />
                    <Text styles={{ fontSize: 20 }}>{item.rating}</Text>
                    <View
                        style={{
                            position: 'absolute',
                            right: 0
                        }}
                    >
                        <Text style={{ fontWeight: '900' }}>{item.genre.join(" / ")}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text style={styles.mainTitle}>Latest Movies</Text>
            <Text style={styles.mainTitle}>& TV Series</Text>
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

export default LatestScreen;
