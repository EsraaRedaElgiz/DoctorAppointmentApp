import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Lottie from 'lottie-react-native';
import {COLORS, INTO_DONE, USER_TOKEN} from '../../../constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorOrPatient from '../DoctorOrPatient/DoctorOrPatient';
import {setLoggedIn} from '../../.././Redux/Reducers/AuthSlice';
import {useDispatch} from 'react-redux';

function Splash({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem(INTO_DONE).then(res => {
        AsyncStorage.getItem(USER_TOKEN).then(token_response => {
          if (JSON.parse(res) === 1 && token_response === null) {
            navigation.navigate('DoctorOrPatient');
          } else if (JSON.parse(res) === 1 && token_response !== null) {
            dispatch(setLoggedIn());
          } else {
            navigation.navigate('intro');
          }
        });
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
