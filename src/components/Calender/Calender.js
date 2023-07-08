import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from 'date-fns';
import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS, COLORS, USER_DATA} from '../../constants/Constants';
import {useDispatch} from 'react-redux';
import {setDate, setTime} from '../../Redux/Reducers/BookAppointmentSlice';
import {getDoctorAppointments} from '../../../Doctor/src/Redux/Reducers/DoctorAppointmentSlice';
import {getDoctorHistory} from '../../../Doctor/src/Redux/Reducers/DoctorHistorySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
// to show all weeks in month 4 week
const dates = eachWeekOfInterval({
  start: subDays(new Date(), 7), //time of weeks before today
  end: addDays(new Date(), 21), //time of weeks after today
}).reduce((acc, current) => {
  const allDays = eachDayOfInterval({
    start: current,
    end: addDays(current, 6),
  });
  acc.push(allDays);
  return acc;
}, []);
//console.log(dates);
const getMonthName = monthnum => {
  if (monthnum == '01') {
    return 'يناير';
  } else if (monthnum == '02') {
    return 'فبراير';
  } else if (monthnum == '03') {
    return 'مارس';
  } else if (monthnum == '04') {
    return 'ابريل';
  } else if (monthnum == '05') {
    return 'مايو';
  } else if (monthnum == '06') {
    return 'يونيو';
  } else if (monthnum == '07') {
    return 'يوليو';
  } else if (monthnum == '08') {
    return 'اغسطس';
  } else if (monthnum == '09') {
    return 'سبتمبر';
  } else if (monthnum == '10') {
    return 'اكتوبر';
  } else if (monthnum == '11') {
    return 'نوفمبر';
  } else if (monthnum == '12') {
    return 'ديسمبر';
  }
};
const addDay = (dayVar) => {
  if (JSON.stringify(dayVar).slice(9, 11) == "28" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "فبراير") {
    return "1"
  } else if ((JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "ابريل") || (JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
      JSON.stringify(dayVar).slice(6, 8)) == "يونيو") || (JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
        JSON.stringify(dayVar).slice(6, 8)) == "اغسطس") || (JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
          JSON.stringify(dayVar).slice(6, 8)) == "اكتوبر")) {
    return "1"
  } else {
    return JSON.stringify(dayVar).slice(9, 11) * 1 + 1
  }
}
const month = (dayVar) => {
  if (JSON.stringify(dayVar).slice(9, 11) == "28" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "فبراير") {
    return "03"
  } else if ((JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "ابريل")) {
      return "05"

  } else if (JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "يونيو") {
      return "07"

  } else if (JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "اغسطس") {
      return "09"

  } else if (JSON.stringify(dayVar).slice(9, 11) == "30" && getMonthName(
    JSON.stringify(dayVar).slice(6, 8)) == "اكتوبر") {
      return "11"

  } else {
    return JSON.stringify(
      dayVar,
    ).slice(6, 8)
  }
}
function Calender({chosenDay, setChosenDay, onPress}) {
  const dispatch = useDispatch();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {dates.map((week, index) => {
          return (
            <View key={index} style={styles.calenderView}>
              {week.map((day, idx) => {
                const dayName = format(day, 'eee');
                return (
                  <>
                    <Pressable
                      onPress={async() => {
                        const sendDate=`${JSON.stringify(day).slice(1, 5)}-${month(day)}-${JSON.parse(addDay(day))<10?`0${addDay(day)}`:`${addDay(day)}`}`
                        console.log("test",sendDate)
                        setChosenDay(day);
                        dispatch(setDate({date: day}));
                        JSON.parse(await AsyncStorage.getItem(USER_DATA)).type_id==1?
                        dispatch(
                          getDoctorAppointments({
                            date: sendDate,
                          }),
                          dispatch(getDoctorHistory({date: sendDate})),
                        )
                          .unwrap()
                          .then(res => {
                            console.log('Ress ', res);
                          })
                          .catch(error => console.log('errror -< ', error)):null;
                      }}
                      key={idx}
                      style={[
                        styles.dateCard,
                        day === chosenDay
                          ? {backgroundColor: COLORS.lightBlue}
                          : null,
                      ]}>
                      <Text style={styles.dayText}>{dayName}</Text>
                      <Text style={styles.dayText}>{day.getDate()}</Text>
                    </Pressable>
                  </>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: RFValue(95),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingLeft: RFValue(2),
  },
  calenderView: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
  },
  dateCard: {
    backgroundColor: '#fff',
    height: RFValue(80),
    width: RFValue(55),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(2),
    borderRadius: RFValue(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFValue(9),
  },
  dayText: {
    fontSize: FONTS.h5,
    fontWeight: 'bold',
  },
});

export default Calender;
