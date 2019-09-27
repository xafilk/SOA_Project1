import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableHighlight,ToastAndroid} from 'react-native'

import OrdenItem from './OrdenItem'

export default class OrdenList extends Component {
    state={
        orderId:''
    }
    renderOrders = (orders) => {
        return orders.map((item, index) => {
            return (
                <OrdenItem
                key={index}
                orderId={item.OrderId}
                statusId={item.StatusId}
                statusDescription={item.StatusDescription}
                pickUpDateTime={item.PickUpDateTime}
                content={JSON.parse(item.Content)}
                boxId={item.BoxId}
                index={index}
                />
            )
        })
    }
    render() {
        return (
            <View style={styles.orderList}>
                {this.renderOrders(this.props.products)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orderList:{
        flex:1,
        width:'100%',
        height:'100%',
        paddingTop:'5%',
        borderRadius:8,
    },
    texto:{
        color:'black',
        textAlign:'center',
        justifyContent: 'center',
        fontSize:20,
        paddingTop:'10%'
    },
    container:{
        paddingTop:'5%',
        width:'80%',
        margin:'5%',
        alignItems:"center",
        justifyContent:'center',
        borderRadius:8,
    },
    boton:{
        borderRadius:8,
        backgroundColor:'rgb(241, 196, 15)',
        padding:10,
        margin:5,
        width:'90%',
        alignItems:"center",
    },
    textoBoton:{
        color:'rgb(230, 126, 34)',
        fontSize:20,
        textAlign:"center"
    },
})
