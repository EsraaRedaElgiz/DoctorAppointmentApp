import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import {COLORS, ICONS} from '../../constants/Constants';
import styles from './SupportTeamStyle';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native/Libraries/Alert/Alert';
function SupportTeam(props) {
  const navigation = useNavigation();
  const {
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const onSubmit = data => {
    reset();
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollViewStyle}>
        <View>
          <Controller
            name="input"
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onBlur, onChange, value}}) => {
              return (
                <TextInput
                  placeholder="ادخل مشكلتك"
                  style={styles.textInputStyle}
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
          <Text style={styles.errorTextStyle}>
            {errors.input?.type === 'required' ? 'يجب ادخال مشكلتك' : ''}
          </Text>
        </View>
        <View style={styles.linesView}>
          <View style={styles.line} />
          <Text style={styles.callText}>او اتصل بنا</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.callView}>
          <Ionicons name="call" size={ICONS.xxlIcon} color={COLORS.blue} />
        </TouchableOpacity>
        <GeneralButton title="ارسال" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </View>
  );
}

export default SupportTeam;
