import React, { useState } from "react";
import {
    Text,
    View,
    StatusBar
    , ScrollView
} from 'react-native'
import styles from './styles'
import { COLORS, PADDINGS } from "../../constants/Constants";
import HeaderArrowAndWord from "../../components/HeaderArrowAndWord/HeaderArrowAndWord";
import Reusabletextinput from '../../components/AppTextinput/AppTextinput'
import GeneralButton from "../../components/GeneralButton/GeneralButton";
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { setOldPassword, setNewPassword, setConfirmNewPassword } from '../../Redux/Reducers/NewPasswordSlice'
import { useForm, Controller } from "react-hook-form";
function NewPassword() {
    const dispatch = useDispatch();
    const globalState = useSelector(state => state);
    const [secured_pass, set_secured_pass] = useState(true);
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            oldPassword: globalState.NewPasswordReducer.oldPassword,
            newPassword: globalState.NewPasswordReducer.newPassword,
            confirmNewPassword: globalState.NewPasswordReducer.confirmNewPassword
        }
    });
    const onSubmit = (data) => {
        //  console.log(data);
        dispatch(setOldPassword(data.oldPassword))
        dispatch(setNewPassword(data.newPassword))
        dispatch(setConfirmNewPassword(data.confirmNewPassword))
    }
    const pass_secured = () => {
        let securedPass = secured_pass;
        securedPass = !securedPass;
        set_secured_pass(secured_pass => securedPass);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.blue} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                <View style={styles.viewForScrollviewContainer}>
                    <HeaderArrowAndWord
                        text="تغيير كلمه المرور"
                        arrowButtonStyle={styles.arrowButtonStyle}
                        textColor={COLORS.black}
                        textStyle={styles.textHeaderStyle}
                        onPress={() => {
                            dispatch(setOldPassword(""))
                            dispatch(setNewPassword(""))
                            dispatch(setConfirmNewPassword(""))
                        }}
                    />
                    <View style={styles.viewForTextStyle}>
                        <Text style={styles.textStyle} >يجب ان تكون كلمة المرور الجديدة مختلفه عن كلمه المرور المستخدمه المستخدمه سابقا</Text>
                    </View>
                    <View style={styles.eachTextInputMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                                maxLength: 20

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Reusabletextinput

                                    placeholder="كلمه المرور القديمه"
                                    right={
                                        <TextInput.Icon
                                            icon={secured_pass ? 'eye' : 'eye'}
                                            iconColor={COLORS.darkGray}
                                            onPress={pass_secured}

                                        />
                                    }
                                    bordercolor={errors.oldPassword ? "#f00" : COLORS.gray}
                                    secureTextEntry={secured_pass}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                            name="oldPassword"
                        />
                        {/*{errors.oldPassword?.type === "required" && <Text style={{ color: "#f00" }}>يجب ادخال كلمة المرور القديمه</Text>}
                        {errors.oldPassword?.type === "pattern" && <Text style={{ color: "#f00" }}>كلمه المرور يجب لا تقل عن 6ارقام و حرف كبير و حرف صغير وعلامه مميزه</Text>}
                                {errors.oldPassword?.type === 'maxLength' && <Text style={{ color: "#f00" }}>كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم</Text>}*/}
                        <Text style={styles.textErrorColor}>
                            {errors.oldPassword?.type === "required" ? "يجب ادخال كلمة المرور القديمه" :
                                errors.oldPassword?.type === "pattern" ? "كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه" :
                                    errors.oldPassword?.type === "maxLength" ? "كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم" : ""}
                        </Text>
                    </View>
                    <View style={styles.eachTextInputMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                                maxLength: 20,
                                validate: (val) => {
                                    if (watch('oldPassword') === val) {
                                        return "Your passwords do match";
                                    }
                                }

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Reusabletextinput
                                    placeholder="كلمه المرور الجديده"
                                    right={
                                        <TextInput.Icon
                                            icon={secured_pass ? 'eye' : 'eye'}
                                            iconColor={COLORS.darkGray}
                                            onPress={pass_secured}

                                        />
                                    }
                                    bordercolor={errors.newPassword ? "#f00" : COLORS.gray}
                                    secureTextEntry={secured_pass}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />)}
                            name="newPassword"
                        />
                        {/* {errors.newPassword?.type === "required" && <Text style={{ color: "#f00" }}>يجب ادخال كلمة المرور الجديده</Text>}
                        {errors.newPassword?.type === "pattern" && <Text style={{ color: "#f00" }}>كلمه المرور يجب لا تقل عن 6ارقام و حرف كبير و حرف صغير وعلامه مميزه</Text>}
                        {errors.newPassword?.type === 'maxLength' && <Text style={{ color: "#f00" }}>كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم</Text>}
                                {errors.newPassword?.type == "validate" && <Text style={{ color: "#f00" }}>يجب ان تكون كلمة المرور الجديده مختلفه عن كلمة المرور القديمه</Text>}*/}
                        <Text style={styles.textErrorColor}>
                            {errors.newPassword?.type === "required" ? "يجب ادخال كلمة المرور الجديده" :
                                errors.newPassword?.type === "pattern" ? "كلمه المرور يجب لا تقل عن 8 ارقام وحرف كبير وحرف صغير وعلامه مميزه" :
                                    errors.newPassword?.type === "maxLength" ? "كلمة المرور يجب ان لا تزيد عن 20 حرف ورقم" :
                                        errors.newPassword?.type === "validate" ? "يجب ان تكون كلمة المرور الجديده مختلفه عن كلمة المرور القديمه" : ""}
                        </Text>
                    </View>
                    <View style={styles.eachTextInputMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                validate: (val) => {
                                    if (watch('newPassword') != val) {
                                        return "Your passwords do no match";
                                    }
                                }

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Reusabletextinput
                                    placeholder="تأكيد كلمه المرور الجديده"
                                    right={
                                        <TextInput.Icon
                                            icon={secured_pass ? 'eye' : 'eye'}
                                            iconColor={COLORS.darkGray}
                                            onPress={pass_secured}

                                        />
                                    }
                                    bordercolor={errors.confirmNewPassword ? "#f00" : COLORS.gray}
                                    secureTextEntry={secured_pass}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />)}
                            name="confirmNewPassword"
                        />
                        {/* {errors.confirmNewPassword?.type === "required" && <Text style={{ color: "#f00" }}>يجب ادخال تأكيد كلمة المرور الجديده</Text>}
                        {errors.confirmNewPassword?.type == "validate" && <Text style={{ color: "#f00" }}>كلمة المرور غير متطابقه</Text>}*/}

                        <Text style={styles.textErrorColor}>
                            {errors.confirmNewPassword?.type === "required" ? "يجب ادخال تأكيد كلمة المرور الجديده" :
                                errors.confirmNewPassword?.type === "validate" ? "كلمة المرور غير متطابقه" : ""
                            }
                        </Text>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.viewButtonContainerStyle}>
                <GeneralButton
                    title="حفظ"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>

    )

}
export default NewPassword;
