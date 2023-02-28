import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import styles from '../screens/LogIn/styles'

GoogleSignin.configure({
    webClientId: '647996429943-cs1j8dodiif2a8hdtrkm3a45ms6k2o92.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER

})
function LoginWithG() {
    const [user, setUser] = useState({})

    const signIn = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(user => userInfo)
            console.log(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("user cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("operation (e.g. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("play services not available or outdated")
            } else {
                console.log(error.message)
            }
        }
    };
    return (
        <TouchableOpacity
            style={styles.twoSquaresStyle}
            onPress={signIn}
        >
            <Image
                source={require('../assets/Images/google.png')}
                style={styles.imagestyle}
            />
        </TouchableOpacity>
    )
}
export default LoginWithG;
