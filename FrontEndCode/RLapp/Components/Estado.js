import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableHighlight,ToastAndroid } from 'react-native'
import TimePicker from 'react-native-simple-time-picker';
import { connect } from 'react-redux'

import CartList from './CartList'


class Estado extends Component {
    state={
        horaActual: new Date().getHours(),
        minutoActual:new Date().getMinutes(),
        selectedHours: new Date().getHours(),
        selectedMinutes: new Date().getMinutes()+5,
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textoTitulo}>Pedidos:</Text>
                <CartList />
                {this.props.datosRedux.carItems.length>0 ?
                    <View style={styles.TimePicker}>
                    <Text style={styles.texto}>
                        Selecciona tu hora de llegada
                     </Text>
                    <TimePicker 
                        selectedHours={this.state.selectedHours}
                        selectedMinutes={this.state.selectedMinutes}
                        onChange={(hours, minutes) =>
                            this.setState({ selectedHours: hours, 
                            selectedMinutes: minutes })}
                    />
                    </View>
                :<Text></Text>
                }
                {this.props.datosRedux.carItems.length >0 ?
                    <TouchableHighlight 
                        style={styles.boton} 
                        onPress={this.enviarOrden}>
                        <Text style={styles.textoBoton}>
                            Ordenar
                        </Text>
                    </TouchableHighlight>
                :<Text  style={styles.texto}>
                    Agrega algún producto para ordenar
                </Text>}
                
            </View>
        )
    }
    enviarOrden= async () => {
        let date= new Date()
        date.setMinutes(this.state.selectedMinutes)
        date.setHours(this.state.selectedHours)
        date.setSeconds(0)
        date.setMilliseconds(0)
        let obj={
            Date:date,
            Content:this.props.datosRedux.carItems,
            UserEmail:this.props.datosRedux.userInfo,
            BoxId:"A2D2",
        }
        let objJson=JSON.stringify(obj)
        console.log(objJson)
        console.log(typeof(objJson))
        fetch(global.url+'Orders/AddNewOrder'
        , {
            method: "POST",
            body: objJson,
            headers:{
                'Content-Type': 'application/json'
            }   
        })
         .then((response) => response.json())
         .then((responseData) =>
         {
            console.log(responseData);
            if(responseData.Succes){
                if(responseData.Result==1){
                    this.vaciarOrden()
                    ToastAndroid.show('Orden recibida, te esperamos'
                        ,ToastAndroid.SHORT);
                }else{
                    ToastAndroid.show('No podemos recibir'
                    +' tu orden en este momento'
                    ,ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show('Problemas con el servidos,'
                +' intenta más tarde'
                ,ToastAndroid.SHORT);
            }
        })
         .catch((error) => {
             console.error(error);
        });
    }
    vaciarOrden = () => {
        let i=1
        while(i<8)
        {
            this.props.removeItemId({
                id:i
            })
            i+=1
        }  
    }
    
}
const mapStateToProps = (state) => {
    return {
        datosRedux: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItemId: (product) => dispatch({ type: 'REMOVE_FROM_CART_ID', payload: product })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Estado);

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent: 'center',
        width:'100%',
        height:'100%',
        padding:'2%',
        paddingVertical:'5%',
        marginTop:'5%'
    },
    boton:{
        borderRadius:8,
        backgroundColor:'rgba(241, 196, 15,0.8)',
        padding:10,
        margin:5,
        width:'40%',
        marginTop:'10%'
      },
    textoBoton:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center"
      },
    textoTitulo:{
        color:'rgb(236, 240, 241)',
        fontSize:30,
        textAlign:"center",
    },
    texto:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center",
    },
    TimePicker:{
        flex: 1,
        backgroundColor: 'rgba(241, 196, 15,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        padding:10,
        color:'white',
    }
})
