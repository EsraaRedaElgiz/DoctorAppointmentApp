import React from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import Visa from '../../components/Visa/Visa';
import {COLORS, PADDINGS} from '../../constants/Constants';
import styles from './PaymentStyle';

function Payment(props) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          padding: RFValue(10),
          marginBottom: RFValue(10),
        }}>
        <Visa visa />
        <Visa master />
      </ScrollView>
      <View style={styles.buttonView}>
        <GeneralButton title="اضافة بطاقة" />
      </View>
    </View>
  );
}

export default Payment;
