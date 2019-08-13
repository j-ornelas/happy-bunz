import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../brand';
import { Header, Button } from '../common';

export default class Order extends React.Component {
  state = {
    donuts: [
      { flavor: 'Chocolate Donut', price: 99 },
      { flavor: 'Mocha Donut', price: 99 },
      { flavor: 'Peanut Butter Donut', price: 99 },
    ],
    cart: [

    ]
  }

  addToCart(donut) {
    const currentCart = [...this.state.cart];
    currentCart.push(donut);
    this.setState({ cart: currentCart });
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        <Header navigation={navigation} title="ORDER" />
        <View style={styles.container}>
          {this.state.donuts.map((donut) => (
            <Text key={donut.flavor} onPress={() => this.addToCart(donut)}>{donut.flavor}</Text>
          ))}
          <Text>
            {'Items in cart:  '}
            {this.state.cart.length}
          </Text>
          <Button text="PLACE ORDER" onPress={() => console.warn('no func added')} />
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
