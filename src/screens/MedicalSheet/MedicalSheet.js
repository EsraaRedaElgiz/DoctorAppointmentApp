import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {COLORS, FONTS, PADDINGS} from '../../constants/Constants';
import Reusabletextinput from '../../components/AppTextinput/AppTextinput';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import GeneralButton from '../../components/GeneralButton/GeneralButton';
import DropDown from '../../components/DropDown/DropDown';
import {useSelector, useDispatch} from 'react-redux';
/*import {
  setPhotoUri,
  setBloodType,
  setWeight,
  setHeight,
  setAge,
  setGender,
} from '../../Redux/Reducers/MedicalSheetSlice';*/
import {useForm, Controller} from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {requestCameraPermission} from '../../utils/CameraPermissin';
import {RFValue} from 'react-native-responsive-fontsize';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
import {setLoggedIn} from '../../Redux/Reducers/AuthSlice';

function MedicalSheet({navigation}) {
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
        setphoto_uri(photo_uri => res.assets[0].uri); //الصوره اللي اخترناها هتتحط مكان الديفولت
        // upload_img(res.assets[0].base64)//بيبعت الصوره للباك
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
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [photo_uri, setphoto_uri] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const blood = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const type = ['ذكر', 'أنثي'];
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      bloodType: '',
      weight: '',
      height: '',
      age: '',
      gender: '',
    },
  });
  const onSubmit = data => {
    //console.log(JSON.stringify(data) + "img" + photo_uri);
    /*const data = {
      photoUri: photo_uri,
      bloodType:data.bloodType,
      weight:data.weight,
      height:data.height,
      age: data.age,
      gender: data.gender,
      }
      dispatch(insertData(data))*/
    setphoto_uri(photo_uri => {
      return '';
    });
    reset();
    // dispatch(setLoggedIn())
    navigation.navigate('LogIn');
  };
  return (
    <>
      <HeaderNavigation
        padding={PADDINGS.mdPadding}
        title="بيانات طبية"
        backgroundColor={COLORS.blue}
        color={COLORS.white}
        onPress={() => {
          setphoto_uri(photo_uri => {
            return '';
          });
          reset();
          navigation.goBack();
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
        <StatusBar backgroundColor={COLORS.blue} />
        <View style={styles.container}>
          <View style={styles.topViewStyle}>
            <View style={styles.viewHeaderStyle}>
              {photo_uri ? (
                <ProfileImage
                  iconOnImage={true}
                  onPressPen={() => refRBSheet.current.open()}
                  imageUri={photo_uri}
                />
              ) : (
                <ProfileImage
                  iconOnImage={true}
                  onPressPen={() => refRBSheet.current.open()}
                />
              )}
            </View>
          </View>
          <View style={styles.viewAfterHeaderStyle}>
            <View>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <DropDown
                      style={styles.dropDownMarginBottom}
                      data={blood}
                      placeholder="فصيلة الدم"
                      borderColor={errors.bloodType ? '#f00' : COLORS.gray}
                      /*onSelect={(selectedItem, index) => {
                      alert(selectedItem + "" + index);
                    }}*/
                      onSelect={onChange}
                      value={value}
                      color={value == '' ? COLORS.darkGray : COLORS.darkGray3}
                    />
                  )}
                  name="bloodType"
                />
                <Text style={styles.errorTextColor}>
                  {errors.bloodType?.type === 'required'
                    ? 'يجب تحديد فصيلة الدم'
                    : ''}
                </Text>
              </View>
              <View style={styles.firstTextInputMargun}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: val => {
                      if (val * 0 != 0) {
                        return 'must number';
                      }
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Reusabletextinput
                      placeholder="الوزن"
                      keyboardType="numeric"
                      bordercolor={errors.weight ? '#f00' : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="weight"
                />
                <Text style={styles.errorTextColor}>
                  {errors.weight?.type === 'required'
                    ? 'يجب ادخال الوزن'
                    : errors.weight?.type === 'validate'
                    ? 'يجب ادخال رقم'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachTextInputMargin}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: val => {
                      if (val * 0 != 0) {
                        return 'must number';
                      }
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Reusabletextinput
                      placeholder="الطول"
                      keyboardType="numeric"
                      bordercolor={errors.height ? '#f00' : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="height"
                />
                <Text style={styles.errorTextColor}>
                  {errors.height?.type === 'required'
                    ? 'بجب ادخال الطول'
                    : errors.height?.type === 'validate'
                    ? 'يجب ادخال رقم'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachTextInputMargin}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: val => {
                      if (val * 0 != 0) {
                        return 'must number';
                      }
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Reusabletextinput
                      placeholder="السن"
                      keyboardType="numeric"
                      bordercolor={errors.age ? '#f00' : COLORS.gray}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                  name="age"
                />
                <Text style={styles.errorTextColor}>
                  {errors.age?.type === 'required'
                    ? 'يجب ادخال السن'
                    : errors.age?.type === 'validate'
                    ? 'يجب ادخال رقم'
                    : ''}
                </Text>
              </View>
              <View style={styles.eachTextInputMargin}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <DropDown
                      style={styles.dropDownMarginBottom}
                      data={type}
                      borderColor={errors.gender ? '#f00' : COLORS.gray}
                      placeholder="تحديد النوع"
                      onSelect={onChange}
                      value={value}
                      color={value == '' ? COLORS.darkGray : COLORS.darkGray3}
                    />
                  )}
                  name="gender"
                />
                <Text style={styles.errorTextColor}>
                  {errors.gender?.type === 'required' ? 'يجب تحديد النوع' : ''}
                </Text>
              </View>
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
                <Text style={styles.optionTextStyle}>التقاط صوره</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                  selectFromGallery();
                }}
                style={styles.eachOptionInBottonTab}>
                <Text style={styles.optionTextStyle}>اختيار صوره</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                  setphoto_uri(photo_uri => {
                    return '';
                  });
                }}
                style={styles.eachOptionInBottonTab}>
                <Text style={[styles.optionTextStyle, {color: COLORS.red}]}>
                  مسح الصوره
                </Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                onPress={() => refRBSheet.current.close()}
                style={styles.eachOptionInBottonTab}>
                <Text style={styles.optionTextStyle}>انهاء</Text>
              </TouchableOpacity>
            </RBSheet>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonViewStyle}>
        <GeneralButton title="تأكيد" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
}
export default MedicalSheet;
