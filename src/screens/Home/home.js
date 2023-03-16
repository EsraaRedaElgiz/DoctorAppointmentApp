import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Header,
  CovidCard,
  ListTiltle,
  SpecialityList,
  TopDoctors,
} from '../../components/Home';
import {COLORS, PADDINGS} from '../../constants/Constants';

const Home = ({navigation}) => {
  return (
    <>
      <View style={{backgroundColor: COLORS.white, flex: 1}}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CovidCard />
          <ListTiltle
            Title="التخصصات "
            seeAll="اظهار الكل"
            styleProp={{
              paddingHorizontal: PADDINGS.mdPadding,
            }}
            onPress={() => {
              navigation.navigate('SpecialitySearch');
            }}
          />
          <SpecialityList />
          <ListTiltle
            Title="افضل الأطباء"
            styleProp={{
              paddingHorizontal: PADDINGS.mdPadding,
            }}
          />
          <TopDoctors />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
