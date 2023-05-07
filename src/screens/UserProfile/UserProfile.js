import React from 'react';
import {View, Text, ScrollView, Image, Linking} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserProfileButton from '../../components/UserProfileButton/UserProfileButton';
import {userProfileData} from '../../utils/DummyData';
import styles from './UserProfileStyle';
import {useNavigation} from '@react-navigation/native';
import Images from '../../constants/Images';
import {useDispatch} from 'react-redux';
import {setLoggedOut} from '../../Redux/Reducers/AuthSlice';
function UserProfile(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <GeneralPage>
      <View style={styles.container}>
        <ProfileImage
          nameAfterImage={'محمد عبدالحميد'}
          imageUri={
            'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae'
          }
        />
        {userProfileData.map((el, idx) => {
          return (
            <View key={idx} style={styles.userProfileButtonView}>
              <UserProfileButton
                title={el.title}
                iconName={el.icon}
                onPress={() => {
                  idx == 0
                    ? navigation.navigate('MedicalID1')
                    : idx == 1
                    ? navigation.navigate('History')
                    : idx == 2
                    ? navigation.navigate('Payment')
                    : idx == 3
                    ? navigation.navigate('NewPassword')
                    : idx == 4
                    ? navigation.navigate('SupportTeam')
                    : idx == 5
                    ? Linking.openURL(
                        'https://sites.google.com/view/doclinicapp/',
                      )
                    : idx == 6
                    ? Linking.openURL(
                        'https://sites.google.com/view/doclinicterms/',
                      )
                    : idx == 7
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

export default UserProfile;
