import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {DoctorsData} from '../../../utils';
import {style} from '../../../styles/Style';
import {COLORS, ICONS, PADDINGS} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-stock-star-rating';
import {useDispatch, useSelector} from 'react-redux';
import {getRate} from '../../../Redux/Reducers/GetRateSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../../constants/Images';
const TopDoctors = () => {
  const navigation = useNavigation();
  const globalState = useSelector(state => state);
  const dispatch = useDispatch();
  const {topDoctors, isLoading} = globalState.TopDoctorReducer;
  // TO SHOW JUST 5 RATING
  const filterArray = topDoctors.filter(el => el.rating == 5);
  return (
    <>
      {isLoading ? (
        <View style={style.viewForActivityIndicatorStyle}>
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        </View>
      ) : (
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
                dispatch(getRate({doctor_id: itemData.item.doctor_id}));
                navigation.navigate('DoctorProfile', {
                  DoctorArray: itemData.item,
                });
              }}>
              {/* ImageOnCards */}
              <View style={style.imageContainerStyle}>
                {itemData.item.user_image != null &&itemData.item.user_image !="" ? (
                  <Image
                    source={{uri: itemData.item.user_image}}
                    style={style.imageCard}
                  />
                ) : (
                  <Image
                    source={Images.doctorDefult}
                    style={style.imageCard}
                  />
                )}
              </View>
              {/* TextOnCards */}
              <View style={style.textsCardConatiner}>
                <Text
                  style={[
                    style.textContentBold,
                    {
                      color: COLORS.darkGray3,
                      fontWeight: 'normal',
                      textAlign: 'left',
                    },
                  ]}>
                  {itemData.item.user_first_name}{' '}
                </Text>
                <Text
                  style={[style.textSmallContent, {color: COLORS.darkGray2}]}>
                  {'طبيب ' + itemData.item.speciality_name}{' '}
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
      )}
    </>
  );
};

export default TopDoctors;

const styles = StyleSheet.create({});
