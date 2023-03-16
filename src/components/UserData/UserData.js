import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS, MARGIN} from '../../constants/Constants';
import {style} from '../../styles/Style';

function UserData(props) {
  const {label, data} = props;
  return (
    <View>
      <Text style={[style.textContentBold, {color: COLORS.blue}]}>{label}</Text>
      <Text
        style={[
          style.textSmallContent,
          {
            marginVertical: RFValue(6),
            textAlign: 'left',
            color: COLORS.darkGray3,
          },
        ]}>
        {data}
      </Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FONTS.h5,
    color: COLORS.blue,
    fontWeight: 'bold',
  },
  data: {
    fontSize: FONTS.h6,
    color: COLORS.black,
    fontWeight: '500',
    marginVertical: RFValue(6),
    textAlign: 'left',
  },
  line: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginBottom: MARGIN.lgMargin,
  },
});

export default UserData;
