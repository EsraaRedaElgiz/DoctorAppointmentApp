import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
} from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {style} from '../../styles/Style';
const CompletedAppointment = ({navigation}) => {
  return (
    <>
      <View style={[style.bigContainer, {flex: 1}]}>
        <View style={styles.Container}>
          <View style={styles.icon_textContainer}>
            <AntDesign
              name="checkcircle"
              size={RFValue(100)}
              color={COLORS.blue}
            />
            <Text style={[style.textTitleBold, {fontSize: FONTS.h4}]}>
              تم الحجز بنجاح !
            </Text>
          </View>
        </View>
        <GeneralButton
          title="تم"
          style={{marginBottom: MARGIN.mdMargin}}
          onPress={() => {
            navigation.navigate('Homescreen');
          }}
        />
      </View>
    </>
  );
};

export default CompletedAppointment;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_textContainer: {
    width: '100%',
    height: RFValue(200),
    paddingVertical: PADDINGS.xlPadding,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});
