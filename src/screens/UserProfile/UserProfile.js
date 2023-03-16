import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserProfileButton from '../../components/UserProfileButton/UserProfileButton';
import {userProfileData} from '../../utils/DummyData';
import styles from './UserProfileStyle';
import {useNavigation} from '@react-navigation/native';
import Images from '../../constants/Images';
function UserProfile(props) {
  const navigation = useNavigation();
  return (
    <GeneralPage>
      <View style={styles.container}>
        <ProfileImage nameAfterImage />
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
                    ? null // will change
                    : idx == 6
                    ? navigation.navigate('LogIn')
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
