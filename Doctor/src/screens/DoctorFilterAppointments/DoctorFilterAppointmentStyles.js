import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  MARGIN,
  PADDINGS,
} from '../../../../src/constants/Constants';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  title: {
    fontSize: FONTS.h5,
    color: COLORS.darkGray2,
    fontWeight: 'bold',
    marginBottom: MARGIN.lgMargin,
  },
  dateInputView: {
    marginBottom: MARGIN.xsMargin,
  },
  checkBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RFValue(-20),
    marginRight: RFValue(6),
    marginTop: RFValue(-10),
  },
  checkBoxComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxText: {
    fontSize: FONTS.h5,
    color: COLORS.darkGray2,
    marginLeft: -10,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: RFValue(20),
  },
});

export default styles;
