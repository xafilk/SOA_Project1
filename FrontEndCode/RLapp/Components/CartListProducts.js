import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

class CartListProducts extends Component {
    state={
        total:0
    }
    renderProducts = (products) => {
        return products.map((item, index) => {
            return (
                <View key={index} style={styles.boton}>
                    <View>
                        <Text style={styles.texto}>
                            {item.name+' - '+item.price}
                        </Text>
                    </View>
                    <TouchableHighlight style={styles.delect}
                    onPress={() => this.props.onPress(item)}>
                        <Icon style={styles.icon} name="ios-close" size={50} />
                    </TouchableHighlight>
                </View>
            )
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderProducts(this.props.products)}
            </View>
        );
    }
}
export default CartListProducts;

const styles = StyleSheet.create({
    container:{
        margin:20,
        padding:20,
        alignItems:"center",
        justifyContent: 'center',
        width:'85%',
        height:'100%',
    },
    boton:{
        borderRadius:8,
        backgroundColor:'rgba(241, 196, 15,0.8)',
        padding:'1%',
        margin:1,
        width:'100%',
        alignItems:"center",
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
      },
    texto:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center",
    },
    delect:{
        width:'15%',
        alignItems:"center",
        justifyContent: 'center',
        
    },
    icon:{
        color:'rgb(230, 126, 34)'
    }
});