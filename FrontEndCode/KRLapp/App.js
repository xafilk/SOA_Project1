import React from 'react';
import { StyleSheet, Text, View,ImageBackground,TouchableHighlight} from 'react-native';
import { ScreenOrientation } from 'expo';
import OrdenScreen from './Containers/OrdenScreen'
export default function App() {
  
  global.url='http://192.168.43.53:3000/'
  return (
    <View>
        <OrdenScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red'
  },
});
