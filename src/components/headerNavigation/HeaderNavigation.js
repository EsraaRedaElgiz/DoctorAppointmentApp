import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {style} from '../../styles/Style';
import {MARGIN, PADDINGS, COLORS, ICONS, FONTS} from '../../constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
const HeaderNavigation = props => {
  const {title, btn, onPress, backgroundColor, color,padding,onPressBtn} = props;
  return (
    <View
      style={[
        style.headerNavigationContainer,
        {backgroundColor: backgroundColor,paddingHorizontal:padding},
      ]}>
      <Pressable style={style.rightIconContainer} onPress={onPress}>
        <AntDesign name="right" color={COLORS.darkGray} size={ICONS.smIcon} />
      </Pressable>
      <View
        style={{
          flex: 1,
          marginLeft: MARGIN.mdMargin,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            style.textTitleBold,
            { color: color},
          ]}>
          {title}
        </Text>
      </View>
      <Pressable style={style.left_Btn_header}
      onPress={onPressBtn}
      >
        <Text style={style.textContentBold}>{btn}</Text>
      </Pressable>
    </View>
  );
};

export {HeaderNavigation};

const styles = StyleSheet.create({});
