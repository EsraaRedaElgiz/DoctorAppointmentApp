import React from 'react';
import { Text, View, Image, StatusBar, ScrollView } from 'react-native';
import styles from './styles';
import { COLORS, PADDINGS } from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import { useSelector, useDispatch } from 'react-redux';
import { sendEmail, setEmailToSendVerificationCode } from '../../Redux/Reducers/SendEmailSlice';
import { useForm, Controller } from 'react-hook-form';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
function ForgetPassword({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const{isLoading}=globalState.SendEmailReducer
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = data => {
    //console.log(JSON.stringify(data));
    const sendData = {
      'email': data.email,
    }
    dispatch(sendEmail(sendData)).unwrap().then((res) => {
      if (res == true) {
        dispatch(setEmailToSendVerificationCode(data.email));
        reset();
        navigation.navigate('VertificationCode');
      }
    });

  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="نسيت كلمه المرور"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          reset();
          navigation.navigate('LogIn');
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <View style={styles.viewForScrollviewContainer}>
          <View>
            <View style={styles.viewImage}>
              <Image
                source={require('../../assets/Images/ForgetPassword.png')}
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.viewForTextStyle}>
              <Text style={styles.textStyle}>
                قم بإدخال بريدك الالكتروني او رقم الهاتف لارسال رمز التأكيد
              </Text>
            </View>
            <View style={styles.textInputContainerMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Reusabletextinput
                    placeholder="عنوان البريد الالكتروني/رقم الهاتف"
                    bordercolor={errors.email ? '#f00' : COLORS.gray}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="email"
              />
              <Text style={styles.errorTextStyle}>
                {errors.email?.type === 'required'
                  ? 'يجب ادخال عنوان البريد الالكتروني لارسال رمز التأكيد'
                  : errors.email?.type === 'pattern'
                    ? 'يجب ادخال عنوان بريد الكتروني صحيح'
                    : ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainerStyle}>
        <GeneralButton
          title="ارسال"
          style={styles.buttonStyle}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}
export default ForgetPassword;
