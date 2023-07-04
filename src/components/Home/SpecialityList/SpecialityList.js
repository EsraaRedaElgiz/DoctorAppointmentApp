import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { SpecialityData } from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, MARGIN, RADIUS } from '../../../constants/Constants';
import { style } from '../../../styles/Style';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialities } from '../../../Redux/Reducers/GetSpecialitiesSlice';
import { getSpecialityDoctors } from '../../../Redux/Reducers/SpecialitySearchSlice';
const SpecialityList = () => {
  const globalState = useSelector(state => state);
  const navigation = useNavigation();
  const { specialities, isLoading } = globalState.GetSpecialitiesReducer
  const dispatch = useDispatch();
  return (
    <>
      {isLoading ?
        <View
          style={styles.viewForActivityIndicatorstyle}>
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        </View> :
        <FlatList
          style={{ marginBottom: MARGIN.smMargin, marginLeft: MARGIN.smMargin }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={specialities.slice(0, 8)}
          renderItem={(itemData, index) => (
            <Pressable
              style={styles.image_Text_Container}
              onPress={() => {
                //عايزه لخليه هنا يعمل سيرش جوه التخصص
                dispatch(getSpecialityDoctors(JSON.parse(itemData.item.specialty_id))).unwrap().then((res) => {
                  if(res==true){
                    navigation.navigate('DoctorsSearch', {
                      SpecialityArray: itemData.item,
                    });
                  }
                })
                
              }}>
              {/* image */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: itemData.item.specialty_image }}
                  style={styles.imageStyle}
                  resizeMode="center"
                />
              </View>

              {/* Specialty Text */}
              <Text style={style.textSmallContentBold}>{itemData.item.specialty_name}</Text>
            </Pressable>
          )}
        />
      }

    </>
  );
};

export default SpecialityList;

const styles = StyleSheet.create({
  image_Text_Container: {
    minWidth: RFValue(80),
    height: RFValue(90),
    borderRadius: RADIUS.smRadius,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(30),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(3),
  },
  imageStyle: {
    width: RFValue(40),
    height: RFValue(40),
  },
  alternateImageStyle: {
    width: RFValue(60),
    height: RFValue(60),
  },
  textStyle: {
    fontSize: FONTS.h6,
    fontWeight: 'bold',
  }, viewForActivityIndicatorstyle: {
    backgroundColor: COLORS.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
