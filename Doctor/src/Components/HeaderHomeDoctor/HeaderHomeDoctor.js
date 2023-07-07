import {StyleSheet, Text, View, Alert, Pressable, Image} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  PADDINGS,
  MARGIN,
  ICONS,
  RADIUS,
  USER_DATA,
} from '../../../../src/constants/Constants';
import {style} from '../../../../src/styles/Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {DoctorsData} from '../../../../src/utils';
import Images from '../../../../src/constants/Images';
import {useDispatch, useSelector} from 'react-redux';
import {getRate} from '../../../../src/Redux/Reducers/GetRateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HeaderHomeDoctor = () => {
  let curHr = new Date().getHours();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const globalState = useSelector(state => state);
  const {name, image} = globalState.DoctorDetailsReducer;
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString('default', {month: 'long'});
  let year = date.getFullYear();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.image_userNameContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('DoctorViewProfile');
          }}>
          {image ? (
            <Image
              source={{uri: image}}
              style={styles.userImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={Images.doctorDefult}
              style={styles.userImage}
              resizeMode="center"
            />
          )}
        </Pressable>
        <View style={styles.textConatiner}>
          <Text style={style.textContent}>
            {curHr < 12 ? 'صباح الخير' : 'مساء الخير'}
          </Text>
          <Text style={[style.textContentBold, {textAlign: 'left'}]}>
            {name.trim().substring(0, name.indexOf(' '))==""?name.trim():name.trim().substring(0, name.indexOf(' '))}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: RFValue(120),
          height: '100%',
          justifyContent: 'center',
        }}>
        <Text style={[style.textContentBold, {fontSize: RFValue(14)}]}>
          {day + '\t' + month + '\t' + year}
        </Text>
      </View>
    </View>
  );
};

export default HeaderHomeDoctor;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: RFValue(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: PADDINGS.xsPadding,
    paddingHorizontal: PADDINGS.mdPadding,
    backgroundColor: COLORS.white,
  },
  image_userNameContainer: {
    minWidth: RFValue(120),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RADIUS.xlRadius,
    marginRight: MARGIN.smMargin,
  },
  textConatiner: {
    Width: RFValue(50),
    height: RFValue(50),
    justifyContent: 'space-around',
    paddingVertical: PADDINGS.xsPadding,
  },

  searchIconStyle: {
    width: RFValue(60),
    height: RFValue(100),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
