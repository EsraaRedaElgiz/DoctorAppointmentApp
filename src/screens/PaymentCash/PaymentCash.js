import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {MARGIN, PADDINGS, ICONS, FONTS} from '../../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DoctorsData} from '../../utils';
import PaymentCard from '../../components/Appointment/PaymentCard';
import {style} from '../../styles/Style';
const PaymentCash = () => {
  return (
    <>
      <View
        style={[
          style.bigContainer,
          {flex: 1, justifyContent: 'space-between'},
        ]}>
        <View style={styles.card_textContainer}>
          <PaymentCard
            image={DoctorsData[0].image}
            name={DoctorsData[0].name}
            rating={4.5}
            price={DoctorsData[0].price}
            speciality={DoctorsData[0].specialtiy}
            date="22 2022 سبتمبر"
            time="4:30"
          />
          <View style={styles.textContainer}>
            <FontAwesome name="exclamation-triangle" size={ICONS.lgIcon} />
            <Text
              style={[
                style.textTitleBold,
                styles.extraTextStyle
              ]}>
              لتأكيد الحجز الرجاء الذهاب للعياده قبل الموعد بيوم واحد
            </Text>
          </View>
        </View>
        <GeneralButton
          title="تم"
          onPress={() => {
            alert('لتأكيد الحجز الرجاء الذهاب للعياده قبل الموعد بيوم واحد');
          }}
        />
      </View>
    </>
  );
};

export default PaymentCash;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: PADDINGS.mdPadding,
    marginTop: MARGIN.mdMargin,
  },
  card_textContainer: {
    width: '100%',
    // backgroundColor:'#f00'
  },
  textContainer: {
    width: '98%',
    flexDirection: 'row',
    height: RFValue(100),
    alignItems: 'center',
    alignSelf: 'center',
  },
  extraTextStyle: {
    fontSize: RFValue(17),
    width: '90%',
    marginLeft: MARGIN.smMargin,
  },
});
