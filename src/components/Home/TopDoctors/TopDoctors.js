import {StyleSheet, Text, View, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {DoctorsData} from '../../../utils';
import {style} from '../../../styles/Style';
import {COLORS, ICONS, PADDINGS} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-stock-star-rating';

const TopDoctors = () => {
  const navigation = useNavigation();
  
  // TO SHOW JUST 5 RATING
  const filterArray = DoctorsData.filter(el => el.rating == 5);
  return (
    <FlatList
      contentContainerStyle={{
        padding: RFValue(2),
        paddingHorizontal: PADDINGS.mdPadding,
      }}
      keyExtractor={(item, index) => index}
      data={filterArray}
      renderItem={(itemData, index) => (
        <Pressable
          style={style.CardContainer}
          onPress={() => {
            navigation.navigate('DoctorProfile');
          }}>
          {/* ImageOnCards */}
          <View style={style.imageContainerStyle}>
            <Image source={itemData.item.image} style={style.imageCard} />
          </View>

          {/* TextOnCards */}
          <View style={style.textsCardConatiner}>
            <Text style={[style.textContentBold, {color: COLORS.darkGray3,fontWeight:'normal'}]}>
              د.{itemData.item.name.trim()}{' '}
            </Text>
            <Text style={[style.textSmallContent, {color: COLORS.darkGray2}]}>
              طبيب {itemData.item.specialtiy.trim()}{' '}
            </Text>

            {/* Rating */}
            <Rating
              stars={itemData.item.rating}
              maxStars={5}
              size={ICONS.smIcon}
            />
          </View>
        </Pressable>
      )}
    />
  );
};

export default TopDoctors;

const styles = StyleSheet.create({});
