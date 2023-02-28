import React from "react";
import { TouchableOpacity, View, Text } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, ICONS, FONTS } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height, width } = Dimensions.get('window');
import ReusableArrowButton from '../../components/AppRightIcon/AppRightIcon';

function HeaderArrowAndWord(props) {
    const {style, text, textColor,textStyle, arrowButtonStyle,onPress } = props
    return (
        <View style={[styles.container,style]}>

            <ReusableArrowButton style={arrowButtonStyle} onPress={onPress} />
            <View>
                <Text style={[styles.textstyle,textStyle, { color: textColor }]}>{text}</Text>
            </View>
            <View></View>


        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }, textstyle: {
        fontSize: FONTS.h4,
        fontFamily: "Amaranth-Regular",
        fontWeight:'bold'
    }

})
export default HeaderArrowAndWord;