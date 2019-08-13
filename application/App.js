import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native'
import RootStack from './src/navigation';
import { colors } from './src/brand';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.LIGHT_PINK }}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <RootStack />
      </SafeAreaView>
    );
  }
}
