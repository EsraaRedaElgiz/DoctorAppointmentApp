import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN, PADDINGS} from '../../constants/Constants';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDINGS.mdPadding,
  },
  ActivityIndicatorStyleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.h4,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  diagnosisView: {
    marginVertical: MARGIN.mdMargin,
  },
  diagnosisText: {
    fontSize: FONTS.h6,
    color: COLORS.darkGray,
    textAlign: 'justify',
  },
  head: {
    height: RFValue(40),
    backgroundColor: '#f1f8ff',
  },
  wrapper: {
    flexDirection: 'row',
  },
  tableTitle: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  row: {
    height: RFValue(28),
  },
  text: {
    textAlign: 'center',
    fontSize: FONTS.h6,
    color: COLORS.darkGray,
  },
  analysis: {
    marginTop: MARGIN.mdMargin,
  },
  openButton: {
    width: RFValue(50),
    height: RFValue(26),
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    borderRadius: RFValue(20),
  },
  openText: {
    fontSize: FONTS.h6,
    fontWeight: 'bold',
  },
  analysisText: {
    fontSize: FONTS.h6,
    fontWeight: 'bold',
    color: COLORS.darkGray2,
  },
  modal: {
    flex: 1,
    padding: PADDINGS.smPadding,
    backgroundColor: 'rgba(30,31,35 ,0.8)',
  },
  wrapperView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerView: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: RFValue(-50),
  },
  titleModal: {
    fontSize: FONTS.h3,
    color: 'white',
    fontWeight: 'bold',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    height: RFValue(250),
    width: '100%',
  },
  iconView: {
    backgroundColor: '#fff',
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: RFValue(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  rowTableStyle: {
    borderWidth: 1,
    height: height * 0.05,
    backgroundColor: COLORS.lightGray3,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDINGS.smPadding,
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
    height: RFValue(1),
    backgroundColor: COLORS.gray,
    width: '90%',
  },
});

export default styles;
