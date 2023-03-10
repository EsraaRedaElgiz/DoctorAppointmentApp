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
  inputView: {
    marginBottom: MARGIN.xlMargin,
  },
  smallTextInput: {
    flex: 1,
  },
  button: {
    marginTop: '48%',
  },
});
export default styles;
