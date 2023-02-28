import React from "react";
import { Text, View, Image, StatusBar, ScrollView } from 'react-native'
import styles from './styles'
import { COLORS } from "../../constants/Constants";
import HeaderArrowAndWord from "../../components/HeaderArrowAndWord/HeaderArrowAndWord";
import Reusabletextinput from '../../components/AppTextinput/AppTextinput'
import GeneralButton from "../../components/GeneralButton/GeneralButton";
import { useSelector, useDispatch } from "react-redux";
import { setEmailToSendVerificationCode } from '../../Redux/Reducers/SendEmailSlice'
import { useForm, Controller } from "react-hook-form";
function ForgetPassword() {
    const dispatch = useDispatch();
    const globalState = useSelector(state => state);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: globalState.ForgetPasswordReducer.emailToSendVerificationCode,
        }
    });
    const onSubmit = (data) => {
        //console.log(data);
        dispatch(setEmailToSendVerificationCode(data.email))

    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.blue} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle} >
                <View style={styles.viewForScrollviewContainer}>
                    <HeaderArrowAndWord
                        text="نسيت كلمه المرور"
                        arrowButtonStyle={styles.arrowButtonStyle}
                        textColor={COLORS.black}
                        textStyle={styles.textHeaderStyle}
                        onPress={()=>{
                            dispatch(setEmailToSendVerificationCode(""))
                        }}
                    />
                    <View style={styles.viewImage}>
                        <Image source={require('../../assets/Images/ForgetPassword.png')} style={styles.imageStyle} />
                    </View>
                    <View style={styles.viewForTextStyle}>
                        <Text style={styles.textStyle} >قم بإدخال بريدك الالكتروني او رقم الهاتف لارسال رمز التأكيد</Text>
                    </View>
                    <View style={styles.textInputContainerMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (

                                <Reusabletextinput
                                    placeholder="عنوان البريد الالكتروني/رقم الهاتف"
                                    bordercolor={errors.email ? "#f00" : COLORS.gray}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />)}
                            name="email"
                        />
                        {/*{errors.email?.type === "required" && <Text style={styles.errorTextStyle}>يجب ادخال عنوان البريد الالكتروني لارسال رمز التأكيد</Text>}
                        {errors.email?.type === "pattern" && <Text style={styles.errorTextStyle}>يجب ادخال عنوان بريد الكتروني صحيح</Text>}*/}
                        <Text style={styles.errorTextStyle}>
                            {errors.email?.type === "required" ? "يجب ادخال عنوان البريد الالكتروني لارسال رمز التأكيد" :
                                errors.email?.type === "pattern" ? "يجب ادخال عنوان بريد الكتروني صحيح" : ""
                            }
                        </Text>
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
    )

}
export default ForgetPassword;