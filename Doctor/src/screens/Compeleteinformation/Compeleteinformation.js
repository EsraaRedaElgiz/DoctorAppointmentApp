import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Modal, Dimensions, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GeneralPage from '../../../../src/components/GeneralPage/GeneralPage';
import Reusabletextinput from '../../../../src/components/AppTextinput/AppTextinput'
import { COLORS, FONTS, PADDINGS, RADIUS } from '../../../../src/constants/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import ProfileImage from '../../../../src/components/ProfileImage/ProfileImage';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as ImagePicker from 'react-native-image-picker';
import { requestCameraPermission } from '../../../../src/utils/CameraPermissin';
import RBSheet from 'react-native-raw-bottom-sheet';
import DropDown from '../../../../src/components/DropDown/DropDown';
import { CheckBox } from 'react-native-elements';
import { HeaderNavigation } from '../../../../src/components/headerNavigation/HeaderNavigation';
import { useForm, Controller } from 'react-hook-form';
import { style } from '../../../../src/styles/Style';
const Compeleteinformation = () => {
  const [photo_uri, setphoto_uri] = useState("");
  const Specialization = ["اسنان", "باطنة", "صدر", "عيون"]
  const [modalVisible, setModalVisible] = useState(false);
  const [modal_Visible_wokdays, setmodal_Visible_wokdays] = useState(false);
  const { width, height } = Dimensions.get('screen');
  const [checked, setchecked] = useState(select);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues:{
      spealization:'',
      exp:'',
      Location:'',
      Adressdescription:'',
      About:'',
      Workdays:'',
      price:'',
      start:'',
      end:'',
      section:''
    }
  });
  const onSubmit = data => console.log(data);
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
  const select = []
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
    ImagePicker.launchImageLibrary({ options, includeBase64: true }, res => {
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
  const handleChange = (id) => {
    let temp = Days.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setDays(temp);
  };

  const GetSelect = () => {
    var keys = Days.map((t) => t.txt)
    var check = Days.map((t) => t.isChecked)
    let selected = []
    for (let index = 0; index < check.length; index++) {
      if (check[index] == true) {
        selected.push(keys[index])
      }
    }
    alert(selected)
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: COLORS.blue }}>
        <StatusBar backgroundColor={COLORS.blue} />
        <HeaderNavigation
          padding={PADDINGS.mdPadding}
          title="تكملة المعلومات"
          backgroundColor={COLORS.blue}
          color={COLORS.white}
        />
        <View style={styles.viewImageStyle}>
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
      <View style={styles.viewofinformation}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewofSpeclizationandExperence}>
            <View style={styles.viewofDropDown}>
              <Controller
                control={control}
                name="spealization"
                rules={{
                  required: true
                }}
                render={({ field: { value, onChange, onBlur },  }) => (
                  <>
                    <DropDown
                      style={styles.dropDownMarginBottom}
                      placeholder="التخصص"
                      data={Specialization}
                      borderColor={errors.spealization ? "red" : COLORS.gray}
                      onSelect={onChange}
                    />
                    <Text style={{ color: "red", alignSelf: "flex-start" }}>
                      {errors.spealization?.type === 'required' ? "التخصص يكون مطلوب" : ''}
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
                render={({ field: { value, onChange, onBlur },  }) => (
                  <>
                    <Reusabletextinput
                      value={value}
                      placeholder="الخبرة"
                      keyboardType="numeric"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.exp ? "#f00" : COLORS.gray}
                    />
                    <Text style={{ color: "red", alignSelf: "flex-start" }}>
                      {
                        errors.exp?.type === 'required'
                          ? 'يجب ادخال الخبرة'
                          : errors.exp?.type === 'validate'
                            ? 'يجب ادخال رقم'
                            : ''}</Text>
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
                required: true
              }}
              render={({ field: { value, onChange, onBlur },}) => (
                <>
                  <View style={styles.viewoflocationandicon}>
                    <Reusabletextinput
                      placeholder="الموقع"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onTouchStart={() => setModalVisible(true)}
                      bordercolor={errors.Location ? "#f00" : COLORS.gray}
                    />
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => {
                        setModalVisible(true)
                      }}
                    >
                      <EvilIcons name='location' size={35} color={COLORS.darkGray2} style={{}} />
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: "red", alignSelf: "flex-start" }}>
                    {errors.Location?.type === 'required' ? "يجب توافر الموقع" : ""}
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
                required: true
              }}
              render={({ field: { value, onChange, onBlur },  }) => (
                <>
                  <Reusabletextinput
                    placeholder="وصف عنوان العيادة"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.Adressdescription ? "#f00" : COLORS.gray}
                  />
                  <Text style={{ color: "red", alignSelf: "flex-start" }}>
                    {errors.Adressdescription?.type === 'required' ? "يجب وصف العنوان" : ""}
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
                required: true
              }}
              render={({ field: { value, onChange, onBlur },  }) => (
                <>
                  <Reusabletextinput
                    placeholder="السيرة الذاتية"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    bordercolor={errors.About ? "#f00" : COLORS.gray}
                  />
                  <Text style={{ color: "red", alignSelf: "flex-start" }}>
                    {errors.About?.type === 'required' ? "السيرة الذاتية مطلوبة" : ""}
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
                required: true
              }}
              render={({ field: { value, onChange, onBlur }, }) => (
                <>
                  <Reusabletextinput
                    placeholder="ايام العمل"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onTouchStart={() => {
                      setmodal_Visible_wokdays(true)
                    }}
                    bordercolor={errors.Workdays ? "#f00" : COLORS.gray}
                  />

                  <Text style={{ color: "red", alignSelf: "flex-start" }}>
                    {errors.Workdays?.type === 'required' ? "يجب وضع ايام العمل" : ''}
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
            render={({ field: { value, onChange, onBlur }, }) => (
              <>
                <Reusabletextinput
                  placeholder="سعر الكشف"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  bordercolor={errors.price ? "#f00" : COLORS.gray}
                />
                <Text style={{ color: "red", alignSelf: "flex-start" }}>
                  {errors.price?.type === 'required'
                    ? 'يجب ادخال سعر الكشف'
                    : errors.price?.type === 'validate'
                      ? 'يجب ادخال رقم'
                      : ''}</Text>
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
                  validate: val => {
                    if (val * 0 != 0) {
                      return 'must number';
                    }
                  },

                }}
                render={({ field: { value, onChange, onBlur },  }) => (
                  <>
                    <Reusabletextinput
                      placeholder="البداية"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.start ? "#f00" : COLORS.gray}
                    />
                    <Text style={{ color: "red", alignSelf: "flex-start" }}>{errors.start?.type === 'required'
                      ? 'يجب ادخال البداية'
                      : errors.start?.type === 'validate'
                        ? 'يجب ادخال رقم'
                        : ''}</Text>
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
                  validate: val => {
                    if (val * 0 != 0) {
                      return 'must number';
                    }
                  },
                }}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <>
                    <Reusabletextinput
                      placeholder="النهاية"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.end ? "#f00" : COLORS.gray}
                    />

                    <Text style={{ color: "red", alignSelf: "flex-start" }}>{errors.end?.type === 'required'
                      ? 'يجب ادخال النهاية'
                      : error?.type === 'validate'
                        ? 'يجب ادخال رقم'
                        : ''}</Text>
                  </>
                )}
              />
            </View>
            <View style={styles.startandend}>
              <Controller
                control={control}
                name="section"
                rules={{
                  required: "يجب تحديد المدة",
                  validate: val => {
                    if (val * 0 != 0) {
                      return 'must number';
                    }
                  },
                }}
                render={({ field: { value, onChange, onBlur },}) => (
                  <>
                    <Reusabletextinput
                      placeholder="المدة"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      bordercolor={errors.section ? "#f00" : COLORS.gray}
                    />
                    <Text style={{ color: "red", alignSelf: "flex-start", }}>{errors.section?.type === 'required'
                      ? 'يجب ادخال المدة'
                      : errors.section?.type === 'validate'
                        ? 'يجب ادخال رقم'
                        : ''}</Text>
                  </>
                )}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonViewStyle}>
          <GeneralButton title="تأكيد" onPress={handleSubmit(onSubmit)} />
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
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 30.78650859999999,
            longitude: 31.0003757,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          style={{ flex: 1 }}
        >
          <Marker
            coordinate={{
              latitude: 30.78650859999999,
              longitude: 31.0003757,
            }}
            pinColor={"green"}
            title={"title"}
            description={"description"}
            draggable={true}
          >
          </Marker>
        </MapView>
      </Modal>
      <Modal
        visible={modal_Visible_wokdays}
        onRequestClose={() => {
          setmodal_Visible_wokdays(!modal_Visible_wokdays);
        }}
        transparent={true}
      >
        <View style={styles.modelofcheckbox}>
          <View style={{
            width: width * .8,
            height: height * .5,
            backgroundColor: COLORS.white,
            borderRadius: RADIUS.mdRadius,
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap"
          }}>
            <View style={styles.viewImageStyle}>
              <Text style={style.textTitleBold}>أيام العمل</Text>
            </View>
            {Days.map((Day, index) => {
              return (
                <View style={styles.viewofcheckbox}>
                  <CheckBox
                    checked={Day.isChecked}
                    onPress={() => {
                      handleChange(Day.id)

                    }}
                  />
                  <Text style={style.textContent}>{Day.txt}</Text>
                </View>
              )
            })}
            <View>
            </View>
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
              <GeneralButton
                title="تأكيد"
                style={{ width: "90%" }}
                onPress={() => {
                  setmodal_Visible_wokdays(!modal_Visible_wokdays);
                  GetSelect()
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default Compeleteinformation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  viewImageStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewofinformation: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFValue(85),
    paddingHorizontal: PADDINGS.mdPadding,
    flex: 2,
    overflow: "hidden"
  },
  viewofSpeclizationandExperence: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30
  },
  viewofDropDown: {
    width: "47%",
    height: RFValue(70),
  },
  viewoflocationandicon: {
    width: "100%",
    // minHeight: RFValue(55),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  icon: {
    width: RFValue(40),
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: RFValue(-50),
    marginTop: RFValue(5)
  },
  timeandsection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  startandend: {
    width: "31%",
    height: RFValue(65),
    marginBottom: RFValue(8),
  },
  modelofcheckbox: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0005"
  },
  viewofcheckbox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  firstTextInputMargun: {
    marginBottom: 0,
  },
  eachOptionInBottonTab: {
    width: '100%',
    height: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextStyle: {
    fontSize: FONTS.h5,
    color: COLORS.blue,
    fontWeight: '600',
  }, line: {
    height: RFValue(1),
    backgroundColor: COLORS.gray,
    width: '90%',
  },
  dropDownMarginBottom: {
    marginTop: RFValue(6),
  }, checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  buttonViewStyle: {
    backgroundColor: COLORS.white,
    paddingBottom: PADDINGS.mdPadding
  },

})