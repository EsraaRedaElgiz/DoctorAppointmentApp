import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, ICONS, MARGIN, RADIUS} from '../../constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';

function viewLikeTextInput(props) {
  const {onPress, placeholder, iconName, borderColor, textColor, ...rest} =
    props;
  return (
    <View style={[styles.container, {borderColor: borderColor}]}>
      <View>
        <Text style={[styles.textInViewLikeTextInputStyle, {color: textColor}]}>
          {placeholder}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <FontAwesome5 name={iconName} size={RFValue(24)} color={COLORS.darkGray}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    minHeight: RFValue(50),
    width: '100%',
    borderRadius: RADIUS.xsRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: RFValue(13),
    borderWidth: RFValue(1),
    alignItems: 'center',
    paddingRight: RFValue(19),
  },
  textInViewLikeTextInputStyle: {
    fontSize: FONTS.h5,
    fontFamily: 'Amaranth-Regular',
  },
});

export default viewLikeTextInput;
