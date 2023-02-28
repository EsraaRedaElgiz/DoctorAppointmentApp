import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import { COLORS } from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import { TextInput } from 'react-native-paper';
import ReusableArrowButton from '../../components/AppRightIcon/AppRightIcon';
import GeneralButton from "../../components/GeneralButton/GeneralButton";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setPhoneNum,
  setEmail,
  setPassword,
  setConfirmPassword,

} from '../../Redux/Reducers/SignUpSlice'
import { useForm, Controller } from "react-hook-form";
//import { insertData } from "../../Redux/Reducers/SignUpSlice";
function SignUp() {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [secured_pass, set_secured_pass] = useState(true);
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: globalState.SignUpReducer.name,
      phoneNum: globalState.SignUpReducer.phoneNum,
      email: globalState.SignUpReducer.email,
      password: globalState.SignUpReducer.password,
      confirmPassword: globalState.SignUpReducer.confirmPassword
    }
  });
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(setName(data.name))
    dispatch(setPhoneNum(data.phoneNum))
    dispatch(setEmail(data.email))
    dispatch(setPassword(data.password))
    dispatch(setConfirmPassword(data.confirmPassword))
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

  }
  const pass_secured = () => {
    let securedPass = secured_pass;
    securedPass = !securedPass;
    set_secured_pass(secured_pass => securedPass);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle} >

      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.blue} />
        <View style={styles.topViewStyle}>
          <ReusableArrowButton
            style={styles.afterArrowButtonMargin}
            onPress={() => {
              dispatch(setName(""))
              dispatch(setPhoneNum(""))
              dispatch(setEmail(""))
              dispatch(setPassword(""))
              dispatch(setConfirmPassword(""))
            }}
          />
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
          <View style={styles.eachtextinputmargin}>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 2,
                maxLength: 30

              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Reusabletextinput
                  placeholder="الاسم"
                  bordercolor={errors.name ? COLORS.red : COLORS.gray}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />)}
              name="name"
            />
            <Text style={styles.errorTextColor}>
              {errors.name?.type === "required" ? "يجب ادخال الاسم" :
                errors.name?.type === "minLength" ? "الاسم يجب ان لا يقل عن حرفين" :
                  errors.name?.type === "maxLength" ? "الاسم يجب ان لا يزيد عن 30 حرف" : ""}
            </Text>
          </View>
          <View style={styles.eachtextinputmargin}>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/im

              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Reusabletextinput
                  placeholder="رقم الهاتف"
                  keyboardType="phone-pad"
                  bordercolor={errors.phoneNum ? COLORS.red : COLORS.gray}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />)}
              name="phoneNum"
            />
            <Text style={styles.errorTextColor}>
              {errors.phoneNum?.type === "required" ? "يجب ادخال رقم الهاتف" :
                errors.phoneNum?.type === "pattern" ? "يجب ادخال رقم هاتف صحيح" : ""}
            </Text>
          </View>
          <View style={styles.eachtextinputmargin}>
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
                  bordercolor={errors.email ? COLORS.red : COLORS.gray}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />)}
              name="email"
            />
            <Text style={styles.errorTextColor}>
              {errors.email?.type === "required" ? "يجب ادخال عنوان البريد الالكتروني" :
                errors.email?.type === "pattern" ? "يجب ادخال عنوان بريد الكتروني صحيح" : ""
              }
            </Text>
          </View>
          <View style={styles.eachtextinputmargin}>
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
                  right={
                    <TextInput.Icon
                      icon="eye"
                      iconColor={COLORS.darkGray}
                      onPress={pass_secured}
                    />
                  }
                  bordercolor={errors.password ? COLORS.red : COLORS.gray}
                  secureTextEntry={secured_pass}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />)}
              name="password"
            />
            <Text style={styles.errorTextColor}>
              {errors.password?.type === "required" ? "يجب ادخال كلمة المرور" :
                errors.password?.type === "pattern" ? "كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه" :
                  errors.password?.type === "maxLength" ? "كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم" : ""}
            </Text>
          </View>
          <View style={styles.eachtextinputmargin}>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (val) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Reusabletextinput
                  placeholder="تأكيد كلمه المرور"
                  right={
                    <TextInput.Icon
                      icon="eye"
                      iconColor={COLORS.darkGray}
                      onPress={pass_secured}
                    />
                  }
                  bordercolor={errors.confirmPassword ? COLORS.red : COLORS.gray}
                  secureTextEntry={secured_pass}
                  onChangeText={onChange}
                  onBlur={onBlur}

                />)}
              name="confirmPassword"
            />
            <Text style={styles.errorTextColor}>
              {errors.confirmPassword?.type === "required" ? "يجب ادخال تأكيد كلمة المرور" :
                errors.confirmPassword?.type === "validate" ? "كلمة المرور غير متطابقه" : ""
              }
            </Text>
          </View>
          <View style={styles.viewForfirstTextAfterTextinputs}>
            <View>
              <Text style={styles.textAfterTextinputsStyle}>
                بتسجيل الدخول فانك توافق علي
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.bluetextstyle}> شروط الاستخدام</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewForSecondTextAfterTextinputs}>
            <View>
              <Text style={styles.textAfterTextinputsStyle}>و</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.bluetextstyle}> سياسه الخصوصيه</Text>
            </TouchableOpacity>
          </View>

          <GeneralButton
            style={styles.buttonMargin}
            title="متابعه"
            onPress={handleSubmit(onSubmit)}


          />
          <View style={styles.viewForLastTextStyle}>
            <View>
              <Text style={styles.textAfterTextinputsStyle}>
                لديك حساب بالفعل؟
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.bluetextstyle}> تسجيل الدخول </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>

  );
}
export default SignUp;
