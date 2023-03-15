import React, { useState } from 'react';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import styles from './styles';
import { COLORS, PADDINGS } from '../../constants/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useSelector, useDispatch } from 'react-redux';
import { setVertificationCode } from '../../Redux/Reducers/VertificationCodeSlice';
import { useForm, Controller } from 'react-hook-form';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
function VertificationCode({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [value, setValue] = useState(globalState.VertificationCodeReducer.code);
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handlerOnFulfill = code => {
    console.log(code);
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = data => {
    //console.log(data);
    let codeInserted = data.code;
    let splitString = codeInserted.split('');
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join('');

    //console.log(joinArray);
    /*const data = {
      code:joinArray ,
       
      }
      dispatch(insertData(data))*/
    reset()
    navigation.navigate('ResetPassword');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="رمز التحقق"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          reset()
          navigation.navigate('ForgetPassword');
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        <View style={styles.viewForScrollviewContainer}>
          <View>
            <View style={styles.viewImage}>
              <View style={styles.viewBlueStyle}>
                <Entypo name="check" size={RFValue(120)} color={COLORS.white} />
              </View>
            </View>
            <View style={styles.viewForTextStyle}>
              <Text style={styles.textStyle}>
                قم بإدخال رمز التأكيد المرسل لك عبر عبر البريد الالكتروني
              </Text>
            </View>
            <View style={styles.viewCodeFieldStyle}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 4,
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
                    keyboardType="numeric"
                    textContentType="oneTimeCode"
                    // onFulfill={handlerOnFulfill(value)}
                    renderCell={({ index, symbol, isFocused }) => (
                      <Text
                        key={index}
                        style={[
                          styles.cell,
                          { borderColor: errors.code ? COLORS.red : COLORS.gray },
                          isFocused && styles.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />
                )}
                name="code"
              />
              <Text style={styles.errorTestStyle}>
                {errors.code?.type === 'required'
                  ? 'يجب ادخال رمز التأكيد'
                  : errors.code?.type === 'minLength'
                    ? 'يجب ادخال الارقام المرسله بالكامل'
                    : ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainerStyle}>
        <GeneralButton
          title="تأكيد"
          style={styles.buttonStyle}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
export default VertificationCode;
