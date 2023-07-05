import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ListDoctorsSearch, SearchBar} from '../../components/Search';
import {style} from '../../styles/Style';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {useRoute} from '@react-navigation/native';
import {COLORS} from '../../constants/Constants';
import {DoctorsData} from '../../utils';
import {useSelector} from 'react-redux';
const DoctorsSearch = ({navigation}) => {
  const globalState = useSelector(state => state);
  const {specialityDoctors} = globalState.SpecialitySearchReducer;
  const route = useRoute();
  const SpecialityArray = route.params.SpecialityArray;
  const sortedArray = specialityDoctors;
  const FinalArray=[...sortedArray].sort(compare)
  function compare(a, b) {
    const ARating =JSON.parse(a.rating) ;
    const BRating =JSON.parse(b.rating) ;
    return BRating - ARating;
  }

  const [ArrayFilterd, setArrayFilterd] = useState(FinalArray);
  return (
    <>
      <View style={[style.bigContainer, {flex: 1}]}>
        <HeaderNavigation
          title={SpecialityArray.specialty_name}
          onPress={() => {
            navigation.goBack();
          }}
          color={COLORS.darkGray3}
        />
        <SearchBar
          placeholder="البحث عن الأطباء"
          ArrayFilterd={ArrayFilterd}
          setArrayFilterd={setArrayFilterd}
          sortedArray={sortedArray}
        />
        <ListDoctorsSearch
          sortedArray={sortedArray}
          ArrayFilterd={ArrayFilterd}
        />
      </View>
    </>
  );
};

export default DoctorsSearch;

const styles = StyleSheet.create({});
