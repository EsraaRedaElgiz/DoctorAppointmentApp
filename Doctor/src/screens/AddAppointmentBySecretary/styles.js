import { StyleSheet } from "react-native";
import { COLORS, PADDINGS, MARGIN, FONTS, RADIUS } from '../../../.././src/constants/Constants'
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
    }, viewForFirstTextStyle: {
        marginBottom: '2%'
    }, viewForScrollviewContainer: {
        paddingHorizontal: PADDINGS.mdPadding,
        flex: 1,
    }, textStyle: {
        color: COLORS.darkGray3,
        fontSize: FONTS.h5,
        fontFamily: "Amaranth-Regular",
        alignSelf: 'flex-start'
    }, eachTextInputMargin: {
        marginBottom: '1%',
    }, scrollViewStyle: {
        backgroundColor: COLORS.white,
    }, viewButtonContainerStyle: {
        paddingHorizontal: PADDINGS.mdPadding,
        paddingBottom: PADDINGS.mdPadding
    }, textErrorColor: {
        color: COLORS.red,
        fontFamily:FONTS.Amaranth
    }, viewSecondTextStyle: {
        marginBottom: '3%'
    },
})
export default styles;