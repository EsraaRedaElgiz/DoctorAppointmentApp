import React from 'react';
import {View, Text, Button} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserData from '../../components/UserData/UserData';
import styles from './MedicalID1Style';
import {useNavigation} from '@react-navigation/native';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {PADDINGS,COLORS} from '../../constants/Constants';
function MedicalID1(props) {
  const navigation = useNavigation();
  return (
    <GeneralPage>
      <HeaderNavigation
        title="المعلومات الشخصية"
        btn="تعديل"
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
        <ProfileImage />
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
