import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton 
      {...props}
      IconComponent={Ionicons} 
      iconSize={23}
      color={ Platform.OS === 'android' ? 'white' : Colors.primary }
    />
  );
};

export const CustomHeaderButtons = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} {...props} />
  );
};

export { Item } from 'react-navigation-header-buttons';
