import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { style } from '../../../../src/styles/Style';
import { ListTiltle } from '../../../../src/components/Home';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  COLORS,
  ICONS,
  MARGIN,
  RADIUS,
} from '../../../../src/constants/Constants';
import CircularProgress from 'react-native-circular-progress-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Statistics = (props) => {
  const navigation = useNavigation();
  const globalState = useSelector(state => state)
  const ActiveColor = '#2f73fc';
  const [StatisticsValue, setStatisticsValue] = useState(50);
  const { todayAppointmentes } = props
  const { start_time, end_time, session_time } = globalState.DoctorDetailsReducer
  const [timeSlots, setTimeSlots] = useState([]);
  const craeteTimeSlots = (fromTime, ToTime) => {
    let startTime = moment(fromTime, 'hh:mm');
    let endTime = moment(ToTime, 'hh:mm');

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }
    function convertH2M(timeInHour){

      var timeParts = timeInHour.split(":");
  
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
  
    }
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format('hh:mm'));
      startTime.add(convertH2M(session_time.slice(0,5)), 'minute'); 
    }

    return arr;
  };
  useEffect(()=>{
    setTimeSlots(craeteTimeSlots(start_time.slice(0,5), end_time.slice(0,5)))
  },[])
  return (
    <>
      <ListTiltle Title="احصائيات اليوم" />

      <Pressable
        style={styles.StatisticsContainerView}
        onPress={() => {
          navigation.navigate('DoctorAppointments');
        }}>
        <View style={styles.circle_Text_Container}>
          <View style={styles.circleContainer}>
            <CircularProgress
              value={((todayAppointmentes.length)/((timeSlots.length)-1))*100}
              radius={RFValue(55)}
              duration={2000}
              maxValue={100}
              inActiveStrokeColor={ActiveColor}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={ActiveColor}
              valueSuffix={'%'}
            />
          </View>
          <View>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={[style.textTitleBold, { color: COLORS.blue }]}>
                مواعيد اليوم
              </Text>
              <Text style={[style.textTitleBold, { color: COLORS.blue }]}>
                {todayAppointmentes.length}/{(timeSlots.length)-1}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.btnLeft}
          onPress={() => {
            navigation.navigate('DoctorAppointments');
          }}>
          <AntDesign
            name="arrowleft"
            size={ICONS.mdIcon}
            color={COLORS.white}
          />
        </Pressable>
      </Pressable>
    </>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  StatisticsContainerView: {
    width: '100%',
    height: RFValue(150),
    borderRadius: RADIUS.lgRadius,
    backgroundColor: '#B4CCFF',
    marginBottom: MARGIN.mdMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle_Text_Container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circleContainer: {
    width: RFValue(130),
    height: RFValue(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLeft: {
    width: RFValue(80),
    height: RFValue(43),
    backgroundColor: '#2f73fc',
    alignSelf: 'flex-end',
    borderBottomRightRadius: RADIUS.mdRadius,
    borderTopLeftRadius: RADIUS.mdRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
