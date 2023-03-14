import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListDoctorsSearch, SearchBar} from '../../components/Search';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import { COLORS } from '../../constants/Constants';
const DoctorsSearch = ({navigation}) => {
  return (
    <>
      <View style={[style.bigContainer, {paddingBottom: RFValue(100)}]}>
        <HeaderNavigation
          title=" طبيب الأسنان"
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
