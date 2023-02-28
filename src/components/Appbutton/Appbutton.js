import React from 'react';
import {Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, RADIUS} from '../../constants/Constants';

function Appbutton(props) {
  const {
    buttonText,
    changeButtonStyle,
    changeTextStyle,
    isLoading,
    disabled,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      disabled={isLoading}
      style={[
        styles.buttonStyle,
        changeButtonStyle,
        disabled ? styles.disabledButtonStyle : null,
      ]}>
      {isLoading ? (
        <ActivityIndicator size={FONTS.h2} color={COLORS.white} />
      ) : (
        <Text style={[styles.textStyle, changeTextStyle]}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.blue,
    borderRadius: RADIUS.xsRadius,
    borderWidth: RFValue(1),
    borderColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(50),
    width: '100%',
  },
  textStyle: {
    color: COLORS.white,
    fontSize: FONTS.h4,
    fontFamily: 'Amaranth-Regular',
    fontWeight:'bold'
  },
  disabledButtonStyle: {
    opacity: 0.8,
  },
});
export default Appbutton;
