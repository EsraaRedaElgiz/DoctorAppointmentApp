import { FONTS, MARGIN, PADDINGS, COLORS, RADIUS } from '../../../constants/Constants'
import { StyleSheet } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    container: {
        // flex:1,
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
        paddingHorizontal: PADDINGS.mdPadding,
        paddingTop: '5%',
        paddingBottom: '5%',

    }, viewForImageStyle: {
        marginBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }, imageStyle: {
        width: '100%',
        height: RFValue(350)
    }, viewTextStyle: {
        marginBottom: '10%'
    }, textStyle: {
        color: COLORS.blue,
        fontSize: FONTS.h4,
        fontFamily: "Amaranth-Regular",
        fontWeight:'bold'
    }, marginAfterFirstButton: {
        marginBottom: '10%',
    }, scrollViewStyle: {
        backgroundColor: COLORS.white
    }, scrollViewContentContainerStyle: {
        minHeight: '100%'
    },


})
export default styles;