import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../brand';

const hamburger = require('../../../assets/hamburger-menu.png');

const HeaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: ${'100%'};
  background-color: ${colors.PINK}
`;
const HeaderText = styled.Text`
  color: ${colors.WHITE};
  font-size: 18px;
  margin-left: 30px;
  margin-right: 30px;
`;
const ImageContainer = styled.TouchableOpacity`
  position: absolute;
  left: -60;
  top: 15px;
  height: 50%;
  width: 50%;
`;
class Header extends Component {
  handlePress() {
    this.props.navigation.openDrawer();
  }

  render() {
    const { title } = this.props;
    return (
      <HeaderContainer>
        <ImageContainer
          onPress={() => this.handlePress()}
        >
          <Image
            style={{ height: '100%', width: '100%', tintColor: colors.WHITE }}
            resizeMode="contain"
            source={hamburger}
            tintColor="white"
          />
        </ImageContainer>
        <HeaderText numberOfLines={1}>{title}</HeaderText>
      </HeaderContainer>
    );
  }
}

export default Header;
