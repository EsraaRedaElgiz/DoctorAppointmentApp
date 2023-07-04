import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import React from 'react';
import {PatientsData} from '../../../../src/utils';
import PersonAppointmentCard from '../../../../src/components/PersonAppointmentCard/PersonAppointmentCard';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {getAppointmentDetails} from '../../Redux/Reducers/AppointmentDetailsSlice';
import {useDispatch} from 'react-redux';

const PatientsListHome = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: RFValue(1)}}
        data={PatientsData} // data from database
        renderItem={(itemData, index) => {
          return (
            <>
              <PersonAppointmentCard
                name={data[0].patient.user_first_name.trim()}
                // name={itemData.item.name.trim()}
                time={data[0].appointment_time}
                // time={itemData.item.time}
                confirmed={data[0].appointment_status}
                // confirmed={itemData.item.confirmed}
                imageUri={data[0].patient.user_image}
                onPress={() => {
                  //
                  dispatch(getAppointmentDetails('54')) // action.payload -> slice -> getAppointmentDetails
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
                    });
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
