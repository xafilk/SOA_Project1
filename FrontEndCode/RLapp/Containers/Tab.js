import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight 
  } from 'react-native';
import { 
  createAppContainer,
   NavigationActions 
  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MenuScreen from '../Containers/MenuScreen'
import EstadoSceen from '../Containers/EstadoScreen';
import OrdenScreen from './OrdenScreen'; 


class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Menu') {
    iconName = `ios-restaurant`;
  } else if (routeName === 'Estado') {
    iconName = `ios-information-circle`;
  }else if(routeName ==='Orden'){
    iconName=`ios-cart`
  }
  return <IconComponent 
          name={iconName}
          size={25} 
          color={tintColor}
          containerStyle={{margin:10}}/>;
};

const TabNavigator = createBottomTabNavigator({
  Menu: MenuScreen,
  Estado: EstadoSceen,
  Orden: OrdenScreen
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: 'rgb(241, 196, 15)',
    inactiveTintColor: 'rgb(243, 156, 18)',
    activeBackgroundColor :'rgb(230, 126, 34)',
    inactiveBackgroundColor:'rgba(230, 126, 34,0.5)',
    animationEnabled:true,
    swipeEnabled :true,
    labelStyle: {
      fontSize: 20,
      },
    tabStyle:{
      paddingTop:10
      },



  },
});
export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


