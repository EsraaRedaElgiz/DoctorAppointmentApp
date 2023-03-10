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

function UserProfileButton(props) {
  const {backgroundColor, style, title, iconName,onPress, ...rest} = props;
  return (
    <TouchableOpacity {...rest} style={[styles.buttonStyle, style]} onPress={onPress}>
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
    fontWeight: '600',
    color: COLORS.darkGray,
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
