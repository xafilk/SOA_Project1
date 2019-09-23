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
        console.log(products)
        return products.map((item, index) => {
            return (
                <View key={index} style={styles.container}>
                    <View>
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
            <View>
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
        padding:10,
        alignItems:"center",
        justifyContent: 'center',
        width:'90%',
        flexDirection: 'row',
        flex: 1
    },
    boton:{
        borderRadius:8,
        backgroundColor:'rgba(241, 196, 15,0.8)',
        padding:10,
        margin:5,
        width:'15%',
        alignItems:"center",
        justifyContent: 'center',
        marginLeft:'5%'
      },
    textoNombre:{
        color:'rgb(236, 240, 241)',
        fontSize:30,
        textAlign:"center",
    },
    textoPrecio:{
        color:'rgb(236, 240, 241)',
        fontSize:20,
        textAlign:"center",
    },
    icon:{
        color:'rgb(230, 126, 34)'
    }
});