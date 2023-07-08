import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  FONTS,
  PADDINGS,
  RADIUS,
} from '../../../../src/constants/Constants';
import styles from './EditDoctorDetailsStyle';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import ProfileImage from '../../../../src/components/ProfileImage/ProfileImage';
import DropDown from '../../../../src/components/DropDown/DropDown';
import Reusabletextinput from '../../../../src/components/AppTextinput/AppTextinput';
import {RFValue} from 'react-native-responsive-fontsize';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import {requestCameraPermission} from '../../../../src/utils/CameraPermissin';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Controller, useForm} from 'react-hook-form';
import {style} from '../../../../src/styles/Style';
import {CheckBox} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {getDoctorDetails} from '../../Redux/Reducers/DoctorDetailsSlice';
import {EditDoctorDetailAction} from '../../Redux/Reducers/EditDoctorDetailsSlice';
export default function EditDoctorDetails({navigation}) {
  const globalState = useSelector(state => state);
  const[daysBack,setDaysBack]=useState('')
  const dispatch = useDispatch();
  const {
    name,
    email,
    age,
    gender,
    phone,
    image,
    doctor_about,
    doctor_experience,
    speciality_name,
    clinic_logo,
    clinic_name,
    branch_address,
    branch_phone,
    branch_working_days,
    booking_price,
    start_time,
    end_time,
    session_time,
    latitude,
    longitude,
    success,
    error,
  } = globalState.DoctorDetailsReducer;
  const {isLoading} = globalState.EditDoctorDetailsReducer;
  ///
  let daysText=branch_working_days.map(el=>el.day)
  daysText = daysText.join(' , ');
  //
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      name: name,
      phoneNum: phone,
      email: email,
      spealization: speciality_name,
      exp: doctor_experience,
      Location: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      Adressdescription: branch_address,
      About: doctor_about,
      Workdays: daysText,
      price: booking_price,
      start: start_time.slice(0, 5),
      end: end_time.slice(0, 5),
      section: session_time.slice(0, 5),
    },
  });
  const region = {
    latitude: 30.78650859999999,
    longitude: 31.0003757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const mapRef = useRef();
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [photo_uri, setPhoto_uri] = useState(null);
  const [photo_data, setPhoto_data] = useState({uri: image});
  const onSubmit = data => {
    const formData = new FormData();
    formData.append('first_name', data.name);
    formData.append('doctor_experience', data.exp);
    if(data.phoneNum!=phone){
      formData.append('phone', data.phoneNum);
    } 
    if(photo_uri?.fileName&&photo_uri?.type&&photo_uri?.uri){
      formData.append(
        'image',
          {
              name: photo_uri?.fileName,
              uri: photo_uri?.uri,
              type: photo_uri?.type,
            }
      );
    }
     formData.append('booking_price', data.price);
     formData.append('start_time',data.start.trim());
    formData.append('end_time',data.end.trim());
    formData.append('session_time',data.section.trim());
    formData.append('branch_address',data.Adressdescription)
    formData.append('doctor_about',data.About)
    if(lat!=0&&long!=0){
      formData.append('latitude',lat)
      formData.append('longitude',long)
    }
    console.log("lat",lat)
    let arr = Days.filter(day => day.isChecked == true)
    let daysarr = []
    for (let i = 0; i < arr.length; i++) {
      daysarr.push({ day: arr[i].txt, enabled: true })
    }
    if(daysarr.length > 0) {
      formData.append("branch_working_days", /*data.Workdays*/JSON.stringify(daysarr))
    } 
    console.log('Data in Edit Doctor -> ', formData);
    dispatch(EditDoctorDetailAction(formData))
      .unwrap()
      .then(result => {
        dispatch(getDoctorDetails());
        console.log(
          'result in dispatch updateUserProfileAction ' +
            JSON.stringify(result?.data),
        );
        navigation.goBack();
        reset();
      })
      .catch(err => {
        console.log('Error in Catch -> ', err?.response?.data);
        const errors = err?.response?.data?.errors;
      })
      .finally(() => {});
  };
  const Specialization = ['اسنان', 'باطنة', 'صدر', 'عيون'];
  const [modalVisible, setModalVisible] = useState(false);
  const [modal_Visible_wokdays, setmodal_Visible_wokdays] = useState(false);
  const [modal_Visible_start_time, setmodal_Visible_start_time] =
    useState(false);
  const [modal_Visible_end_time, setmodal_Visible_end_time] = useState(false);
  const [modal_Visible_section_time, setmodal_Visible_section_time] =
    useState(false);
  const {width, height} = Dimensions.get('screen');
  const data = [
    {id: 1, txt: 'السبت', isChecked: false},
    {id: 2, txt: 'الأحد', isChecked: false},
    {id: 3, txt: 'الاثنين', isChecked: false},
    {id: 4, txt: 'الثلاثاء', isChecked: false},
    {id: 5, txt: 'الأربعاء', isChecked: false},
    {id: 6, txt: 'الخميس', isChecked: false},
    {id: 7, txt: 'الجمعة', isChecked: false},
  ];
  const [Days, setDays] = useState(data);
  const refRBSheet = useRef();
  useEffect(() => {
    requestCameraPermission();
  }, []);
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
        setPhoto_uri(photo_uri => res.assets[0].uri);
        setPhoto_data(photo_uri => res.assets[0]);
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
        setPhoto_uri(photo_uri => res.assets[0].uri);
        setPhoto_data(photo_uri => res.assets[0]);
        //upload_img(res.assets[0].base64)
      }
    });
  };

  const handleChange = id => {
    let temp = Days.map(product => {
      if (id === product.id) {
        return {...product, isChecked: !product.isChecked};
      }
      return product;
    });
    setDays(temp);
  };

  const GetSelect = () => {
    let checkedDays = Days.filter(day => day.isChecked == true);
    let daysText = checkedDays.map(item => item.txt);
    daysText = daysText.join(' , ');

    // var check = Days.map((t) => t.isChecked)
    // let selected = []
    // for (let index = 0; index < check.length; index++) {
    //   if (check[index] == true) {
    //     selected.push(keys[index])
    //   }
    // }
    setValue('Workdays', daysText, {shouldValidate: true});
  };
  const get_location = () => {
    // let browser_url =
    //   'https://www.google.de/maps/@' +
    //   region.latitude +
    //   ',' +
    //   region.longitude +
    //   '?q=';

    let browser_url = 'تم تعديل الموقع بنجاح';
    setValue('Location', browser_url, {shouldValidate: true});
  };
  const onTimeSelected = (event, value) => {
    setmodal_Visible_start_time(false);
    // console.log(JSON.stringify(value + '').substring(16, 22));
    setValue('start', JSON.stringify(value + '').substring(16, 22), {
      shouldValidate: true,
    });
  };
  const onTimeSelected_endtime = (event, value) => {
    setmodal_Visible_end_time(false);
    // console.log(JSON.stringify(value + '').substring(16, 22));
    setValue('end', JSON.stringify(value + '').substring(16, 22), {
      shouldValidate: true,
    });
  };
  const onTimeSelected_sectiontime = (event, value) => {
    setmodal_Visible_section_time(false);
    // console.log(JSON.stringify(value + '').substring(16, 22));
    setValue('section', JSON.stringify(value + '').substring(16, 22), {
      shouldValidate: true,
    });
  };

  return (
    <View style={styles.Continer}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="تعديل المعلومات"
        backgroundColor={COLORS.white}
        color={COLORS.black}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageProfileView}>
          <ProfileImage
            iconOnImage={true}
            iconBgColor
            onPressPen={() => refRBSheet.current.open()}
            imageUri={photo_uri == null ? image : photo_uri}
          />
        </View>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            minLength: 2,
            maxLength: 30,
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
        <Text style={{color: 'red', alignSelf: 'flex-start'}}>
          {errors.name?.type === 'required'
            ? 'يجب ادخال اسم'
            : errors.name?.type === 'minLength'
            ? 'الاسم يجب ان لا يقل عن حرفين'
            : errors.name?.type === 'maxLength'
            ? 'الاسم يجب ان لا يزيد عن 30 حرف'
            : ''}
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Reusabletextinput
              placeholder="رقم الهاتف"
              keyboardType="phone-pad"
              bordercolor={errors.phoneNum ? COLORS.red : COLORS.gray}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="phoneNum"
        />
        <Text style={{color: 'red', alignSelf: 'flex-start'}}>
          {errors.phoneNum?.type === 'required'
            ? 'يجب ادخال رقم الهاتف'
            : errors.phoneNum?.type === 'pattern'
            ? 'يجب ادخال رقم هاتف صحيح'
            : ''}
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Reusabletextinput
              placeholder="عنوان البريد الالكتروني"
              keyboardType="email-address"
              bordercolor={errors.email ? COLORS.red : COLORS.gray}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="email"
        />
        <Text style={{color: 'red', alignSelf: 'flex-start'}}>
          {errors.email?.type === 'required'
            ? 'يجب ادخال عنوان البريد الالكتروني'
            : errors.email?.type === 'pattern'
            ? 'يجب ادخال عنوان بريد الكتروني صحيح'
            : ''}
        </Text>
        <View style={styles.Specalizationandexperience}>
          <View style={styles.viewofDropDown}>
            <Controller
              control={control}
              name="spealization"
              rules={{
                required: true,
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <>
                  <DropDown
                    defaultValue={
                      speciality_name === 'أسنان'
                        ? Specialization[0]
                        : speciality_name === 'باطنة'
                        ? Specialization[1]
                        : speciality_name === 'صدر'
                        ? Specialization[2]
                        : Specialization[3]
                    }
                    style={styles.dropDownMarginBottom}
                    placeholder="التخصص"
                    data={Specialization}
                    borderColor={errors.spealization ? '#f00' : COLORS.gray}
                    onSelect={onChange}
                  />
                  <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                    {errors.spealization?.type === 'required'
                      ? 'التخصص يكون مطلوب'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
          <View style={styles.viewofDropDown}>
            <Controller
              control={control}
              name="exp"
              rules={{
                required: true,
                validate: val => {
                  if (val * 0 != 0) {
                    return 'must number';
                  }
                },
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <>
                  <Reusabletextinput
                    value={value}
                    placeholder="الخبرة"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.exp ? '#f00' : COLORS.gray}
                  />
                  <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                    {errors.exp?.type === 'required'
                      ? 'يجب ادخال الخبرة'
                      : errors.exp?.type === 'validate'
                      ? 'يجب ادخال رقم'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
        </View>
        <Pressable
          style={styles.bottominputview}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Controller
            control={control}
            name="Location"
            rules={{
              required: true,
            }}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <Reusabletextinput
                  placeholder="الموقع"
                  value={
                    value
                  }
                  onChangeText={onChange}
                  onBlur={onBlur}
                  // onTouchStart={() => setModalVisible(true)}
                  bordercolor={errors.Location ? '#f00' : COLORS.gray}
                  edit={false}
                />
                <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                  {errors.Location?.type === 'required'
                    ? 'يجب توافر الموقع'
                    : ''}
                </Text>
              </>
            )}
          />
        </Pressable>
        <View style={styles.bottominputview}>
          <Controller
            control={control}
            name="Adressdescription"
            rules={{
              required: true,
            }}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <Reusabletextinput
                  placeholder="وصف عنوان العيادة"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  bordercolor={errors.Adressdescription ? '#f00' : COLORS.gray}
                />
                <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                  {errors.Adressdescription?.type === 'required'
                    ? 'يجب وصف العنوان'
                    : ''}
                </Text>
              </>
            )}
          />
        </View>
        <View style={styles.bottominputview}>
          <Controller
            control={control}
            name="About"
            rules={{
              required: true,
            }}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <Reusabletextinput
                  placeholder="السيرة الذاتية"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  bordercolor={errors.About ? '#f00' : COLORS.gray}
                />

                <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                  {errors.About?.type === 'required'
                    ? 'السيرة الذاتية مطلوبة'
                    : ''}
                </Text>
              </>
            )}
          />
        </View>
        <View style={styles.bottominputview}>
          <Controller
            control={control}
            name="Workdays"
            rules={{
              required: true,
            }}
            render={({
              field: {value, onChange, onBlur},
              fieldState: {error},
            }) => (
              <>
                <Reusabletextinput
                  placeholder="ايام العمل"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  bordercolor={errors.Workdays ? '#f00' : COLORS.gray}
                  onTouchStart={() => {
                    setmodal_Visible_wokdays(true);
                  }}
                />

                <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                  {errors.Workdays?.type === 'required'
                    ? 'يجب وضع ايام العمل'
                    : ''}
                </Text>
              </>
            )}
          />
        </View>
        <View style={styles.bottominputview}>
          <Controller
            control={control}
            name="price"
            rules={{
              required: true,
              validate: val => {
                if (val * 0 != 0) {
                  return 'must number';
                }
              },
            }}
            render={({field: {value, onChange, onBlur}}) => (
              <>
                <Reusabletextinput
                  placeholder="سعر الكشف"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  bordercolor={errors.price ? '#f00' : COLORS.gray}
                />
                <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                  {errors.price?.type === 'required'
                    ? 'يجب ادخال سعر الكشف'
                    : errors.price?.type === 'validate'
                    ? 'يجب ادخال رقم'
                    : ''}
                </Text>
              </>
            )}
          />
        </View>
        <View style={styles.timeandsection}>
          <View style={styles.startandend}>
            <Controller
              control={control}
              name="start"
              rules={{
                required: true,
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <>
                  <Reusabletextinput
                    placeholder="البداية"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.start ? '#f00' : COLORS.gray}
                    onTouchStart={() => {
                      setmodal_Visible_start_time(true);
                    }}
                  />
                  <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                    {errors.start?.type === 'required'
                      ? 'يجب ادخال البداية'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
          <View style={styles.startandend}>
            <Controller
              control={control}
              name="end"
              rules={{
                required: true,
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <>
                  <Reusabletextinput
                    placeholder="النهاية"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.end ? '#f00' : COLORS.gray}
                    onTouchStart={() => {
                      setmodal_Visible_end_time(true);
                    }}
                  />
                  <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                    {errors.end?.type === 'required' ? 'يجب ادخال النهاية' : ''}
                  </Text>
                </>
              )}
            />
          </View>
          <View style={styles.startandend}>
            <Controller
              control={control}
              name="section"
              rules={{
                required: 'يجب تحديد المدة',
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <>
                  <Reusabletextinput
                    placeholder="المدة"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.section ? '#f00' : COLORS.gray}
                    onTouchStart={() => {
                      setmodal_Visible_section_time(true);
                    }}
                  />
                  <Text style={{color: 'red', alignSelf: 'flex-start'}}>
                    {errors.section?.type === 'required'
                      ? 'يجب ادخال المدة'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonViewStyle}>
        <GeneralButton
          title="تأكيد"
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
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
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled
          loadingIndicatorColor={COLORS.blue}
          style={{flex: 1}}
          onRegionChangeComplete={(region, details) => {
            console.log('regoin change :>>> ', JSON.stringify(region));
            console.log('regoin details :>>> ', JSON.stringify(details));
            setLong(region.longitude);
            setLat(region.latitude);
          }}
          onPress={e => {
            console.log(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
            );
            console.log('position : ', e.nativeEvent.position);
            setLong(e.nativeEvent.coordinate.longitude);
            setLat(e.nativeEvent.coordinate.latitude);
            mapRef.current.animateToRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
            mapRef.current
              .addressForCoordinate({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
              .then(res => console.log(res));
            get_location();
          }}>
          <Marker
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
            pinColor={'green'}
            draggable
            // onDragEnd={(e) => console.log("test :>>>> ", e.nativeEvent.coordinate)}
          ></Marker>
        </MapView>
      </Modal>

      <Modal
        visible={modal_Visible_wokdays}
        onRequestClose={() => {
          setmodal_Visible_wokdays(!modal_Visible_wokdays);
        }}
        transparent={true}>
        <View style={styles.modelofcheckbox}>
          <View
            style={{
              width: width * 0.8,
              height: height * 0.41,
              backgroundColor: COLORS.white,
              borderRadius: RADIUS.mdRadius,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={styles.viewImageStyle}>
              <Text style={style.textTitleBold}>أيام العمل</Text>
            </View>
            {Days.map((Day, index) => {
              return (
                <View style={styles.viewofcheckbox} key={index}>
                  <CheckBox
                    checked={Day.isChecked}
                    onPress={() => {
                      handleChange(Day.id);
                    }}
                  />
                  <Text style={style.textContent}>{Day.txt}</Text>
                </View>
              );
            })}
            <View></View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <GeneralButton
                title="تأكيد"
                style={{width: '90%'}}
                onPress={() => {
                  setmodal_Visible_wokdays(!modal_Visible_wokdays);
                  GetSelect();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modal_Visible_start_time}
        onRequestClose={() => {
          setmodal_Visible_start_time(!modal_Visible_start_time);
        }}
        transparent={true}>
        <DateTimePicker
          testID="TimePicker"
          label="Pick A Date"
          onChange={onTimeSelected}
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={false}
          display="spinner"
          negativeButton={{label: 'Cancel', textColor: 'red'}}
          positiveButton={{label: 'ok', textColor: COLORS.blue}}
        />
      </Modal>

      <Modal
        visible={modal_Visible_end_time}
        onRequestClose={() => {
          setmodal_Visible_end_time(!modal_Visible_end_time);
        }}
        transparent={true}>
        <DateTimePicker
          testID="TimePicker"
          label="Pick A Date"
          onChange={onTimeSelected_endtime}
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={false}
          display="spinner"
          negativeButton={{label: 'Cancel', textColor: 'red'}}
          positiveButton={{label: 'ok', textColor: COLORS.blue}}
        />
      </Modal>
      <Modal
        visible={modal_Visible_section_time}
        onRequestClose={() => {
          setmodal_Visible_section_time(!modal_Visible_end_time);
        }}
        transparent={true}>
        <DateTimePicker
          testID="TimePicker"
          label="Pick A Date"
          onChange={onTimeSelected_sectiontime}
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={true}
          display="spinner"
          negativeButton={{label: 'Cancel', textColor: 'red'}}
          positiveButton={{label: 'ok', textColor: COLORS.blue}}
        />
      </Modal>
    </View>
  );
}
