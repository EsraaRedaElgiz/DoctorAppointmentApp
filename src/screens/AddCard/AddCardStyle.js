import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN, PADDINGS} from '../../constants/Constants';

const styles = StyleSheet.create({
  container: {
    padding: PADDINGS.mdPadding,
    paddingVertical: PADDINGS.xlPadding,
  },
  visaTypeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFValue(1),
    marginBottom: MARGIN.xlMargin,
  },
  title: {
    fontSize: FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: MARGIN.mdMargin,
  },
  inputView: {
    marginBottom: MARGIN.xlMargin,
  },
  smallTextInput: {
    flex: 1,
  },
  button: {
    marginTop: '73%',
  },
});
export default styles;
