import { StyleSheet } from "react-native";
import { COLORS, PADDINGS, MARGIN, FONTS, RADIUS } from '../../../.././src/constants/Constants'
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
        paddingBottom: PADDINGS.mdPadding,
    }, appointmentDetailsContainer: {
        marginBottom: '5%',
        flexDirection: 'row',
        paddingHorizontal: PADDINGS.mdPadding,
        width: '100%',
        height: RFValue(65),
        justifyContent: 'space-between',
        alignItems: 'center',
    }, imageAndTextViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, viewImageStyle: {
        width: RFValue(60),
        height: RFValue(60),
        borderRadius: RFValue(30),
        marginRight: MARGIN.smMargin
    }, imageStyle: {
        width: RFValue(60),
        height: RFValue(60),
        borderRadius: RFValue(30),
    }, appointmentDetailsContainerLeftViewStyle: {
       //justifyContent: 'space-evenly',
        flexDirection: 'column',
        height: '100%',
        justifyContent:'space-around'
    }, patientTextStyle: {
        fontSize: FONTS.h5,
        fontFamily: FONTS.Amaranth,
        color: COLORS.darkGray3,
        textAlign:'left'
    }, historyAndTimeTextStyle: {
        fontSize: FONTS.h6,
        color: COLORS.darkGray3,
        fontFamily: FONTS.Amaranth,
        textAlign:'left'
    }, historyTextViewStyle: {
        paddingHorizontal: PADDINGS.mdPadding
    }, flatListStyle: {
        width: '100%',
        backgroundColor: COLORS.white
    }, afterEachCardMargin: {
        marginBottom: '5%'
    }, flatListContentContainerStyle: {
        width: '100%',
        paddingHorizontal: PADDINGS.mdPadding,
        paddingTop: '5%',
    }, buttonViewContainer: {
        paddingHorizontal: PADDINGS.mdPadding
    }, viewForLockAndButtonStyle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingHorizontal: PADDINGS.mdPadding
    }, viewForLockAndTextStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%'
    }, viewForPrivateTextStyle: {
        marginTop: '2%'
    }, privateTextStyle: {
        color: COLORS.darkGray3,
        fontSize: FONTS.h5,
        fontFamily:FONTS.Amaranth
    }, dialogFootorStyle: {
        justifyContent: 'space-around'
    }, dialogContainerStyle: {
        borderRadius: RADIUS.smRadius,
        paddingVertical: 0
    }, dialogDescribtionTextStyle: {
        color: COLORS.darkGray3,
        fontFamily:FONTS.Amaranth
    }, dialogSeperationLineStyle: {
        fontSize: FONTS.h5,
        fontWeight: 'bold'
    }, buttonStyle: {
        borderColor: COLORS.blue,
        borderWidth: RFValue(1),
        borderRadius: RADIUS.mdRadius,
        width: RFValue(75),
        alignItems: 'center'

    },activityIndicatorContainerStyle:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }

})
export default styles;