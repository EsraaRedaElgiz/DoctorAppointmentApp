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
  COLORS
} from '../../constants/Constants';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListTiltle} from '../../components/Home';
import {style} from '../../styles/Style';
import Visa from '../../components/Visa/Visa';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
const PaymentCreditCard = ({navigation}) => {
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
        image={DoctorsData[0].image}
        name={DoctorsData[0].name}
        rating={DoctorsData[1].rating}
        price={DoctorsData[0].price}
        speciality={DoctorsData[0].specialtiy}
        date={"30\t"+"ديسمبر"+"\t2020"}
        time="4:30"
      />
      <ListTiltle
        Title="اختر البطاقه"
        seeAll=" اضافه بطاقه"
        onPress={() => {
          alert('اضافه كارت؟');
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
        onPress={() => {
          navigation.navigate('CompletedAppointment');
        }}
      />
    </View>
  );
};

export default PaymentCreditCard;

const styles = StyleSheet.create({});
