import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {
  Header,
  CovidCard,
  ListTiltle,
  SpecialityList,
  TopDoctors,
} from '../../components/Home';
import {COLORS, PADDINGS, USER_DATA, USER_TOKEN} from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {
  const globalState = useSelector(state => state);
  const { userInfo } = globalState.LoginReducer;
  useEffect(() => {
    getToken()
  }, [])

  const getToken = async ()=> {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    const data = await AsyncStorage.getItem(USER_DATA);
    console.log('token => ', token);
    console.log('data => ', data);
    //console.log("userinfo",userInfo)
  }



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
