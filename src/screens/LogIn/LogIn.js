import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import { Checkbox } from 'react-native-paper';
import { COLORS, ICONS } from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import { TextInput } from 'react-native-paper';
import ReusableArrowButton from '../../components/AppRightIcon/AppRightIcon';
import GeneralButton from "../../components/GeneralButton/GeneralButton";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setPassword, setRememberMe } from '../../Redux/Reducers/LoginSlice'
import { useForm, Controller } from "react-hook-form";
import LoginWithG from '../../utils/LoginWithG'

function LogIn() {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [toggleCheckBox, setToggleCheckBox] = useState(globalState.LoginReducer.rememberMe);
  const [secured_pass, set_secured_pass] = useState(true);
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: globalState.LoginReducer.email,
      password: globalState.LoginReducer.password,
    }
  });
  const onSubmit = (data) => {
    //console.log(data);
    dispatch(setEmail(data.email))
    dispatch(setPassword(data.password))
    dispatch(setRememberMe(toggleCheckBox))
    //console.log(globalState.LoginReducer.rememberMe+""+globalState.LoginReducer.email)

  }
  const pass_secured = () => {
    let securedPass = secured_pass;
    securedPass = !securedPass;
    set_secured_pass(secured_pass => securedPass);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.blue} />
        <View style={styles.topViewStyle}>
          <ReusableArrowButton
            style={styles.custombuttonIconStyle}
            onPress={() => {
              dispatch(setEmail(""))
              dispatch(setPassword(""))
              dispatch(setRememberMe(""))
            }}
          />
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
          <View style={styles.eachTextinputAndErrorTextContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Reusabletextinput
                  placeholder="عنوان البريد الالكتروني"
                  keyboardType="email-address"
                  bordercolor={errors.email?COLORS.red:COLORS.gray}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />)}
              name="email"
            />
            <Text style={styles.textErrorColor}>
              {errors.email?.type === "required" ? "يجب ادخال عنوان البريد الالكتروني" :
                errors.email?.type === "pattern" ? "يجب ادخال عنوان بريد الكتروني صحيح" : ""
              }
            </Text>
          </View>
          <View style={styles.eachTextinputAndErrorTextContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                maxLength: 20

              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Reusabletextinput
                  placeholder="كلمه المرور"
                  bordercolor={errors.password?COLORS.red:COLORS.gray}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      style={styles.iconStyle}
                      iconColor={COLORS.darkGray}
                      onPress={pass_secured}

                    />
                  }
                  secureTextEntry={secured_pass}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />)}
              name="password"
            />
            <Text style={styles.textErrorColor}>
              {errors.password?.type === "required" ? "يجب ادخال كلمة المرور" :
                errors.password?.type === "pattern" ? "كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه" :
                  errors.password?.type === "maxLength" ? "كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم" : ""}
            </Text>
          </View>
          <View style={styles.viewForfirstTextAfterTextinputs}>
            <View style={styles.viewforcheckboxandwordstyle}>
              <View>
                <Checkbox
                  status={toggleCheckBox ? 'checked' : 'unchecked'}
                  onPress={
                    () => setToggleCheckBox(toggleCheckBox => !toggleCheckBox)
                  }
                  color={COLORS.blue}
                  uncheckedColor={COLORS.gray}
                />
              </View>
              <View>
                <Text style={styles.textAfterTextinputsStyle}>تذكرني</Text>
              </View>
            </View>
            <TouchableOpacity>
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

            <LoginWithG/>
          </View>
          <GeneralButton
            title="متابعه"
            style={styles.buttonMargin}
            // onPress={()=>alert(toggleCheckBox)}
            onPress={handleSubmit(onSubmit)}

          />
          <View style={styles.viewForLastTextStyle}>
            <View>
              <Text style={{ color: COLORS.darkGray3 }}>ليس لديك حساب ؟</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.bluetextstyle}> انشاء حساب </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>

  );
}
export default LogIn;
