import React, {useState} from 'react';
import {Text, View, Image, StatusBar, ScrollView} from 'react-native';
import styles from './styles';
import {COLORS} from '../../../constants/Constants';
import GeneralButton from '../../../components/GeneralButton/GeneralButton';
import Images from '../../../constants/Images';
function DoctorOrPatient({navigation}) {
  const [isDoctor, setIsDoctor] = useState(false);

  const handleDoctorButtonPress = () => {
    setIsDoctor(true);
  };
  
  const handlePatientButtonPress = () => {
    setIsDoctor(false);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.scrollViewContentContainerStyle}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.blue} />
        <View style={styles.viewForImageStyle}>
          <Image
            source={Images.doctorOrPatient}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.viewTextStyle}>
          <Text style={styles.textStyle}>أنا...</Text>
        </View>
        <GeneralButton
          title="مريض"
          style={styles.marginAfterFirstButton}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <GeneralButton title="دكتور" />
      </View>
    </ScrollView>
  );
}
export default DoctorOrPatient;
