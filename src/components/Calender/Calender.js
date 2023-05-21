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
  Pressable,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS, COLORS} from '../../constants/Constants';

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

console.log(dates);
function Calender() {
  const [chosenDay, setChosenDay] = useState(null);
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
                      onPress={() => setChosenDay(day)}
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
