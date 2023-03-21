import {StyleSheet, Text, View, Alert, Pressable, Image} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  PADDINGS,
  MARGIN,
  ICONS,
  RADIUS,
} from '../../../../src/constants/Constants';
import {style} from '../../../../src/styles/Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {DoctorsData} from '../../../../src/utils';
import Images from '../../../../src/constants/Images';
const HeaderHomeDoctor = () => {
  const navigation = useNavigation();
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
          <Image source={{uri:'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae'}}
           style={styles.userImage} />
        </Pressable>
        <View style={styles.textConatiner}>
          <Text style={style.textContent}> مرحبا</Text>
          <Text style={style.textContentBold}>
            {'د ' + DoctorsData[0].name}
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
