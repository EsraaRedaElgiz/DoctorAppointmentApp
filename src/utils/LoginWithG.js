import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../screens/LogIn/styles'

function LoginWithG() {
    //video
    const [userData, setUserData] = useState({});
    const [loggedIn, setloggedIn] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: '75137545387-5qco7pkdn4sa3b9aogu76e689rj09orn.apps.googleusercontent.com', // client ID 
        })
    }, [])
    //
    const firstLoginSucceed = (res) => {
        //nav and back here

        console.log(res.user) //المفروض الداتا دي تتبعت لللباك وتحطي هنا النفجيشن
        //alert(JSON.stringify(res.user))
        setloggedIn(true)
        setUserData(res.user)
    }


    //
    const onGoogleButtonPress = async () => {

        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices();
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        //console.log(idToken)
        return auth().signInWithCredential(googleCredential);
    }
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            console.log('Sign out Success:::');
            setloggedIn(false)
            setUserData({})
        } catch (error) {
            console.log(error);
        }
    };
    //

    return (
        <View>
            <TouchableOpacity
                style={styles.twoSquaresStyle}
                onPress={
                    () =>
                        onGoogleButtonPress().then(res => {
                            loggedIn == true ?
                                console.log("you have logged in already")
                                :
                                firstLoginSucceed(res)
                        }).catch(error => console.log(error))
                }
            >
                <Image
                    source={require('../assets/Images/google.png')}
                    style={styles.imagestyle}
                />
            </TouchableOpacity>
        </View >
    )
}
export default LoginWithG;
