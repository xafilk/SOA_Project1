import React from 'react';
import { StyleSheet, } from 'react-native';
import { Provider } from 'react-redux'
import store from './Redux/Store'

import Grid from './Containers/Grid';
import RCapp from './RCapp';

export default function App() {
  return (
    <Provider store={store}>
      <RCapp/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
