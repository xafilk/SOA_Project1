import React, { Component } from 'react'
import { Text,
  StyleSheet,
  View, 
  TouchableHighlight,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  } from 'react-native'

export default class RegisterScreen extends Component {
    state={
        usuario:'',
        contraseña:'',
        nombre:'',
        direccion:'',
        celular:'',
        correo:'',
    }
    render() {
        return (
        <ImageBackground source={{uri:'https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'}}
      style={styles.container}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <View style={styles.cuadro}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre de usuario"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={uruario => this.setState({ usuario:uruario })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={contraseña => this.setState({ contraseña:contraseña })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={nombre => this.setState({ nombre:nombre })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Direccion"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={direccion => this.setState({ direccion:direccion })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Celular"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={celular => this.setState({ celular:celular })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Correo"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={correo => this.setState({ correo:correo })}
        />
        <TouchableHighlight style={styles.boton} onPress={this.goToRegister}>
          <Text style={styles.textoBoton}>
            Registrarse
          </Text>
        </TouchableHighlight>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
        )
    }
    goToRegister = async () => {
        //await AsyncStorage.setItem('userToken', 'abc');
        if(this.state.usuario!='' && 
         this.state.contraseña!=''){
            this.props.navigation.navigate('Tab');
        }else{
            ToastAndroid.show('Debes ingresar al menos un nombre de usuario y una contraseña'+
             'para registrarte', ToastAndroid.SHORT);
        }
    };
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    boton:{
      borderRadius:8,
      backgroundColor:'rgba(241, 196, 15,0.8)',
      padding:10,
      margin:5,
      width:'40%',
    },
    textoBoton:{
      color:'rgb(230, 126, 34)',
      fontSize:20,
      textAlign:"center"
    },
    TextInput:{
      borderRadius:8,
      backgroundColor:'rgba(243, 156, 18,0.95)',
      fontSize:20,
      color:'rgb(236, 240, 241)',
      padding:10,
      margin:5,
      width:'90%',
      textAlign:"center",
    },
    KeyboardAvoidingView:{
      width:'100%',
      alignItems: 'center',
    },
    cuadro:{
        backgroundColor:'rgba(243, 156, 18,0.6)',
        margin:'5%',
        paddingTop:'10%',
        paddingBottom:'10%',
        width:'90%',
        alignItems: 'center',
        justifyContent: 'center',  
    }
  });
