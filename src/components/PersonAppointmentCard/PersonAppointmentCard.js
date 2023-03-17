import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN} from '../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';

function PersonAppointmentCard(props) {
  const {name, pending, confirmed, time} = props;
  return (
    <View style={styles.container}>
      <View style={styles.wrap1}>
        <LinearGradient
          colors={[COLORS.blue, COLORS.lightBlue]}
          style={styles.section1}
        />
        <View style={styles.section2}>
          <Image
            style={styles.image}
            source={require('../../../src/assets/Images/user.jpg')}
          />
          <Text style={styles.name}>{name ? name : 'عبدالرحمن عياد'}</Text>
        </View>
      </View>
      <View style={styles.section3}>
        <View style={styles.timeView}>
          <Text style={styles.time}>10:30 PM</Text>
          <Text
            style={[
              styles.confirmPendingText,
              {color: confirmed ? COLORS.green : COLORS.red},
            ]}>
            {confirmed ? 'مؤكد' : 'معلق'}
          </Text>
        </View>
        <View
          style={[
            styles.verticalLine,
            {backgroundColor: confirmed ? COLORS.green : COLORS.red},
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: RFValue(65),
    backgroundColor: COLORS.white,
    elevation: 2,
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

export default PersonAppointmentCard;
