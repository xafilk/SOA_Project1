import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    ToastAndroid 
    } from 'react-native'

export default class OrdenItem extends Component {
  state={
    date:'',
    time:'',
    total:''
  }
    render() {
        return (
              <View key={this.props.index} style={styles.Orden}>
                  <View style={styles.Ctexto}>
                    <Text style={styles.texto}>
                    {`Número de orden: ${this.props.orderId}`}
                    </Text>
                    <Text style={styles.texto}>
                    {`Número de caja: ${this.props.boxId}`}
                    </Text>
                    <Text style={styles.texto}>
                    {`Estado de la orden:${this.props.statusDescription}`}
                    </Text>
                </View>
                {this.props.statusId==3?
                  <TouchableHighlight style={styles.boton}
                    onPress={()=>this.abrirCaja()}>
                      <Text style={styles.textBoton}>Abrir caja</Text>
                  </TouchableHighlight>
                :<Text></Text>
                }
              </View>
        )
    }
    getTime =()=> {
      setState({time:this.props.pickUpDateTime.getHour()+':'
      +this.props.pickUpDateTime.getMinutes()})
    }
    getDay(){
      let dateTime=this.props.pickUpDateTime
      let dateOrder=dateTime.getDate();
      +this.props.pickUpDateTime.getMonth()+'/'
      +this.props.pickUpDateTime.getFullYear()
      this.setState({date:dateOrder}) 
    }
    cacularTotal(){
      let total = 0;
      let i = 0;
      while (i < this.props.content.length()) { 
        total+=this.props.content[i].price
        i++;
      }
      this.setState({total:total})
    }
    async abrirCaja(){
        this.abrirOrden()
        this.cambiarEstado()
    }
    abrirOrden = async () => {
        try {
          fetch(global.url+'Box/OpenBox'
          ,{
            method: "POST",
            body: JSON.stringify({
                BoxId:this.props.boxId}),
            headers:{
                'Content-Type': 'application/json'
              }
            }).then((response) => response.json())
            .then((responseData) =>
            {
              console.log('Respuesta abrir orden:')
              console.log(responseData)
              if(responseData.Succes){
                ToastAndroid.show('Gracias por la compra'
                  ,ToastAndroid.SHORT);
              }else{
                ToastAndroid.show('Error en el servidor'
                  ,ToastAndroid.SHORT);
              }
            })
            .catch((error) => {
            console.error(error);
            });
        } catch (error) {
          ToastAndroid.show('Revisa tu conexión a internet')
        }
      } 
      cambiarEstado = () => {
        try {
            
          fetch(global.url+'Orders/UpdateStatus'
          ,{
            method: "POST",
            body: JSON.stringify({
                OrderId:this.props.orderId,
                StatusId:4}),
            headers:{
                'Content-Type': 'application/json'
              }
            }).then((response) => response.json())
            .then((responseData) =>
            {
              console.log('Respuesta cambiar estado:')
              console.log(responseData)
            })
            .catch((error) => {
            console.error(error);
            });
        } catch (error) {
          ToastAndroid.show('Revisa tu conexión a internet')
        }
      }
      
}

const styles = StyleSheet.create({
    Orden:{
        backgroundColor:'rgba(243, 156, 18,0.6)',
        width:'90%', 
        margin:'5%',
        borderRadius:8,
        flex:1,
    },
    texto:{
        color:'white',
        textAlign:'center',
        fontSize:20,
        position:'relative',
    },
    Ctexto:{
        width:'90%',
        margin:'5%',
        paddingTop:'3%',
        paddingBottom:'4%',
        flex:1,
    },
    boton:{
        borderRadius:8,
        position: "relative",
        marginHorizontal:'5%',
        marginBottom:'5%',
        padding:'3%',
        backgroundColor:'rgb(241, 196, 15)',
        flex:1,

    },
    textBoton:{
        color:'rgb(230, 126, 34)',
        textAlign:'center',
        justifyContent: 'center',
        fontSize:20,
    },
})

