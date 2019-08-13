import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../brand';

export default class Button extends React.Component {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPress()}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PINK,
    color: 'white',
    display: 'flex',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
  }
});
