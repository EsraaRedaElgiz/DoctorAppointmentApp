import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {style} from '../../../../src/styles/Style';
import styles from './DoctorFilterHistoryStyles';
import ViewLikeTextInput from '../../../../src/components/ViewLikeTextInput/ViewLikeTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../../../../src/constants/Constants';
import {CheckBox} from 'react-native-elements';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
function DoctorFilterHistory() {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [checked, setChecked] = useState(true);
  const onDateSelected = (event, value) => {
    setDatePickerVisible(false);
    setDate(JSON.stringify(value).substring(1, 11));
    setDateError(dateError => '');
  };
  return (
    <View style={styles.container}>
      <HeaderNavigation title="فلتر" />
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
          <Text style={styles.checkBoxText}>المكتمل</Text>
        </View>
        <View style={styles.checkBoxComponent}>
          <CheckBox checked={!checked} onPress={() => setChecked(!checked)} />
          <Text style={styles.checkBoxText}>الملغي</Text>
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
        <GeneralButton title="تم" />
      </View>
    </View>
  );
}

export default DoctorFilterHistory;
