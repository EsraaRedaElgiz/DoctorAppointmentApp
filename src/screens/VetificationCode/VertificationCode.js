import React, { useState } from "react";
import {
    Text,
    View,
    StatusBar
    , ScrollView
} from 'react-native'
import styles from './styles'
import { COLORS } from "../../constants/Constants";
import { RFValue } from "react-native-responsive-fontsize";
import HeaderArrowAndWord from "../../components/HeaderArrowAndWord/HeaderArrowAndWord";
import GeneralButton from "../../components/GeneralButton/GeneralButton";
import Entypo from "react-native-vector-icons/Entypo";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useSelector, useDispatch } from "react-redux";
import { setVertificationCode } from '../../Redux/Reducers/VertificationCodeSlice'
import { useForm, Controller } from "react-hook-form";
function VertificationCode() {
    const dispatch = useDispatch();
    const globalState = useSelector(state => state);
    const [value, setValue] = useState(globalState.VertificationCodeReducer.code);
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const handlerOnFulfill = (code) => { console.log(code); }
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            code: globalState.VertificationCodeReducer.code
        }
    });

    const onSubmit = (data) => {
        //console.log(data);
        let codeInserted = data.code;
        let splitString = codeInserted.split(""); // var splitString = "hello".split("");
        // ["h", "e", "l", "l", "o"]

        // Step 2. Use the reverse() method to reverse the new created array
        let reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
        // ["o", "l", "l", "e", "h"]

        // Step 3. Use the join() method to join all elements of the array into a string
        let joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
        // "olleh"

        //Step 4. Return the reversed string
        // "olleh"
        console.log(joinArray)
        dispatch(setVertificationCode(joinArray))

    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.blue} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                <View style={styles.viewForScrollviewContainer}>
                    <HeaderArrowAndWord
                        text="رمز التأكيد"
                        arrowButtonStyle={styles.arrowButtonStyle}
                        textColor={COLORS.black}
                        textStyle={styles.textHeaderStyle}
                        onPress={() => {
                            dispatch(setVertificationCode(""))
                        }}
                    />
                    <View style={styles.viewImage}>
                        <View style={styles.viewBlueStyle}>
                            <Entypo name="check" size={RFValue(120)} color={COLORS.white} />
                        </View>
                    </View>
                    <View style={styles.viewForTextStyle}>
                        <Text style={styles.textStyle} >قم بإدخال رمز التأكيد المرسل لك عبر عبر البريد الالكتروني</Text>
                    </View>
                    <View style={styles.viewCodeFieldStyle}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                minLength: 4

                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CodeField
                                    ref={ref}
                                    {...props}
                                    value={value}
                                    //onChangeText={setValue}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    cellCount={4}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    // onFulfill={handlerOnFulfill(value)}
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, { borderColor: errors.code ? COLORS.red : COLORS.gray }, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />)}
                            name="code"
                        />
                        <Text style={styles.errorTestStyle}>
                            {errors.code?.type === "required" ? "يجب ادخال رمز التأكيد" :
                                errors.code?.type === "minLength" ? "يجب ادخال الارقام المرسله بالكامل" : ""
                            }
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainerStyle}>
                <GeneralButton title="تأكيد" style={styles.buttonStyle} onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )

}
export default VertificationCode;