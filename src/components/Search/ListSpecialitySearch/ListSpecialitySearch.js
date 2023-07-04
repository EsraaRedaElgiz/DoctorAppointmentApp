import {Pressable, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../../constants/Constants';
import {SpecialityData} from '../../../utils';
import {style} from '../../../styles/Style';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigation} from '@react-navigation/native';
import { getSpecialityDoctors } from '../../../Redux/Reducers/SpecialitySearchSlice';
import { useDispatch } from 'react-redux';
const ListSpecialitySearch = ({SpecialtyFilterd}) => {
  const navigation = useNavigation();
  const dispatch=useDispatch();
  return (
    <>
    
      <FlatList
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={SpecialtyFilterd}
        contentContainerStyle={{
          marginTop: MARGIN.mdMargin,
          padding: RFValue(2),
          paddingLeft: MARGIN.xsMargin,
          paddingRight: RFValue(4),
          paddingBottom:RFValue(15)
        }}
        renderItem={(itemData, index) => (
          <>
            <Pressable
              style={styles.container}
              onPress={() => {
                dispatch(getSpecialityDoctors(JSON.parse(itemData.item.specialty_id))).unwrap().then((res) => {
                  if(res==true){
                    navigation.navigate('DoctorsSearch', {
                      SpecialityArray: itemData.item,
                    });
                  }
                })
              }}>
              <View style={styles.imageConatiner}>
                <Image
                  source={{uri:itemData.item.specialty_image}}
                  style={
                    itemData.item.id == 8
                      ? styles.alternativeImage
                      : styles.image
                  }
                />
              </View>
              <View style={{maxHeight: RFValue(20)}}>
                <Text style={style.textContentBold}>{itemData.item.specialty_name}</Text>
              </View>
            </Pressable>
          </>
        )}
      />
    </>
  );
};

export default ListSpecialitySearch;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: RFValue(150),
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    borderRadius: RADIUS.smRadius,
    marginRight: '4.5%',
    marginBottom: MARGIN.mdMargin,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageConatiner: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RADIUS.xlRadius,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: RFValue(3),
  },
  image: {
    width: RFValue(50),
    height: RFValue(50),

    borderRadius: RADIUS.mdRadius,
  },
  alternativeImage: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RADIUS.mdRadius,
  },
});
