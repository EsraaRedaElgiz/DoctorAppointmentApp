import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../../../src/constants/Constants';
const styles = StyleSheet.create({
  Continer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  imageProfileView: {
    marginBottom: MARGIN.mdMargin,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Specalizationandexperience: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginTop: RFValue(10)
  },
  viewofDropDown: {
    width: '47%',
    height: RFValue(70),
  },
  bottominputview: {
    marginBottom: RFValue(0),
  },
  timeandsection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  dropDownMarginBottom: {
    marginTop: RFValue(6),
  },
  startandend: {
    width: '31%',
    height: 65,
    marginBottom: RFValue(10),
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
  },
  line: {
    height: RFValue(1),
    backgroundColor: COLORS.gray,
    width: '90%',
  },
  buttonViewStyle: {
    backgroundColor: COLORS.white,
    paddingBottom: PADDINGS.mdPadding,
  },
  modelofcheckbox: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0005',
  },
  viewofcheckbox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  viewImageStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
