import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../constants/Constants';

function VisaTypeCard(props) {
  const {image, ...rest} = props;
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Image source={image} resizeMode="stretch" style={styles.imageIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    elevation: 3,
  },
  imageIcon: {
    width: '100%',
    height: '100%',
    borderRadius: RFValue(30),
  },
});

export default VisaTypeCard;
