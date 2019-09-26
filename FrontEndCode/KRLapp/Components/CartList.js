import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import CartListProducts from './CartListProducts'
export default class CartList extends Component {

    render() {
        console.log(this.props.content.length)
        return (
            <View style={styles.container}>
                {this.props.content.length > 0 ?
                    <CartListProducts
                        products={this.props.content} />
                    : <Text style={styles.texto}>No hay ningún producto</Text>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
    },
    texto:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center",
    },
});