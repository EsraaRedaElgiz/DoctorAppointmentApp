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
} from '../../Redux/Reducers/ResetPasswordSlice';
import { useForm, Controller } from 'react-hook-form';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
function ResetPassword({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [secured_pass_first, set_secured_pass_first] = useState(true);
  const [secured_pass_second, set_secured_pass_second] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: globalState.ResetPasswordReducer.password,
      confirmPassword: globalState.ResetPasswordReducer.confirmPassword,
    },
  });
  const onSubmit = data => {
    // console.log(data);
    dispatch(setPassword(data.password));
    dispatch(setConfirmPassword(data.confirmPassword));
    navigation.navigate('LogIn');
    dispatch(setPassword(""))
    dispatch(setConfirmPassword(""))
  };
 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="تعيين كلمة المرور"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          navigation.navigate('VertificationCode');
          dispatch(setPassword(""))
          dispatch(setConfirmPassword(""))
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
                        onPress={()=>set_secured_pass_second(secured_pass_second=>{return !secured_pass_second})}
                      />
                    }
                    bordercolor={errors.confirmPassword ? '#f00' : COLORS.gray}
                    secureTextEntry={secured_pass_second}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
        <GeneralButton title="حفظ" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
export default ResetPassword;
