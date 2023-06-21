import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  Header,
  CovidCard,
  ListTiltle,
  SpecialityList,
  TopDoctors,
} from '../../components/Home';

import {
  COLORS,
  PADDINGS,
  USER_DATA,
  USER_TOKEN,
} from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalDetails } from '../../Redux/Reducers/PersonalDetailsSlice';
import { RFValue } from 'react-native-responsive-fontsize';
import { getTopDoctors } from '../../Redux/Reducers/TopDoctorSlice';
import { getSpecialities } from '../../Redux/Reducers/GetSpecialitiesSlice';

const Home = ({ navigation }) => {
  const globalState = useSelector(state => state);

  const dispatch = useDispatch();
  const { userInfo } = globalState.LoginReducer;
  const { isLoading, name, image } = globalState.PersonalDetailsReducer;
  useEffect(() => {
    //getToken()
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getPersonalDetails())
        .unwrap()
        .then(res => { })
        .catch(err => { });
        dispatch(getSpecialities()).unwrap().then((res) => {
          //console.log(res)
        })
      dispatch(getTopDoctors());
      
    });
    return unsubscribe;
  }, [navigation]);

  const getToken = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    const data = await AsyncStorage.getItem(USER_DATA);
    console.log('token => ', token);
    console.log('data => ', data);
    //console.log("userinfo",userInfo)
  };

  return (
    <>
      {isLoading == true ? (
        <View
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        </View>
      ) : isLoading == false && name != '' ? (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
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
      ) : (
        <View
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>حدث خطأ اثناء الاتصال بالانترنت</Text>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
