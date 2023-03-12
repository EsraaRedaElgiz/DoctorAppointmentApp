import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SpecialityData} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN, RADIUS} from '../../../constants/Constants';
import {style} from '../../../styles/Style';
import {useNavigation} from '@react-navigation/native';
const SpecialityList = () => {
  const navigation = useNavigation();
  const [specialtyDataUpdated, setSpecialtyDataUpdated] =
    useState(SpecialityData);
  return (
    <FlatList
      style={{marginBottom: MARGIN.smMargin, marginLeft: MARGIN.smMargin}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={specialtyDataUpdated}
      renderItem={(itemData, index) => (
        <Pressable
          style={styles.image_Text_Container}
          onPress={() => {
            navigation.navigate("DoctorsSearch")
          }}>
          {/* image */}
          <View style={styles.imageContainer}>
            <Image
              source={itemData.item.img}
              style={styles.imageStyle}
              resizeMode="center"
            />
          </View>

          {/* Specialty Text */}
          <Text style={style.textSmallContentBold}>{itemData.item.title}</Text>
        </Pressable>
      )}
    />
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
  textStyle: {
    fontSize: FONTS.h6,
    fontWeight: 'bold',
  },
});
