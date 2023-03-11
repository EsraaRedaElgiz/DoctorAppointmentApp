import {StyleSheet, Text, View, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {DoctorsData} from '../../../utils';
import Stars from '../../Stars/Stars';
import {style} from '../../../styles/Style';
import {PADDINGS} from '../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

const TopDoctors = () => {
  const [DoctorsDataUpdated, setDoctorsDataUpdated] = useState(DoctorsData);

  const navigation = useNavigation();
  return (
    <FlatList
      contentContainerStyle={{
        padding: RFValue(2),
        paddingHorizontal: PADDINGS.mdPadding,
      }}
      data={DoctorsDataUpdated}
      renderItem={(itemData, index) =>
        itemData.item.rating.length == 5 ? (
          <Pressable style={style.CardContainer} onPress={() => {
            navigation.navigate("DoctorProfile")
          }}>
            {/* ImageOnCards */}
            <View style={style.imageContainerStyle}>
              <Image source={itemData.item.image} style={style.imageCard} />
            </View>

            {/* TextOnCards */}
            <View style={style.textsCardConatiner}>
              <Text style={style.textContentBold}>
                الدكتور {itemData.item.name.trim()}{' '}
              </Text>
              <Text style={style.textContent}>
                طبيب {itemData.item.specialtiy.trim()}{' '}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {itemData.item.rating.map(() => {
                  return (
                    <>
                      <Stars />
                    </>
                  );
                })}
              </View>
            </View>
          </Pressable>
        ) : null
      }
    />
  );
};

export default TopDoctors;

const styles = StyleSheet.create({});
