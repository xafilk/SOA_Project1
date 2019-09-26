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

  import { connect } from 'react-redux'
  
 class RegisterScreen extends Component {
    state={
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
          placeholder="Correo"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={correo => this.setState({ correo:correo })}
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
          placeholder="Apellido 1"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={apellido1 => this.setState({ apellido1:apellido1 })}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Apellido 2"
          placeholderTextColor={"rgba(236, 240, 241,0.85)"}
          onChangeText={apellido2 => this.setState({ apellido2:apellido2 })}
        />
        <TouchableHighlight style={styles.boton} onPress={this.goToMenu}>
          <Text style={styles.textoBoton}>
            Registrarse
          </Text>
        </TouchableHighlight>
        </View>
        </KeyboardAvoidingView>
      </ImageBackground>
        )
    }
    
    goToMenu= async () => {
      if(this.state.correo!='' && 
         this.state.contraseña!=''){
          fetch(global.url+'Users/AddNewUser'
          ,{
            method: "POST",
            body: JSON.stringify({
              Name:this.state.nombre,
              LastName1:this.state.apellido1,
              LastName2:this.state.apellido2,
              Email:this.state.correo,
              Password:this.state.contraseña
            }),
            headers:{
              'Content-Type': 'application/json'
            }
            })
            .then((response) => response.json())
            .then((responseData) =>
            {
              console.log('Respuesta registro:')
              console.log(responseData);
              if(responseData.Succes){
                if(responseData.Result==1){
                  this.props.addId(this.state.correo)
                  this.props.navigation.navigate('Tab');
                }else{
                  ToastAndroid.show('Correo previamente registrado'
                , ToastAndroid.SHORT);
                }
              }else{
                ToastAndroid.show('Error en el servidor, intentar más tarde'
                , ToastAndroid.SHORT);
              }
            })
            .catch((error) => {
            console.error(error);
            });
        }else{
          ToastAndroid.show('Debes ingresar al menos un nombre de'+ 
          ' usuario y una contraseña para registrarte', ToastAndroid.SHORT);
      }
      console.log(global.url+'Users/AddNewUser')
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
      addId: (userName) => dispatch({ type: 'ADD_ID', payload: userName })
  }
}

export default connect(null,mapDispatchToProps)(RegisterScreen);

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
      width:'90%',
    },
    textoBoton:{
      color:'rgb(230, 126, 34)',
      fontSize:20,
      textAlign:"center"
    },
    TextInput:{
      borderRadius:8,
      backgroundColor:'rgba(243, 156, 18,0.8)',
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
        backgroundColor:'rgba(46,46,46,0.5)',
        width:'100%',
        height:'100%',
        margin:'5%',
        paddingTop:'10%',
        paddingBottom:'10%',
        alignItems: 'center',
        justifyContent: 'center',  
    }
  });
