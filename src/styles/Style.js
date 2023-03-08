import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, PADDINGS, RADIUS, MARGIN, FONTS} from '../constants/Constants';
const style = StyleSheet.create({
  bigContainer: {
    paddingHorizontal: PADDINGS.mdPadding,
    marginTop: MARGIN.smMargin,
    backgroundColor: COLORS.white,
    
  },
  CardContainer: {
    width: '100%',
    height: RFValue(115),
    flexDirection: 'row',
    marginBottom: MARGIN.smMargin,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.smRadius,
    elevation: RFValue(4),
  },
  imageContainerStyle: {
    width: RFValue(100),
    height: '100%',
    borderRadius: RADIUS.smRadius,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    width: RFValue(90),
    height: RFValue(95),
    borderRadius: RADIUS.smRadius,
  },
  textsCardConatiner: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginLeft: MARGIN.xsMargin,
    paddingVertical: PADDINGS.lgPadding,
  },
  textTitleBold: {
    fontSize: FONTS.h4,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: FONTS.h4,
    fontFamily: FONTS.Amaranth,
  },
  textContentBold: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
  },
  textSmallContentBold: {
    fontSize: FONTS.h6,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
  },
  textSmallContent: {
    fontSize: FONTS.h6,
    fontFamily: FONTS.Amaranth,
  },
});
export {style};
