import React, { useState } from "react";
import {
    Text,
    View,
    StatusBar
    , ScrollView
} from 'react-native'
import styles from './styles'
import { COLORS } from "../../constants/Constants";
import HeaderArrowAndWord from "../../components/HeaderArrowAndWord/HeaderArrowAndWord";
import Reusabletextinput from '../../components/AppTextinput/AppTextinput'
import GeneralButton from "../../components/GeneralButton/GeneralButton";
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { setPassword, setConfirmPassword } from '../../Redux/Reducers/ResetPasswordSlice'
import { useForm, Controller } from "react-hook-form";

function ResetPassword() {
    const dispatch = useDispatch();
    const globalState = useSelector(state => state);
    const [secured_pass, set_secured_pass] = useState(true);
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            password: globalState.ResetPasswordReducer.password,
            confirmPassword: globalState.ResetPasswordReducer.confirmPassword
        }
    });
    const onSubmit = (data) => {
        // console.log(data);
        dispatch(setPassword(data.password))
        dispatch(setConfirmPassword(data.confirmPassword))

    }
    const pass_secured = () => {
        let securedPass = secured_pass;
        securedPass = !securedPass;
        set_secured_pass(secured_pass => securedPass);
    };
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.blue} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle} >
                <View style={styles.viewForScrollviewContainer}>
                    <HeaderArrowAndWord
                        text="إعاده تعيين كلمة المرور"
                        arrowButtonStyle={styles.arrowButtonStyle}
                        textColor={COLORS.black}
                        textStyle={styles.textHeaderStyle}
                        onPress={()=>{
                            dispatch(setPassword(""))
                            dispatch(setConfirmPassword(""))
                        }}
                    />
                    <View style={styles.viewForTextStyle}>
                        <Text style={styles.textStyle} >يجب ان تكون كلمة المرور الجديدة مختلفه عن كلمة المرور المستخدمه سابقا</Text>
                    </View>
                    <View style={styles.viewTextInputAndTextMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                                maxLength: 20

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Reusabletextinput
                                    placeholder="كلمة المرور الجديده"
                                    right={
                                        <TextInput.Icon
                                            icon={secured_pass ? 'eye' : 'eye'}
                                            iconColor={COLORS.darkGray}
                                            onPress={pass_secured}
                                        />
                                    }
                                    bordercolor={errors.password ? "#f00" : COLORS.gray}
                                    secureTextEntry={secured_pass}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                            name="password"

                        />
                        {/*{errors.password?.type === "required" && <Text style={{ color: "#f00" }}>يجب ادخال كلمة المرور الجديده</Text>}
                        {errors.password?.type === "pattern" && <Text style={{ color: "#f00" }}>كلمه المرور يجب لا تقل عن 6ارقام و حرف كبير و حرف صغير وعلامه مميزه</Text>}
                                {errors.password?.type === 'maxLength' && <Text style={{ color: "#f00" }}>كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم</Text>}*/}
                        <Text style={styles.textErrorColor}>
                            {errors.password?.type === "required" ? "يجب ادخال كلمة المرور الجديده" :
                                errors.password?.type === "pattern" ? "كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه" :
                                    errors.password?.type === "maxLength" ? "كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم" : ""}
                        </Text>
                    </View>
                    <View style={styles.viewTextInputAndTextMargin}>
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
                                    placeholder="تأكيد كلمة المرور الجديده"
                                    right={
                                        <TextInput.Icon
                                            icon={secured_pass ? 'eye' : 'eye'}
                                            iconColor={COLORS.darkGray}
                                            onPress={pass_secured}

                                        />
                                    }
                                    bordercolor={errors.confirmPassword ? "#f00" : COLORS.gray}
                                    secureTextEntry={secured_pass}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                            name="confirmPassword"
                        />
                        {/* {errors.confirmPassword?.type === "required" && <Text style={{ color: "#f00" }}>يجب ادخال تأكيد كلمة المرور الجديده</Text>}
                        {errors.confirmPassword?.type === "validate" && <Text style={{ color: "#f00" }}>كلمة المرور غير متطابقه</Text>}*/}
                        <Text style={styles.textErrorColor}>
                            {errors.confirmPassword?.type === "required" ? "يجب ادخال تأكيد كلمة المرور الجديده" :
                                errors.confirmPassword?.type === "validate" ? "كلمة المرور غير متطابقه" : ""
                            }
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainerStyle}>
                <GeneralButton title="حفظ"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>

        </View>

    )

}
export default ResetPassword;
