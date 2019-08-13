import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../brand';

export default class Drawer extends React.Component {
  handleNavigate(destination) {
    const { navigation } = this.props;
    navigation.closeDrawer();
    navigation.navigate(destination)
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => this.handleNavigate('Home')}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => this.handleNavigate('Home')}
        >
          <Text>Payment Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => this.handleNavigate('Login')}
        >
          <Text>Past Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => this.handleNavigate('Login')}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
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
  guestButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 25,
    width: '80%'
  }
});
