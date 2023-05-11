import React, {useEffect} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserData from '../../components/UserData/UserData';
import styles from './MedicalID1Style';
import {useNavigation} from '@react-navigation/native';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {PADDINGS, COLORS} from '../../constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {getPersonalDetails} from '../../Redux/Reducers/PersonalDetailsSlice';
function MedicalID1(props) {
  const globalState = useSelector(state => state);
  const {
    name,
    bloodType,
    gender,
    age,
    height,
    weight,
    isLoading,
    phone,
    image,
  } = globalState.PersonalDetailsReducer;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getPersonalDetails());
  }, []);
  return (
    <GeneralPage>
      <HeaderNavigation
        title="المعلومات الشخصية"
        btn="تعديل"
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
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={40} color={COLORS.blue} />
        </View>
      ) : (
        <View style={styles.container}>
          <ProfileImage
            nameAfterImage={name}
            imageUri={
              image
              //'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae'
            }
          />
          <UserData data={bloodType} label="نوع الدم" />
          <UserData data={weight} label="الوزن" />
          <UserData data={height} label="الطول" />
          <UserData data={age} label="العمر" />
          <UserData data={gender} label="النوع" />
          <UserData data={phone} label="رقم الهاتف" />
        </View>
      )}
    </GeneralPage>
  );
}

export default MedicalID1;
