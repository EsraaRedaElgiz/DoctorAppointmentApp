import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import GeneralPage from '../../../../src/components/GeneralPage/GeneralPage';
import ProfileImage from '../../../../src/components/ProfileImage/ProfileImage';
import UserProfileButton from '../../../../src/components/UserProfileButton/UserProfileButton';
import {DoctorProfileTabs} from '../../../../src/utils/DummyData';
import styles from './DoctorProfileTabsStyles';
import {useNavigation} from '@react-navigation/native';
function DoctorProfileTabs(props) {
  const navigation = useNavigation();
  return (
    <GeneralPage>
      <View style={styles.container}>
        <ProfileImage
          nameAfterImage={'محمد عبدالحميد'}
          imageUri={
            'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae'
          }
        />
        {DoctorProfileTabs.map((el, idx) => {
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

export default DoctorProfileTabs;
