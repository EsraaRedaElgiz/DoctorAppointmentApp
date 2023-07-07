import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import React from 'react';
import {PatientsData} from '../../../../src/utils';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {getAppointmentDetails} from '../../Redux/Reducers/AppointmentDetailsSlice';
import {useDispatch, useSelector} from 'react-redux';
import { getPatientHistory } from '../../Redux/Reducers/PatientHistorySlice';

const PatientsListHome = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const globalState=useSelector(state=>state);
  const { appointmentForToday} = globalState.DoctorHomeReducer;
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: RFValue(1)}}
        data={appointmentForToday} 
        renderItem={(itemData, index) => {
          return (
          
            <>
              <PersonAppointmentCard
                name={itemData.item.patient.user_first_name.trim()}
                time={itemData.item.appointment_time.slice(0,5)}
                confirmed={itemData.item.appointment_status}
                imageUri={itemData.item.patient.user_image}
                onPress={() => {
                  //
                  dispatch(
                    getPatientHistory(JSON.parse(itemData.item.patient.patient_id)),
                  ).unwrap().then(()=>{}).catch((err)=>{});
                  dispatch(getAppointmentDetails(itemData.item.appointment_id)) // action.payload -> slice -> getAppointmentDetails
                    .unwrap()
                    .then(res => {
                      //instead of 54 i will pass appointment_id
                      if (res.appointment_id) {
                        navigation.navigate('AppointmentDetails', {
                          PatientsArray: itemData.item,
                          appointmentStatus: itemData.item.confirmed
                            ? 'تم التأكيد'
                            : 'معلق',
                        });
                      } else {
                        Alert.alert(
                          'حدث خطأ اثناء الاتصال بالخادم لعرض تفاصيل الموعد من فضلك حاول مجددا ',
                        );
                      }
                    }).catch(()=>{});
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default PatientsListHome;

const styles = StyleSheet.create({});
