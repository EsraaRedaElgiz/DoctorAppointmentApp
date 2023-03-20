import { StyleSheet } from 'react-native';
import {
  COLORS,
  FONTS,
  RADIUS,
  PADDINGS,
  MARGIN,
} from '../../constants/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue,
    flex: 1,
  },
  topViewStyle: {
    paddingHorizontal: PADDINGS.mdPadding,

  },
  viewHeaderStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    //backgroundColor:"#f00"
  },
  viewAfterHeaderStyle: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFValue(85),
    paddingHorizontal: PADDINGS.mdPadding,
    paddingTop: '15%',
    flex: 1,

  },
  firstTextInputMargun: {
    //marginTop: '1%',
    marginBottom: '1%',
  },
  eachTextInputMargin: {
    marginBottom: '1%',
  },
  scrollViewStyle: {
    backgroundColor: COLORS.white,
  },
  buttonViewStyle: {
    paddingHorizontal: PADDINGS.mdPadding,
    backgroundColor: COLORS.white,
    paddingBottom: PADDINGS.mdPadding
  },
  dropDownMarginBottom: {
    marginBottom: '0%',
  },
  errorTextColor: {
    color: '#f00',
  },
  eachOptionInBottonTab: {
    width: '100%',
    height: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextStyle: {
    fontSize: FONTS.h5,
    color: COLORS.blue,
    fontWeight: '600',
  }, line: {
    height: RFValue(1),
    backgroundColor: COLORS.gray,
    width: '90%',
  },
});
export default styles;
