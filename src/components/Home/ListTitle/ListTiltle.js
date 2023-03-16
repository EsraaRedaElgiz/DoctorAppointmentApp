import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {style} from '../../../styles/Style';
const ListTiltle = props => {
  const {Title, seeAll, onPress, styleProp} = props;
  return (
    <View style={[styles.container, styleProp]}>
      <Text style={style.textContentBold}>{Title}</Text>
      <Pressable onPress={onPress}>
        <Text style={style.textSmallContentBold}>{seeAll}</Text>
      </Pressable>
    </View>
  );
};

export default ListTiltle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
