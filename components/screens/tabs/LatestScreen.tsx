import { ThemedText } from '@/components/themed-text';
import axiosInstance from '@/constants/axiosInstance';
import { Movie } from '@/constants/models';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';


const fetchLatest = async () => {
    const { data } = await axiosInstance.get('movies/');
    return data;
};


const LatestScreen = () => {
    const router = useRouter();

    const { data: latest, isLoading, error } = useQuery({
        queryKey: ['latest'],
        queryFn: fetchLatest,
    });

    const renderItem = ({ item }: { item: Movie }) => {
        
        return (
            <TouchableOpacity
                style={{
                    marginBottom: 10,
                    marginTop: 10
                }}
                onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } })}
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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons name="star" size={15} color='yellow' style={{ marginRight: 7 }} />
                        <ThemedText style={{ fontSize: 16 }}>{item.rating}</ThemedText>
                    </View>
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
            <ThemedText type='title' style={{marginTop: -30, marginLeft: 20}}>Latest Movies</ThemedText>
            <ThemedText type='title' style={styles.mainTitle}>& TV Series</ThemedText>
            {isLoading ? <ActivityIndicator /> : <FlatList
                data={latest}
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
        marginLeft: 20,        
    },
    title: {
        fontWeight: 'bold',
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
