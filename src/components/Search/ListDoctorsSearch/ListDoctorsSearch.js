import {FlatList, Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DoctorsData} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  RADIUS,
  COLORS,
  MARGIN,
  FONTS,
  ICONS,
} from '../../../constants/Constants';
import {style} from '../../../styles/Style';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-stock-star-rating';
const ListDoctorsSearch = () => {
  const navigation = useNavigation();

  const sortedArray = DoctorsData.sort(compare);
  function compare(a, b) {
    const ARating = a.rating;
    const BRating = b.rating;
    return BRating - ARating;
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: RFValue(2)}}
        style={{marginTop: MARGIN.mdMargin}}
        data={sortedArray}
        renderItem={(itemData, index) => (
          <>
            <Pressable
              style={style.CardContainer}
              onPress={() => {
                navigation.navigate('DoctorProfile');
              }}>
              <View style={style.imageContainerStyle}>
                <Image source={itemData.item.image} style={style.imageCard} />
              </View>
              <View style={style.textsCardConatiner}>
                <Text
                  style={[style.textContentBold, {color: COLORS.darkGray3,fontWeight:'normal'}]}>
                  د.{itemData.item.name.trim()}{' '}
                </Text>
                <Text style={[style.textContent, {color: COLORS.darkGray2}]}>
                  {itemData.item.price} جنيه
                </Text>
                <Rating
                  stars={itemData.item.rating}
                  maxStars={5}
                  size={ICONS.smIcon}
                />
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
