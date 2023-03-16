import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  COLORS,
  FONTS,
  ICONS,
  PADDINGS,
  RADIUS,
} from '../../constants/Constants';
import {style} from '../../styles/Style';

function UserProfileButton(props) {
  const {backgroundColor, styleProp, title, iconName, onPress, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.buttonStyle, styleProp]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <View style={styles.textIconWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={[styles.textIconWrapper, {alignItems: 'flex-end'}]}>
          <Icon size={ICONS.smIcon} color={COLORS.darkGray} name={iconName} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    height: RFValue(50),
    elevation: 2,
    justifyContent: 'center',
    borderRadius: RADIUS.xsRadius,
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: RFValue(8),
  },
  title: {
    fontSize: FONTS.h5,
    fontWeight: "bold",
    fontFamily:FONTS.Amaranth,
    color: COLORS.darkGray2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textIconWrapper: {
    flex: 1,
  },
});
export default UserProfileButton;
