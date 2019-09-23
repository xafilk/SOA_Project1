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
       contraseña:''
    };
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
    this.props.addId(this.state.usuario);
    ToastAndroid.show('Username:'+this.state.usuario, ToastAndroid.SHORT);
    this.props.navigation.navigate('Tab');
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