import React, {useEffect, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {HeaderHomeDoctor, Statistics} from '../../Components';
import {style} from '../../../../src/styles/Style';
import {ListTiltle} from '../../../../src/components/Home';
import PatientsListHome from '../../Components/PatientsListHome/PatientsListHome';
import {
  PADDINGS,
  COLORS,
  USER_TOKEN,
  USER_DATA,
} from '../../../../src/constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getDoctorDetails} from '../../Redux/Reducers/DoctorDetailsSlice';
import {getDoctorAppointmentToday} from '../../Redux/Reducers/DoctorHomeSlice';

const HomeDoctor = ({navigation}) => {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading, appointmentForToday} = globalState.DoctorHomeReducer;
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString('default', {month: 'long'});
  let year = date.getFullYear();

  const getMonthName = month => {
    if (month == 'January') {
      return '01';
    } else if (month == 'February') {
      return '02';
    } else if (month == 'March') {
      return '03';
    } else if (month == 'April') {
      return '04';
    } else if (month == 'May') {
      return '05';
    } else if (month == 'June') {
      return '06';
    } else if (month == 'July') {
      return '07';
    } else if (month == 'August') {
      return '08';
    } else if (month == 'September') {
      return '09';
    } else if (month == 'October') {
      return '10';
    } else if (month == 'November') {
      return '11';
    } else if (month == 'December') {
      return '12';
    }
  };

  useEffect(() => {
    //getToken();
    let formMonth = getMonthName(month);
    let formDay = day < 9 ? '0' + day : day;
    let sendData = '' + year + '-' + formMonth + '-' + formDay;
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getDoctorDetails())
        .unwrap()
        .then(res => {
          dispatch(getDoctorAppointmentToday({date: '2023-03-18', status: 1}));
        })
        .catch(err => {});
    });
    return unsubscribe;
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    const data = await AsyncStorage.getItem(USER_DATA);
    console.log('token => ', token);
    console.log('data => ', data);
  };
  return (
    <Fragment>
      <HeaderHomeDoctor />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Statistics />
          <ListTiltle
            Title="مواعيد اليوم"
            seeAll="اضافة"
            onPress={() => {
              navigation.navigate('AddAppointmentBySecretary');
            }}
          />
          {isLoading ? (
            <View style={styles.activityIndicatorView}>
              <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
            </View>
          ) : appointmentForToday.length == 0 ? (
            <View style={styles.activityIndicatorView}>
              <Text style={style.textSmallContentBold}>
                لا توجد حجوزات اليوم !
              </Text>
            </View>
          ) : (
            <PatientsListHome data={appointmentForToday} />
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default HomeDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.mdPadding,
  },
  activityIndicatorView: {
    flex: 1,
    paddingTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
