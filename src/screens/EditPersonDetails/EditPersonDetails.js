import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import {TextInput} from 'react-native-paper';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import {COLORS, ICONS, MARGIN, PADDINGS} from '../../constants/Constants';
import styles from './EditPersonDetailsStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import SelectDropdown from 'react-native-select-dropdown';
import DropDown from '../../components/DropDown/DropDown';
import {requestCameraPermission} from '../../utils/CameraPermissin';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';

function EditPersonDetails(props) {
  const {navigation} = props;
  const [visible, setVisible] = useState(false);
  const [photo_uri, setphoto_uri] = useState();
  const [bloodType, setBloodType] = useState('نوع الدم');
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm(
    {
      defaultValues: {
        name:"",
        bloodType: "",
        weight: "",
        height: "",
        age: "",
        gender: "",
        phone:""
      },
    }
  );
  const onSubmit = data => {
    //console.log(data);
    reset();
    navigation.navigate('MedicalID1');
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const refRBSheet = useRef();
  const selectFromGallery = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({options, includeBase64: true}, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setphoto_uri(photo_uri => res.assets[0].uri);
      }
    });
  };
  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, res => {
      // console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setphoto_uri(photo_uri => res.assets[0].uri);
        //upload_img(res.assets[0].base64)
      }
    });
  };

  const handleVisible = () => {
    setVisible(true);
  };
  const updateBloodType = type => {
    setBloodType(type);
  };

  const bloodTypeList = ['A+', 'B+', 'C+'];
  const gender = ['ذكر', 'انثي'];

  return (
    <GeneralPage>
      <HeaderNavigation
        title="المعلومات الشخصية"
        text
        btn="تم"
        padding={PADDINGS.mdPadding}
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
        onPressBtn={handleSubmit(onSubmit)}
        // onPressBtn={() => {
        //   handleSubmit(onSubmit);
        //   // navigation.navigate('MedicalID1');
        //   //must all textInputs be vaild (validation react-hook-form)
        // }}
      />
      <View style={styles.container}>
        <ProfileImage
          nameAfterImage={"محمد عبدالحميد"}
          iconOnImage
          iconBgColor
          onPressPen={() => refRBSheet.current.open()}
          imageUri={photo_uri}
        />
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <Reusabletextinput
                placeholder="الاسم"
                bordercolor={errors.name ? '#f00' : COLORS.gray}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            );
          }}
        />
        <Text style={styles.errorTextStyle}>
          {errors.name?.type === 'required' ? 'يجب ادخال اسم' : ''}
        </Text>
        <Controller
          name="bloodType"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <DropDown
                data={bloodTypeList}
                placeholder="فصيلة الدم"
                borderColor={errors.bloodType ? '#f00' : COLORS.gray}
                onSelect={onChange}
                value={value}
                onBlur={onBlur}
                color={value==""?COLORS.darkGray:COLORS.darkGray3}

              />
            );
          }}
        />
        <Text style={[styles.errorTextStyle]}>
          {errors.bloodType?.type === 'required' ? 'يجب ادخال فصيلة الدم' : ''}
        </Text>
        <Controller
          name="weight"
          control={control}
          rules={{
            required: true,
            validate: val => {
              if (val * 0 != 0) {
                return 'must number';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <Reusabletextinput
                keyboardType="number-pad"
                placeholder="الوزن"
                bordercolor={errors.weight ? '#f00' : COLORS.gray}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            );
          }}
        />
        <Text style={styles.errorTextStyle}>
          {errors.weight?.type === 'required'
            ? 'يجب ادخال الوزن'
            : errors.weight?.type === 'validate'
            ? 'يجب ادخال رقم'
            : ''}
        </Text>
        <Controller
          name="height"
          control={control}
          rules={{
            required: true,
            validate: val => {
              if (val * 0 != 0) {
                return 'must number';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <Reusabletextinput
                keyboardType="number-pad"
                placeholder="الطول"
                bordercolor={errors.height ? '#f00' : COLORS.gray}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            );
          }}
        />
        <Text style={styles.errorTextStyle}>
          {errors.height?.type === 'required'
            ? 'يجب ادخال الطول'
            : errors.height?.type === 'validate'
            ? 'يجب ادخال رقم'
            : ''}
        </Text>
        <Controller
          name="age"
          control={control}
          rules={{
            required: true,
            validate: val => {
              if (val * 0 != 0) {
                return 'must number';
              }
            },
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <Reusabletextinput
                keyboardType="number-pad"
                placeholder="العمر"
                bordercolor={errors.age ? '#f00' : COLORS.gray}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            );
          }}
        />
        <Text style={styles.errorTextStyle}>
          {errors.age?.type === 'required'
            ? 'يجب ادخال الطول'
            : errors.age?.type === 'validate'
            ? 'يجب ادخال رقم'
            : ''}
        </Text>
        <Controller
          name="gender"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <DropDown
                data={gender}
                placeholder="النوع"
                borderColor={errors.gender ? '#f00' : COLORS.gray}
                onSelect={onChange}
                value={value}
                onBlur={onBlur}
                color={value==""?COLORS.darkGray:COLORS.darkGray3}
              />
            );
          }}
        />
        <Text style={[styles.errorTextStyle]}>
          {errors.gender?.type === 'required' ? 'يجب ادخال فصيلة الدم' : ''}
        </Text>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: true,
            // validate: val => {
            //   if (val * 0 != 0) {
            //     return 'must number';
            //   }
            // },
            validate: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <Reusabletextinput
                keyboardType="number-pad"
                placeholder="رقم الهاتف"
                bordercolor={errors.phone ? '#f00' : COLORS.gray}
                onChangeText={onChange}
                value={value}
              />
            );
          }}
        />
        <Text style={styles.errorTextStyle}>
          {errors.phone?.type === 'required'
            ? 'يجب ادخال رقم الهاتف'
            : errors.phone?.type === 'validate'
            ? 'يجب ادخال رقم هاتف صحيح'
            : ''}
        </Text>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={RFValue(200)}
        openDuration={250}
        customStyles={{
          container: {
            alignItems: 'center',
            borderTopLeftRadius: RFValue(30),
            borderTopRightRadius: RFValue(30),
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            launchCamera();
            refRBSheet.current.close();
          }}
          style={styles.eachOptionInBottonTab}>
          <Text style={styles.optionTextStyle}>التقاط صورة</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            selectFromGallery();
          }}
          style={styles.eachOptionInBottonTab}>
          <Text style={styles.optionTextStyle}>اختيار صورة</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            setphoto_uri(photo_uri => '');
          }}
          style={styles.eachOptionInBottonTab}>
          <Text style={[styles.optionTextStyle, {color: COLORS.red}]}>
            مسح الصورة
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={[styles.eachOptionInBottonTab, {borderBottomWidth: 0}]}>
          <Text style={styles.optionTextStyle}>انهاء</Text>
        </TouchableOpacity>
      </RBSheet>
    </GeneralPage>
  );
}

export default EditPersonDetails;
