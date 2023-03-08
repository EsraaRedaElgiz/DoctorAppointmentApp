import {StyleSheet, View} from 'react-native';
import React from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { COLORS,FONTS } from '../../constants/Constants';
const Stars = () => {
  return (
    <View>
      <FontAwesome name="star" size={FONTS.h6} color={COLORS.star} />
    </View>
  );
};

export default Stars;

const styles = StyleSheet.create({});
