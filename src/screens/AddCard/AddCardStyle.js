import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN, PADDINGS} from '../../constants/Constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDINGS.mdPadding,
  },
  visaTypeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFValue(1),
    marginBottom: MARGIN.xlMargin,
  },
  title: {
    marginBottom: MARGIN.mdMargin,
  },
  errorTextStyle: {
    marginBottom: MARGIN.xlMargin,
    color: COLORS.red,
  },
  smallTextInput: {
    flex: 1,
  },
  button: {
    padding: PADDINGS.mdPadding,
    backgroundColor: COLORS.white,
  },
});
export default styles;
