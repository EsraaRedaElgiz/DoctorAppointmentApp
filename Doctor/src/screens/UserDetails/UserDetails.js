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
function UserDetails(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const imageUri = route.params.photo
  const name=route.params.name
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
          nameAfterImage={name}
          imageUri={
            imageUri
          }
        />

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

export default UserDetails;
