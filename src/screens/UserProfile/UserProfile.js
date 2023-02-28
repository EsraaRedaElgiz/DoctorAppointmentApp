import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserProfileButton from '../../components/UserProfileButton/UserProfileButton';
import {userProfileData} from '../../utils/DummyData';
import styles from './UserProfileStyle';

function UserProfile(props) {
  return (
    <GeneralPage>
      <View style={styles.container}>
        <ProfileImage nameAfterImage />
        {userProfileData.map((el, idx) => {
          return (
            <View key={idx} style={styles.userProfileButtonView}>
              <UserProfileButton title={el.title} iconName={el.icon} />
            </View>
          );
        })}
      </View>
    </GeneralPage>
  );
}

export default UserProfile;
