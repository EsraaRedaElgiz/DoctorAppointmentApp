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
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  topViewStyle: {
    paddingBottom: "5%",
    paddingHorizontal:PADDINGS.mdPadding,
  }, viewHeaderTextStyle: {
    // marginTop: '5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, scrollViewContentContainerStyle: {
    minHeight: '100%'
  },
  firstTextHeaderStyle: {
    color: COLORS.white,
    fontSize: FONTS.h3,
    fontFamily: 'Amaranth-Regular',
    textAlign: 'center',
  },
  secondTextHeaderStyle: {
    color: COLORS.white,
    fontSize: FONTS.h4,
    fontFamily: 'Amaranth-Regular',
    textAlign: 'center'
  },
  viewAfterHeaderStyle: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFValue(85),
    paddingHorizontal: PADDINGS.mdPadding,
    //flex: 5,
    paddingTop: '15%',
    paddingBottom: PADDINGS.mdPadding,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',

  }, eachtextinputmargin: {
    marginBottom: '.5%',
  },
  viewForfirstTextAfterTextinputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4%',
  },
  viewForSecondTextAfterTextinputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
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
    //marginBottom:MARGIN.mdMargin
  },
  bluetextstyle: {
    color: COLORS.blue,
    fontSize: FONTS.h6,
    fontFamily: 'Amaranth-Regular',
    fontWeight:'bold'
  },
  viewforheaderstyle: {
    marginBottom: '2%',
  }, scrollViewStyle: {
    backgroundColor: COLORS.white
  }, errorTextColor: {
    color: "#f00"
  }, buttonMargin: {
    marginBottom: '2%'
  }
});
export default styles;
