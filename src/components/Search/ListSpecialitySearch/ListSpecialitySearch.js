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
const ListSpecialitySearch = () => {
  const [SpecialityDataUpdated, setSpecialityDataUpdated] =
    useState(SpecialityData);
  return (
    <>
     
      <FlatList
        horizontal={false}
        numColumns={2}
        style={{marginBottom: RFValue(40)}}
        showsVerticalScrollIndicator={false}
        data={SpecialityDataUpdated}
        renderItem={(itemData, index) => (
          <>
            <Pressable style={styles.container}>
              <View style={styles.imageConatiner}>
                <Image source={itemData.item.img} style={styles.image} />
              </View>
              <View style={{maxHeight: RFValue(20)}}>
                <Text style={style.textContentBold}>{itemData.item.title}</Text>
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
    width: '42%',
    height: RFValue(150),
    backgroundColor: COLORS.white,
    elevation: RFValue(3),
    paddingVertical: PADDINGS.mdPadding,
    borderRadius: RADIUS.smRadius,
    margin: MARGIN.mdMargin,
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
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RADIUS.mdRadius,
  },
});
