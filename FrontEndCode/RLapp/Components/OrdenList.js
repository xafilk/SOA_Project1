import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class OrdenList extends Component {
    renderOrders = (orders) => {
        return orders.map((item, index) => {
            return (
                <View key={index} style={styles.Orden}>
                    <View>
                        <Text style={styles.texto}>
                            {`Número de orden:${item.OrderId}`}
                        </Text>
                        <Text style={styles.texto}>
                            {`Número de caja:${item.BoxId}`}
                        </Text>
                        <Text style={styles.texto}>
                            {`Estado de la orden:${item.StatusId}`}
                        </Text>
                    </View>
                    <TouchableHighlight 
                    style={styles.delect}
                    onPress={this.nada}>
                        <Icon style={styles.icon} name="ios-close" size={40} />
                    </TouchableHighlight>
                </View>
            )
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderOrders(this.props.products)}
            </View>
        );
    }
    nada = () => {
        
    }
    
}

const styles = StyleSheet.create({
    Orden:{
        backgroundColor:'rgba(243, 156, 18,0.6)',
        width:'80%',
        padding:10,
        alignItems:"center",
        justifyContent: 'center',
        borderRadius:8,
        margin:'5%',
        padding:'5%',
    },
    texto:{
        color:'white',
        textAlign:'center',
        fontSize:20,
    }
})
