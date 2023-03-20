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
    paddingHorizontal: PADDINGS.mdPadding,
    paddingBottom: "5%"
  }, viewHeaderStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContentContainerStyle: {
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
    textAlign: 'center',
  },
  viewAfterHeaderStyle: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFValue(85),
    paddingHorizontal: PADDINGS.mdPadding,
    paddingTop: '15%',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: PADDINGS.mdPadding
  },
  eachTextinputAndErrorTextContainer: {
    marginBottom: '3%',
  },
  viewForfirstTextAfterTextinputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '7%',
  },
  textAfterTextinputsStyle: {
    color: COLORS.darkGray2,
    fontSize: FONTS.h6,
    fontFamily: 'Amaranth-Regular',
    fontWeight:'bold'
  },
  viewForLastTextStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: MARGIN.mdMargin,
  },
  bluetextstyle: {
    color: COLORS.blue,
    fontFamily: 'Amaranth-Regular',
    fontWeight:'bold'
  },
  viewforcheckboxandwordstyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewfortwolinesandwordstyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewfortwoboxesstyle: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '19%',
  },
  viewforheaderstyle: {
    marginBottom: '2%',
  },
  lineviewstyle: {
    width: '45%',
    height: RFValue(2),
    backgroundColor: COLORS.gray,
  },
  twoSquaresStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(5),
    //marginHorizontal: '5%',
    backgroundColor: COLORS.lightGray2,
    elevation: RFValue(3),
  },
  imagestyle: {
    width: RFValue(35),
    height: RFValue(35),
  },
  orWordStyle: {
    color: COLORS.darkGray2,
  }, scrollViewStyle: {
    backgroundColor: COLORS.white,
  },
  textErrorColor: {
    color: '#f00',
  }, buttonMargin: {
    marginBottom: '2%'
  }
});
export default styles;
