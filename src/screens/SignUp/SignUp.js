import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import { COLORS, PADDINGS } from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import { TextInput } from 'react-native-paper';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import { useSelector, useDispatch } from 'react-redux';
/*import {
  setName,
  setPhoneNum,
  setEmail,
  setPassword,
  setConfirmPassword,
} from '../../Redux/Reducers/SignUpSlice';*/
import { useForm, Controller } from 'react-hook-form';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
//import { insertData } from "../../Redux/Reducers/SignUpSlice";
function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [name, setName] = useState("")
  const [phoneNum, setPhoneNum] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [secured_pass_first, set_secured_pass_first] = useState(true);
  const [secured_pass_second, set_secured_pass_second] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({

    defaultValues: {
      name: name,
      phoneNum: phoneNum,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
  });
  const onSubmit = data => {
    console.log(data);
    setName("");
    setPhoneNum("");
    setEmail("");
    setPassword("");
    setConfirmPassword("")
    navigation.navigate('MedicalSheet');
    //backend
    /* const data = {
       name: data.name,
         phoneNum: data.phoneNum,
         email: data.email,
         password: data.password,
         confirmPassword: data.confirmPassword
       }
       dispatch(insertData(data))
       dispatch(setName(""))
       dispatch(setPhoneNum(""))
       dispatch(setEmail(""))
       dispatch(setPassword(""))
       dispatch(setConfirmPassword(""))*/

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
            setName("");
            setPhoneNum("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigation.navigate('DoctorOrPatient');

          }}
        />
        <View style={styles.container}>
          <View style={[styles.topViewStyle]}>
            <View style={styles.viewHeaderTextStyle}>
              <View style={styles.viewforheaderstyle}>
                <Text style={styles.firstTextHeaderStyle}>??????????</Text>
              </View>
              <View>
                <Text style={styles.secondTextHeaderStyle}>
                  ???? ???????????? ?????????? ????????????
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="??????????"
                      bordercolor={errors.name ? COLORS.red : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="name"
                />
                <Text style={styles.errorTextColor}>
                  {errors.name?.type === 'required'
                    ? '?????? ?????????? ??????????'
                    : errors.name?.type === 'minLength'
                      ? '?????????? ?????? ???? ???? ?????? ???? ??????????'
                      : errors.name?.type === 'maxLength'
                        ? '?????????? ?????? ???? ???? ???????? ???? 30 ??????'
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="?????? ????????????"
                      keyboardType="phone-pad"
                      bordercolor={errors.phoneNum ? COLORS.red : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="phoneNum"
                />
                <Text style={styles.errorTextColor}>
                  {errors.phoneNum?.type === 'required'
                    ? '?????? ?????????? ?????? ????????????'
                    : errors.phoneNum?.type === 'pattern'
                      ? '?????? ?????????? ?????? ???????? ????????'
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="?????????? ???????????? ????????????????????"
                      keyboardType="email-address"
                      bordercolor={errors.email ? COLORS.red : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="email"
                />
                <Text style={styles.errorTextColor}>
                  {errors.email?.type === 'required'
                    ? '?????? ?????????? ?????????? ???????????? ????????????????????'
                    : errors.email?.type === 'pattern'
                      ? '?????? ?????????? ?????????? ???????? ???????????????? ????????'
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="???????? ????????????"
                      right={
                        <TextInput.Icon
                          icon={secured_pass_first ? 'eye-off' : 'eye'}
                          iconColor={COLORS.darkGray}
                          onPress={() => set_secured_pass_first(secured_pass_first => { return !secured_pass_first })}
                        />
                      }
                      bordercolor={errors.password ? COLORS.red : COLORS.gray}
                      secureTextEntry={secured_pass_first}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="password"
                />
                <Text style={styles.errorTextColor}>
                  {errors.password?.type === 'required'
                    ? '?????? ?????????? ???????? ????????????'
                    : errors.password?.type === 'pattern'
                      ? '???????? ???????????? ?????? ???? ?????? ???? 8 ?????????? ???????? ???????? ???????? ???????? ???????????? ??????????'
                      : errors.password?.type === 'maxLength'
                        ? '???????? ???????????? ?????? ???? ???? ???????? ???? 20 ?????? ????????'
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Reusabletextinput
                      placeholder="?????????? ???????? ????????????"
                      right={
                        <TextInput.Icon
                          icon={secured_pass_second ? 'eye-off' : 'eye'}
                          iconColor={COLORS.darkGray}
                          onPress={() => set_secured_pass_second(secured_pass_second => { return !secured_pass_second })}
                        />
                      }
                      bordercolor={
                        errors.confirmPassword ? COLORS.red : COLORS.gray
                      }
                      secureTextEntry={secured_pass_second}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                  name="confirmPassword"
                />
                <Text style={styles.errorTextColor}>
                  {errors.confirmPassword?.type === 'required'
                    ? '?????? ?????????? ?????????? ???????? ????????????'
                    : errors.confirmPassword?.type === 'validate'
                      ? '???????? ???????????? ?????? ??????????????'
                      : ''}
                </Text>
              </View>
              <View style={styles.viewForfirstTextAfterTextinputs}>
                <View>
                  <Text style={styles.textAfterTextinputsStyle}>
                    ???????????? ???????????? ???????? ?????????? ??????
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.bluetextstyle}> ???????? ??????????????????</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewForSecondTextAfterTextinputs}>
                <View>
                  <Text style={styles.textAfterTextinputsStyle}>??</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.bluetextstyle}> ?????????? ????????????????</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <GeneralButton
                title="????????????"
                onPress={handleSubmit(onSubmit)}
                style={styles.buttonMargin}

              />
              <View style={styles.viewForLastTextStyle}>
                <View>
                  <Text style={styles.textAfterTextinputsStyle}>
                    ???????? ???????? ??????????????
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setName("");
                    setPhoneNum("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    navigation.navigate('LogIn')
                  }}>
                  <Text style={styles.bluetextstyle}> ?????????? ???????????? </Text>
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
