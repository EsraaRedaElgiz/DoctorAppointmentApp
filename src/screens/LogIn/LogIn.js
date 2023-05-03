import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import { COLORS, ICONS, PADDINGS, USER_DATA, USER_TOKEN } from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import { TextInput } from 'react-native-paper';
import ReusableArrowButton from '../../components/AppRightIcon/AppRightIcon';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import LoginWithG from '../../utils/LoginWithG';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
//import { setLoggedIn } from "../../Redux/Reducers/AuthSlice"
import { RFValue } from 'react-native-responsive-fontsize';
import { loginUser } from '../../Redux/Reducers/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogIn({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);



  /* 
  كنت بشوف لما عمل لوج اوت كل حاجه بتتمسح ولا لا فعملتها هنا
    const {  success } = globalState.SignUpReducer
 
  useEffect(() => {
     getToken()
   }, [])
 
   const getToken = async ()=> {
     const token = await AsyncStorage.getItem(USER_TOKEN);
     const data = await AsyncStorage.getItem(USER_DATA);
     console.log('token => ', token);
     console.log('data => ', data);
     console.log("success in medicalsheet",success)
     console.log("userinfo in login",userInfo)
 
   }*/


  const { isLoading, userInfo } = globalState.LoginReducer
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [secured_pass, set_secured_pass] = useState(true);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = data => {
    //console.log(JSON.stringify(data) + "before" + toggleCheckBox);
    const sendData = {
      email: data.email,
      password: data.password,
      //rememberMe: toggleCheckbox
      type: 2
    }
    dispatch(loginUser(sendData)).unwrap().then(() => {
      if (userInfo !== null) {
        reset()
        setToggleCheckBox(toggleCheckBox => { return false })

      }
    }).catch((err) => {console.log(err.message) });
   

  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <StatusBar backgroundColor={COLORS.blue} />
        <HeaderNavigation
          backgroundColor={COLORS.blue}
          padding={PADDINGS.mdPadding}
          onPress={() => {
            reset()
            setToggleCheckBox(toggleCheckBox => { return false })
            navigation.navigate("SignUp");
          }}
        />
        <View style={styles.container}>
          <View style={styles.topViewStyle}>
            <View style={styles.viewHeaderStyle}>
              <View style={styles.viewforheaderstyle}>
                <Text style={styles.firstTextHeaderStyle}>اهلا بعودتك !</Text>
              </View>
              <View>
                <Text style={styles.secondTextHeaderStyle}>
                  تسجيل الدخول لحسابك
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewAfterHeaderStyle}>
            <View>
              <View style={styles.eachTextinputAndErrorTextContainer}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="عنوان البريد الالكتروني"
                      keyboardType="email-address"
                      bordercolor={errors.email ? COLORS.red : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="email"
                />
                <Text style={styles.textErrorColor}>
                  {errors.email?.type === 'required'
                    ? 'يجب ادخال عنوان البريد الالكتروني'
                    : errors.email?.type === 'pattern'
                      ? 'يجب ادخال عنوان بريد الكتروني صحيح'
                      : ''}
                </Text>
              </View>
              <View style={styles.eachTextinputAndErrorTextContainer}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                    maxLength: 20,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="كلمه المرور"
                      bordercolor={errors.password ? COLORS.red : COLORS.gray}
                      right={
                        <TextInput.Icon
                          icon={secured_pass ? 'eye-off' : 'eye'}
                          style={styles.iconStyle}
                          iconColor={COLORS.darkGray}
                          onPress={() => set_secured_pass(secured_pass => { return !secured_pass })}
                        />
                      }
                      secureTextEntry={secured_pass}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}

                    />
                  )}
                  name="password"
                />
                <Text style={styles.textErrorColor}>
                  {errors.password?.type === 'required'
                    ? 'يجب ادخال كلمة المرور'
                    : errors.password?.type === 'pattern'
                      ? 'كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه'
                      : errors.password?.type === 'maxLength'
                        ? 'كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم'
                        : ''}
                </Text>
              </View>
              <View style={styles.viewForfirstTextAfterTextinputs}>
                <View style={styles.viewforcheckboxandwordstyle}>
                  <View>
                    <CheckBox
                      onPress={() =>
                        setToggleCheckBox(toggleCheckBox => { return !toggleCheckBox })

                      }
                      checked={toggleCheckBox}
                      checkedColor={COLORS.blue}
                      uncheckedColor={COLORS.gray}
                      containerStyle={{ marginLeft: RFValue(-10) }}
                    />
                  </View>
                  <View>
                    <Text style={[styles.textAfterTextinputsStyle, { marginLeft: RFValue(-10) }]}>تذكرني</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    reset()
                    setToggleCheckBox(toggleCheckBox => { return false })
                    navigation.navigate('ForgetPassword');
                  }}>
                  <Text style={styles.bluetextstyle}>نسيت كلمه المرور؟</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewfortwolinesandwordstyle}>
                <View style={styles.lineviewstyle}></View>
                <View>
                  <Text style={styles.orWordStyle}>OR</Text>
                </View>
                <View style={styles.lineviewstyle}></View>
              </View>
              <View style={styles.viewfortwoboxesstyle}>
                <LoginWithG />
              </View>
            </View>
            <View>
              <GeneralButton
                title="متابعة"
                // onPress={()=>alert(toggleCheckBox)}
                onPress={handleSubmit(onSubmit)}
                style={styles.buttonMargin}
                isLoading={isLoading}
              />
              <View style={styles.viewForLastTextStyle}>
                <View>
                  <Text style={{ color: COLORS.darkGray3 }}>ليس لديك حساب ؟</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    reset()
                    setToggleCheckBox(toggleCheckBox => { return false })
                    navigation.navigate('SignUp');
                  }}>
                  <Text style={styles.bluetextstyle}> انشاء حساب </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default LogIn;
