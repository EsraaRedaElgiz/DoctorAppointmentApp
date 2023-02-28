import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    StatusBar
    , ScrollView
} from 'react-native'
import styles from './styles'
import { COLORS, } from "../../../constants/Constants";
import GeneralButton from "../../../components/GeneralButton/GeneralButton";
function DoctorOrPatient() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.blue} />
                <View style={styles.viewForImageStyle}>
                    <Image source={require('../../../assets/Images/choose.png')} style={styles.imageStyle} />
                </View>
                <View style={styles.viewTextStyle}>
                    <Text style={styles.textStyle}>أنا...</Text>
                </View>
                <GeneralButton
                    title="مريض"
                    style={styles.marginAfterFirstButton}
                />
                <GeneralButton
                    title="دكتور"
                />
            </View>
        </ScrollView>
    )
}
export default DoctorOrPatient;