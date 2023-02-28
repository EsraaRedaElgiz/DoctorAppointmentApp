import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import {COLORS, ICONS} from '../../constants/Constants';
import styles from './SupportTeamStyle';

function SupportTeam(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollViewStyle}>
        <TextInput
          placeholder="ادخل مشكلتك"
          style={styles.textInputStyle}
          multiline
        />
        <View style={styles.linesView}>
          <View style={styles.line} />
          <Text style={styles.callText}>او اتصل بنا</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.callView}>
          <Ionicons name="call" size={ICONS.xxlIcon} color={COLORS.blue} />
        </TouchableOpacity>
      </ScrollView>
      <GeneralButton title="ارسال" style={styles.button} />
    </View>
  );
}

export default SupportTeam;
