import React from 'react';
import { 
    Text, 
    TextInput, 
    Button, 
    StatusBar, 
    View, 
    StyleSheet, 
    Image,
    ScrollView,
    TouchableOpacity, 
    Platform, 
    TouchableWithoutFeedback,
    Keyboard 
} from 'react-native';
import { Picker } from '@react-native-community/picker'
import { Formik } from 'formik';
import * as  ImagePicker from 'expo-image-picker';



const moviesURL = "http://192.168.100.7:8000/api/add-movies";

export default function AddMovieScreen() {

    const _pickImage = async (setFieldValue, field) => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.cancelled) {
            setFieldValue(field, result.uri)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Image 
                source={require('./images/logo.jpg')}
                resizeMode='cover'
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    margin: 20
                }}
            />
            <Text style={styles.mainTitle}>Post Content</Text>
            <Formik
                initialValues={{
                    title: '', cast: '', category: 'MOV', cover_photo: null, genre: '', rating: '4.9', released: ''
                }}
                onSubmit={async (values, actions) => {
                    values.cast = JSON.stringify(values.cast.split(','))
                    values.genre = JSON.stringify(values.genre.split(','))

                    const imageUri = values.cover_photo.replace('file:/data', 'file:///data')
                    const splits = values.cover_photo.split('.')
                    const imageType = splits[splits.length - 1]

                    let data = new FormData()

                    data.append('title', values.title)
                    data.append('cast', values.cast)
                    data.append('category', values.category)
                    if(Platform.os !== 'web'){
                    data.append('cover_photo', {
                        uri: imageUri,
                        type: `image/${imageType}`,
                        name: `cover.${imageType}`
                    })}else {data.append('cover_photo', imageUri)}
                    data.append('genre', values.genre)
                    data.append('rating', values.rating)
                    data.append('released', values.released)

                    console.log("Data: ", data)

                    console.log(values)

                    await fetch(moviesURL,{
                        method:'post',
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        body: data
                    })
                    .then(response => response.json())
                    .then(response => {
                        console.log("Server Response", response)
                        alert(response)
                    })
                    .catch((error) => alert(error))

                    // clear form fields
                    actions.resetForm()
                }}
            >
                {(props) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Title'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />
                        <Text>Cast (Separate names by commas)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='e.g. Dwayne Jonhson,Kevin Hart,Jennifer Lawrence'
                            onChangeText={props.handleChange('cast')}
                            value={props.values.cast}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <Text>This is a: </Text>
                            <Picker
                                selectedValue={props.values.category}
                                style={{ 
                                    height: 50, 
                                    width: 300,
                                    borderWidth: 1,
                                    borderColor: '#000'
                                }}
                                onValueChange={props.handleChange('category')}
                            >
                                <Picker.Item label="Movie" value="MOV" />
                                <Picker.Item label="TV Series" value="SER" />
                            </Picker>
                        </View>

                        <View style={{marginTop: 10, marginBottom: 10}}>
                            {/* show the image upon selection */}
                            {props.values.cover_photo && (
                                <Image 
                                    source={{uri: props.values.cover_photo}}
                                    resizeMode='cover'
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        borderRadius: 25,
                                        marginBottom: 5
                                    }}
                                />
                            )}
                            <Button
                                onPress={() => { _pickImage(props.setFieldValue, 'cover_photo') }}
                                title="Choose A Cover Photo"
                                style={styles.button}
                            />
                        </View>
                        <View>
                            <Text>Select Genres</Text>
                            {/* show the genre as they get selected */}
                            <TextInput
                                style={styles.input}
                                placeholder='Genre'
                                onChangeText={props.handleChange('genre')}
                                value={props.values.genre}
                            />
                        </View>
                        <Text>Year Released</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Year of Release'
                            onChangeText={props.handleChange('released')}
                            value={props.values.released}
                        />
                        <Button title="Post" onPress={props.handleSubmit} style={styles.button} />
                    </View>
                    </TouchableWithoutFeedback>
                )}

            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    mainTitle:{
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button:{
        width: 300,
        backgroundColor: '#d3d3d3'
    },
    input: {
        borderWidth: 1,
        borderColor: '#212121',
        padding: 8,
        width: 350,
        margin: 10,
        borderRadius: 5
    },
    ImageButton: {
        backgroundColor: '#04b040',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        shadowColor: '#E67E22',
        shadowOpacity: 0.8,
        elevation: 8
    }
})