import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListDoctorsSearch, SearchBar} from '../../components/Search';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/Constants';
const DoctorsSearch = ({navigation}) => {
  const route=useRoute()
  const SpecialityArray=route.params.SpecialityArray
  return (
    <>
      <View style={[style.bigContainer, {paddingBottom: RFValue(100)}]}>
        <HeaderNavigation
          title={SpecialityArray.title}
          onPress={() => {
            navigation.goBack();
          }}
          color={COLORS.darkGray3}
        />
        <SearchBar placeholder="البحث عن الأطباء" />
        <ListDoctorsSearch />
      </View>
    </>
  );
};

export default DoctorsSearch;

const styles = StyleSheet.create({});
