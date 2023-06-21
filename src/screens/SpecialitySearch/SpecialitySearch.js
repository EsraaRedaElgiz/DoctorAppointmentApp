import {StyleSheet, View} from 'react-native';
import React,{useState} from 'react';
import {SearchBar, ListSpecialitySearch} from '../../components/Search';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {SpecialityData} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../constants/Constants';
import { useSelector } from 'react-redux';

const SpecialitySearch = ({navigation}) => {
  const globalState = useSelector(state => state);
  const { specialities} = globalState.GetSpecialitiesReducer
  const [SpecialtyFilterd, setSpecialtyFilterd] = useState(specialities);
  return (
    <>
      <View style={[style.bigContainer,{flex:1}]}>
        <HeaderNavigation
          title=" البحث"
          color={COLORS.darkGray3}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SearchBar
          placeholder="البحث عن التخصصات"
          SpecialtyFilterd={SpecialtyFilterd}
          setSpecialtyFilterd={setSpecialtyFilterd}
          SpecialityData={specialities}
        />
        <ListSpecialitySearch SpecialtyFilterd={SpecialtyFilterd} />
      </View>
    </>
  );
};

export default SpecialitySearch;

const styles = StyleSheet.create({});
