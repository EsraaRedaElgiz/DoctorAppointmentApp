import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Modal,
  Button,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {Marker} from 'react-native-maps';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {style} from '../../styles/Style';
import {DoctorsData} from '../../utils';
import {ListTiltle} from '../../components/Home';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import {Rating} from 'react-native-stock-star-rating';
import {useRoute} from '@react-navigation/native';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../constants/Images';
import { getRate } from '../../Redux/Reducers/GetRateSlice';
const DoctorProfile = ({navigation}) => {
  const [visiableAddReview, setVisiableAddReview] = useState(false);
  const [visiableMap, setvisiableMap] = useState(false);
  const globalState = useSelector(state => state);
  const dispatch=useDispatch();
  const {isLoading, rates} = globalState.GetRateReducer;

  const route = useRoute();
  const DoctorArray = route.params.DoctorArray;
  useEffect(()=>{
    dispatch(getRate({ 'doctor_id': DoctorArray.doctor_id }))
  },[])
  const openMap = (latitude, longitude) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    );
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <ScrollView
          style={{backgroundColor: COLORS.white}}
          showsVerticalScrollIndicator={false}>
          {/* image */}
          {DoctorArray.user_image ? (
            <ImageBackground
              source={{uri: DoctorArray.user_image}}
              style={{width: '100%', height: RFValue(300)}}>
              <HeaderNavigation
                padding={PADDINGS.mdPadding}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </ImageBackground>
          ) : (
            <ImageBackground
              source={Images.doctorDefult}
              style={{width: '100%', height: RFValue(300)}}>
              <HeaderNavigation
                padding={PADDINGS.mdPadding}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </ImageBackground>
          )}

          {/* NameAndSpecialty */}
          <View style={styles.textsContainer}>
            <Text style={style.textTitleBold}>
              {DoctorArray.user_first_name}
            </Text>
            <Text
              style={[
                style.textContent,
                {
                  color: COLORS.darkGray2,
                },
              ]}>
              {DoctorArray.speciality_name}
            </Text>
          </View>
          {/* Card */}
          <Cards data={DoctorArray} />
          <View style={styles.About_Location_Reviews}>
            {/* About */}
            <Text style={style.textTitleBold}>حول</Text>
            <View style={styles.aboutStyleContainer}>
              <Text style={style.textSmallContent}>
                {DoctorArray.doctor_about}
              </Text>
            </View>
            {/* Location */}
            <Text style={[style.textTitleBold, {marginTop: MARGIN.mdMargin}]}>
              الموقع
            </Text>
            {/* navigate to map page */}
            <Text
              style={[style.textContent, {marginVertical: MARGIN.smMargin}]}>
              {DoctorArray.clinic.branch_address}
            </Text>

            <Pressable
              style={styles.PreviewMap}
              onPress={() => {
                openMap(
                  DoctorArray.clinic.latitude,
                  DoctorArray.clinic.longitude,
                );
              }}>
              <ImageBackground
                source={Images.mapImage}
                style={{
                  flex: 1,
                }}></ImageBackground>
            </Pressable>

            {/* Review */}
            <ListTiltle
              Title="التقييمات"
              seeAll="اضافه تقييم"
              onPress={() => {
                setVisiableAddReview(true);
              }}
              styleProp={{height: RFValue(40)}}
            />
            <View
              style={{
                width: '100%',
                alignItems: 'flex-start',
              }}>
              {isLoading ? (
                <View style={styles.viewForActivityIndicator}>
                  <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
                </View>
              ) : rates.length > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    paddingLeft: RFValue(2),
                    paddingVertical: RFValue(2),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={rates}
                  renderItem={(itemData, index) => {
                    return (
                      <>
                        <View style={[styles.reviewCard]}>
                          <View style={styles.img_name_ratingContainer}>
                            <View
                              style={{flex: 1, marginRight: MARGIN.smMargin}}>
                              <Text style={style.textSmallContentBold}>
                                {itemData.item.user_first_name}
                              </Text>
                              <View style={{flexDirection: 'row-reverse'}}>
                                <Rating
                                  stars={itemData.item.rating.rating}
                                  maxStars={5}
                                  size={ICONS.xsIcon}
                                />
                              </View>
                            </View>
                            {itemData.item.user_image != null &&
                            itemData.item.user_image != '' ? (
                              <Image
                                //source={Images.userDefault}
                                source={{uri: itemData.item.user_image}}
                                style={styles.imgReview}
                                resizeMode="center"
                              />
                            ) : (
                              <Image
                                source={Images.userDefault}
                                style={styles.imgReview}
                                resizeMode="center"
                              />
                            )}
                          </View>
                          <ScrollView
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}>
                            <Text style={style.textSmallContent}>
                              {itemData.item.rating.rating_review}
                            </Text>
                          </ScrollView>
                        </View>
                      </>
                    );
                  }}
                />
              ) : (
                <View style={styles.viewForActivityIndicator}>
                  <Text>
                  لا يوجد تقيمات حتي الأن 
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <GeneralButton
          title="حجز "
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: MARGIN.mdMargin,
          }}
          onPress={() => {
            navigation.navigate('BookAppointment', {
              DoctorArray: DoctorArray,
            });
          }}
        />
      </View>
      <ReviewModal
        visiableAddReview={visiableAddReview}
        setVisiableAddReview={setVisiableAddReview}
        doctorArray={DoctorArray}
      />
    </>
  );
};
const Cards = props => {
  const {data} = props;
  const icons = [
    {
      id: 1,
      name: 'user-friends',
      number: data.num_of_patients, 
      text: 'المرضي',
    },
    {
      id: 2,
      name: 'medal',
      number: data.doctor_experience,
      text: 'خبرة',
    },
    {
      id: 3,
      name: 'star',
      number: data.rating!=0?data.rating.slice(0, 3):data.rating, 
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
export {Cards};

export default DoctorProfile;

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
    width: RFValue(150),
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
  viewForActivityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
  },
});
