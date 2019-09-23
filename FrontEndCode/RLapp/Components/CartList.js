import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux'
import CartListProducts from './CartListProducts'
class CartList extends Component {

    render() {
        //console.log(this.props.cartItems.carItems)
        return (
            <View style={styles.container}>
                {this.props.cartItems.carItems.length > 0 ?
                    <CartListProducts
                        onPress={this.props.removeItem}
                        products={this.props.cartItems.carItems} />
                    : <Text style={styles.texto}>No has añadido ningun producto</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartList);

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