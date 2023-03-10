import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS,ICONS, MARGIN } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height, width } = Dimensions.get('window');

function ReusableArrowButton(props) {
    const { style, ...rest } = props
    return (
        <TouchableOpacity
            {...rest}
            style={[styles.buttonIconStyle, style]}>
            <AntDesign name="right" color={COLORS.darkGray} size={ICONS.smIcon} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonIconStyle: {
        width: RFValue(30),
        height: RFValue(30),
        borderRadius: RFValue(15),
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:MARGIN.mdMargin
    }
})
export default ReusableArrowButton;