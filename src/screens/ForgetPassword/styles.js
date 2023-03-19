import {FONTS, MARGIN, PADDINGS, COLORS} from '../../constants/Constants';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  arrowButtonStyle: {
    elevation: RFValue(3),
  },
  viewForScrollviewContainer: {
    paddingHorizontal: PADDINGS.mdPadding,
    flex: 1,
  },
  textHeaderStyle: {
    marginLeft: RFValue(-15),
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
    marginTop: '8%',
  },
  textStyle: {
    color: COLORS.darkGray,
    fontSize: FONTS.h5,
    fontFamily: 'Amaranth-Regular',
    textAlign: 'center',
  },
  textInputContainerMargin: {
    marginTop: '15%',
    marginBottom: '10%',
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
  },
  scrollViewStyle: {
    backgroundColor: COLORS.white,
  },
  buttonContainerStyle: {
    paddingHorizontal: PADDINGS.mdPadding,
    paddingBottom: PADDINGS.mdPadding,
  },
  errorTextStyle: {
    color: '#f00',
  },
});
export default styles;
