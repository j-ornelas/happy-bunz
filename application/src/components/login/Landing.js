import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from '../common';
import { colors } from '../../brand';

const logo = require('../../../assets/happybunz.png');

export default class LoginLanding extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logoImage} />
        <Button text="Enter as Guest" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_PINK,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoImage: {
    height: 300,
    width: 300,
  }
});
