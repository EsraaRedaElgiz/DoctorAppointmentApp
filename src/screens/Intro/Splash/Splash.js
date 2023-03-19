import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Lottie from 'lottie-react-native';
import {COLORS, INTO_DONE} from '../../../constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorOrPatient from '../DoctorOrPatient/DoctorOrPatient';

function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem(INTO_DONE).then(res => {
        if (JSON.parse(res) === 1) {
          navigation.navigate('DoctorOrPatient');
        } else {
          navigation.navigate('intro');
        }
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <Lottie
        source={require('./intro.json')}
        autoPlay
        loop
        style={styles.lottyStyle}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.blue,
  },
  lottyStyle: {
    width: RFValue(300),
    height: RFValue(300),
  },
});
export default Splash;
