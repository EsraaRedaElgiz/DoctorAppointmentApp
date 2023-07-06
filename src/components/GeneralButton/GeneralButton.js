import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  COLORS,
  FONTS,
  PADDINGS,
  RADIUS,
  MARGIN,
} from '../../constants/Constants';

function GeneralButton(props) {
  const {title, backgroundColor, style, isLoading, onPress, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      disabled={isLoading}
      style={[
        styles.buttonStyle,
        style,
        isLoading ? {backgroundColor: COLORS.gray} : null,
      ]}
      onPress={onPress}>
      <Text style={[styles.title]}>
        {isLoading ? (
          <ActivityIndicator size={FONTS.h2} color={COLORS.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    padding: PADDINGS.smPadding,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.xsRadius,
    backgroundColor: COLORS.blue,
  },
  title: {
    fontSize: FONTS.h4,
    fontFamily: 'Amaranth',
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
export default GeneralButton;
