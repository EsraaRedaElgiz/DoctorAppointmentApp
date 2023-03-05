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
    }, textHeaderStyle: {
        marginLeft: RFValue(-20)
    }, viewForTextStyle: {
        marginTop: '5%',
        marginBottom: '15%'
    }, viewForScrollviewContainer: {
        paddingHorizontal: PADDINGS.mdPadding,
        paddingTop: '5%',
        paddingBottom: '5%',
        //backgroundColor: "#ff0",
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    }, scrollViewContentContainerStyle: {
        minHeight: '100%'
    }, textStyle: {
        color: COLORS.darkGray,
        fontSize: FONTS.h5,
        fontFamily: "Amaranth-Regular",
        alignSelf: 'flex-start'
    }, eachTextInputMargin: {
        marginBottom: '10%',
    }, scrollViewStyle: {
        backgroundColor: COLORS.white,
    }, viewButtonContainerStyle: {
        //paddingHorizontal: PADDINGS.mdPadding
    }, textErrorColor: {
        color: "#f00"
    }


})
export default styles;