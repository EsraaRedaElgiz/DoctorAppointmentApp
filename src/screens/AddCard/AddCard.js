import React, {Fragment, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {RFValue} from 'react-native-responsive-fontsize';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import VisaTypeCard from '../../components/VisaTypeCard/VisaTypeCard';
import {COLORS, FONTS, PADDINGS} from '../../constants/Constants';
import styles from './AddCardStyle';

const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {style} from '../../styles/Style';

function AddCard(props) {
  const navigation = useNavigation();
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = () => {
    reset();
    navigation.goBack();
  };
  const [payment, setPayment] = useState([
    {image: require('../../assets/Images/paypal.png')},
    {image: require('../../assets/Images/masterCard.png')},
    {image: require('../../assets/Images/visa.jpg')},
    {image: require('../../assets/Images/applePay.png')},
  ]);
  return (
    <Fragment>
      <HeaderNavigation
        backgroundColor={COLORS.white}
        title="اضافه بطاقة"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <GeneralPage>
        <View style={styles.container}>
          <Text style={[style.textContentBold, styles.title]}>طرق الدفع</Text>
          <View style={styles.visaTypeView}>
            {payment.map((el, idx) => {
              return <VisaTypeCard key={idx} image={el.image} />;
            })}
          </View>
          <Text style={[style.textContentBold, styles.title]}>
            املأ معلومات بطاقتك
          </Text>
          <Controller
            name="personName"
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <Reusabletextinput
                  placeholder="حامل البطاقة"
                  bordercolor={errors.personName ? '#f00' : COLORS.gray}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              );
            }}
          />
          <Text style={styles.errorTextStyle}>
            {errors.personName?.type === 'required'
              ? 'يجب ادخال اسم حامل البطاقة'
              : ''}
          </Text>
          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <Reusabletextinput
                  keyboardType="number-pad"
                  placeholder="رقم البطاقة"
                  bordercolor={errors.cardNumber ? '#f00' : COLORS.gray}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              );
            }}
          />
          <Text style={styles.errorTextStyle}>
            {errors.cardNumber?.type === 'required'
              ? 'يجب ادخال رقم البطاقة'
              : ''}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Controller
              rules={{
                required: true,
                validate:
                  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
              }}
              name="date"
              control={control}
              render={({field: {onBlur, onChange, value}}) => {
                return (
                  <View
                    style={[
                      styles.inputView,
                      styles.smallTextInput,
                      {marginRight: RFValue(20)},
                    ]}>
                    <Reusabletextinput
                      keyboardType="number-pad"
                      placeholder="التاريخ"
                      bordercolor={errors.date ? '#f00' : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                    <Text style={styles.errorTextStyle}>
                      {errors.date?.type === 'required'
                        ? 'يجب ادخال التاريخ'
                        : errors.date?.type === 'validate'
                        ? 'يجب ادخال تاريخ صحيح'
                        : ''}
                    </Text>
                  </View>
                );
              }}
            />
            <Controller
              rules={{
                required: true,
              }}
              name="number"
              control={control}
              render={({field: {onBlur, onChange, value}}) => {
                return (
                  <View style={[styles.inputView, styles.smallTextInput]}>
                    <View style={[styles.inputView, styles.smallTextInput]}>
                      <Reusabletextinput
                        keyboardType="number-pad"
                        placeholder="رقم تأكيد البطاقة"
                        bordercolor={errors.number ? '#f00' : COLORS.gray}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    </View>
                    <Text style={styles.errorTextStyle}>
                      {errors.number?.type === 'required'
                        ? 'يجب ادخال رقم تأكيد البطاقة'
                        : ''}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </GeneralPage>
      <View style={styles.button}>
        <GeneralButton title="تأكيد" onPress={handleSubmit(onSubmit)} />
      </View>
    </Fragment>
  );
}

export default AddCard;
