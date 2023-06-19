import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {
  MARGIN,
  PADDINGS,
  ICONS,
  FONTS,
  COLORS,
} from '../../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DoctorsData} from '../../utils';
import PaymentCard from '../../components/Appointment/PaymentCard';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const PaymentCash = ({navigation}) => {
  const globalState = useSelector(state => state);
  const route = useRoute();
  const BookArray = route.params.BookArray;
  const {date} = globalState.BookAppointmentReducer;
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
  const formatDate = `${JSON.stringify(date).slice(9, 10)} ${getMonthName(
    JSON.stringify(date).slice(6, 8),
  )} ${JSON.stringify(date).slice(1, 5)}`;
  return (
    <>
      <View
        style={[
          style.bigContainer,
          {flex: 1, justifyContent: 'space-between'},
        ]}>
        <View style={styles.card_textContainer}>
          <HeaderNavigation
            title="الدفع"
            color={COLORS.darkGray3}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <PaymentCard
            image={BookArray.user_image}
            name={BookArray.user_first_name}
            rating={BookArray.rating}
            price={BookArray.price}
            speciality={BookArray.speciality_name}
            date={formatDate}
            time="4:30"
          />
          <View style={styles.textContainer}>
            <FontAwesome name="exclamation-triangle" size={ICONS.lgIcon} />
            <Text style={[style.textTitleBold, styles.extraTextStyle]}>
              لتأكيد الحجز الرجاء الذهاب للعياده قبل الموعد بيوم واحد
            </Text>
          </View>
        </View>
        <GeneralButton
          title="تم"
          style={{marginBottom: MARGIN.mdMargin}}
          onPress={() => {
            Alert.alert(
              'تذكير',
              'لتأكيد الحجز الرجاء الذهاب للعياده قبل الموعد بيوم واحد',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('Homescreen');
                  },
                },
              ],
            );
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
