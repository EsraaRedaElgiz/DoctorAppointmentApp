import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ListDoctorsSearch, SearchBar} from '../../components/Search';
import {RFValue} from 'react-native-responsive-fontsize';
import { style } from '../../styles/Style';
const DoctorsSearch = () => {
  return (
    <>
      <View style={style.bigContainer}>
        <ListDoctorsSearch  />
      </View>
    </>
  );
};

export default DoctorsSearch;

const styles = StyleSheet.create({
});
