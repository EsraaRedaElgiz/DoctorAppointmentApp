import React from 'react';
import {
  FONTS,
  MARGIN,
  PADDINGS,
  COLORS,
  RADIUS,
} from '../../constants/Constants';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  viewForScrollviewContainer: {
    paddingHorizontal: PADDINGS.mdPadding,
    flex: 1,
  },
  arrowButtonStyle: {
    elevation: RFValue(3),
  },
  viewBlueStyle: {
    backgroundColor: COLORS.blue,
    width: RFValue(150),
    height: RFValue(150),
    borderRadius: RFValue(75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeaderStyle: {
    marginLeft: RFValue(-20),
  },
  viewImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: RFValue(250),
    height: RFValue(250),
  },
  viewForTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  textStyle: {
    color: COLORS.darkGray,
    fontSize: FONTS.h5,
    fontFamily: 'Amaranth-Regular',
    textAlign: 'center',
  },
  buttonStyle: {
    //marginTop: '15%',
    width: '100%',
  },
  viewCodeFieldStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '15%',
  },
  cell: {
    width: RFValue(50),
    height: RFValue(50),
    borderWidth: RFValue(2),
    borderRadius: RADIUS.xsRadius,
    lineHeight: RFValue(45),
    // borderColor: COLORS.gray,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: FONTS.h2,
    marginHorizontal: MARGIN.smMargin,
  },
  focusCell: {
    borderColor: COLORS.blue,
  },
  scrollViewStyle: {
    backgroundColor: COLORS.white,
  },
  buttonContainerStyle: {
    paddingHorizontal: PADDINGS.mdPadding,
    paddingBottom: PADDINGS.mdPadding,
  },
  errorTestStyle: {
    color: '#f00',
  },
});
export default styles;
