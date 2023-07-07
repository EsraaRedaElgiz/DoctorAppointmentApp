import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../../constants/Constants';
import Images from '../../../constants/Images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {style} from '../../../styles/Style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = props => {
  let curHr = new Date().getHours();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading, name, image} = globalState.PersonalDetailsReducer;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.image_userNameContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('MedicalID1');
          }}>
          {image ? (
            <Image source={{uri: image}} style={styles.userImage} />
          ) : (
            <View
              style={[
                styles.userImage,
                {
                  backgroundColor: COLORS.lightGray3,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Image source={Images.userDefault} style={styles.userImage} />
            </View>
          )}
        </Pressable>
        <View style={styles.textConatiner}>
          <Text style={style.textContent}>
            {curHr < 12 ? 'صباح الخير' : 'مساء الخير'}
          </Text>
          {isLoading ? (
            <ActivityIndicator size={RFValue(15)} color={COLORS.blue} />
          ) : name != '' ? (
            <Text style={[style.textContentBold, {textAlign: 'left'}]}>
              {name.trim().substring(0, name.indexOf(' '))==""?name.trim():name.trim().substring(0, name.indexOf(' '))}
            </Text>
          ) : (
            <Text style={[style.textContentBold, {textAlign: 'left'}]}>
              اسم المستخدم
            </Text>
          )}
        </View>
      </View>

      {/* SearchIcon */}
      <Pressable
        style={styles.searchIconStyle}
        onPress={() => {
          navigation.navigate('SpecialitySearch');
        }}>
        <FontAwesome
          name="search"
          size={ICONS.mdIcon}
          color={COLORS.darkGray}
        />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: RFValue(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: PADDINGS.xsPadding,
    paddingHorizontal: PADDINGS.mdPadding,
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
  },
  textConatiner: {
    Width: RFValue(50),
    height: RFValue(50),
    justifyContent: 'space-around',
    paddingVertical: PADDINGS.xsPadding,
    marginLeft: MARGIN.smMargin,
  },

  searchIconStyle: {
    width: RFValue(60),
    height: RFValue(100),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
