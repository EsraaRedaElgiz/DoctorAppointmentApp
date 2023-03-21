import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../constants/Constants';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  ScrollViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  content: {
    justifyContent: 'space-around',
  },
  textInputStyle: {
    paddingHorizontal: PADDINGS.smPadding,
    paddingBottom: RFValue(150),
    borderRadius: RADIUS.smRadius,
    borderWidth: RFValue(1),
    borderColor: COLORS.gray,
    fontSize: FONTS.h5,
    color: COLORS.darkGray,
  },
  linesView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MARGIN.xlMargin,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  callText: {
    fontSize: FONTS.h5,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginHorizontal: RFValue(5),
  },
  callView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(5),
    backgroundColor: COLORS.lightGray2,
    elevation: RFValue(5),
    marginBottom: RFValue(10),
    marginBottom: height * 0.255,
  },
  imageIcon: {
    width: RFValue(60),
    height: RFValue(60),
  },
  errorTextStyle: {
    marginBottom: height * 0.14,
    color: COLORS.red,
  },viewButtonStyle: {
    paddingBottom:PADDINGS.mdPadding,
    backgroundColor:COLORS.white
  }
});

export default styles;
