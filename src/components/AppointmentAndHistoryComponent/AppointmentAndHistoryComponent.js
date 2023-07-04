import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  RADIUS,
  FONTS,
  COLORS,
  PADDINGS,
  ICONS,
} from '../../constants/Constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../constants/Images';
function AppointmentAndHistoryComponent(props) {
  const {
    style,
    doctorName,
    doctorSpeciality,
    dateShow,
    day,
    month,
    year,
    timeShow,
    time,
    status,
    onPress,
    disabled,
    doctorImageUri
  } = props;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          {doctorImageUri  ? (
            <Image source={{uri: doctorImageUri}} style={styles.imageStyle} />
          ) : (
            <Image source={Images.doctorDefult} style={styles.imageStyle} />
          )}
        </View>
        <View style={styles.viewTextStyle}>
          <View style={styles.eachLineMargin}>
            <Text style={styles.doctorNameStyle}>{doctorName}</Text>
          </View>
          <View style={styles.eachLineMargin}>
            <Text style={styles.specialityTextStyle}>{doctorSpeciality}</Text>
          </View>
          <View style={styles.timaAndDateContainer}>
            {dateShow ? (
              <View style={styles.viewDateStyle}>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <FontAwesome5
                    name="calendar-alt"
                    size={RFValue(13)}
                    color={COLORS.darkGray3}
                  />
                </View>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <Text style={styles.eachTextStyleInDateAndTimeContainers}>
                    {day}
                  </Text>
                </View>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <Text style={styles.eachTextStyleInDateAndTimeContainers}>
                    {month}
                  </Text>
                </View>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <Text style={styles.eachTextStyleInDateAndTimeContainers}>
                    {year}
                  </Text>
                </View>
              </View>
            ) : null}
            {timeShow ? (
              <View style={styles.viewTimeStyle}>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <Feather
                    name="clock"
                    size={RFValue(13)}
                    color={COLORS.darkGray3}
                  />
                </View>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <Text style={styles.eachTextStyleInDateAndTimeContainers}>
                    {time}
                  </Text>
                </View>
                <View style={styles.eachItemMarginInDateAndTimeContainers}>
                  <Text style={styles.eachTextStyleInDateAndTimeContainers}>
                    {status}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    elevation: RFValue(3),
    backgroundColor: '#fff',
    borderRadius: RADIUS.smRadius,
    paddingHorizontal: PADDINGS.mdPadding,
    paddingVertical: PADDINGS.lgPadding,
    width: '100%',
    height: RFValue(115),
  },
  innerContainer: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //backgroundColor:"#f00",
    alignItems: 'center',
  },
  imageContainer: {
    width: RFValue(70),
    borderRadius: RADIUS.smRadius,
    height: '100%',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.smRadius,
  },
  viewTextStyle: {
    width: '70%',
    marginLeft: RFValue(7),
  },
  eachLineMargin: {
    marginBottom: '2%',
  },
  doctorNameStyle: {
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    color: COLORS.darkGray3,
    textAlign: 'left'
  },
  specialityTextStyle: {
    fontSize: FONTS.h6,
    color: COLORS.darkGray2,
    fontFamily: FONTS.Amaranth,
    textAlign: 'left'
  },
  timaAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewDateStyle: {
    flexDirection: 'row',
    borderRadius: RADIUS.xsRadius,
    alignItems: 'center',
  },
  eachItemMarginInDateAndTimeContainers: {
    marginHorizontal: RFValue(3),
  },
  eachTextStyleInDateAndTimeContainers: {
    fontSize: FONTS.h6,
    color: COLORS.darkGray3,
    fontFamily: FONTS.Amaranth,
  },
  viewTimeStyle: {
    flexDirection: 'row',
    borderRadius: RADIUS.xsRadius,
    alignItems: 'center',
  },
});
export default AppointmentAndHistoryComponent;
