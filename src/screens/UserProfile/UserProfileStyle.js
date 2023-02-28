import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN, PADDINGS} from '../../constants/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDINGS.smPadding,
    paddingVertical: PADDINGS.xlPadding,
  },
  scrollStyle: {
    flex: 1,
  },
  profileView: {
    alignItems: 'center',
  },
  imageProfileStyle: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
    marginBottom: MARGIN.smMargin,
  },
  name: {
    fontSize: FONTS.h5,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: MARGIN.xlMargin,
  },
  userProfileButtonView: {
    marginBottom: MARGIN.smMargin,
  },
});
export default styles;
