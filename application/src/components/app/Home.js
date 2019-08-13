import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../brand';
import { Header, Button } from '../common';

export default class Home extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <>
        <Header navigation={navigation} title="HOME" />
        <View style={styles.container}>
          <Button text="START ORDER" onPress={() => navigation.navigate('Order')} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_PINK,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
