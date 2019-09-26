import React, { Component } from 'react'
import { Text,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    View
    } from 'react-native'
import Estado from '../Components/Estado'

export default class EstadoSceen extends Component {
    render() {
        return (
            <ImageBackground source={{uri:'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'}}
            style={styles.container}>
                <View style={styles.gris}>
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                    <ScrollView style={styles.ScrollView} >
                        <Estado style={styles.Estado}/>
                    </ScrollView>
                </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    KeyboardAvoidingView:{
        width:'100%',
        height:'100%',
        alignItems: 'center',
    },
    boton:{
        borderRadius:8,
        backgroundColor:'rgba(241, 196, 15,0.8)',
        padding:10,
        margin:5,
        width:'40%',
    },
    textoBoton:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center"
    },
    ScrollView:{
        width:'100%',
        paddingVertical: 20,
        marginVertical:'10%',
    },
    Estado:{
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        margin:10,
        width:'100%',
        height:'100%',
    },
    gris:{
        backgroundColor:'rgba(46,46,46,0.5)',
        width:'100%',
        height:'100%',
    }
  });

