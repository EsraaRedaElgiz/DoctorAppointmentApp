import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../../../src/styles/Style';
import {ListTiltle} from '../../../../src/components/Home';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  ICONS,
  MARGIN,
  RADIUS,
} from '../../../../src/constants/Constants';
import CircularProgress from 'react-native-circular-progress-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const Statistics = () => {
  const navigation = useNavigation();
  const ActiveColor = '#2f73fc';
  const [StatisticsValue, setStatisticsValue] = useState(50);
  return (
    <>
      <ListTiltle Title="احصائيات اليوم" />

      <Pressable
        style={styles.StatisticsContainerView}
        onPress={() => {
          navigation.navigate('DoctorAppointments');
        }}>
        <View style={styles.circle_Text_Container}>
          <View style={styles.circleContainer}>
            <CircularProgress
              value={StatisticsValue}
              radius={RFValue(55)}
              duration={2000}
              maxValue={100}
              inActiveStrokeColor={ActiveColor}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={ActiveColor}
              valueSuffix={'%'}
            />
          </View>
          <View>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={[style.textTitleBold, {color: COLORS.blue}]}>
                مواعيد اليوم
              </Text>
              <Text style={[style.textTitleBold, {color: COLORS.blue}]}>
                12/24
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.btnLeft}
          onPress={() => {
            navigation.navigate('DoctorAppointments');
          }}>
          <AntDesign
            name="arrowleft"
            size={ICONS.mdIcon}
            color={COLORS.white}
          />
        </Pressable>
      </Pressable>
    </>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  StatisticsContainerView: {
    width: '100%',
    height: RFValue(150),
    borderRadius: RADIUS.lgRadius,
    backgroundColor: '#B4CCFF',
    marginBottom: MARGIN.mdMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle_Text_Container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circleContainer: {
    width: RFValue(130),
    height: RFValue(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLeft: {
    width: RFValue(80),
    height: RFValue(43),
    backgroundColor: '#2f73fc',
    alignSelf: 'flex-end',
    borderBottomRightRadius: RADIUS.mdRadius,
    borderTopLeftRadius: RADIUS.mdRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
