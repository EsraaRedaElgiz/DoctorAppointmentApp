import {FlatList, Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DoctorsData} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {RADIUS, COLORS, MARGIN, FONTS} from '../../../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Stars from '../../Stars/Stars';
import {style} from '../../../styles/Style';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigation} from '@react-navigation/native';
const ListDoctorsSearch = () => {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: RFValue(2)}}
        style={{marginTop: MARGIN.mdMargin, marginBottom: RFValue(40)}}
        data={DoctorsData}
        renderItem={(itemData, index) => (
          <>
            <Pressable
              style={style.CardContainer}
              onPress={() => {
                navigation.navigate("DoctorProfile")
              }}>
              <View style={style.imageContainerStyle}>
                <Image source={itemData.item.image} style={style.imageCard} />
              </View>
              <View style={style.textsCardConatiner}>
                <Text style={style.textContentBold}>
                  الدكتور {itemData.item.name.trim()}{' '}
                </Text>
                <Text style={style.textContent}>
                  {itemData.item.price} جنيه
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {itemData.item.rating.map(() => {
                    return (
                      <>
                        <Stars />
                      </>
                    );
                  })}
                </View>
              </View>
            </Pressable>
          </>
        )}
      />
    </>
  );
};

export default ListDoctorsSearch;

const styles = StyleSheet.create({
  CardContainer: {
    width: '100%',
    height: RFValue(115),
    flexDirection: 'row',
    marginBottom: MARGIN.smMargin,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.smRadius,
    elevation: RFValue(4),
  },
  imageStyle: {
    width: RFValue(100),
    height: '100%',
    borderRadius: RFValue(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textsConatiner: {
    width: '100%',
    height: RFValue(75),
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginLeft: MARGIN.smMargin,
  },
  textTitle: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
  },
});
