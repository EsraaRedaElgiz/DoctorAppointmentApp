import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PaymentCard from '../../components/Appointment/PaymentCard';
import {DoctorsData} from '../../utils';
import {
  PADDINGS,
  RADIUS,
  MARGIN,
  FONTS,
  ICONS,
  COLORS,
} from '../../constants/Constants';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListTiltle} from '../../components/Home';
import {style} from '../../styles/Style';
import Visa from '../../components/Visa/Visa';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPaymentCard} from '../../Redux/Reducers/PaymentCardSlice';
import {bookAppointment} from '../../Redux/Reducers/BookAppointmentSlice';
const PaymentCreditCard = ({navigation}) => {
  const route = useRoute();
  const BookArray = route.params.BookArray;
  const Time = route.params.Time;
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {cards, error, isLoading} = globalState.PaymentCardReducer;
  const {date, isLoading2} = globalState.BookAppointmentReducer;

  useEffect(() => {
    dispatch(getPaymentCard());
  }, []);
  const appendSpace = string => {
    let newString = '';
    for (let i = 1; i <= string.length; i++) {
      if (i % 4 == 0) {
        newString = string[i] + ' ';
      }
    }
    return newString;
  };
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
  console.log('DATE IN => ' + date);
  const formatDate = `${JSON.stringify(date).slice(9, 11)} ${getMonthName(
    JSON.stringify(date).slice(6, 8),
  )} ${JSON.stringify(date).slice(1, 5)}`;
  const sendDate = `${JSON.stringify(date).slice(1, 5)}-${JSON.stringify(
    date,
  ).slice(6, 8)}-${JSON.stringify(date).slice(9, 11)}`;
  // console.log(sendDate);
  // console.log(Time.slice(0, 5).concat(':00') + ' date ' + sendDate);

  //select VISA
  const [selectItem, setSelectItem] = useState(0);
  const selectHandler = index => {
    setSelectItem(index);
    // console.log(selectItem);
  };

  return (
    <View
      style={[style.bigContainer, {flex: 1, justifyContent: 'space-between'}]}>
      <HeaderNavigation
        title="الدفع"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <PaymentCard
        image={BookArray.user_image}
        name={`${BookArray.user_first_name}`}
        rating={BookArray.rating.slice(0, 3)}
        price={BookArray.clinic.booking_price}
        speciality={BookArray.speciality_name}
        date={formatDate}
        time={Time}
      />
      <ListTiltle
        Title="اختر البطاقة"
        seeAll=" اضافة بطاقة"
        onPress={() => {
          navigation.navigate('AddCard');
        }}
      />
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        ) : error === null ? (
          cards.length === 0 ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>لا يوجد بطاقة حتي الأن</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cards}
              renderItem={({item, index}) => {
                return (
                  <Visa
                    master
                    name={item.card_holder}
                    // cardNumber={appendSpace(item.card_number)}
                    cardNumber={item.card_number}
                    date={item.card_exp_date}
                    onPress={() => {
                      selectHandler(index);
                    }}
                    borderColor={index === selectItem ? COLORS.blue : null}
                    borderWidth={index === selectItem ? RFValue(3) : null}
                  />
                );
              }}
            />
          )
        ) : (
          <View
            style={{
              height: '60%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>حدث خطأ اثناء الاتصال بالانترنت</Text>
          </View>
        )}
      </View>

      <GeneralButton
        title="تاكيد"
        style={{marginBottom: MARGIN.mdMargin}}
        isLoading={isLoading2}
        onPress={() => {
          // console.log(Time.slice(0, 5) + ' date ' + sendDate);
          dispatch(
            bookAppointment({
              doctor_id: BookArray.doctor_id,
              date: sendDate,
              time: Time.slice(0, 5).concat(':00'),
            }),
          )
            .unwrap()
            .then(res => {
              if (res == true) {
                navigation.navigate('CompletedAppointment');
              } else {
                Alert.alert('المعاد محجوز سابقا من فضلك اختر معاد اخر');
              }
              //
            });
        }}
      />
    </View>
  );
};

export default PaymentCreditCard;

const styles = StyleSheet.create({});
