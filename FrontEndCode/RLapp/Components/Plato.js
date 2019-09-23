import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableHighlight,ToastAndroid } from 'react-native'

export default class Plato extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textoNombre}>{this.props.nombre}</Text>
                <Text style={styles.textoPrecio}>{this.props.precio}</Text>
                <TouchableHighlight style={styles.boton} onPress={this.goToEstado}>
                    <Text style={styles.textoBoton}>
                        Comprar
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
    goToEstado = async () => {
        ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    };
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(243, 156, 18,0.8)',
        margin:20,
        padding:10,
        alignItems:"center",
        justifyContent: 'center',
        width:'110%',
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
    textoNombre:{
        color:'rgb(236, 240, 241)',
        fontSize:30,
        textAlign:"center",
    },
    textoPrecio:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center",
    },
})
