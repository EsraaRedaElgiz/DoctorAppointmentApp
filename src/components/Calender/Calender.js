import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  subDays,
} from 'date-fns';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS, COLORS} from '../../constants/Constants';

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  },
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 4),
  });
  acc.push(allDays);
  return acc;
}, []);
function Calender() {
  const [chosenDay, setChosenDay] = useState(null);
  return (
    <PagerView style={styles.container}>
      {dates.map((week, index) => {
        return (
          <View key={index} style={styles.calenderView}>
            {week.map((day, idx) => {
              const dayName = format(day, 'eee');
              return (
                <TouchableOpacity
                  onPress={() => setChosenDay(idx)}
                  key={idx}
                  style={[
                    styles.dateCard,
                    idx === chosenDay
                      ? {backgroundColor: COLORS.lightBlue}
                      : null,
                  ]}>
                  <Text style={styles.dayText}>{day.getDate()}</Text>
                  <Text style={styles.dayText}>{dayName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: RFValue(85),
    width: '100%',
    alignItems: 'center',
  },
  calenderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateCard: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: RFValue(55),
    height: RFValue(70),
    backgroundColor: '#fff',
    elevation: 2,
    marginEnd: RFValue(2),
    borderRadius: RFValue(10),
  },
  dayText: {
    fontSize: FONTS.h6,
    fontWeight: 'bold',
  },
});

export default Calender;
