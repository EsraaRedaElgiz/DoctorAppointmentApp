import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../constants/Constants';
const {width, height} = Dimensions.get('window');

function Visa(props) {
  const {visa, master, ...rest} = props;
  const visaType = visa
    ? require('../../assets/Images/visa.jpg')
    : master
    ? require('../../assets/Images/masterCard.png')
    : require('../../assets/Images/visa.jpg');
  const colors = ['#0085E4', '#00AAF2', '#00C8DE', '#00DFB3'];
  return (
    <TouchableOpacity style={styles.visa} activeOpacity={0.6} {...rest}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.visaImage}
          source={visaType}
        />
      </View>
      <View style={styles.visaNumberView}>
        <Text style={styles.visaNumber}>4444</Text>
        <Text style={styles.visaNumber}>3333</Text>
        <Text style={styles.visaNumber}>2222</Text>
        <Text style={styles.visaNumber}>1111</Text>
      </View>
      <View style={styles.visaData}>
        <View style={styles.date}>
          <Text style={styles.visaTextData}>Date</Text>
          <Text style={styles.visaTextData}>13/4</Text>
        </View>
        <View>
          <Text style={styles.visaTextData}>ABDELRAHMAN AYAD</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  visa: {
    height: height * 0.25,
    borderRadius: RFValue(10),
    padding: RFValue(10),
    marginBottom: RFValue(10),
    backgroundColor: COLORS.lightGray4,
  },
  visaImage: {
    width: RFValue(60),
    height: height * 0.05,
    marginBottom: RFValue(30),
    borderRadius: RFValue(5),
  },
  visaNumberView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: RFValue(25),
  },
  visaNumber: {
    fontSize: FONTS.h5,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  visaData: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  visaTextData: {
    fontSize: FONTS.h6,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  date: {
    alignItems: 'center',
  },
});

export default Visa;
