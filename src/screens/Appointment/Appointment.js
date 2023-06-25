import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StatusBar, FlatList, ActivityIndicator, Text} from 'react-native';
import {COLORS, PADDINGS} from '../../constants/Constants';
import styles from './styles';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import AppointmentAndHistoryComponent from '../../components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent';
//for backend
import {getAppointments} from '../../Redux/Reducers/AppointmentSlice';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
function Appointment({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading, appointments, error} = globalState.AppointmentReducer;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAppointments());
    });
    return unsubscribe;
  }, [navigation]);

  const getMonthName = monthnum => {
    if (monthnum == '01') {
      return 'يناير';
    } else if (monthnum == '02') {
      return 'فبراير';
    } else if (monthnum == '03') {
      return 'مارس';
    } else if (monthnum == '04') {
      return 'ابريل';
    } else if (monthnum == '05') {
      return 'مايو';
    } else if (monthnum == '06') {
      return 'يونيو';
    } else if (monthnum == '07') {
      return 'يوليو';
    } else if (monthnum == '08') {
      return 'اغسطس';
    } else if (monthnum == '09') {
      return 'سبتمبر';
    } else if (monthnum == '10') {
      return 'اكتوبر';
    } else if (monthnum == '11') {
      return 'نوفمبر';
    } else if (monthnum == '12') {
      return 'ديسمبر';
    }
  };
  keyextractor = (item, index) => index.toString();
  const renderitems = ({item, index}) => {
    const {appointment_time, appointment_date, doctor} = item;
    return (
      <AppointmentAndHistoryComponent
        doctorName={doctor.user_first_name}
        doctorSpeciality={doctor.speciality_name}
        dateShow={true}
        day={appointment_date.substring(8, 10)}
        month={getMonthName(appointment_date.substring(5, 7)).trim()} //هنباصي القيسمه دي في فانكشن بتحول الشهر لاسماء
        year={appointment_date.substring(0, 4)}
        timeShow={true}
        time={appointment_time.substring(0, 5)}
        style={styles.afterEachCardMargin}
        disabled={true}
        doctorImageUri={doctor.user_image}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="المواعيد"
        color={COLORS.darkGray3}
        rightButtonHide
        padding={PADDINGS.mdPadding}
      />
      {isLoading ? (
        <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
      ) : error == null ? (
        appointments.length > 0 ? (
          <FlatList
            keyExtractor={keyextractor}
            data={appointments}
            renderItem={renderitems}
            style={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainerStyle}
          />
        ) : (
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>لا يوجد مواعيد حتي الأن</Text>
          </View>
        )
      ) : (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>حدث خطأ اثناء الاتصال بالانترنت</Text>
        </View>
      )}
    </View>
  );
}
export default Appointment;
