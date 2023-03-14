import { StyleSheet } from "react-native";
import { COLORS, PADDINGS, MARGIN, FONTS,RADIUS } from '../../constants/Constants'
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
        //paddingHorizontal: PADDINGS.mdPadding,
        //paddingTop: '5%',
        paddingBottom: '5%',
    }, appointmentDetailsContainer: {
        marginVertical: '5%',
        flexDirection: 'row',
        //backgroundColor: '#ff0',
        paddingHorizontal: PADDINGS.mdPadding,
        width: '100%',
        //height: RFValue(90),
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
    }, appointmentDetailsContainerLeftViewTextStyle: {
        alignItems: 'center'
    }, appointmentDetailsContainerTextStyle: {
        fontSize: FONTS.h5,
        color: COLORS.darkGray3
    }, historyTextViewStyle: {
        paddingHorizontal: PADDINGS.mdPadding
    },
    historyTextStyle: {
        fontSize: FONTS.h5,
        fontWeight: 'bold',
        color: COLORS.darkGray3
    }, flatListStyle: {
        width: '100%',
        backgroundColor: COLORS.white
    }, textHeaderStyle: {
        marginLeft: RFValue(-25)
    }, afterEachCardMargin: {
        marginBottom: '5%'
    }, flatListContentContainerStyle: {
        width: '100%',
        paddingHorizontal: PADDINGS.mdPadding,
        paddingTop: '5%',
        //backgroundColor:"#f00"
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
        fontSize: FONTS.h5
    }, dialogFootorStyle: {
        justifyContent: 'space-around'
    }, dialogContainerStyle: {
        borderRadius: RADIUS.smRadius,
        paddingVertical: 0
    }, dialogDescribtionTextStyle: {
        color: COLORS.darkGray3
    }, dialogSeperationLineStyle: {
        fontSize:FONTS.h3,
        fontWeight: 'bold'
    }

})
export default styles;