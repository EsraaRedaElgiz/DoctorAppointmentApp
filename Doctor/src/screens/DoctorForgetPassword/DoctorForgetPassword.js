import React from 'react';
import {Text, View, Image, StatusBar, ScrollView} from 'react-native';
import styles from './DoctorForgetPasswordStyles';
import {COLORS, PADDINGS} from '../../../../src/constants/Constants';
import Reusabletextinput from '../../../../src/components/AppTextinput/AppTextinput';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import {useSelector, useDispatch} from 'react-redux';
import {setEmailToSendVerificationCode} from '../../../../src/Redux/Reducers/SendEmailSlice';
import {useForm, Controller} from 'react-hook-form';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
function DoctorForgetPassword({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = data => {
    //console.log(JSON.stringify(data));
    /*const data = {
      email: data.email,
       
      }
      dispatch(insertData(data))*/
    reset();
    navigation.navigate('DoctorVerification');
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
          navigation.goBack();
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
                source={require('../../../../src/assets/Images/ForgetPassword.png')}
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
                render={({field: {onChange, onBlur, value}}) => (
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
        />
      </View>
    </View>
  );
}
export default DoctorForgetPassword;
