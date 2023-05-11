import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  MARGIN,
  PADDINGS,
} from '../../../../src/constants/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  scrollViewContentStyle: {
    marginTop: MARGIN.mdMargin,
    paddingHorizontal: RFValue(1),
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: MARGIN.xsMargin,
    marginBottom: MARGIN.mdMargin,
    // backgroundColor:"#f00",
    paddingHorizontal: PADDINGS.xsPadding,
  },
  dateText: {
    fontSize: FONTS.h5,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  addButton: {
    fontSize: FONTS.h6,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  calenderView: {
    marginBottom: MARGIN.mdMargin,
  },
  line: {
    height: RFValue(1),
    backgroundColor: COLORS.gray,
    marginBottom: MARGIN.mdMargin,
  },
  activityIndicatorViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
