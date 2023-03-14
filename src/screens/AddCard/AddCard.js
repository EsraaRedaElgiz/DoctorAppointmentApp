import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
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
  const [payment, setPayment] = useState([
    {image: require('../../assets/Images/paypal.png')},
    {image: require('../../assets/Images/masterCard.png')},
    {image: require('../../assets/Images/visa.jpg')},
    {image: require('../../assets/Images/applePay.png')},
  ]);
  return (
    <GeneralPage>
      <HeaderNavigation
        title="اضافه بطاقة"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
        <View style={styles.inputView}>
          <Reusabletextinput
            placeholder="حامل البطاقة"
            bordercolor={COLORS.gray}
          />
        </View>
        <View style={styles.inputView}>
          <Reusabletextinput
            placeholder="رقم البطاقة"
            bordercolor={COLORS.gray}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.inputView,
              styles.smallTextInput,
              {marginRight: RFValue(20)},
            ]}>
            <Reusabletextinput
              placeholder="التاريخ"
              bordercolor={COLORS.gray}
            />
          </View>
          <View style={[styles.inputView, styles.smallTextInput]}>
            <Reusabletextinput
              placeholder="رقم تأكيد البطاقة"
              bordercolor={COLORS.gray}
            />
          </View>
        </View>
        <View style={styles.button}>
          <GeneralButton
            title="تأكيد"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </GeneralPage>
  );
}

export default AddCard;
