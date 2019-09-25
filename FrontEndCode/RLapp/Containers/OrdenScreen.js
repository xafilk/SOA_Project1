import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    ScrollView,
    ToastAndroid
    } from 'react-native'
import { connect } from 'react-redux'
import OrdenList from '../Components/OrdenList'

class OrdenScreen extends Component {
    state={
        orders:[]
    }
    componentDidMount(){
        this.timer = setInterval(()=> this.obtenerOrdenes(), 3000)
       }
    render() {
        return (
            <ImageBackground source={{uri:'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'}}
            style={styles.container}>
                <ScrollView style={styles.contentContainer}>
                    <View style={styles.OrdenList}>
                        {this.state.orders.length > 0 ?
                        <OrdenList
                            onPress={this.props.removeItem}
                            products={this.state.orders} />
                        : <Text style={styles.texto}>Buscando tus ordenes</Text>
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
    obtenerOrdenes = () => {
        fetch(global.url+'Orders/GetOrdersbyUser'
        , {
            method: "POST",
            body: JSON.stringify({
            UserId:this.props.datosRedux.userInfo,
            }),
            headers:{
                'Content-Type': 'application/json'
            }   
        })
         .then((response) => response.json())
         .then((responseData) =>
         {
            console.log(responseData);
            if(responseData.Succes){
                this.setState({orders:responseData.Result})
            }else{
                ToastAndroid.show('Problemas de conexion, intenta más tarde'
                    ,ToastAndroid.SHORT);
            }
            
        })
         .catch((error) => {
             console.error(error);
        });
    }
    
}
const mapStateToProps = (state) => {
    return {
        datosRedux: state
    }
}
export default connect(mapStateToProps)(OrdenScreen);


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
    },
    OrdenList:{
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center', 
    }
  });
