import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

class Products extends Component {
    state={
        total:0
    }
    renderProducts = (products) => {
        return products.map((item, index) => {
            return (
                <View key={index} style={styles.container}>
                    <View style={styles.NombrePrecio}>
                        <Text style={styles.textoNombre}>
                            {item.name}
                        </Text>
                        <Text style={styles.textoPrecio}>
                            {item.price}
                        </Text>
                    </View>
                    <TouchableHighlight style={styles.boton} 
                    onPress={() => this.props.onPress(item)}>
                        <Icon style={styles.icon} name="ios-cart" size={30} />
                    </TouchableHighlight>
                </View>
            )
        })
    }
    render() {
        return (
            <View style={styles.listaProductos}>
                {this.renderProducts(this.props.products)}
            </View>
        );
    }
}
export default Products;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(243, 156, 18,0.8)',
        margin:20,
        width:'90%',
        flexDirection: 'row',
        borderRadius:8,
        flex: 1
    },
    boton:{
        backgroundColor:'rgba(241, 196, 15,0.8)',
        padding:10,
        margin:'5%',
      },
    textoNombre:{
        color:'rgb(236, 240, 241)',
        fontSize:25,
        textAlign:"center",
    },
    textoPrecio:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center",
    },
    icon:{
        color:'rgb(230, 126, 34)'
    },
    listaProductos:{
        marginTop:'5%'
    },
    NombrePrecio:{
        alignItems:"center",
        justifyContent: 'center', 
        width:'80%',
        padding:'2%'
    }
});