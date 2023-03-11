import React from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import Visa from '../../components/Visa/Visa';
import {COLORS, PADDINGS} from '../../constants/Constants';
import styles from './PaymentStyle';
import {useNavigation} from '@react-navigation/native';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
function Payment(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="الدفع"
        padding={PADDINGS.mdPadding}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingHorizontal: PADDINGS.mdPadding,
        }}>
        <Visa visa />
        <Visa master />
      </ScrollView>
      <View style={styles.buttonView}>
        <GeneralButton
          title="اضافة بطاقة"
          onPress={() => {
            navigation.navigate('AddCard');
          }}
        />
      </View>
    </View>
  );
}

export default Payment;
