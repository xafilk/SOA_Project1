import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableHighlight,ToastAndroid } from 'react-native'
import TimePicker from 'react-native-simple-time-picker';
import { connect } from 'react-redux'

import CartList from './CartList'


class Orden extends Component {
    state={
        horaActual: new Date().getHours(),
        minutoActual:new Date().getMinutes(),
        selectedHours: this.getHours,
        selectedMinutes: 0,
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textoTitulo}>Pedidos:</Text>
                <CartList/>
                <Text style={styles.texto}>Selecciona tu hora de llegada</Text>
                <View style={styles.TimePicker}>
                <TimePicker 
                selectedHours={this.state.selectedHours}
                selectedMinutes={this.state.selectedMinutes}
                onChange={(hours, minutes) =>
                    this.setState({ selectedHours: hours, 
                        selectedMinutes: minutes })}
                />
                </View>
                <TouchableHighlight style={styles.boton} onPress={this.check}>
                    <Text style={styles.textoBoton}>
                        Ordenar
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
    check=()=>{
        if (this.props.datosRedux.carItems.length > 0)
        {
            if(this.state.selectedHours-this.state.horaActual>0){
                this.order();
            }else if(this.state.selectedHours==this.state.horaActual &&
            this.state.selectedMinutes-this.state.minutoActual>4){
                this.order();
            }else{
                ToastAndroid.show('Cambia la hora de entrega', ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show('No has añadido ningun producto', ToastAndroid.SHORT);
        }
    }
    order=()=>{

        let porEnviar={...{userName:this.props.datosRedux.userInfo},
                        ...{pedido:this.props.datosRedux.carItems},
                        ...{time:this.state.selectedHours+':'+this.state.selectedMinutes}}
        ToastAndroid.show('Ordenando', ToastAndroid.SHORT);
        let Json=JSON.stringify(porEnviar);
        console.log(Json)
        this.props.removeAll
    }
}
const mapStateToProps = (state) => {
    return {
        datosRedux: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeAll: (product) => dispatch({ type: 'REMOVE_ALL_CART', payload: product })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orden);

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(243, 156, 18,0.8)',
        alignItems:"center",
        justifyContent: 'center',
        width:'100%',
        padding:'2%',
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
        marginTop:'5%'
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
        marginRight:20,
        color:'white',
    }
})
