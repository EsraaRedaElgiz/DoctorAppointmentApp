import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../screens/DoctorLogin/DoctorLoginStyles';
import {useNavigation} from '@react-navigation/native';
import Images from '../../../src/constants/Images';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../../src/Redux/Reducers/AuthSlice';
function LoginWithG() {
  const dispatch=useDispatch()
  //video
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '75137545387-5qco7pkdn4sa3b9aogu76e689rj09orn.apps.googleusercontent.com', // client ID
    });
  }, []);
  //
  const firstLoginSucceed = res => {
    //nav and back here

    console.log(res.user); //المفروض الداتا دي تتبعت لللباك وتحطي هنا النفجيشن
    //alert(JSON.stringify(res.user))
    setUserData(res.user);
    // navigation.navigate('CompleteInformation');
    dispatch(setLoggedIn())
  };

  //
  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices();
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    //console.log(idToken)
    return auth().signInWithCredential(googleCredential);
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log('Sign out Success:::');
      setLoggedIn(false);
      setUserData({});
    } catch (error) {
      console.log(error);
    }
  };
  //

  return (
    <View>
      <TouchableOpacity
        style={styles.twoSquaresStyle}
        onPress={() =>
          onGoogleButtonPress()
            .then(res => {
              firstLoginSucceed(res);
            })
            .catch(error => console.log(error))
        }>
        <Image source={Images.googleImage} style={styles.imagestyle} />
      </TouchableOpacity>
    </View>
  );
}
export default LoginWithG;
