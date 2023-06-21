import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, PADDINGS, RADIUS, MARGIN, FONTS} from '../constants/Constants';
const style = StyleSheet.create({
  bigContainer: {
    paddingHorizontal: PADDINGS.mdPadding,
    // marginTop: MARGIN.smMargin,
    backgroundColor: COLORS.white,
  },
  CardContainer: {
    width: '100%',
    height: RFValue(115),
    flexDirection: 'row',
    marginBottom: MARGIN.smMargin,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.smRadius,
    elevation: RFValue(3),
    paddingVertical: PADDINGS.lgPadding,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  imageContainerStyle: {
    width: RFValue(70),
    height: '100%',
    borderRadius: RADIUS.smRadius,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.smRadius,
  },
  textsCardConatiner: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginLeft: RFValue(7),
  },
  textTitleBold: {
    fontSize: FONTS.h4,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
    color: COLORS.darkGray3,
  },
  textTitle: {
    fontSize: FONTS.h4,
    fontFamily: FONTS.Amaranth,
  },
  textContentBold: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
    color: COLORS.darkGray3,
  },
  textContent: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    color: COLORS.darkGray3,
  },
  textSmallContentBold: {
    fontSize: FONTS.h6,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginLeft: MARGIN.xsMargin,
  },
  textSmallContent: {
    fontSize: FONTS.h6,
    fontFamily: FONTS.Amaranth,
    marginLeft: MARGIN.xsMargin,
  },
  headerNavigationContainer: {
    width: '100%',
    height: RFValue(60),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIconContainer: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(4),
  },
  left_Btn_header: {
    minWidth: RFValue(33),
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  underLineBottomTab: {
    backgroundColor: COLORS.blue,
    height: RFValue(2),
    width: '80%',
    borderRadius: RADIUS.xlRadius,
    marginTop: RFValue(2),
  },viewForActivityIndicatorStyle: {
    backgroundColor: COLORS.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export {style};
