import React from 'react';
import {View, Text} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import GeneralTextInput from '../../components/GeneralTextInput/GeneralTextInput';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserData from '../../components/UserData/UserData';
import styles from './MedicalID1Style';

function MedicalID1(props) {
  return (
    <GeneralPage>
      <View style={styles.container}>
        <ProfileImage nameAfterImage />
        <UserData data="A+" label="نوع الدم" />
        <UserData data="70" label="الوزن" />
        <UserData data="189" label="الطول" />
        <UserData data="25" label="العمر" />
        <UserData data="ذكر" label="النوع" />
        <UserData data="01020304060" label="رقم الهاتف" />
      </View>
    </GeneralPage>
  );
}

export default MedicalID1;
