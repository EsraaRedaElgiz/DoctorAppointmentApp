import {ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {
  FONTS,
  MARGIN,
  PADDINGS,
  RADIUS,
  COLORS,
} from '../../constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {ListTiltle} from '../../components/Home';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
const BookAppointment = ({navigation}) => {
  const data = [
    {id: 1, txt: 'نقدى', isChecked: false},
    {id: 2, txt: 'بطاقه', isChecked: false},
  ];
  const [dataUpdatad, setdataUpdatad] = useState(data);

  const handleChange = id => {
    for (let i = 0; i < dataUpdatad.length; i++) {
      dataUpdatad[i].isChecked = false;
    }

    let temp = dataUpdatad.map(product => {
      if (id === product.id) {
        return {...product, isChecked: !product.isChecked};
      }
      return product;
    });
    setdataUpdatad(temp);
  };

  return (
    <View style={[style.bigContainer, {flex: 1}]}>
      <HeaderNavigation
        title="حجز الميعاد"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: PADDINGS.smPadding}}>
        <ListTiltle Title="التاريخ" />
        {/* FlatList Days */}
        <View style={styles.flatListDaysContainer}>
          {/* design item */}
          <View style={styles.dayConatiner}>
            <View style={styles.num_day_contanier}>
              <Text style={style.textContentBold}>4</Text>
            </View>
            <View style={styles.num_day_contanier}>
              <Text style={style.textContentBold}>الخميس</Text>
            </View>
          </View>
        </View>
        {/* FlatList Times */}
        <ScrollView>
          <View style={styles.flatListTimesContainer}>
            {/* design Item */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>10:00</Text>
              <Text style={styles.timeTextStyle}>مساء</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>9:00</Text>
              <Text style={styles.timeTextStyle}>صباحا</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTextStyle}>10:00</Text>
              <Text style={styles.timeTextStyle}>مساء</Text>
            </View>
          </View>
        </ScrollView>
        <ListTiltle Title="طريقة الدفع" />
        <FlatList
          horizontal
          contentContainerStyle={styles.flatListCheckBoxsContainer}
          data={dataUpdatad}
          renderItem={({item}) => (
            <View style={styles.checkBox_titleConatiner}>
              <CheckBox
                value={item.isChecked}
                onChange={() => {
                  handleChange(item.id);
                }}
                tintColors={{true: COLORS.blue, false: COLORS.black}}
              />
              <Text style={[style.textContentBold, {fontSize: RFValue(14)}]}>
                {item.txt}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <GeneralButton
        title="حجز"
        onPress={() => {
          navigation.navigate("PaymentCash")
          // navigation.navigate('PaymentCreditCard');
        }}
      />
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  dayConatiner: {
    width: RFValue(55),
    height: RFValue(75),
    borderRadius: RADIUS.smRadius,
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    marginRight: MARGIN.mdMargin,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: PADDINGS.mdPadding,
  },
  dayTextStyle: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    fontWeight: 'bold',
  },
  flatListDaysContainer: {
    flexDirection: 'row',
    padding: RFValue(2),
    marginVertical: MARGIN.mdMargin,
  },
  flatListTimesContainer: {
    width: '98%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: RFValue(2),
    alignSelf: 'center',
  },
  flatListCheckBoxsContainer: {
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: PADDINGS.smPadding,
  },
  num_day_contanier: {
    flex: RFValue(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    width: RFValue(96),
    height: RFValue(35),
    borderRadius: RADIUS.smRadius,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: RFValue(17),
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    marginRight: MARGIN.smMargin,
    marginBottom: MARGIN.mdMargin,
  },
  timeTextStyle: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    fontFamily: FONTS.Amaranth,
  },
  checkBox_titleConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
