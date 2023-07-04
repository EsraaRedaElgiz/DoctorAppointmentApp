import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, RADIUS} from '../../constants/Constants';

function Reusabletextinput(props) {
  const {style, placeholder, bordercolor,edit, ...rest} = props;
  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        style={[styles.text_input_style, style]}
        label={
          <Text style={styles.lebelanddplaceholderstyle}>{placeholder}</Text>
        }
        mode={'outlined'}
        activeOutlineColor={COLORS.gray}
        outlineStyle={[styles.outlinestyle, {borderColor: bordercolor}]}
        textColor={COLORS.darkGray3}
        editable={edit}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text_input_style: {
    fontSize: FONTS.h5,
    backgroundColor: COLORS.white,
    minHeight: RFValue(50),
    width: '100%',
    fontFamily: 'Amaranth-Regular',
  },
  outlinestyle: {
    borderRadius: RADIUS.xsRadius,
  },
  lebelanddplaceholderstyle: {
    color: COLORS.darkGray,
    fontFamily: 'Amaranth-Regular',
    fontSize: FONTS.h5,
  },
});
export default Reusabletextinput;
