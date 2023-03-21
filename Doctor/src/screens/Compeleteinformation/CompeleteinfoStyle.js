import { StyleSheet} from"react-native"
import {
    COLORS,
    FONTS,
    PADDINGS,
    RADIUS,
  } from '../../../../src/constants/Constants';
  import { RFValue } from 'react-native-responsive-fontsize';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.blue,
    },
    viewImageStyle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewofinformation: {
      backgroundColor: COLORS.white,
      borderTopRightRadius: RFValue(85),
      paddingHorizontal: PADDINGS.mdPadding,
      flex: 1,
      overflow: 'hidden',
      marginTop: RFValue(20),
      paddingTop: '15%',
    },
    viewofSpeclizationandExperence: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    viewofDropDown: {
      width: '47%',
      height: RFValue(70),
    },
    viewoflocationandicon: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: {
      width: RFValue(40),
      height: RFValue(40),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: RFValue(-50),
      marginTop: RFValue(5),
    },
    timeandsection: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    startandend: {
      width: '31%',
      height: RFValue(65),
      marginBottom: RFValue(8),
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
      height: 52,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    firstTextInputMargun: {
      marginBottom: '1%',
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
    dropDownMarginBottom: {
      marginTop: RFValue(6),
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
    buttonViewStyle: {
      backgroundColor: COLORS.white,
      paddingBottom: PADDINGS.mdPadding,
      paddingHorizontal: PADDINGS.mdPadding,
    },
  });
  export default styles;