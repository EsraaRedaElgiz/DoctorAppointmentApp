import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../../../src/constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import {style} from '../../../../src/styles/Style';
import {DoctorsData} from '../../../../src/utils';
import {Rating} from 'react-native-stock-star-rating';
import {ListTiltle} from '../../../../src/components/Home';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import {useNavigation} from '@react-navigation/native';

// import {useRoute} from '@react-navigation/native';
const DoctorViewProfile = ({navigation}) => {
  //const navigation = useNavigation();
  const region = {
    latitude: 30.033333,
    longitude: 31.233334,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  //   const route = useRoute();
  //   const DoctorArray = route.params.DoctorArray;
  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <ScrollView
          style={{backgroundColor: COLORS.white}}
          showsVerticalScrollIndicator={false}>
          {/* image */}

          <ImageBackground
            source={DoctorsData[0].image}
            style={{width: '100%', height: RFValue(300)}}>
            <HeaderNavigation
              padding={PADDINGS.mdPadding}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </ImageBackground>

          {/* NameAndSpecialty */}
          <View style={styles.textsContainer}>
            <Text style={style.textTitleBold}>
              {'د\t' + DoctorsData[0].name}
            </Text>
            <Text
              style={[
                style.textContent,
                {
                  color: COLORS.darkGray2,
                },
              ]}>
              {DoctorsData[0].specialtiy}
            </Text>
          </View>

          {/* Card */}
          <CardsDoctor data={DoctorsData[0]} />

          <View style={styles.About_Location_Reviews}>
            {/* About */}
            <Text style={style.textTitleBold}>حول</Text>
            <View style={styles.aboutStyleContainer}>
              <Text style={style.textSmallContent}>{DoctorsData[0].about}</Text>
            </View>
            {/* Location */}
            <Text style={[style.textTitleBold, {marginTop: MARGIN.mdMargin}]}>
              الموقع
            </Text>
            {/* navigate to map page */}
            <Text
              style={[style.textContent, {marginVertical: MARGIN.smMargin}]}>
              {DoctorsData[0].address}
            </Text>
            <Pressable style={styles.PreviewMap}>
              <MapView initialRegion={region} style={{flex: 1}}></MapView>
            </Pressable>

            {/* Review */}
            <ListTiltle Title="التقييمات" styleProp={{height: RFValue(40)}} />
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
              }}>
              <FlatList
                contentContainerStyle={{
                  paddingLeft: RFValue(2),
                  paddingVertical: RFValue(2),
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={DoctorsData[0].Review}
                renderItem={(itemData, index) => {
                  return (
                    <>
                      <View style={styles.reviewCard}>
                        <View style={styles.img_name_ratingContainer}>
                          <View style={{flex: 1, marginRight: MARGIN.smMargin}}>
                            <Text style={style.textSmallContentBold}>
                              {itemData.item.name}
                            </Text>
                            <View style={{flexDirection: 'row-reverse'}}>
                              <Rating
                                stars={itemData.item.rating}
                                maxStars={5}
                                size={ICONS.xsIcon}
                              />
                            </View>
                          </View>
                          <Image
                            source={itemData.item.img}
                            style={styles.imgReview}
                          />
                        </View>

                        <ScrollView
                          nestedScrollEnabled={true}
                          showsVerticalScrollIndicator={false}>
                          <Text style={style.textSmallContent}>
                            {itemData.item.comment}
                          </Text>
                        </ScrollView>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default DoctorViewProfile;
const CardsDoctor = props => {
  const {data} = props;
  const icons = [
    {
      id: 1,
      name: 'user-friends',
      number: data.numberOfPatients,
      text: 'المرضي',
    },
    {
      id: 2,
      name: 'medal',
      number: data.numOfexperience,
      text: 'خبرة',
    },
    {
      id: 3,
      name: 'star',
      number: data.rating,
      text: 'التقييم',
    },
  ];
  return (
    <>
      <View style={styles.cardsContainer}>
        {icons.map((item, index) => {
          return (
            <>
              <View key={item.id.toString()} style={styles.card}>
                <View style={styles.iconContainer}>
                  <FontAwesome5
                    name={item.name}
                    size={ICONS.xxlIcon}
                    color={COLORS.white}
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.textCard}>
                    {item.id == 2 ? item.number + '\tسنوات' : item.number}
                  </Text>
                  <Text style={styles.textCard}>{item.text}</Text>
                </View>
              </View>
            </>
          );
        })}
      </View>
    </>
  );
};
export {CardsDoctor};

const styles = StyleSheet.create({
  textsContainer: {
    width: '100%',
    height: RFValue(50),
    marginVertical: MARGIN.mdMargin,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardsContainer: {
    width: '90%',
    height: RFValue(140),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: RFValue(90),
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: RADIUS.smRadius,
    alignItems: 'center',
    elevation: RFValue(3),
  },
  iconContainer: {
    width: RFValue(62),
    height: RFValue(77),
    backgroundColor: COLORS.blue,
    borderBottomLeftRadius: RADIUS.smRadius,
    borderBottomRightRadius: RADIUS.smRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextContainer: {
    width: '100%',
    height: RFValue(50),
    alignItems: 'center',
    marginTop: MARGIN.mdMargin,
  },
  textCard: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.AmaranthRegular,
    lineHeight: RFValue(20),
    fontWeight: 'bold',
  },
  About_Location_Reviews: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: MARGIN.lgMargin,
  },
  aboutStyleContainer: {
    width: '100%',
    minHeight: RFValue(10),
    marginTop: MARGIN.smMargin,
  },
  PreviewMap: {
    width: '100%',
    height: RFValue(190),
    alignSelf: 'center',
    marginTop: MARGIN.smMargin,
    borderRadius: RADIUS.smRadius,
    overflow: 'hidden',
    elevation: 2,
  },
  reviewCard: {
    width: RFValue(130),
    height: RFValue(170),
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.smRadius,
    paddingHorizontal: PADDINGS.smPadding,
    marginRight: MARGIN.mdMargin,
    elevation: RFValue(3),
  },
  img_name_ratingContainer: {
    height: RFValue(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgReview: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
  },
  CommentStyle: {
    width: '100%',
    // maxHeight: RFValue(100),
  },
});
