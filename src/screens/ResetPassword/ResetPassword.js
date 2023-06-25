import React, { useState } from 'react';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import styles from './styles';
import { COLORS, PADDINGS } from '../../constants/Constants';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPassword,
  setConfirmPassword,
  newPassword,
} from '../../Redux/Reducers/ResetPasswordSlice';
import { useForm, Controller } from 'react-hook-form';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
import { setEmailToSendVerificationCode, setOtp, setUserId } from '../../Redux/Reducers/SendEmailSlice';
function ResetPassword({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const { emailToSendVerificationCode, userId ,otp} = globalState.SendEmailReducer
  const {isLoading}=globalState.ResetPasswordReducer
  const [secured_pass_first, set_secured_pass_first] = useState(true);
  const [secured_pass_second, set_secured_pass_second] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = data => {
    //console.log(data);
    const sendData = {
      "id": userId,
      "email": emailToSendVerificationCode,
      "new_password": data.password,


    }
    dispatch(newPassword(sendData)).unwrap().then((res) => {
      if (res == true) {
        reset()
        navigation.navigate('LogIn');
        dispatch(setUserId(''))
        dispatch(setOtp(''))
        dispatch(setEmailToSendVerificationCode(''))
      }
    });


  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="اعادة تعيين كلمة المرور"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          reset()
          navigation.navigate('VertificationCode');

        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={styles.scrollViewStyle}>
        <View style={styles.viewForScrollviewContainer}>
          <View>
            <View style={styles.viewForTextStyle}>
              <Text style={styles.textStyle}>
                يجب ان تكون كلمة المرور الجديدة مختلفه عن كلمة المرور المستخدمه
                سابقا
              </Text>
            </View>
            <View style={styles.viewTextInputAndTextMargin}>
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
                    placeholder="كلمة المرور الجديده"
                    right={
                      <TextInput.Icon
                        icon={secured_pass_first ? 'eye-off' : 'eye'}
                        iconColor={COLORS.darkGray}
                        onPress={() => set_secured_pass_first(secured_pass_first => { return !secured_pass_first })}
                      />
                    }
                    bordercolor={errors.password ? '#f00' : COLORS.gray}
                    secureTextEntry={secured_pass_first}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="password"
              />
              <Text style={styles.textErrorColor}>
                {errors.password?.type === 'required'
                  ? 'يجب ادخال كلمة المرور الجديده'
                  : errors.password?.type === 'pattern'
                    ? 'كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه'
                    : errors.password?.type === 'maxLength'
                      ? 'كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم'
                      : ''}
              </Text>
            </View>
            <View style={styles.viewTextInputAndTextMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: val => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Reusabletextinput
                    placeholder="تأكيد كلمة المرور الجديده"
                    right={
                      <TextInput.Icon
                        icon={secured_pass_second ? 'eye-off' : 'eye'}
                        iconColor={COLORS.darkGray}
                        onPress={() => set_secured_pass_second(secured_pass_second => { return !secured_pass_second })}
                      />
                    }
                    bordercolor={errors.confirmPassword ? '#f00' : COLORS.gray}
                    secureTextEntry={secured_pass_second}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="confirmPassword"
              />
              <Text style={styles.textErrorColor}>
                {errors.confirmPassword?.type === 'required'
                  ? 'يجب ادخال تأكيد كلمة المرور الجديده'
                  : errors.confirmPassword?.type === 'validate'
                    ? 'كلمة المرور غير متطابقه'
                    : ''}
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
      <View style={styles.buttonContainerStyle}>
        <GeneralButton title="حفظ" onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
      </View>
    </View>
  );
}
export default ResetPassword;
