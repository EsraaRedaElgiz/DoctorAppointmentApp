import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SearchBar, ListSpecialitySearch} from '../../components/Search';
import {style} from '../../styles/Style';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
import { SpecialityData } from '../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../../constants/Constants';


const SpecialitySearch = ({navigation}) => {
  return (
    <>
      <View style={[style.bigContainer,{paddingBottom:RFValue(100)}]}>
      <HeaderNavigation
        title= " البحث"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack()
        }}
      />
      <SearchBar placeholder="البحث عن التخصصات"  />
        <ListSpecialitySearch />
      </View>
    </>
  );
};

export default SpecialitySearch;

const styles = StyleSheet.create({});
