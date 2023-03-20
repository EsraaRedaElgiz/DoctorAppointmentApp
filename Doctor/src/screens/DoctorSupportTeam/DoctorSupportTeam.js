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
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import GeneralPage from '../../../../src/components/GeneralPage/GeneralPage';
import {COLORS, ICONS} from '../../../../src/constants/Constants';
import styles from './DoctorSupportTeamStyles.js';
import {useNavigation} from '@react-navigation/native';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
function DoctorSupportTeam(props) {
  // const navigation = useNavigation();
  const {
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const onSubmit = data => {
    reset();
    // navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderNavigation title="فريق الدعم" color={COLORS.darkGray3}/>
      <ScrollView style={styles.ScrollViewStyle} showsVerticalScrollIndicator={false}>
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
                style={[
                  styles.textInputStyle,
                  {borderColor: errors.input ? COLORS.red : COLORS.gray},
                ]}
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
        <View style={styles.linesView}>
          <View style={styles.line} />
          <Text style={styles.callText}>او اتصل بنا</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.callView}>
          <Ionicons name="call" size={ICONS.xxlIcon} color={COLORS.blue} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.viewButtonStyle}>
      <GeneralButton title="ارسال" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

export default DoctorSupportTeam;
