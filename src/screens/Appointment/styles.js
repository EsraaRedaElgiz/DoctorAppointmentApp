import { StyleSheet } from "react-native";
import { COLORS, PADDINGS } from '../../constants/Constants'
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.white,
        //paddingHorizontal: PADDINGS.mdPadding,
        //paddingTop: '5%',
        alignItems: 'center',
        paddingBottom: PADDINGS.mdPadding,
    }, arrowButtonStyle: {
        elevation: RFValue(3)
    }, flatListStyle: {
        width: '100%',
        backgroundColor: COLORS.white
    }, headerViewStyleAndFlatListContainerStyle: {
        width: "100%",
        paddingHorizontal: PADDINGS.mdPadding,
    }, textHeaderStyle: {
        marginLeft: RFValue(-25)
    }, afterEachCardMargin: {
        marginBottom: '5%'
    }, flatListContentContainerStyle: {
        width: '100%',
        paddingHorizontal: PADDINGS.mdPadding,
        paddingTop:RFValue(2)
    }

})
export default styles;