import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {style} from '../../styles/Style';
import {
  COLORS,
  RADIUS,
  PADDINGS,
  MARGIN,
  FONTS,
  ICONS,
} from '../../constants/Constants';
import {DoctorsData} from '../../utils';
import {Stars} from '../Search';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../constants/Images';
const PaymentCard = props => {
  const {image, name, rating, price, speciality, date, time} = props;
  return (
    <Pressable style={style.CardContainer}>
      <View style={style.imageContainerStyle}>
        {image ? (
          <Image source={{uri: image}} style={style.imageCard} />
        ) : (
          <Image source={Images.doctorDefult} style={style.imageCard} />
        )}
      </View>
      <View style={style.textsCardConatiner}>
        <View style={styles.threeSubContainer}>
          <View style={styles.nameContainer}>
            <Text
              style={[style.textSmallContentBold, {color: COLORS.darkGray3}]}>
              {name}
            </Text>
          </View>
          <View
            style={[
              styles.rating_Price_date_time_Container,
              {width: RFValue(40), marginHorizontal: MARGIN.smMargin},
            ]}>
            <Text style={[style.textSmallContentBold, {color: COLORS.star}]}>
              {' '}
              {rating}
            </Text>
            <Stars />
          </View>
          <View style={styles.rating_Price_date_time_Container}>
            <Text
              style={[style.textSmallContentBold, {color: COLORS.darkGray2}]}>
              {price} جنية
            </Text>
          </View>
        </View>
        <View style={[styles.threeSubContainer, {alignItems: 'center'}]}>
          <Text style={[style.textSmallContent, , {color: COLORS.darkGray2}]}>
            {speciality}
          </Text>
        </View>
        <View
          style={[
            styles.threeSubContainer,
            {paddingHorizontal: PADDINGS.xsPadding},
          ]}>
          <View
            style={{
              width: RFValue(110),
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: MARGIN.smMargin,
            }}>
            <FontAwesome name="calendar" size={ICONS.smIcon} />
            <Text style={style.textSmallContentBold}>{date}</Text>
          </View>
          <View
            style={{
              width: RFValue(80),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Ionicons name="time-outline" size={ICONS.smIcon} />
            <Text style={style.textSmallContentBold}>
              {time} {''}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  threeSubContainer: {
    height: RFValue(30),
    flexDirection: 'row',
  },
  nameContainer: {
    maxWidth: RFValue(90),
    maxHeight: RFValue(16),
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rating_Price_date_time_Container: {
    flexDirection: 'row',
    minWidth: RFValue(50),
    alignItems: 'center',
  },
  extraStyleTime: {
    width: RFValue(75),
    justifyContent: 'space-between',
    marginLeft: MARGIN.mdMargin,
  },
  extraStyleCelender: {
    width: RFValue(100),
    justifyContent: 'space-between',
    marginRight: MARGIN.mdMargin,
  },
});
