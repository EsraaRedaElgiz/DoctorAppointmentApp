import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Reusabletextinput from '../../../../src/components/AppTextinput/AppTextinput';
import {
  COLORS,
  PADDINGS,
  RADIUS,
} from '../../../../src/constants/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from "./CompeleteinfoStyle"
import ProfileImage from '../../../../src/components/ProfileImage/ProfileImage';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'react-native-image-picker';
import { requestCameraPermission } from '../../../../src/utils/CameraPermissin';
import RBSheet from 'react-native-raw-bottom-sheet';
import DropDown from '../../../../src/components/DropDown/DropDown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import { HeaderNavigation } from '../../../../src/components/headerNavigation/HeaderNavigation';
import { useForm, Controller } from 'react-hook-form';
import { style } from '../../../../src/styles/Style';
import { registerDoctor } from '../../Redux/Reducers/DoctorSignUpSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialities } from '../../../../src/Redux/Reducers/GetSpecialitiesSlice';
import { set } from 'date-fns';
const Compeleteinformation = ({ navigation }) => {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const { isLoading, name, phoneNum, email, password } = globalState.DoctorSignUpReducer
  const { specialities } = globalState.GetSpecialitiesReducer
  useEffect(() => {
    requestCameraPermission();
    dispatch(getSpecialities()).unwrap().then(() => {
      //console.log(specialities)

    })
  }, []);
  const [photo_uri, setphoto_uri] = useState('');
  const [specialty, setspecialty] = useState('');
  const [exp, setexp] = useState('');
  const [descripation, setdescripation] = useState('');
  const [About, setAbout] = useState('');
  const [workday, setworkday] = useState('')
  const [price, setprice] = useState('')
  const [start, setstart] = useState("")
  const [End, setEnd] = useState("")
  const [section, setsection] = useState("")
  const Specialization = specialities.map(spec => spec.specialty_name);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal_Visible_wokdays, setmodal_Visible_wokdays] = useState(false);
  const [modal_Visible_start_time, setmodal_Visible_start_time] = useState(false)
  const [modal_Visible_end_time, setmodal_Visible_end_time] = useState(false)
  const [modal_Visible_section_time, setmodal_Visible_section_time] = useState(false)
  const { width, height } = Dimensions.get('screen');
  const [checked, setchecked] = useState(select);
  const region = {
    latitude: 30.78650859999999,
    longitude: 31.0003757,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      spealization: '',
      exp: '',
      Location: '',
      Adressdescription: '',
      About: '',
      Workdays: '',
      price: '',
      start: '',
      end: '',
      section: '',
    },
  });
  //
  const onSubmit = data => {
    let formdata = new FormData();
    formdata.append("type_id", '1')
    formdata.append("first_name", name)
    formdata.append("last_name", "tttt")//
    formdata.append("phone", phoneNum)
    formdata.append("email", email)
    formdata.append("age", "20")///////////
    formdata.append("password", password)
    let selectedSpecIndex = Specialization.indexOf(data.spealization)
    let selectedSpecId = specialities[selectedSpecIndex].specialty_id
    formdata.append("speciality_id", selectedSpecId)
    formdata.append("doctor_about", data.About)
    formdata.append("gender", "Male") // Male or Female
    formdata.append("image", photo_uri != "" ? { uri: photo_uri.uri, name: photo_uri.fileName, type: photo_uri.type } :
      JSON.stringify({ uri: photo_uri.uri, name: photo_uri.fileName, type: photo_uri.type }))
    formdata.append("doctor_experience", data.exp)
    formdata.append("branch_address", data.Adressdescription)
    formdata.append("branch_location", data.Location)
    formdata.append("branch_is_default", "1")
    formdata.append("branch_phone", phoneNum)
    let arr = Days.filter(day => day.isChecked == true)
    let daysarr = []
    for (let i = 0; i < arr.length; i++) {
      /*let dayname = arr[i].txt
      if (dayname == "السبت") {
        dayname = "sat"
      } else if (dayname == "الأحد") {
        dayname = "sun"
      } else if (dayname == "الاثنين") {
        dayname = "mon"
      } else if (dayname == "الثلاثاء") {
        dayname = "tue"
      } else if (dayname == "الأربعاء") {
        dayname = "wed"
      } else if (dayname == "الخميس") {
        dayname = "thu"
      } else if (dayname == "الجمعة") {
        dayname = "fri"
      }*/
      daysarr.push({ day: arr[i].txt, enabled: true })
    }
    formdata.append("branch_working_days", /*data.Workdays*/JSON.stringify(daysarr))
    formdata.append("latitude", lat)
    formdata.append("longitude", long)
    formdata.append("booking_price", data.price)
    formdata.append("start_time", data.start.trim())
    formdata.append("end_time", data.end.trim())
    formdata.append("session_time", data.section.trim())
    dispatch(registerDoctor(formdata)).unwrap().then((res) => {
      if (res === "Success sigunp") {
        navigation.navigate('DoctorLogIn')
        setphoto_uri(photo_uri => {
          return '';
        })
        reset()
      }
    })

    //console.log(formdata)

  };
  //
  const data = [
    { id: 1, txt: 'السبت', isChecked: false },
    { id: 2, txt: 'الأحد', isChecked: false },
    { id: 3, txt: 'الاثنين', isChecked: false },
    { id: 4, txt: 'الثلاثاء', isChecked: false },
    { id: 5, txt: 'الأربعاء', isChecked: false },
    { id: 6, txt: 'الخميس', isChecked: false },
    { id: 7, txt: 'الجمعة', isChecked: false },
  ];
  const [Days, setDays] = useState(data);
  const select = [];
  const refRBSheet = useRef();
  const mapRef = useRef();

  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);

  const selectFromGallery = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary({ options, includeBase64: true }, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setphoto_uri(photo_uri => res.assets[0]);
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
        setphoto_uri(photo_uri => res.assets[0]);
        //upload_img(res.assets[0].base64)
      }
    });
  };
  const handleChange = id => {
    let temp = Days.map(product => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setDays(temp);
  };

  const GetSelect = () => {
    let checkedDays = Days.filter(day => day.isChecked == true);
    // alert(JSON.stringify(checkedDays))
    let daysText = checkedDays.map(item => item.txt);
    daysText = daysText.join(' , ');

    // var check = Days.map((t) => t.isChecked)
    // let selected = []
    // for (let index = 0; index < check.length; index++) {
    //   if (check[index] == true) {
    //     selected.push(keys[index])
    //   }
    // }
    setValue('Workdays', daysText, { shouldValidate: true });
  };
  const get_location = () => {
    // let browser_url =
    //   'https://www.google.de/maps/@' +
    //   region.latitude +
    //   ',' +
    //   region.longitude +
    //   '?q=';

    let browser_url =
      'تم تحديد الموقع بنجاح'
    setValue('Location', browser_url, { shouldValidate: true });
  };
  const onTimeSelected = (event, value) => {
    setmodal_Visible_start_time(false);
    //console.log(JSON.stringify(value + '').substring(16, 22))
    setValue("start", JSON.stringify(value + '').substring(16, 22), { shouldValidate: true })
  };
  const onTimeSelected_endtime = (event, value) => {
    setmodal_Visible_end_time(false);
    //console.log(JSON.stringify(value + '').substring(16, 22))
    setValue("end", JSON.stringify(value + '').substring(16, 22), { shouldValidate: true })
  };
  const onTimeSelected_sectiontime = (event, value) => {
    setmodal_Visible_section_time(false);
    //console.log(JSON.stringify(value + '').substring(16, 22))
    setValue("section", JSON.stringify(value + '').substring(16, 22), { shouldValidate: true })
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        padding={PADDINGS.mdPadding}
        title="تكملة المعلومات"
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewImageStyle}>
          {photo_uri ? (
            <ProfileImage
              iconOnImage={true}
              onPressPen={() => refRBSheet.current.open()}
              imageUri={photo_uri.uri}
            />
          ) : (
            <ProfileImage
              iconOnImage={true}
              onPressPen={() => refRBSheet.current.open()}
            />
          )}
        </View>
        <View style={styles.viewofinformation}>
          <View style={styles.viewofSpeclizationandExperence}>
            <View style={styles.viewofDropDown}>
              <Controller
                control={control}
                name="spealization"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <DropDown
                      style={styles.dropDownMarginBottom}
                      placeholder="التخصص"
                      data={Specialization}
                      borderColor={errors.spealization ? 'red' : COLORS.gray}
                      onSelect={onChange}
                      value={value}
                      color={value == '' ? COLORS.darkGray : COLORS.darkGray3}
                    />
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
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
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <Reusabletextinput
                      value={value}
                      placeholder="الخبرة"
                      keyboardType="numeric"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.exp ? '#f00' : COLORS.gray}
                    />
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
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
          <View style={styles.firstTextInputMargun}>
            <Controller
              control={control}
              name="Location"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <View style={styles.viewoflocationandicon}>
                    <Reusabletextinput
                      placeholder="الموقع"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onTouchStart={() => setModalVisible(true)}
                      bordercolor={errors.Location ? '#f00' : COLORS.gray}
                    />
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => {
                        setModalVisible(true);
                      }}>
                      <EvilIcons
                        name="location"
                        size={35}
                        color={COLORS.darkGray}
                        style={{}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                    {errors.Location?.type === 'required'
                      ? 'يجب توافر الموقع'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
          <View style={styles.firstTextInputMargun}>
            <Controller
              control={control}
              name="Adressdescription"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <Reusabletextinput
                    placeholder="وصف عنوان العيادة"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={
                      errors.Adressdescription ? '#f00' : COLORS.gray
                    }
                  />
                  <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                    {errors.Adressdescription?.type === 'required'
                      ? 'يجب وصف العنوان'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
          <View style={styles.firstTextInputMargun}>
            <Controller
              control={control}
              name="About"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <Reusabletextinput
                    placeholder="السيرة الذاتية"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.About ? '#f00' : COLORS.gray}
                  />
                  <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                    {errors.About?.type === 'required'
                      ? 'السيرة الذاتية مطلوبة'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
          <View style={styles.firstTextInputMargun}>
            <Controller
              control={control}
              name="Workdays"
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <Reusabletextinput
                    placeholder="ايام العمل"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onTouchStart={() => {
                      setmodal_Visible_wokdays(true);
                    }}
                    bordercolor={errors.Workdays ? '#f00' : COLORS.gray}
                  />

                  <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                    {errors.Workdays?.type === 'required'
                      ? 'يجب وضع ايام العمل'
                      : ''}
                  </Text>
                </>
              )}
            />
          </View>
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
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <Reusabletextinput
                  placeholder="سعر الكشف"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  bordercolor={errors.price ? '#f00' : COLORS.gray}
                />
                <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                  {errors.price?.type === 'required'
                    ? 'يجب ادخال سعر الكشف'
                    : errors.price?.type === 'validate'
                      ? 'يجب ادخال رقم'
                      : ''}
                </Text>
              </>
            )}
          />
          <View style={styles.timeandsection}>
            <View style={styles.startandend}>
              <Controller
                control={control}
                name="start"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <Reusabletextinput
                      placeholder="البداية"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.start ? '#f00' : COLORS.gray}
                      onTouchStart={() => {
                        setmodal_Visible_start_time(true)
                      }
                      }
                    />
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
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
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <Reusabletextinput
                      placeholder="النهاية"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.end ? '#f00' : COLORS.gray}
                      onTouchStart={() => {
                        setmodal_Visible_end_time(true)

                      }
                      }
                    />

                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                      {errors.end?.type === 'required'
                        ? 'يجب ادخال النهاية'
                        : ''}
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
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <Reusabletextinput
                      placeholder="المدة"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.section ? '#f00' : COLORS.gray}
                      onTouchStart={() => {
                        setmodal_Visible_section_time(true)

                      }
                      }
                    />
                    <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
                      {errors.section?.type === 'required'
                        ? 'يجب ادخال المدة'
                        : ''}
                    </Text>
                  </>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonViewStyle}>
        <GeneralButton title="تأكيد" onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
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
            setphoto_uri(photo_uri => '');
          }}
          style={styles.eachOptionInBottonTab}>
          <Text style={[styles.optionTextStyle, { color: COLORS.red }]}>
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
          style={{ flex: 1 }}
          onRegionChangeComplete={(region, details) => {
            //console.log('regoin change :>>> ', JSON.stringify(region));
            //console.log('regoin details :>>> ', JSON.stringify(details));
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
              height: height * 0.4,
              backgroundColor: COLORS.white,
              borderRadius: RADIUS.mdRadius,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={styles.viewImageStyle}>
              <Text style={style.textTitleBold}>أيام العمل</Text>
            </View>
            {Days.map((Day, index) => {
              return (
                <View
                  key={index}
                  style={styles.viewofcheckbox}>
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

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <GeneralButton
                title="تأكيد"
                style={{ width: '90%' }}
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
        transparent={true}
      >
        <DateTimePicker
          testID="TimePicker"
          label="Pick A Date"
          onChange={onTimeSelected}
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={false}
          display="spinner"
          negativeButton={{ label: 'Cancel', textColor: 'red', }}
          positiveButton={{ label: 'ok', textColor: COLORS.blue }}
        />
      </Modal>

      <Modal
        visible={modal_Visible_end_time}
        onRequestClose={() => {
          setmodal_Visible_end_time(!modal_Visible_end_time,);
        }}
        transparent={true}
      >
        <DateTimePicker
          testID="TimePicker"
          label="Pick A Date"
          onChange={onTimeSelected_endtime}
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={false}
          display="spinner"
          negativeButton={{ label: 'Cancel', textColor: 'red', }}
          positiveButton={{ label: 'ok', textColor: COLORS.blue }}
        />
      </Modal>
      <Modal
        visible={modal_Visible_section_time}
        onRequestClose={() => {
          setmodal_Visible_section_time(!modal_Visible_end_time,);
        }}
        transparent={true}
      >
        <DateTimePicker
          testID="TimePicker"
          label="Pick A Date"
          onChange={onTimeSelected_sectiontime}
          mode={'time'}
          value={new Date(Date.now())}
          is24Hour={true}
          display="spinner"
          negativeButton={{ label: 'Cancel', textColor: 'red' }}
          positiveButton={{ label: 'ok', textColor: COLORS.blue, }}
        />
      </Modal>
    </View>
  );
};

export default Compeleteinformation;
