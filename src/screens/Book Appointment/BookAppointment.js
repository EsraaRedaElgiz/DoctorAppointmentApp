import {ScrollView, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
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
const BookAppointment = ({navigation}) => {
  const route = useRoute();
  const DoctorArray = route.params.DoctorArray;
  //  let now = new Date();

  // // Tota number of days in current month
  // const totalDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();

  // // Today's day
  // const today = now.getDate();
  // console.log(today)
  // // Remaining days of the month
  // const remainingDays = totalDays - today;
  // console.log(remainingDays)
  const [checkedCash, setCheckCash] = useState(false);
  const [checkedCerdit, setcheckedCerdit] = useState(false);
  const cashFun = () => {
    setCheckCash(true);
    setcheckedCerdit(false);
  };
  const creditFun = () => {
    setcheckedCerdit(true);
    setCheckCash(false);
  };
  return (
    <View style={[style.bigContainer, {flex: 1}]}>
      <HeaderNavigation
        title="حجز الميعاد"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: PADDINGS.smPadding}}>
        <ListTiltle Title="التاريخ" />
        {/* FlatList Days */}
        {/* <View style={styles.flatListDaysContainer}>
          {/* design item */}
          {/* <View style={styles.dayConatiner}>
            <View style={styles.num_day_contanier}>
              <Text style={style.textContentBold}>4</Text>
            </View>
            <View style={styles.num_day_contanier}>
              <Text style={style.textContentBold}>الخميس</Text>
            </View>
          </View>
        </View>  */}
        <Calender/>
        {/* FlatList Times */}
        <ScrollView>
          <View style={styles.flatListTimesContainer}>
            {/* design Item */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>10:00</Text>
              <Text style={styles.timeTextStyle}>مساء</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>9:00</Text>
              <Text style={styles.timeTextStyle}>صباحا</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>10:00</Text>
              <Text style={styles.timeTextStyle}>مساء</Text>
            </View>
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
        style={{marginBottom:MARGIN.mdMargin}}
        onPress={() => {
          checkedCash || checkedCerdit
            ? navigation.navigate(
                checkedCash ? 'PaymentCash' : 'PaymentCreditCard',
                {BookArray: DoctorArray},
              )
            : Alert.alert(
                'تحذير',
                "من فضلك ادخل جميع البيانات ",
                [
                  {
                    text: 'OK',
                  },
                ],
              );
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
    marginTop:MARGIN.mdMargin
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: RFValue(17),
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    marginRight: MARGIN.smMargin,
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
  },
});
