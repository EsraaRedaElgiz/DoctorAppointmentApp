import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import {COLORS, INTO_DONE} from '../../../constants/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {setIntroSlider} from '../../../Redux/Reducers/IntroSliderSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function IntroSlider({navigation}) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [introDone, setIntroDone] = useState(
    globalState.IntroSliderReducer.IntroSliderDone,
  );
  const slides = [
    {
      key: 1,
      text: 'لنبدأ عيش حياة صحية و بصحة جيدة الآن',
      image: require('../../../assets/Images/intro1.png'),
      backgroundColor: COLORS.white,
    },
    {
      key: 2,
      text: 'قم بحجز موعد مع طبيب في أي مجال',
      image: require('../../../assets/Images/intro2.png'),
      backgroundColor: COLORS.white,
    },
    {
      key: 3,
      text: 'احتفظ بسجل لأمراضك',
      image: require('../../../assets/Images/intro3.png'),
      backgroundColor: COLORS.white,
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.imageStyle} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.nextButtonStyle}>
        <Text style={styles.textNextAndDoneStyle}>التالي</Text>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.doneButtonStyle}
        onPress={() => {
          const key = 1;
          navigation.navigate('DoctorOrPatient');
          AsyncStorage.setItem(INTO_DONE, JSON.stringify(key));
        }}>
        <Text style={styles.textNextAndDoneStyle}>التالي</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        bottomButton={true}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
      />
    </View>
  );
}
export default IntroSlider;
