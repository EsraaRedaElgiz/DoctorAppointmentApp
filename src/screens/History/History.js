import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  FlatList,
  StatusBar,
  ToastAndroid,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  COLORS,
  PADDINGS,
  USER_DATA,
  USER_HISTORY_STATUS,
} from '../../constants/Constants';
import styles from './styles';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import AppointmentAndHistoryComponent from '../../components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {getHistory} from '../../Redux/Reducers/HistorySlice';
import {historyStatus} from '../../Redux/Reducers/HistoryPublicOrPrivateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
function History({navigation}) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading, history, error} = globalState.HistoryReducer;
  const {isLoad} = globalState.HistoryPublicOrPrivateReducer;
  const historyFilter=history.filter(el=>el.diagnosis)
  //console.log(history)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getHistoryStatus();
      dispatch(getHistory());
    });
    return unsubscribe;
  }, [navigation]);

  const getHistoryStatus = async () => {
    const value = await AsyncStorage.getItem(USER_HISTORY_STATUS);
    const data = JSON.parse(await AsyncStorage.getItem(USER_DATA));
    if (data.private_history == 1) {
      setVisible(visible => false);
    } else if (data.private_history == 0) {
      setVisible(visible => true);
    }
  };
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
    const {doctor, appointment_date} = item;
    return (
      <AppointmentAndHistoryComponent
        doctorName={doctor.user_first_name}
        doctorSpeciality={doctor.speciality_name}
        dateShow={true}
        day={appointment_date.substring(8, 10)}
        month={getMonthName(appointment_date.substring(5, 7)).trim()}
        year={appointment_date.substring(0, 4)}
        doctorImageUri={doctor.user_image}
        style={styles.afterEachCardMargin}
        // onPress={()=>alert(index)}
        onPress={() => {
          console.log('appointment_id -> ', item.appointment_id);
          navigation.navigate('Prescription', {
            appointment_id: item.appointment_id,
          });
        }}
      />
    );
  };
  const showToast = () => {
    ToastAndroid.show(
      visible == true
        ? 'تاريخك المرضي غير مرئي للأطباء !'
        : 'تاريخك المرضي مرئي للأطباء !',
      ToastAndroid.SHORT,
    );
  };
  const changeStatusButton = () => {
    if (visible == true) {
      dispatch(historyStatus({private: 1}))
        .unwrap()
        .then(async res => {
          if (res == true) {
            let data = JSON.parse(await AsyncStorage.getItem(USER_DATA));
            data = {...data, private_history: 1};
            AsyncStorage.setItem(USER_DATA, JSON.stringify(data));
            //console.log("val",await AsyncStorage.getItem(USER_DATA))
            setVisible(visible => {
              return !visible;
            });
            showToast();
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    } else if (visible == false) {
      dispatch(historyStatus({private: 0}))
        .unwrap()
        .then(async res => {
          if (res == true) {
            let data = JSON.parse(await AsyncStorage.getItem(USER_DATA));
            data = {...data, private_history: 0};
            AsyncStorage.setItem(USER_DATA, JSON.stringify(data));
            //console.log("val",await AsyncStorage.getItem(USER_DATA))
            setVisible(visible => {
              return !visible;
            });
            showToast();
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="التاريخ"
        icon={isLoad == true ? false : true}
        iconName={
          isLoad == false ? (visible == false ? 'lock' : 'unlock') : false
        }
        load={isLoad}
        color={COLORS.darkGray3}
        rightButtonHide
        onPressBtn={() => {
          changeStatusButton();
        }}
        padding={PADDINGS.mdPadding}
      />
      {isLoading ? (
        <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
      ) : error == null ? (
        historyFilter.length > 0 ? (
          <FlatList
            keyExtractor={keyextractor}
            data={historyFilter}
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
            <Text>لا يوجد تاريخ مرضي حتي الأن</Text>
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
export default History;
