import React, {useEffect} from 'react';
import {View, Text, ScrollView, Image, Linking} from 'react-native';
import GeneralPage from '../../../../src/components/GeneralPage/GeneralPage';
import ProfileImage from '../../../../src/components/ProfileImage/ProfileImage';
import UserProfileButton from '../../../../src/components/UserProfileButton/UserProfileButton';
import {DoctorProfileData} from '../../../../src/utils/DummyData';
import styles from './DoctorProfileTabsStyles';
import {useNavigation} from '@react-navigation/native';
import {setLoggedOut} from '../../../../src/Redux/Reducers/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';
import {getDoctorDetails} from '../../Redux/Reducers/DoctorDetailsSlice';
import {ActivityIndicator} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../../src/constants/Constants';
function DoctorProfileTabs({navigation}) {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {name, image, isLoading} = globalState.DoctorDetailsReducer;
  useEffect(() => {
    dispatch(getDoctorDetails());
  }, []);
  return (
    <GeneralPage>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        ) : (
          <ProfileImage
            nameAfterImage={name}
            imageUri={
              image
              //'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae'
            }
          />
        )}
        {DoctorProfileData.map((el, idx) => {
          return (
            <View key={idx} style={styles.userProfileButtonView}>
              <UserProfileButton
                title={el.title}
                iconName={el.icon}
                onPress={() => {
                  idx == 0
                    ? navigation.navigate('DoctorViewProfile')
                    : idx == 1
                    ? navigation.navigate('EditDoctorDetails')
                    : idx == 2
                    ? navigation.navigate('DoctorNewPassword')
                    : idx == 3
                    ? navigation.navigate('DoctorSupportTeam')
                    : idx == 4
                    ? Linking.openURL(
                        'https://sites.google.com/view/doclinicapp/',
                      )
                    : idx == 5
                    ? Linking.openURL(
                        'https://sites.google.com/view/doclinicterms/',
                      )
                    : idx == 6
                    ? dispatch(setLoggedOut())
                    : null;
                }}
              />
            </View>
          );
        })}
      </View>
    </GeneralPage>
  );
}

export default DoctorProfileTabs;
