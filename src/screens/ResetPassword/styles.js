import { FONTS, MARGIN, PADDINGS, COLORS, RADIUS } from '../../constants/Constants'
import { StyleSheet } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
    }, arrowButtonStyle: {
        elevation: RFValue(3)
    }, viewForScrollviewContainer: {
        paddingHorizontal: PADDINGS.mdPadding,
        flex: 1,
    }, viewForTextStyle: {
        marginBottom: '15%'
    }, textStyle: {
        color: COLORS.darkGray,
        fontSize: FONTS.h5,
        fontFamily: "Amaranth-Regular",
        alignSelf: 'flex-start'
    }, viewTextInputAndTextMargin: {
        marginBottom: '10%',
    }, scrollViewStyle: {
        backgroundColor: COLORS.white
    }, buttonContainerStyle: {
        paddingHorizontal: PADDINGS.mdPadding,
        paddingBottom: PADDINGS.mdPadding
    }, textErrorColor: {
        color: "#f00"
    }


})
export default styles;