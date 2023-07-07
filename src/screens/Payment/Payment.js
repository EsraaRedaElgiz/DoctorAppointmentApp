import React, {useEffect} from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import Visa from '../../components/Visa/Visa';
import {COLORS, PADDINGS, USER_DATA} from '../../constants/Constants';
import styles from './PaymentStyle';
import {useNavigation} from '@react-navigation/native';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {useSelector, useDispatch} from 'react-redux';
import {getPaymentCard} from '../../Redux/Reducers/PaymentCardSlice';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Payment(props) {
  const globalState = useSelector(state => state);
  const {cards, isLoading} = globalState.PaymentCardReducer;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getData = async () => {
    let data = await AsyncStorage.getItem(USER_DATA);
    data = JSON.parse(data).user_id;
    dispatch(getPaymentCard(data));
    // console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const appendSpace = string => {
    const newString = string.replaceAll(' ', '      ');
    return newString;
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="الدفع"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
      />
      <View style={{flex: 1, paddingHorizontal: PADDINGS.mdPadding}}>
        {isLoading ? (
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        ) : Array.isArray(cards) &&cards.length>0? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cards}
            renderItem={({item}) => {
              return (
                <Visa
                  master
                  name={item.card_holder}
                  cardNumber={appendSpace(item.card_number)}
                  date={item.card_exp_date}
                />
              );
            }}
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>لا يوجد بطاقة دفع حتي الأن</Text>
          </View>
        )}
      </View>
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
