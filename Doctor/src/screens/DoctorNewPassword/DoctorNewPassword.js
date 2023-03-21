import React, {useState} from 'react';
import {Text, View, StatusBar, ScrollView} from 'react-native';
import styles from './DoctorNewPasswordStyles';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Reusabletextinput from '../../../../src/components/AppTextinput/AppTextinput';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import {TextInput} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

import {useForm, Controller} from 'react-hook-form';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
function DoctorNewPassword({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [secured_pass_first, set_secured_pass_first] = useState(true);
  const [secured_pass_second, set_secured_pass_second] = useState(true);
  const [secured_pass_third, set_secured_pass_third] = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const onSubmit = data => {
    //console.log(data);
    /*const data = {
    oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmNewPassword:data.confirmNewPassword ,
     
    }
    dispatch(insertData(data))*/
    reset();
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <HeaderNavigation
        title="تغيير كلمه المرور"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          reset();
          navigation.goBack()
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <View style={styles.viewForScrollviewContainer}>
          <View>
            <View style={styles.viewForTextStyle}>
              <Text style={styles.textStyle}>
                يجب ان تكون كلمة المرور الجديدة مختلفه عن كلمه المرور المستخدمه
                المستخدمه سابقا
              </Text>
            </View>
            <View style={styles.eachTextInputMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                  maxLength: 20,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Reusabletextinput
                    placeholder="كلمه المرور القديمه"
                    right={
                      <TextInput.Icon
                        icon={secured_pass_first ? 'eye-off' : 'eye'}
                        iconColor={COLORS.darkGray}
                        onPress={() =>
                          set_secured_pass_first(secured_pass_first => {
                            return !secured_pass_first;
                          })
                        }
                      />
                    }
                    bordercolor={errors.oldPassword ? '#f00' : COLORS.gray}
                    secureTextEntry={secured_pass_first}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="oldPassword"
              />
              <Text style={styles.textErrorColor}>
                {errors.oldPassword?.type === 'required'
                  ? 'يجب ادخال كلمة المرور القديمه'
                  : errors.oldPassword?.type === 'pattern'
                  ? 'كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه'
                  : errors.oldPassword?.type === 'maxLength'
                  ? 'كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم'
                  : ''}
              </Text>
            </View>
            <View style={styles.eachTextInputMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                  maxLength: 20,
                  validate: val => {
                    if (watch('oldPassword') === val) {
                      return 'Your passwords do match';
                    }
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Reusabletextinput
                    placeholder="كلمه المرور الجديده"
                    right={
                      <TextInput.Icon
                        icon={secured_pass_second ? 'eye-off' : 'eye'}
                        iconColor={COLORS.darkGray}
                        onPress={() =>
                          set_secured_pass_second(secured_pass_second => {
                            return !secured_pass_second;
                          })
                        }
                      />
                    }
                    bordercolor={errors.newPassword ? '#f00' : COLORS.gray}
                    secureTextEntry={secured_pass_second}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="newPassword"
              />
              <Text style={styles.textErrorColor}>
                {errors.newPassword?.type === 'required'
                  ? 'يجب ادخال كلمة المرور الجديده'
                  : errors.newPassword?.type === 'pattern'
                  ? 'كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه'
                  : errors.newPassword?.type === 'maxLength'
                  ? 'كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم'
                  : errors.newPassword?.type === 'validate'
                  ? 'يجب ان تكون كلمة المرور الجديده مختلفه عن كلمة المرور القديمه'
                  : ''}
              </Text>
            </View>
            <View style={styles.eachTextInputMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: val => {
                    if (watch('newPassword') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Reusabletextinput
                    placeholder="تأكيد كلمه المرور الجديده"
                    right={
                      <TextInput.Icon
                        icon={secured_pass_third ? 'eye-off' : 'eye'}
                        iconColor={COLORS.darkGray}
                        onPress={() =>
                          set_secured_pass_third(secured_pass_third => {
                            return !secured_pass_third;
                          })
                        }
                      />
                    }
                    bordercolor={
                      errors.confirmNewPassword ? '#f00' : COLORS.gray
                    }
                    secureTextEntry={secured_pass_third}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="confirmNewPassword"
              />
              <Text style={styles.textErrorColor}>
                {errors.confirmNewPassword?.type === 'required'
                  ? 'يجب ادخال تأكيد كلمة المرور الجديده'
                  : errors.confirmNewPassword?.type === 'validate'
                  ? 'كلمة المرور غير متطابقه'
                  : ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewButtonContainerStyle}>
        <GeneralButton title="حفظ" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
export default DoctorNewPassword;
