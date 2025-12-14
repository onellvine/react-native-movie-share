import { Ionicons } from "@expo/vector-icons";
import { Header } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { Image, TextInput, TouchableOpacity, View } from "react-native";


export default function AppHeader() {
    const router = useRouter();
    
    return (
        <Header
            title="Movie Share"
            
            headerBackgroundContainerStyle={{
                backgroundColor: 'transparent',
            }}

            headerLeft={() =>
                < TouchableOpacity 
                    onPress={() => {  }}
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <Image 
                        source={ require("../assets/images/movie-share.png") }
                        resizeMode="contain"
                        style={{
                            marginTop: 8,
                            width: 64,
                            height: 64,
                        }}
                    />
                </TouchableOpacity >
            }
            headerTitle={() =>
                < View style={{ flexDirection: 'row' }} >
                    <TextInput
                        placeholder='search'
                        style={{
                            padding: 5,
                            borderWidth: 1,
                            width: '100%',
                            borderRadius: 15,
                            height: 35,
                            borderColor: '#deded3',
                            backgroundColor: '#fff'
                        }}
                    />
                </View >
            }
            headerRight={() =>
                <TouchableOpacity 
                    onPress={() => router.navigate('/account')}
                >
                    <Ionicons name="person" size={28} color='#feedbeef' style={{ marginRight: 15 }} />
                </TouchableOpacity >
            }
        />
    );
}
