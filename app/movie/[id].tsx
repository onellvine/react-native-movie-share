import axiosInstance from '@/constants/axiosInstance'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/themed-text'

const Movie = () => {
    const id = useLocalSearchParams<{ id: string }>();
    const queryClient = useQueryClient();

    const { data: movie } = useQuery({
        queryKey: ['movie', id.id],
        queryFn: () => axiosInstance.get(`movie/${id.id}/detail`).then(r => r.data),
        initialData: () =>
            queryClient
                .getQueryData<any[]>(['latest'])
                ?.find(m => m.id === Number(id.id)),
    });


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {movie ?
                    <View>
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
                                        source={{ uri: `${movie?.cover_photo}` }}
                                        resizeMode="cover"
                                        style={{
                                            width: 400,
                                            height: '100%',
                                        }}
                                    />
                                </View>
                            </View>
                        </Animated.ScrollView>
                        <ThemedText type='title' style={styles.mainTitle}>{movie.title}</ThemedText>
                        <View style={styles.aboutMovie}>
                            <ThemedText type='defaultSemiBold' style={styles.title}>Genre</ThemedText>
                            <ThemedText style={styles.content}>
                                {movie.genre.join(' / ')}
                            </ThemedText>
                            <ThemedText type='defaultSemiBold' style={styles.title}>Synopsis</ThemedText>
                            <ThemedText style={styles.content}>Dummy Synopsis</ThemedText>
                            <ThemedText type='defaultSemiBold' style={styles.title}>Cast</ThemedText>
                            <ThemedText style={styles.content}>{movie.cast.join(", ")}</ThemedText>
                        </View>
                        <View>
                            <ThemedText type='subtitle' style={styles.title}>Watched this Movie? <Text>Leave a Review</Text></ThemedText>
                            <TextInput
                                style={{
                                    borderWidth: 2,
                                    borderColor: '#03A9F4',
                                    height: 45,
                                    borderRadius: 15,
                                    padding: 5,
                                    marginHorizontal: 10,
                                }}
                                placeholder="Comment about this..."
                            />
                        </View>
                        <View>
                            <ThemedText type='subtitle' style={styles.mainTitle}>Reviews</ThemedText>
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
                                    <ThemedText type='link' style={{ fontWeight: 'bold' }} >Username</ThemedText>
                                    <ThemedText style={{ fontStyle: 'italic' }}>The quick brown fox jumps over the lazy dog</ThemedText>
                                </View>
                            </View>
                        </View>


                    </View>
                    : <View></View>
                }

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    aboutMovie: {
        // display: 'contents',
        marginHorizontal: 5,
    },
    title: {
        margin: 10,
    },
    mainTitle: {
        marginVertical: 15,
        marginHorizontal: 10,
    },
    content: {
        marginVertical: 5,
        marginHorizontal: 10,
    },
    singleReview: {
        flexDirection: 'row',
        margin: 10,

    }
})



export default Movie;
