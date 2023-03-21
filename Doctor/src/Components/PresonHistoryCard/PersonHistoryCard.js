import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN} from '../../../../src/constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
const PersonHistoryCard = props => {
  const {name, done, time, imageUri, onPress} = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.wrap1}>
        <LinearGradient
          colors={[COLORS.blue, COLORS.lightBlue]}
          style={styles.section1}
        />
        <View style={styles.section2}>
          <Image
            style={styles.image}
            source={{
              uri: imageUri
                ? imageUri
                : 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=740&t=st=1678903589~exp=1678904189~hmac=4c4da7bf447127fcedc6c412bfd9c4ef385ae0c8aceeb9d11550b6b8d99eb7ae',
            }}
          />
          <View style={[styles.timeView, {alignItems: 'flex-start'}]}>
            <Text style={styles.name}>{name ? name : 'عبدالرحمن عياد'}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section3}>
        <View style={styles.timeView}>
          <Text
            style={[
              styles.confirmPendingText,
              {color: done ? COLORS.green : COLORS.red},
            ]}>
            {done ? ' مكتمل' : 'ملغى'}
          </Text>
        </View>
        <View
          style={[
            styles.verticalLine,
            {backgroundColor: done ? COLORS.green : COLORS.red},
          ]}
        />
      </View>
    </Pressable>
  );
};

export default PersonHistoryCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: RFValue(65),
    backgroundColor: COLORS.white,
    elevation: RFValue(2),
    borderRadius: RFValue(10),
    marginBottom: MARGIN.mdMargin,
    justifyContent: 'space-between',
  },
  wrap1: {
    flexDirection: 'row',
  },
  section1: {
    width: RFValue(10),
    borderTopRightRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    height: '100%',
    marginRight: MARGIN.smMargin,
  },
  section2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section3: {
    flexDirection: 'row',
  },
  image: {
    width: RFValue(48),
    height: RFValue(48),
    borderRadius: RFValue(24),
    marginRight: RFValue(10),
  },
  name: {
    textAlign: 'left',
    fontSize: FONTS.h6,
    fontWeight: '600',
    color: COLORS.darkGray2,
  },
  timeView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    height: '90%',
    width: RFValue(2),
    marginHorizontal: MARGIN.smMargin,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  time: {
    fontSize: FONTS.h6,
    fontWeight: '600',
  },
  confirmPendingText: {
    fontSize: FONTS.h6,
    fontWeight: '600',
    color: COLORS.green,
  },
});
