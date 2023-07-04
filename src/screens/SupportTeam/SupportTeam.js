import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import {COLORS, ICONS, PADDINGS} from '../../constants/Constants';
import styles from './SupportTeamStyle';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native/Libraries/Alert/Alert';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
function SupportTeam(props) {
  const navigation = useNavigation();
  const contact = '+2001150355305'; // support phone
  const {
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const onSubmit = data => {
    Linking.openURL(`whatsapp://send?phone=${contact}&text=${data.input}`);
    reset();
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderNavigation
        title="فريق الدعم"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={styles.ScrollViewStyle}
        showsVerticalScrollIndicator={false}>
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
        <TouchableOpacity style={styles.callView}
        onPress={()=>{
          Linking.openURL(`tel:${contact}`)
        }}
        >
          <Ionicons name="call" size={ICONS.xxlIcon} color={COLORS.blue} />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.viewButtonStyle}>
        <GeneralButton title="ارسال" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

export default SupportTeam;
