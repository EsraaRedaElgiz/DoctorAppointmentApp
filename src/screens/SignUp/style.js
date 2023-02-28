import { StyleSheet, Dimensions } from 'react-native';
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
  },
  topViewStyle: {
    marginBottom: '10%',
    paddingHorizontal: PADDINGS.mdPadding,
    paddingTop: "5%",
    flex: 1
  }, afterArrowButtonMargin: {
    marginBottom: '5%'
  }, viewHeaderTextStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTextHeaderStyle: {
    color: COLORS.white,
    fontSize: FONTS.h3,
    fontFamily: 'Amaranth-Regular',
    textAlign:'center'
  },
  secondTextHeaderStyle: {
    color: COLORS.white,
    fontSize: FONTS.h4,
    fontFamily: 'Amaranth-Regular',
    textAlign:'center'
  },
  viewAfterHeaderStyle: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFValue(85),
    paddingHorizontal: PADDINGS.mdPadding,
    flex: 5,
    paddingTop: '15%',
    paddingBottom: '1%'

  }, eachtextinputmargin: {
    marginBottom: '.5%',
  },
  viewForfirstTextAfterTextinputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
  viewForSecondTextAfterTextinputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8%',
  },
  textAfterTextinputsStyle: {
    color: COLORS.darkGray3,
    fontSize: FONTS.h6,
    fontFamily: 'Amaranth-Regular',
    textAlign: 'center'
  },
  viewForLastTextStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bluetextstyle: {
    color: COLORS.blue,
    fontSize: FONTS.h6,
    fontFamily: 'Amaranth-Regular',
  },
  viewforheaderstyle: {
    marginBottom: '2%',
  }, buttonMargin: {
    marginBottom: '5%'
  }, scrollViewStyle: {
    backgroundColor: COLORS.white
  },errorTextColor:{
    color:"#f00"
  }
});
export default styles;
