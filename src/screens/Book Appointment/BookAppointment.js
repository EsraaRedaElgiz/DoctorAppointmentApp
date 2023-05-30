import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {
  FONTS,
  MARGIN,
  PADDINGS,
  RADIUS,
  COLORS,
} from '../../constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListTiltle} from '../../components/Home';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {Checkbox} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Calender from '../../components/Calender/Calender';
import moment from 'moment';
const BookAppointment = ({navigation}) => {
  const route = useRoute();
  const DoctorArray = route.params.DoctorArray;
  const [checkedCash, setCheckCash] = useState(false);
  const [checkedCerdit, setcheckedCerdit] = useState(false);
  const [chosenTime, setChosenTime] = useState(null);
  const [chosenDay, setChosenDay] = useState(null);
  //session time
  const [timeSlots, setTimeSlots] = useState([]);
  const craeteTimeSlots = (fromTime, ToTime) => {
    let startTime = moment(fromTime, 'hh:mm A');
    let endTime = moment(ToTime, 'hh:mm A');

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }

    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format('hh:mm A'));
      startTime.add(30, 'minute'); //30 this number of session
    }

    return arr;
  };
  useEffect(() => {
    setTimeSlots(craeteTimeSlots('08:00 AM', '8:00 PM')); // 08:00 start time ,9:00 end time
  }, []);
  const cashFun = () => {
    setCheckCash(true);
    setcheckedCerdit(false);
  };
  const creditFun = () => {
    setcheckedCerdit(true);
    setCheckCash(false);
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <HeaderNavigation
        title="حجز الميعاد"
        color={COLORS.darkGray3}
        padding={PADDINGS.smPadding}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: PADDINGS.smPadding}}>
        <ListTiltle Title="التاريخ" />

        <Calender chosenDay={chosenDay} setChosenDay={setChosenDay} />
        {/* FlatList Times */}
        <ScrollView>
          <View style={styles.flatListTimesContainer}>
            {timeSlots.map((item, index) => {
              return (
                <>
                  <Pressable
                    style={[
                      styles.timeContainer,
                      {
                        backgroundColor:
                          chosenTime === item ? COLORS.lightBlue : COLORS.white,
                      },
                    ]}
                    onPress={() => {
                      setChosenTime(item);
                    }}>
                    <Text style={styles.timeTextStyle}>{item}</Text>
                  </Pressable>
                </>
              );
            })}
          </View>
        </ScrollView>
        <ListTiltle Title="طريقة الدفع" />
        <View style={styles.bigContainerChecks}>
          <View style={styles.checkBox_titleConatiner}>
            <Checkbox
              status={checkedCash ? 'checked' : 'unchecked'}
              value={checkedCash}
              onPress={cashFun}
              color={COLORS.blue}
            />
            <Text style={[style.textContentBold, {fontSize: RFValue(14)}]}>
              نقدى
            </Text>
          </View>

          <View style={styles.checkBox_titleConatiner}>
            <Checkbox
              status={checkedCerdit ? 'checked' : 'unchecked'}
              value={checkedCerdit}
              onPress={creditFun}
              color={COLORS.blue}
            />
            <Text style={[style.textContentBold, {fontSize: RFValue(14)}]}>
              بطاقة
            </Text>
          </View>
        </View>
      </ScrollView>
      <GeneralButton
        title="حجز"
        style={{
          marginBottom: MARGIN.mdMargin,
          marginHorizontal: PADDINGS.mdPadding,
        }}
        onPress={() => {
          (checkedCash || checkedCerdit) && chosenTime && chosenDay
            ? navigation.navigate(
                checkedCash ? 'PaymentCash' : 'PaymentCreditCard',
                {BookArray: DoctorArray},
              )
            : Alert.alert('تحذير', 'من فضلك ادخل جميع البيانات ', [
                {
                  text: 'OK',
                },
              ]);
        }}
      />
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  dayConatiner: {
    width: RFValue(55),
    height: RFValue(75),
    borderRadius: RADIUS.smRadius,
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    marginRight: MARGIN.mdMargin,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: PADDINGS.mdPadding,
  },
  dayTextStyle: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
  },
  flatListDaysContainer: {
    flexDirection: 'row',
    padding: RFValue(2),
    marginVertical: MARGIN.mdMargin,
  },
  flatListTimesContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: RFValue(2),
    alignSelf: 'center',
    marginTop: MARGIN.mdMargin,
  },
  flatListCheckBoxsContainer: {
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: PADDINGS.smPadding,
  },
  num_day_contanier: {
    flex: RFValue(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    width: RFValue(92),
    height: RFValue(35),
    borderRadius: RADIUS.smRadius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    marginRight: RFValue(17),
    marginBottom: MARGIN.mdMargin,
  },
  timeTextStyle: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    fontFamily: FONTS.Amaranth,
  },
  checkBox_titleConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigContainerChecks: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: MARGIN.lgMargin,
  },
});
