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
} from '../../constants/Constants';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListTiltle} from '../../components/Home';
import {style} from '../../styles/Style';
const PaymentCreditCard = () => {
  return (
    <View
      style={[style.bigContainer, {flex: 1, justifyContent: 'space-between'}]}>
      <PaymentCard
        image={DoctorsData[0].image}
        name={DoctorsData[0].name}
        rating={4.5}
        price={DoctorsData[0].price}
        speciality={DoctorsData[0].specialtiy}
        date="22 2022 سبتمبر"
        time="4:30"
      />
      <ListTiltle
        Title="اختر البطاقه"
        seeAll=" اضافه بطاقه"
        onPress={() => {
          alert('اضافه كارت؟');
        }}
      />
      <ScrollView>{/* VISA Flat List */}</ScrollView>
      <GeneralButton
        title="تاكيد"
        onPress={() => {
          alert('الذهاب الى صفحه كومبليت');
        }}
      />
    </View>
  );
};

export default PaymentCreditCard;

const styles = StyleSheet.create({});
