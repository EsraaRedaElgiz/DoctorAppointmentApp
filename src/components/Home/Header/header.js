import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
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
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.image_userNameContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('MedicalID1');
          }}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae',
            }}
            style={styles.userImage}
          />
        </Pressable>
        <View style={styles.textConatiner}>
          <Text style={style.textContent}> مرحبا</Text>
          <Text style={style.textContentBold}>محمد عبد الحميد</Text>
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
