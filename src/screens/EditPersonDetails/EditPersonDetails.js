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

  const countries = ['A+', 'B+', 'C+'];
  const geneder = ['ذكر', 'انثي'];

  return (
    <GeneralPage>
      <HeaderNavigation
        title="المعلومات الشخصية"
        btn="تم"
        padding={PADDINGS.mdPadding}
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
        onPressBtn={() => {
          navigation.navigate('UserProfile');
        }}
      />
      <View style={styles.conatiner}>
        <ProfileImage
          iconName="pen"
          nameAfterImage
          iconOnImage
          iconBgColor
          onPressPen={() => refRBSheet.current.open()}
          imageUri={photo_uri}
        />
        <DropDown
          data={countries}
          placeholder="نوع الدم"
          borderColor={COLORS.gray}
        />
        <View style={styles.inputView}>
          <Reusabletextinput
            keyboardType="number-pad"
            placeholder="الوزن"
            bordercolor={COLORS.gray}
          />
        </View>
        <View style={styles.inputView}>
          <Reusabletextinput
            keyboardType="number-pad"
            placeholder="الطول"
            bordercolor={COLORS.gray}
          />
        </View>
        <View style={styles.inputView}>
          <Reusabletextinput
            keyboardType="number-pad"
            placeholder="العمر"
            bordercolor={COLORS.gray}
          />
        </View>
        <DropDown
          data={geneder}
          placeholder="النوع"
          borderColor={COLORS.gray}
        />
        <View style={styles.inputView}>
          <Reusabletextinput
            keyboardType="number-pad"
            placeholder="رقم الهاتف"
            bordercolor={COLORS.gray}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={RFValue(200)}
        openDuration={250}
        customStyles={{
          container: {
            alignItems: 'center',
            borderRadius: RFValue(30),
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
      <Modal
        transparent
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <Icon
            onPress={() => {
              setVisible(false);
            }}
            name="closecircleo"
            size={ICONS.mdIcon}
            style={{textAlign: 'left', marginBottom: RFValue(10)}}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.bloodType}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.bloodType}>B+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.bloodType}>C+</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </GeneralPage>
  );
}

export default EditPersonDetails;
