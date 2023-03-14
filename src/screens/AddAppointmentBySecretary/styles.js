import { StyleSheet } from "react-native";
import { COLORS, PADDINGS, MARGIN, FONTS, RADIUS } from '../../constants/Constants'
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
        paddingHorizontal: PADDINGS.mdPadding,
        //paddingTop: '5%',
        paddingBottom: '5%',
        justifyContent: 'space-between',
        flexDirection: 'column'
    }, scrollViewStyle: {
        backgroundColor: COLORS.white,
    }, scrollViewContentContainerStyle: {
        minHeight: '100%'
    }, eachTextInputMargin: {
        marginBottom: '1%',
    }, errorTextColor: {
        color: COLORS.red
    }, viewForTextInputsAndTextStyle: {
        marginTop: '5%'
    }, viewFirstTextStyle: {
        marginBottom: '2%'
    }, eachTextHeaderStyle: {
        fontSize: FONTS.h5,
        color: COLORS.darkGray3
    }, viewSecondTextStyle: {
        marginBottom: '3%'
    }

})
export default styles;