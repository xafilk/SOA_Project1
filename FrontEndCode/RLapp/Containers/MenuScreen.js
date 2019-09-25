import React, { Component } from 'react'
import {
    StyleSheet,
    ImageBackground,
    ScrollView
    } from 'react-native'
import { connect } from 'react-redux'
import Producto from '../Components/Producto'
import {comidas} from '../Data'

class MenuScreen extends Component {
    render() {
        return (
            <ImageBackground source={{uri:'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'}}
            style={styles.container}>
                <View style={styles.gris}>
                <ScrollView Style={styles.contentContainer}>
                    <Producto 
                        products={comidas}
                        onPress={this.props.addItemToCart}
                    />
                </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}
export default connect(null, mapDispatchToProps)(MenuScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center', 
    },
    contentContainer:{
        width:'100%',
        paddingVertical: 20,
        marginVertical:20,
        alignItems:"center",
    },
    gris:{
        backgroundColor:'rgba(46,46,46,0.5)',
        width:'100%',
        height:'100%',
    }
  });
