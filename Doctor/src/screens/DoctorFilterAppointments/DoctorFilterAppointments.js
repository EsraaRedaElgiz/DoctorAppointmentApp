import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {style} from '../../../../src/styles/Style';
import styles from './DoctorFilterAppointmentStyles';
import ViewLikeTextInput from '../../../../src/components/ViewLikeTextInput/ViewLikeTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../../../../src/constants/Constants';
import {CheckBox} from 'react-native-elements';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {getDoctorAppointments} from '../../Redux/Reducers/DoctorAppointmentSlice';
function DoctorFilterAppointment({navigation}) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {} = globalState.DoctorAppointmentReducer;
  const onDateSelected = (event, value) => {
    setDatePickerVisible(false);
    setDate(JSON.stringify(value).substring(1, 11));
    setDateError(dateError => '');
  };

  return (
    <View style={styles.container}>
      <HeaderNavigation
        title="تصنيف"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>اختر تاريخ محدد</Text>
      <View style={styles.dateInputView}>
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
        <Text style={{color: COLORS.red}}>
          {date.length == '' ? dateError : ''}
        </Text>
      </View>
      <Text style={styles.title}>اظهر فقط</Text>
      <View style={styles.checkBoxView}>
        <View style={styles.checkBoxComponent}>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} />
          <Text style={styles.checkBoxText}>تم التأكيد</Text>
        </View>
        <View style={styles.checkBoxComponent}>
          <CheckBox checked={!checked} onPress={() => setChecked(!checked)} />
          <Text style={styles.checkBoxText}>معلق</Text>
        </View>
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
          negativeButton={{label: 'Cancel', textColor: 'red'}}
          positiveButton={{label: 'ok', textColor: COLORS.blue}}
        />
      )}
      <View style={styles.buttonView}>
        <GeneralButton
          title="تم"
          onPress={() => {
            if (date == '') {
              Alert.alert('select date first');
            } else {
              dispatch(
                getDoctorAppointments({date: date, status: checked ? 1 : 2}),
              );
              navigation.goBack();
            }
          }}
        />
      </View>
    </View>
  );
}

export default DoctorFilterAppointment;
