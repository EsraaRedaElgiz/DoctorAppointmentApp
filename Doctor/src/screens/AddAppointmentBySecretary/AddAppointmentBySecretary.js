import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {
  COLORS,
  FONTS,
  ICONS,
  PADDINGS,
} from '../../../.././src/constants/Constants';
import Reusabletextinput from '../../../.././src/components/AppTextinput/AppTextinput';
import GeneralButton from '../../../.././src/components/GeneralButton/GeneralButton';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { HeaderNavigation } from '../../../../src/components/headerNavigation/HeaderNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import ViewLikeTextInput from '../../../../src/components/ViewLikeTextInput/ViewLikeTextInput';
import { AddAppointmentBySec } from '../../Redux/Reducers/AddAppointmentBySecretarySlice';
function AddAppointmentBySecretary({ navigation }) {
  const dispatch = useDispatch()
  const globalState = useSelector(state => state)
  const { isLoading } = globalState.AddAppointmentBySecretaryReducer
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [time, setTime] = useState('');
  const [timeError, setTimeError] = useState('');
  const onDateSelected = (event, value) => {
    setDatePickerVisible(false);
    setDate(JSON.stringify(value).substring(1, 11));
    //console.log(JSON.stringify(value).substring(1, 11))
    setDateError(dateError => '');
  };
  const onTimeSelected = (event, value) => {
    setTimePickerVisible(false);
    setTime(JSON.stringify(value + '').substring(16, 22));
    //console.log(JSON.stringify(value+"").substring(16,22))
    setTimeError(timeError => '');
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      phoneNum: '',
    },
  });
  const onSubmit = data => {
    if (date == '') {
      setDateError(dateError => {
        return 'يجب اختيار تاريخ';
      });
    }
    if (time == '') {
      setTimeError(dateError => {
        return 'يجب اختيار وقت';
      });
    }
    if (date.length > 0 && time.length > 0) {
      //console.log(JSON.stringify(data)+" "+date+" "+time);
      //backend
      const sendData = {
        patient_name: data.name,
        patient_phone: data.phoneNum,
        date: date,
        time: time.trim() 
      }
      dispatch(AddAppointmentBySec(sendData)).unwrap().then((res) => {
        if (res === true) {
          navigation.goBack()
          setDate(date => {
            return '';
          })
          setDateError(dateError => {
            return '';
          })
          setTime(time => {
            return '';
          })
          setTimeError(timeError => {
            return '';
          })
          reset()
        }
      }).catch((err) => {console.log(err.message) })
    }
  };
  return (
    <View style={styles.container}>
      <HeaderNavigation
        title="اضافة موعد"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          reset();
          setDate(date => {
            return '';
          });
          setDateError(dateError => {
            return '';
          });
          setTime(time => {
            return '';
          });
          setTimeError(timeError => {
            return '';
          });
          navigation.goBack();
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <View style={styles.viewForScrollviewContainer}>
          <View>
            <View style={styles.viewForFirstTextStyle}>
              <Text style={styles.textStyle}>
                قم بادخال اسم المريض ورقم الهاتف
              </Text>
            </View>
            <View style={styles.eachTextInputMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Reusabletextinput
                    placeholder="الاسم"
                    bordercolor={errors.name ? COLORS.red : COLORS.gray}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="name"
              />
              <Text style={styles.textErrorColor}>
                {errors.name?.type === 'required'
                  ? 'يجب ادخال الاسم'
                  : errors.name?.type === 'minLength'
                    ? 'الاسم يجب ان لا يقل عن حرفين'
                    : errors.name?.type === 'maxLength'
                      ? 'الاسم يجب ان لا يزيد عن 30 حرف'
                      : ''}
              </Text>
            </View>
            <View style={styles.eachTextInputMargin}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,6}$/im,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Reusabletextinput
                    placeholder="رقم الهاتف"
                    keyboardType="phone-pad"
                    bordercolor={errors.phoneNum ? COLORS.red : COLORS.gray}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="phoneNum"
              />
              <Text style={styles.textErrorColor}>
                {errors.phoneNum?.type === 'required'
                  ? 'يجب ادخال رقم الهاتف'
                  : errors.phoneNum?.type === 'pattern'
                    ? 'يجب ادخال رقم هاتف صحيح'
                    : ''}
              </Text>
            </View>
            <View style={styles.viewSecondTextStyle}>
              <Text style={styles.textStyle}>قم بإختيار تاريخ ووقت محدد</Text>
            </View>

            <View style={styles.eachTextInputMargin}>
              <ViewLikeTextInput
                placeholder={date == '' ? 'dd/mm/yyyy' : date}
                iconName="calendar-alt"
                onPress={() =>
                  setDatePickerVisible(datePickerVisible => {
                    return true;
                  })
                }
                borderColor={dateError ? COLORS.red : COLORS.gray}
                textColor={date == '' ? COLORS.darkGray : COLORS.darkGray3}
              />
              <Text style={{ color: COLORS.red }}>
                {date.length == '' ? dateError : ''}
              </Text>
            </View>
            <View style={styles.eachTextInputMargin}>
              <ViewLikeTextInput
                placeholder={time == '' ? 'hh:mm' : time}
                iconName="clock"
                onPress={() =>
                  setTimePickerVisible(timePickerVisible => {
                    return true;
                  })
                }
                borderColor={timeError ? COLORS.red : COLORS.gray}
                textColor={time == '' ? COLORS.darkGray : COLORS.darkGray3}
              />
              <Text style={{ color: COLORS.red }}>
                {time.length == '' ? timeError : ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewButtonContainerStyle}>
        <GeneralButton title="حفظ" onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
      </View>
      {datePickerVisible && (
        <DateTimePicker
          testID="datePicker"
          onChange={onDateSelected}
          label="Pick A Date"
          mode={'date'}
          value={new Date()}
          is24Hour={true}
          dateFormat="day month year"
          display="spinner"
          negativeButton={{ label: 'Cancel', textColor: 'red' }}
          positiveButton={{ label: 'ok', textColor: COLORS.blue }}
        />
      )}
      {timePickerVisible && (
        <DateTimePicker
          testID="TimePicker"
          onChange={onTimeSelected}
          label="Pick A Date"
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={false}
          display="spinner"
          negativeButton={{ label: 'Cancel', textColor: 'red' }}
          positiveButton={{ label: 'ok', textColor: COLORS.blue }}
        />
      )}
    </View>
  );
}
export default AddAppointmentBySecretary;
