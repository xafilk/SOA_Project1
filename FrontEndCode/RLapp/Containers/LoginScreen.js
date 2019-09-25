import React, { Component } from 'react'
import { Text,
  StyleSheet,
  View, 
  TouchableHighlight,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid
  } from 'react-native'

import { connect } from 'react-redux'


 class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       usuario: '',
       contraseña:'',
    };
    global.url='http://192.168.1.115:3000/'
  }
  
  render() {
    return (
      <ImageBackground source={{uri:'https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'}}
      style={styles.container}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <View style={styles.cuadro}>
        <TextInput
          style={styles.TextInput}
          placeholder="Correo"
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
        <TouchableHighlight style={styles.boton} onPress={this.goToMenu}>
          <Text style={styles.textoBoton}>
            Iniciar Sesion
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.boton} onPress={this.goToRegister}>
          <Text style={styles.textoBoton}>
            Registrarse
          </Text>
        </TouchableHighlight>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      );
    }
    
  goToMenu = async () => {
    fetch(global.url+'Users/Login'
      ,{
        method: "POST",
        body: JSON.stringify({
          Email: this.state.usuario,
          Password:this.state.contraseña}),
        headers:{
            'Content-Type': 'application/json'
          }
        }).then((response) => response.json())
        .then((responseData) =>
        {
          console.log('Respuesta inicio:')
          console.log(responseData)
          if(responseData.Succes){
            this.props.addId(this.state.usuario);
            this.props.navigation.navigate('Tab');
          }else{
            ToastAndroid.show('Contraseña o correo incorrecto, intente de nuevo'
              ,ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
        console.error(error);
        });
  };
  goToRegister = async () => {
    this.props.navigation.navigate('Register');
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      addId: (userName) => dispatch({ type: 'ADD_ID', payload: userName })
  }
}

export default connect(null,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  },
  boton:{
    borderRadius:8,
    backgroundColor:'rgb(241, 196, 15)',
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
    backgroundColor:'rgb(243, 156, 18)',
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