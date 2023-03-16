import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
const PaymentCreditCard = ({navigation}) => {
  const route = useRoute();
  const BookArray = route.params.BookArray;
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
        Title="اختر البطاقه"
        seeAll=" اضافه بطاقه"
        onPress={() => {
          navigation.navigate('AddCard');
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Visa />
        <Visa />
        <Visa />
        <Visa />
      </ScrollView>
      <GeneralButton
        title="تاكيد"
        style={{marginBottom:MARGIN.mdMargin}}
        onPress={() => {
          navigation.navigate('CompletedAppointment');
        }}
      />
    </View>
  );
};

export default PaymentCreditCard;

const styles = StyleSheet.create({});
