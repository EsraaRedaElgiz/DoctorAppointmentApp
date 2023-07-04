import {StyleSheet, Text, View, Pressable, Linking} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, MARGIN, RADIUS, PADDINGS} from '../../../constants/Constants';
import {style} from '../../../styles/Style';
const CovidCard = () => {
  return (
    <Pressable
      style={styles.CovidContainer}
      onPress={() => Linking.openURL('https://sehhty.com/')}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="security"
          size={RFValue(50)}
          color={COLORS.white}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={[
            style.textContentBold,
            {color: COLORS.white, marginBottom: MARGIN.xsMargin},
          ]}>
          كوفيد 19
        </Text>
        <Text style={[style.textSmallContent, {color: COLORS.white}]}>
          يؤثر مرض كوفيد 19 على أشخاص مختلفين بطرق مختلفة. فمعظم المصابين يصابون
          بمرض خفيف إلى متوسط ​​ويتعافون دون دخول المستشفى
        </Text>
        <Pressable onPress={() => Linking.openURL('https://sehhty.com/')}>
          <Text
            style={[
              style.textSmallContent,
              {textDecorationLine: 'underline', color: COLORS.white},
            ]}>
            شاهد المزيد
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default CovidCard;

const styles = StyleSheet.create({
  CovidContainer: {
    width: '95%',
    height: RFValue(120),
    borderRadius: RADIUS.mdRadius,
    marginVertical: MARGIN.mdMargin,
    backgroundColor: COLORS.blue,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: RFValue(90),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
