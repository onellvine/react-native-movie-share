import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
import { StyleSheet, Image, Text, View, ScrollView, StatusBar, TouchableOpacity, Animated, TextInput } from 'react-native'



const Movie = ({ route }) => {
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        let { item } = route.params
        setMovie(item)
    }, [])


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {movie ?
                <View>
                    <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}
                    >
                        <View
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: 200 }}>
                                <Image
                                    source={{ uri: `${movie.cover_photo}` }}
                                    resizeMode="cover"
                                    style={{
                                        width: 400,
                                        height: '100%'
                                    }}
                                />
                            </View>
                        </View>
                    </Animated.ScrollView>
                    <Text style={styles.mainTitle}>{movie.title}</Text>
                    <View style={styles.aboutMovie}>
                        <Text style={styles.title}>Genre</Text>
                        <Text>
                            {movie.genre.join(' / ')}
                        </Text>
                        <Text style={styles.title}>Synopsis</Text>
                        <Text>Dummy Synopsis</Text>
                        <Text style={styles.title}>Cast</Text>
                        <Text>{movie.cast.join(", ")}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Watched this Movie? <Text>Leave a Review</Text></Text>
                        <TextInput
                            style={{
                                borderWidth: 2,
                                borderColor: '#03A9F4',
                                height: 45,
                                borderRadius: 15,
                                padding: 5
                                
                            }}
                            placeholder="Comment about this..."
                        />
                    </View>
                    <View>
                        <Text style={styles.mainTitle}>Reviews</Text>
                        <View style={styles.singleReview}>
                            <TouchableOpacity>
                                <Image
                                    source={{ uri: `${movie.cover_photo}` }}
                                    resizeMode='cover'
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50
                                    }}
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    marginLeft: 10
                                }}
                            >
                                <Text style={{ fontWeight: 'bold' }} >Username</Text>
                                <Text style={{ fontStyle: 'italic' }}>The quick brown fox jumps over the lazy dog</Text>
                            </View>
                        </View>
                    </View>
                    

                </View>
                : <View></View>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    aboutMoviee: {
        paddingLeft: 20,
        marginLeft: 20
    },
    title: {
        fontWeight: 'bold',
        color: '#212121',
        fontSize: 20
    },
    mainTitle: {
        fontWeight: 'bold',
        fontSize: 35
    },
    singleReview: {
        flexDirection: 'row',
        margin: 10,

    }
})



export default Movie;
