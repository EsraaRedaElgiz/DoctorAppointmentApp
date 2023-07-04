import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import styles from './style';
import {COLORS, IS_DOCTOR, PADDINGS} from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import {TextInput} from 'react-native-paper';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  setName,
  setPhoneNum,
  setEmail,
  setPassword,
  setSuccess,
} from '../../Redux/Reducers/SignUpSlice';
import {useForm, Controller} from 'react-hook-form';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
function SignUp({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  useEffect(() => {
    dispatch(setSuccess(false));
    getDoc();
  }, []);
  const getDoc = async () => {
    const doc = await AsyncStorage.getItem(IS_DOCTOR);
    console.log('doc => ', doc);
  };
  const [secured_pass_first, set_secured_pass_first] = useState(true);
  const [secured_pass_second, set_secured_pass_second] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      phoneNum: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = data => {
    //console.log(data);
    //backend
    /* const data = {
      name: data.name,
        phoneNum: data.phoneNum,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }
        dispatch(registerUser(data))
       */
    dispatch(setName(data.name));
    dispatch(setPhoneNum(data.phoneNum));
    dispatch(setEmail(data.email));
    dispatch(setPassword(data.password));
    navigation.navigate('MedicalSheet');
    reset();
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContentContainerStyle}>
        <StatusBar backgroundColor={COLORS.blue} />
        <HeaderNavigation
          backgroundColor={COLORS.blue}
          padding={PADDINGS.mdPadding}
          onPress={() => {
            reset();
            navigation.navigate('DoctorOrPatient');
          }}
        />
        <View style={styles.container}>
          <View style={[styles.topViewStyle]}>
            <View style={styles.viewHeaderTextStyle}>
              <View style={styles.viewforheaderstyle}>
                <Text style={styles.firstTextHeaderStyle}>تسجيل</Text>
              </View>
              <View>
                <Text style={styles.secondTextHeaderStyle}>
                  قم بانشاء حسابك الجديد
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewAfterHeaderStyle}>
            <View>
              <View style={styles.eachtextinputmargin}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: 2,
                    maxLength: 30,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Reusabletextinput
                      placeholder="الاسم"
                      bordercolor={errors.name ? COLORS.red : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="name"
                />
                <Text style={styles.errorTextColor}>
                  {errors.name?.type === 'required'
                    ? 'يجب ادخال الاسم'
                    : errors.name?.type === 'minLength'
                    ? 'الاسم يجب ان لا يقل عن حرفين'
                    : errors.name?.type === 'maxLength'
                    ? 'الاسم يجب ان لا يزيد عن 30 حرف'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachtextinputmargin}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/im,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Reusabletextinput
                      placeholder="رقم الهاتف"
                      keyboardType="phone-pad"
                      bordercolor={errors.phoneNum ? COLORS.red : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="phoneNum"
                />
                <Text style={styles.errorTextColor}>
                  {errors.phoneNum?.type === 'required'
                    ? 'يجب ادخال رقم الهاتف'
                    : errors.phoneNum?.type === 'pattern'
                    ? 'يجب ادخال رقم هاتف صحيح'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachtextinputmargin}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
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
                <Text style={styles.errorTextColor}>
                  {errors.email?.type === 'required'
                    ? 'يجب ادخال عنوان البريد الالكتروني'
                    : errors.email?.type === 'pattern'
                    ? 'يجب ادخال عنوان بريد الكتروني صحيح'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachtextinputmargin}>
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
                      placeholder="كلمه المرور"
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
                      bordercolor={errors.password ? COLORS.red : COLORS.gray}
                      secureTextEntry={secured_pass_first}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="password"
                />
                <Text style={styles.errorTextColor}>
                  {errors.password?.type === 'required'
                    ? 'يجب ادخال كلمة المرور'
                    : errors.password?.type === 'pattern'
                    ? 'كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه'
                    : errors.password?.type === 'maxLength'
                    ? 'كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachtextinputmargin}>
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
                  render={({field: {onChange, onBlur, value}}) => (
                    <Reusabletextinput
                      placeholder="تأكيد كلمه المرور"
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
                      bordercolor={
                        errors.confirmPassword ? COLORS.red : COLORS.gray
                      }
                      secureTextEntry={secured_pass_second}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="confirmPassword"
                />
                <Text style={styles.errorTextColor}>
                  {errors.confirmPassword?.type === 'required'
                    ? 'يجب ادخال تأكيد كلمة المرور'
                    : errors.confirmPassword?.type === 'validate'
                    ? 'كلمة المرور غير متطابقه'
                    : ''}
                </Text>
              </View>
              <View style={styles.viewForfirstTextAfterTextinputs}>
                <View>
                  <Text style={styles.textAfterTextinputsStyle}>
                    بتسجيل الدخول فانك توافق علي
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ConditionsAndTerms")
                  }}>
                  <Text style={styles.bluetextstyle}> شروط الاستخدام</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewForSecondTextAfterTextinputs}>
                <View>
                  <Text style={styles.textAfterTextinputsStyle}>و</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PrivacyPolicy")
                  }}>
                  <Text style={styles.bluetextstyle}> سياسه الخصوصية</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <GeneralButton
                title="متابعة"
                onPress={handleSubmit(onSubmit)}
                style={styles.buttonMargin}
              />
              <View style={styles.viewForLastTextStyle}>
                <View>
                  <Text style={styles.textAfterTextinputsStyle}>
                    لديك حساب بالفعل؟
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    reset();
                    navigation.navigate('LogIn');
                  }}>
                  <Text style={styles.bluetextstyle}> تسجيل الدخول </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
export default SignUp;
