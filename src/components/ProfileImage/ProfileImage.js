import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MARGIN, COLORS, FONTS, ICONS} from '../../constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {style} from '../../styles/Style';
import Images from '../../constants/Images';

function ProfileImage(props) {
  const {
    iconName,
    iconOnImage,
    nameAfterImage,
    selectedImage,
    iconBgColor,
    onPressPen,
    imageUri,
  } = props;
  return (
    <View style={styles.profileView}>
      {selectedImage ? (
        iconOnImage ? (
          <View>
            <Image
              style={
                nameAfterImage
                  ? [styles.imageProfileStyle, {marginBottom: MARGIN.smMargin}]
                  : [styles.imageProfileStyle]
              }
              source={Images.userDefault}
            />
            <TouchableOpacity
              onPress={onPressPen}
              style={[
                styles.buttonEditIconOnImage,
                {
                  backgroundColor: iconBgColor ? COLORS.blue : COLORS.white,
                },
              ]}>
              <FontAwesome5
                name="pen"
                size={ICONS.xsIcon}
                color={iconBgColor ? COLORS.white : COLORS.darkGray}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Image
            style={
              nameAfterImage
                ? [styles.imageProfileStyle, {marginBottom: MARGIN.smMargin}]
                : [styles.imageProfileStyle]
            }
            source={Images.userDefault}
          />
        )
      ) : iconOnImage ? (
        <View>
          <View
            style={
              nameAfterImage
                ? [
                    styles.imageProfileStyle,
                    styles.viewFalseSelectedImage,
                    {marginBottom: MARGIN.xsMargin},
                  ]
                : [styles.imageProfileStyle, styles.viewFalseSelectedImage]
            }>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={styles.imageProfileStyle}
              />
            ) : (
              <Image
                source={Images.userDefault}
                style={styles.imageProfileStyle}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={onPressPen}
            style={[
              styles.buttonEditIconOnImage,
              {
                backgroundColor: iconBgColor ? COLORS.blue : COLORS.white,
              },
            ]}>
            <FontAwesome5
              name="pen"
              size={ICONS.xsIcon}
              color={iconBgColor ? COLORS.white : COLORS.darkGray}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={
            nameAfterImage
              ? [
                  styles.imageProfileStyle,
                  styles.viewFalseSelectedImage,
                  {marginBottom: MARGIN.smMargin},
                ]
              : [
                  styles.imageProfileStyle,
                  styles.viewFalseSelectedImage,
                  {marginBottom: MARGIN.smMargin},
                ]
          }>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.imageProfileStyle} />
          ) : (
            <Image
              source={Images.userDefault}
              style={styles.imageProfileStyle}
            />
          )}
        </View>
      )}
      {nameAfterImage ? (
        <View
          style={
            iconName ? styles.iconNameView : {marginBottom: MARGIN.mdMargin}
          }>
          <Text style={style.textContentBold}>{nameAfterImage}</Text>
          {iconName ? (
            <TouchableOpacity>
              <FontAwesome5
                name={iconName}
                size={ICONS.xsIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  profileView: {
    alignItems: 'center',
  },
  imageProfileStyle: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
  },
  name: {
    fontSize: FONTS.h5,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  iconNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MARGIN.xlMargin,
  },
  icon: {
    marginStart: RFValue(5),
  },
  buttonEditIconOnImage: {
    width: RFValue(20),
    position: 'absolute',
    bottom: RFValue(5),
    right: RFValue(10),
    height: RFValue(20),
    borderRadius: RFValue(10),
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewFalseSelectedImage: {
    backgroundColor: COLORS.lightGray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileImage;
