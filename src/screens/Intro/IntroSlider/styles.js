import { StyleSheet } from 'react-native'
import { MARGIN, COLORS, PADDINGS, FONTS, RADIUS } from '../../../constants/Constants'
import { RFValue } from 'react-native-responsive-fontsize';
const styles = StyleSheet.create({
    slide: {
        height: '100%',
        width: '100%',
        color: COLORS.white,
        paddingHorizontal: PADDINGS.mdPadding,
        backgroundColor: "#fff",
        alignItems: 'center'
    }, text: {
        color: COLORS.blue,
        fontSize: FONTS.h4,
        fontFamily: "Amaranth-Regular",
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    }, activeDotStyle: {
        backgroundColor: COLORS.blue,
        width: RFValue(30),
        marginTop: RFValue(-60)
    }, dotStyle: {
        marginTop: RFValue(-60),
        backgroundColor: COLORS.gray
    },
    nextButtonStyle: {
        padding: PADDINGS.smPadding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS.xsRadius,
        backgroundColor: COLORS.blue,
        width: '100%',
    }, doneButtonStyle: {
        padding: PADDINGS.smPadding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS.xsRadius,
        backgroundColor: COLORS.blue,
        width: '100%',
    }, textNextAndDoneStyle: {
        fontSize: FONTS.h4,
        fontFamily: 'Amaranth',
        color: COLORS.white,
        fontWeight:"bold"
    }, imageStyle: {
        width: '100%',
        height: '60%',
        resizeMode: 'contain'
    }

})
export default styles;