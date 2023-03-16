import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, MARGIN, PADDINGS} from '../../constants/Constants';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonView: {
    paddingHorizontal: PADDINGS.mdPadding,
    marginBottom: MARGIN.mdMargin,
  },
});

export default styles;
