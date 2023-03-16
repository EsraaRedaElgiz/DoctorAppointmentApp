import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { PADDINGS, COLORS, FONTS } from '../../constants/Constants'
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation'
import GeneralPage from '../../components/GeneralPage/GeneralPage'
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import DropDown from '../../components/DropDown/DropDown'
import Reusabletextinput from '../../components/AppTextinput/AppTextinput'
import { RFValue } from 'react-native-responsive-fontsize'
import GeneralButton from '../../components/GeneralButton/GeneralButton'
import RBSheet from 'react-native-raw-bottom-sheet'
import * as ImagePicker from 'react-native-image-picker';
import { requestCameraPermission } from '../../utils/CameraPermissin';
import { Controller, useForm } from 'react-hook-form'
import ScrollView from 'react-native/Libraries/Components/ScrollView/ScrollView'
export default function EditDoctorDetails() {
 const { control, handleSubmit, formState: { errors } } = useForm({});
 const onSubmit = data => console.log(data);
 const [photo_uri, setphoto_uri] = useState("");
 const Specialization = ["اسنان", "باطنة", "صدر", "عيون"]
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
 return (
  <GeneralPage>
   <View style={styles.Continer}>
    <HeaderNavigation
     title="تعديل المعلومات"
     backgroundColor={COLORS.white}
     color={COLORS.black}
    />
    <ProfileImage
     iconOnImage={true}
     iconBgColor
     onPressPen={() => refRBSheet.current.open()}
     imageUri={photo_uri}
    />
    <View style={styles.Specalizationandexperience}>
     <View style={styles.viewofDropDown}>
      <Controller
       control={control}
       name="spealization"
       rules={{
        required: "التخصص يكون مطلوب"
       }}
       render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
         <DropDown
          style={styles.dropDownMarginBottom}
          placeholder="التخصص"
          data={Specialization}
          borderColor={error ? "red" : COLORS.gray}
          onSelect={onChange}
         />
         {error && (
          <Text style={{ color: "red", alignSelf: "flex-start" }}>{error.message || "error"}</Text>
         )}
        </>
       )}
      />
     </View>
     <View style={styles.viewofinput}>
      <Controller
       control={control}
       name="exp"
       rules={{
        required: "الخبرة تكون مطلوبة",
        validate: val => {
         if (val * 0 != 0) {
          return 'must number';
         }
        },
       }}
       render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
         <Reusabletextinput
          value={value}
          placeholder="الخبرة"
          onChangeText={onChange}
          onBlur={onBlur}
          bordercolor={error ? "red" : "gray"}
         />
         <Text style={{ color: "red", alignSelf: "flex-start" }}>
          {
           error?.type === 'required'
            ? 'يجب ادخال الخبرة'
            : error?.type === 'validate'
             ? 'يجب ادخال رقم'
             : ''}</Text>
        </>
       )}
      />
     </View>
    </View>
    <View style={styles.bottominputview}>
     <Controller
      control={control}
      name="Location"
      rules={{
       required: "يجب توافر الموقع"
      }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
       <>
        <Reusabletextinput
         placeholder="الموقع"
         value={value}
         onChangeText={onChange}
         onBlur={onBlur}
         bordercolor={error ? "red" : "gray"}
        />
        {error && (
         <Text style={{ color: "red", alignSelf: "flex-start" }}>{error.message || "error"}</Text>
        )}
       </>
      )}
     />
    </View>
    <View style={styles.bottominputview}>
     <Controller
      control={control}
      name="Adress description"
      rules={{
       required: "يجب وصف العنوان"
      }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
       <>
        <Reusabletextinput
         placeholder="وصف عنوان العيادة"
         value={value}
         onChangeText={onChange}
         onBlur={onBlur}
         bordercolor={error ? "red" : "gray"}
        />
        {error && (
         <Text style={{ color: "red", alignSelf: "flex-start" }}>{error.message || "error"}</Text>
        )}
       </>
      )}
     />
    </View>
    <View style={styles.bottominputview}>
     <Controller
      control={control}
      name="About"
      rules={{
       required: "السيرة الذاتية مطلوبة"
      }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
       <>
        <Reusabletextinput
         placeholder="السيرة الذاتية"
         value={value}
         onChangeText={onChange}
         onBlur={onBlur}
         bordercolor={error ? "red" : "gray"}
        />
        {error && (
         <Text style={{ color: "red", alignSelf: "flex-start" }}>{error.message || "error"}</Text>
        )}
       </>
      )}
     /></View>
    <View style={styles.bottominputview}>
     <Controller
      control={control}
      name="Workdays"
      rules={{
       required: "يجب وضع ايام العمل"
      }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
       <>
        <Reusabletextinput
         placeholder="ايام العمل"
         value={value}
         onChangeText={onChange}
         onBlur={onBlur}
         bordercolor={error ? "red" : "gray"}
        />
        {error && (
         <Text style={{ color: "red", alignSelf: "flex-start" }}>{error.message || "error"}</Text>
        )}
       </>
      )}
     /></View>
    <View style={styles.bottominputview}>
     <Controller
      control={control}
      name="price"
      rules={{
       required: "يجب وضع  سعر الكشف",
       validate: val => {
        if (val * 0 != 0) {
         return 'must number';
        }
       },
      }}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
       <>
        <Reusabletextinput
         placeholder="سعر الكشف"
         value={value}
         onChangeText={onChange}
         onBlur={onBlur}
         bordercolor={error ? "red" : "gray"}
        />
        <Text style={{ color: "red", alignSelf: "flex-start" }}>
         {error?.type === 'required'
          ? 'يجب ادخال سعر الكشف'
          : error?.type === 'validate'
           ? 'يجب ادخال رقم'
           : ''}</Text>
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
        required: "يجب وضع البداية",
        validate: val => {
         if (val * 0 != 0) {
          return 'must number';
         }
        },
       }}
       render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
         <Reusabletextinput
          placeholder="البداية"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          bordercolor={error ? "red" : "gray"}
         />
         <Text style={{ color: "red", alignSelf: "flex-start" }}>{error?.type === 'required'
          ? 'يجب ادخال البداية'
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
       name="end"
       rules={{
        required: "يجب وضع النهاية",
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
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          bordercolor={error ? "red" : "gray"}
         />
         <Text style={{ color: "red", alignSelf: "flex-start" }}>{error?.type === 'required'
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
       render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
         <Reusabletextinput
          placeholder="المدة"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          bordercolor={error ? "red" : "gray"}
         />
         <Text style={{ color: "red", alignSelf: "flex-start", }}>{error?.type === 'required'
          ? 'يجب ادخال المدة'
          : error?.type === 'validate'
           ? 'يجب ادخال رقم'
           : ''}</Text>
        </>
       )}
      />
     </View>
    </View>
    <GeneralButton
     title="تاكيد"
     onPress={handleSubmit(onSubmit)}
    />
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
   </View>
  </GeneralPage>
 )
}
const styles = StyleSheet.create({
 Continer: {
  flex: 1,
  backgroundColor: COLORS.white,
  padding: PADDINGS.mdPadding
 },
 image: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
 },
 Specalizationandexperience: {
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "row",
  marginTop: RFValue(10)
 },
 viewofDropDown: {
  width: "48%",
  height: RFValue(70),
  alignItems: "center",
  justifyContent: "space-around",

 },
 viewofinput: {
  width: "47%",
  height: RFValue(70),
  alignItems: "center",
  justifyContent: "space-around",
 },
 bottominputview: {
  marginBottom: RFValue(8)
 }, timeandsection: {
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",
  flexDirection: "row",
 },
 dropDownMarginBottom: {
  marginTop: RFValue(6),
 },
 startandend: {
  width: "31%",
  height: 65,
  marginBottom: RFValue(10)
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
})