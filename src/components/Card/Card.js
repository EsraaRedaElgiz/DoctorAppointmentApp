import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, PADDINGS, RADIUS} from '../../constants/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

function Card(props) {
  const {children} = props;
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    elevation: RFValue(2),
    backgroundColor: '#fff',
    borderRadius: RADIUS.smRadius,
    paddingHorizontal: PADDINGS.mdPadding,
    paddingVertical:PADDINGS.lgPadding
  },
});

export default Card;
