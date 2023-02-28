import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { RADIUS, FONTS, COLORS, PADDINGS, ICONS } from '../../constants/Constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
function AppointmentAndHistoryComponent(props) {
    const { style, doctorName, doctorSpeciality, dateShow, day, month, year, timeShow, time, status,onPress } = props

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/Images/download.png')} style={styles.imageStyle} />
                </View>
                <View style={styles.viewTextStyle}>
                    <View style={styles.eachLineMargin}>
                        <Text style={styles.doctorNameStyle}>د.{doctorName}</Text>
                    </View>
                    <View style={styles.eachLineMargin}>
                        <Text style={styles.specialityTextStyle}>{doctorSpeciality}</Text>
                    </View>
                    <View style={styles.timaAndDateContainer}>
                        {dateShow ? (
                            <View style={styles.viewDateStyle}>
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <FontAwesome5 name='calendar-alt' size={ICONS.smIcon} color={COLORS.black} />
                                </View>
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <Text style={styles.eachTextStyleInDateAndTimeContainers}>{day}</Text>
                                </View>
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <Text style={styles.eachTextStyleInDateAndTimeContainers}>{month}</Text>
                                </View >
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <Text style={styles.eachTextStyleInDateAndTimeContainers}>{year}</Text>
                                </View>
                            </View>) : null}
                        {timeShow ? (
                            <View style={styles.viewTimeStyle}>
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <Feather name='clock' size={ICONS.smIcon} color={COLORS.black} />
                                </View>
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <Text style={styles.eachTextStyleInDateAndTimeContainers}>{time}</Text>
                                </View>
                                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                                    <Text style={styles.eachTextStyleInDateAndTimeContainers}>{status}</Text>
                                </View>
                            </View>
                        ) : null}

                    </View>

                </View>


            </View>
        </TouchableOpacity>


    )

}
const styles = StyleSheet.create({
    container: {
        elevation: RFValue(3),
        backgroundColor: '#fff',
        borderRadius: RADIUS.smRadius,
        paddingHorizontal: PADDINGS.mdPadding,
        paddingVertical: PADDINGS.lgPadding,
        width: '100%',
        height:RFValue(115)

    }, innerContainer: {
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:"#f00"

    }, imageContainer: {
        width: '25%',
        borderRadius: RADIUS.smRadius,
        height:'100%'
    }, imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: RADIUS.smRadius
    }, viewTextStyle: {
        width: '70%'
    }, eachLineMargin: {
        marginBottom: '2%'
    }, doctorNameStyle: {
        fontSize: FONTS.h5,
        color: COLORS.black
    }, specialityTextStyle: {
        fontSize: FONTS.h6,
        color: COLORS.gray
    }, timaAndDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, viewDateStyle: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        borderRadius: RADIUS.xsRadius,
        alignItems: 'center'
    }, eachItemMarginInDateAndTimeContainers: {
        marginHorizontal: RFValue(3)
    }, eachTextStyleInDateAndTimeContainers: {
        fontSize: FONTS.h5,
        color: COLORS.black
    }, viewTimeStyle: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        borderRadius: RADIUS.xsRadius,
        alignItems: 'center'
    }

})
export default AppointmentAndHistoryComponent;