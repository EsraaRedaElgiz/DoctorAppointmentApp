import React from 'react';
import { View, Text, Button } from 'react-native';
import GeneralPage from '../../../../src/components/GeneralPage/GeneralPage';
import ProfileImage from '../../../../src/components/ProfileImage/ProfileImage';
import UserData from '../../../../src/components/UserData/UserData';
import styles from './UserDetailsStyles';
import { useNavigation } from '@react-navigation/native';
import { HeaderNavigation } from '../../../../src/components/headerNavigation/HeaderNavigation';
import { PADDINGS, COLORS } from '../../../../src/constants/Constants';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
function UserDetails(props) {
  const navigation = useNavigation();
  const route = useRoute();
  //const imageUri = route.params.photo
  //const name=route.params.name
  const globalState = useSelector(state => state);
  const { appointmentDetails } = globalState.AppointmentDetailsReducer

  return (
    <GeneralPage>
      <HeaderNavigation
        title="المعلومات الشخصية"
        text
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          navigation.goBack();
        }}
        onPressBtn={() => {
          navigation.navigate('EditPersonDetails');
        }}
      />
      <View style={styles.container}>
        <ProfileImage
          nameAfterImage={appointmentDetails.patient.user_first_name}
          imageUri={appointmentDetails.patient.user_image}
        />

        <UserData data={appointmentDetails.patient.patient_blood_type} label="نوع الدم" />
        <UserData data={appointmentDetails.patient.patient_weight} label="الوزن" />
        <UserData data={appointmentDetails.patient.patient_height} label="الطول" />
        <UserData data={appointmentDetails.patient.user_age} label="العمر" />
        <UserData data={appointmentDetails.patient.user_gender==="Male"?"ذكر":"انثي"} label="النوع" />
        <UserData data={appointmentDetails.patient.user_phone} label="رقم الهاتف" />
      </View>
    </GeneralPage>
  );
}

export default UserDetails;
