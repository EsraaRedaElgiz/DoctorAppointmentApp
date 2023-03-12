import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListDoctorsSearch, SearchBar} from '../../components/Search';
import {RFValue} from 'react-native-responsive-fontsize';
import { COLORS } from '../../constants/Constants';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
const DoctorsSearch = ({navigation}) => {
  return (
    <>
      <View style={style.bigContainer}>
        <HeaderNavigation
          title=" طبيب الأسنان"
          color={COLORS.darkGray3}
          // backgroundColor="#f00"
          onPress={() => {
            navigation.goBack();
          }}
          
        />
        <SearchBar placeholder="البحث عن الأطباء" />
        <ListDoctorsSearch />
      </View>
    </>
  );
};

export default DoctorsSearch;

const styles = StyleSheet.create({});
