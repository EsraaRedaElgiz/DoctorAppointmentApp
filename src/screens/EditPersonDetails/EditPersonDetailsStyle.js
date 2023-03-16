import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, MARGIN, PADDINGS, FONTS} from '../../constants/Constants';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  inputView: {
    // marginBottom: MARGIN.mdMargin,
  },
  modalContainer: {
    width: width * 0.8,
    height: height * 0.21,
    marginTop: height * 0.35,
    borderRadius: RFValue(5),
    elevation: 1,
    alignSelf: 'center',
    padding: PADDINGS.xsPadding,
    backgroundColor: COLORS.lightGray,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: RFValue(5),
    height: RFValue(30),
    backgroundColor: COLORS.white,
  },
  bloodType: {
    fontSize: 20,
    color: COLORS.black,
  },
  dropDownView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginBottom: MARGIN.mdMargin,
  },
  buttonStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: RFValue(5),
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    height: RFValue(46),
  },
  eachOptionInBottonTab: {
    width: '100%',
    borderColor: COLORS.gray,
    height: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextStyle: {
    fontSize: FONTS.h5,
    color: COLORS.blue,
    fontWeight: '600',
  },
  line: {
    height: 1,
    backgroundColor: '#bbb',
    width: '90%',
  },
  errorTextStyle: {
    color: '#f00',
    marginBottom: RFValue(1),
  },
});

export default styles;
