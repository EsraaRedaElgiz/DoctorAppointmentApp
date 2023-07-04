import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import UserProfileButton from '../../components/UserProfileButton/UserProfileButton';
import {userProfileData} from '../../utils/DummyData';
import styles from './UserProfileStyle';
import {useNavigation} from '@react-navigation/native';
import Images from '../../constants/Images';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedOut} from '../../Redux/Reducers/AuthSlice';
import {getPersonalDetails} from '../../Redux/Reducers/PersonalDetailsSlice';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../constants/Constants';
function UserProfile(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading, name, image} = globalState.PersonalDetailsReducer;
  useEffect(() => {
    dispatch(getPersonalDetails());
  }, []);
  return globalState.PersonalDetailsReducer.isLoading ? (
    <View style={styles.isLoadingViewStyle}>
      <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
    </View>
  ) : (
    <GeneralPage>
      <View style={styles.container}>
        <ProfileImage nameAfterImage={name} imageUri={image} />
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
                    ? navigation.navigate('PrivacyPolicy')
                    : idx == 6
                    ? navigation.navigate('ConditionsAndTerms')
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
