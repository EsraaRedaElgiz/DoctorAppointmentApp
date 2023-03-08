import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SearchBar, ListSpecialitySearch} from '../../components/Search';
import {style} from '../../styles/Style';

const SpecialitySearch = () => {
  return (
    <>
      <View style={style.bigContainer}>
      <SearchBar placeholder="البحث عن التخصصات" />
        <ListSpecialitySearch />
      </View>
    </>
  );
};

export default SpecialitySearch;

const styles = StyleSheet.create({});
