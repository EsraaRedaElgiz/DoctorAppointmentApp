import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { COLORS, FONTS } from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-paper';

function AddAppointmentBySecretary() {

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            name: "",
            phoneNum: "",
            data: "",
            time: ""
        }
    });
    const onSubmit = (data) => {
        console.log(data);

        //backend
        /* const data = {
           name: data.name,
             phoneNum: data.phoneNum,
           }
           dispatch(insertData(data))
           */

    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.scrollViewContentContainerStyle}
        >
            <StatusBar backgroundColor={COLORS.blue} />
            <View style={styles.container}>
                <View style={styles.viewForTextInputsAndTextStyle}>
                    <View style={styles.viewFirstTextStyle}>
                        <Text style={styles.eachTextHeaderStyle}>قم بادخال اسم المريض ورقم الهاتف</Text>
                    </View>
                    <View style={styles.eachTextInputMargin}>
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
                    <View style={styles.eachTextInputMargin}>
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
                    <View style={styles.viewSecondTextStyle}>
                        <Text style={styles.eachTextHeaderStyle}>قم بإختيار تاريخ ووقت محدد</Text>
                    </View>
                    <View style={styles.eachTextInputMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Reusabletextinput
                                    placeholder="dd/mm/yyyy"
                                    bordercolor={errors.date ? COLORS.red : COLORS.gray}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    right={
                                        <TextInput.Icon
                                            icon={"calendar"}
                                            iconColor={COLORS.darkGray}
                                            onPress={() => console.log("hi")}

                                        />
                                    }
                                />)}
                            name="date"
                        />
                        <Text style={styles.errorTextColor}>
                            {errors.date?.type === "required" ? "يجب تحديد التاريخ" : ""}
                        </Text>
                    </View>
                    <View style={styles.eachTextInputMargin}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Reusabletextinput
                                    placeholder="hh:mm"
                                    bordercolor={errors.time ? COLORS.red : COLORS.gray}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    right={
                                        <TextInput.Icon
                                            icon={"history"}
                                            iconColor={COLORS.darkGray}
                                            onPress={() => console.log("hi")}

                                        />
                                    }
                                    
                                />)}
                            name="time"
                        />
                        <Text style={styles.errorTextColor}>
                            {errors.time?.type === "required" ? "يجب ادخال رقم الهاتف" : ""}
                        </Text>
                    </View>

                </View>
                <View>
                    <GeneralButton title="اضافه"
                        onPress={handleSubmit(onSubmit)}

                    />
                </View>

            </View>
        </ScrollView>
    )

}
export default AddAppointmentBySecretary;