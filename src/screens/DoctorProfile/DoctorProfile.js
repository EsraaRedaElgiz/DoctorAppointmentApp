import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Modal,
  Button,
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
} from '../../constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView from 'react-native-maps';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import {style} from '../../styles/Style';
import {DoctorsData} from '../../utils';
import {ListTiltle} from '../../components/Home';
import {Stars} from '../../components/Search';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
const DoctorProfile = () => {
  const [visiableAddReview, setVisiableAddReview] = useState(false);
  
  const region = {
    latitude: 30.033333,
    longitude: 31.233334,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <>
      <ScrollView style={{backgroundColor: COLORS.white}}>
        {/* image */}
        <Image
          source={DoctorsData[0].image}
          style={{width: '100%', height: RFValue(300)}}
        />

        {/* NameAndSpecialty */}
        <View style={styles.textsContainer}>
          <Text style={style.textTitleBold}>الدكتور سامى محمد</Text>
          <Text style={style.textContent}>أمراض النساء والتوليد</Text>
        </View>

        {/* Card */}
        <Cards />

        <View style={styles.About_Location_Reviews}>
          {/* About */}
          <Text style={style.textTitleBold}>حول</Text>
          <View style={styles.aboutStyleContainer}>
            <Text style={style.textSmallContentBold}>
              {DoctorsData[0].about}
            </Text>
          </View>
          {/* Location */}
          <Text style={[style.textTitleBold, {marginTop: MARGIN.mdMargin}]}>
            الموقع
          </Text>
          {/* navigate to map page */}
          <Pressable style={styles.PreviewMap}>
            <MapView initialRegion={region} style={{flex: 1}}></MapView>
          </Pressable>

          {/* Review */}
          <ListTiltle
            Title="التقييمات"
            seeAll="اضافه تقييم"
            onPress={() => {
              setVisiableAddReview(true);
            }}
            styleProp={{height:RFValue(40)}}
          />
          <ScrollView horizontal>
            <View
              style={{
                flexDirection: 'row',
                padding: PADDINGS.xsPadding,
                marginBottom: MARGIN.smMargin,
              }}>
              {DoctorsData[0].Review.map((item, index) => {
                return (
                  <>
                    <View style={styles.reviewCard}>
                      <View style={styles.img_name_ratingContainer}>
                        <View style={{flex: 1, marginRight: MARGIN.smMargin}}>
                          <Text style={style.textSmallContentBold}>
                            {item.name}
                          </Text>
                          <View style={{flexDirection: 'row-reverse'}}>
                            {item.rating.map((itemRating, index) => {
                              return (
                                <>
                                  <Stars />
                                </>
                              );
                            })}
                          </View>
                        </View>
                        <Image source={item.img} style={styles.imgReview} />
                      </View>
                      <View style={styles.CommentStyle}>
                        <Text style={style.textSmallContent}>
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <GeneralButton
        title="حجز "
        style={{
          width: '90%',
          alignSelf: 'center',
        }}
        onPress={() => {
          alert('GO to Book oppintemet');
        }}
      />
      <ReviewModal
        visiableAddReview={visiableAddReview}
        setVisiableAddReview={setVisiableAddReview}
      />
      
    </>
  );
};
const Cards = () => {
  const icons = [
    {
      id: 1,
      name: 'user-friends',
      number: 1000,
      text: 'المرضي',
    },
    {
      id: 2,
      name: 'medal',
      number: 10,
      text: 'خبره',
    },
    {
      id: 3,
      name: 'star',
      number: 4.5,
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
                  <Text style={styles.textCard}>{item.number}</Text>
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
    maxHeight: RFValue(100),
  },
});
