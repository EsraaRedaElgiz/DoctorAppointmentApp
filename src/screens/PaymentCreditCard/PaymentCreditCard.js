import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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
const PaymentCreditCard = ({navigation}) => {
  const route = useRoute();
  const BookArray = route.params.BookArray;
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {cards, error, isLoading} = globalState.PaymentCardReducer;
  useEffect(() => {
    dispatch(getPaymentCard());
  }, []);
  const appendSpace = string => {
    const newString = string.replaceAll(' ', '      ');
    return newString;
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
        image={BookArray.image}
        name={BookArray.name}
        rating={BookArray.rating}
        price={BookArray.price}
        speciality={BookArray.specialtiy}
        date={'30\t' + 'ديسمبر' + '\t2020'}
        time="4:30"
      />
      <ListTiltle
        Title="اختر البطاقة"
        seeAll=" اضافة بطاقة"
        onPress={() => {
          navigation.navigate('AddCard');
        }}
      />
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
            renderItem={({item}) => {
              return (
                <Visa
                  master
                  name={item.card_holder}
                  cardNumber={appendSpace(item.card_number)}
                  date={item.card_exp_date}
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
      <GeneralButton
        title="تاكيد"
        style={{marginBottom: MARGIN.mdMargin}}
        onPress={() => {
          navigation.navigate('CompletedAppointment');
        }}
      />
    </View>
  );
};

export default PaymentCreditCard;

const styles = StyleSheet.create({});
