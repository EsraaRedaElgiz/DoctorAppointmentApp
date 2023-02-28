import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native'
import Lottie from 'lottie-react-native';
import { COLORS } from '../../../constants/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

function Splash() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.blue} />
            <Lottie source={require('./intro.json')} autoPlay loop style={styles.lottyStyle} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.blue
    }, lottyStyle: {
        width: RFValue(300),
        height: RFValue(300)
    }
})
export default Splash;