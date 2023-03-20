import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {style} from '../../styles/Style';
import {COLORS, ICONS} from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const HeaderNavigation = props => {
  const {
    title,
    btn,
    onPress,
    backgroundColor,
    color,
    padding,
    onPressBtn,
    text,
    icon,
    iconName,
    rightButtonHide
  } = props;
  return (
    <View
      style={[
        style.headerNavigationContainer,
        {backgroundColor: backgroundColor, paddingHorizontal: padding},
      ]}>
        {
          !rightButtonHide?
          (
      <Pressable style={style.rightIconContainer} onPress={onPress}>
        <AntDesign name="right" color={COLORS.darkGray} size={ICONS.smIcon} />
      </Pressable>):(
        <View style={[style.rightIconContainer,{elevation:0}]}>

        </View>
      )
      }
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[style.textTitleBold, {color: color}]}>{title}</Text>
      </View>
      <TouchableOpacity style={style.left_Btn_header} onPress={onPressBtn}>
        {text ? (
          <Text style={style.textContentBold}>{btn}</Text>
        ) : icon ? (
          <FontAwesome
            name={iconName}
            size={ICONS.lgIcon}
            color={COLORS.darkGray}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export {HeaderNavigation};

const styles = StyleSheet.create({});
