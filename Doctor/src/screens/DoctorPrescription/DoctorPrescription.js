import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import styles from './DoctorPrescriptionStyles';
import {
  COLORS,
  FONTS,
  MARGIN,
  ICONS,
  PADDINGS,
} from '../../../../src/constants/Constants';
import GeneralPage from '../../../../src/components/GeneralPage/GeneralPage';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import {requestCameraPermission} from '../../../../src/utils/CameraPermissin';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HeaderNavigation} from '../../../../src/components/headerNavigation/HeaderNavigation';
const {height} = Dimensions.get('window');
import {style} from '../../../../src/styles/Style';
import GeneralTextInput from '../../../../src/components/GeneralTextInput/GeneralTextInput';
import GeneralButton from '../../../../src/components/GeneralButton/GeneralButton';
import {useDispatch, useSelector} from 'react-redux';
import {AddDiagonisticsAction} from '../../Redux/Reducers/AddDiagnosticsSlice';

function DoctorPrescription({navigation, route}) {
  const [photo_uri, setphoto_uri] = useState(null);
  const [analysis_uri, set_analysis_uri] = useState(null);
  const [rumor_uri, set_rumor_uri] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [head, setHead] = useState(['الدواء', 'المدة', 'ملاحظات']);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [inputVal1, setInputVal1] = useState(null);
  const [inputVal2, setInputVal2] = useState(null);
  const [inputVal3, setInputVal3] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [newArray, setNewArray] = useState([]);
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {isLoading} = globalState.AddDiagnosticsReducer;
  const appointment_id = route?.params?.appointment_id;
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const onPressHandler = () => {
    // appointment_id
    dispatch(
      AddDiagonisticsAction({
        diagnosis: diagnosis,
        diagnosis_treatment: JSON.stringify(newArray),
        appointment_id: appointment_id,
      }),
    )
      .unwrap()
      .then(res => {
        Alert.alert('تم اضافة الروشتة بنجاح');
      });
  };
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
        if (imageIndex === 0) {
          set_analysis_uri(photo_uri => res.assets[0].uri);
        } else {
          set_rumor_uri(photo_uri => res.assets[0].uri);
        }
        // setphoto_uri(photo_uri => res.assets[0].uri);
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
        if (imageIndex === 0) {
          set_analysis_uri(photo_uri => res.assets[0].uri);
        } else {
          set_rumor_uri(photo_uri => res.assets[0].uri);
        }
        //setphoto_uri(photo_uri => res.assets[0].uri);
        //upload_img(res.assets[0].base64)
      }
    });
  };
  const input1 = (
    <TextInput
      onChangeText={value => {
        setInputVal1(value);
      }}
      multiline={true}
      style={{
        width: '100%',
        padding: RFValue(2),
        maxHeight: RFValue(55),
        textAlign: 'center',
      }}
    />
  );
  const input2 = (
    <TextInput
      onChangeText={value => {
        setInputVal2(value);
      }}
      multiline={true}
      style={{
        width: '100%',
        padding: RFValue(2),
        maxHeight: RFValue(55),
        textAlign: 'center',
      }}
    />
  );
  const input3 = (
    <TextInput
      onChangeText={value => {
        setInputVal3(value);
      }}
      multiline={true}
      style={{
        width: '100%',
        padding: RFValue(2),
        maxHeight: RFValue(55),
        textAlign: 'center',
      }}
    />
  );
  const addTreatmentHandler = () => {
    if (input1 && input2) {
      let newArr = [input1, input2, input3];
      setData([...data, newArr]);
      //push array of textInput
      if (inputVal1 !== null || inputVal2 !== null) {
        newArray.push([inputVal1, inputVal2, inputVal3]);
        setInputVal1(null);
        setInputVal2(null);
        setInputVal3(null);
      }
      console.log(newArray);
    } else {
      Alert.alert('Must Enter Treatment and number of Times');
    }
  };
  return (
    <GeneralPage>
      <HeaderNavigation
        title="الروشتة"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
        padding={PADDINGS.mdPadding}
      />
      <View style={styles.container}>
        <Text style={style.textContentBold}>التشخيص</Text>
        <View style={styles.diagnosisView}>
          <GeneralTextInput
            onChangeText={value => {
              setDiagnosis(value);
            }}
            placeholder="اكتب التشخيص"
            multiline
          />
        </View>
        <View style={styles.analysisAndDiagnosis}>
          <Text style={style.textContentBold}>العلاج</Text>
          <TouchableOpacity
            onPress={() => addTreatmentHandler()}
            style={styles.plusIconView}>
            <Icon name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: MARGIN.mdMargin}}>
          <Table borderStyle={{borderWidth: 1}}>
            <Row
              data={head}
              flexArr={[1, 1, 1]}
              style={styles.head}
              textStyle={[styles.text, style.textSmallContentBold]}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={data}
                flexArr={[1, 1, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
        <View style={styles.analysisAndDiagnosis}>
          <Text style={style.textContentBold}>الاشاعة او التحليل</Text>
          <TouchableOpacity style={styles.plusIconView}>
            <Icon name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.analysis}>
          <View style={[styles.rowTableStyle, {backgroundColor: COLORS.white}]}>
            <Text style={styles.analysisText}>تحاليل</Text>
            <TouchableOpacity
              onPress={() => {
                if (analysis_uri === null) {
                  setImageIndex(0);
                  refRBSheet.current.open();
                } else {
                  setImageIndex(0);
                  setVisible(true);
                }
              }}
              style={styles.openButton}>
              <Text style={styles.openText}>
                {analysis_uri === null ? 'اضافة' : 'افتح'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowTableStyle}>
            <Text style={styles.analysisText}>اشاعات</Text>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                if (rumor_uri === null) {
                  setImageIndex(1);
                  refRBSheet.current.open();
                } else {
                  setImageIndex(1);
                  setVisible(true);
                }
              }}>
              <Text style={styles.openText}>
                {rumor_uri === null ? 'اضافة' : 'افتح'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* MODAL analysis */}
      <Modal
        transparent
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.wrapperView}>
            <View style={styles.headerView}>
              <Text style={styles.titleModal}>
                {imageIndex === 0 ? 'التحليل' : 'الاشاعة'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{flex: 1}}>
              <View style={styles.iconView}>
                <Icon name="x" color={COLORS.gray} size={ICONS.mdIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.imageView}>
            <Image
              resizeMode="contain"
              source={{uri: imageIndex === 0 ? analysis_uri : rumor_uri}}
              style={styles.imageStyle}
            />
          </View>
        </View>
      </Modal>
      <RBSheet
        ref={refRBSheet}
        height={RFValue(150)}
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
          onPress={() => refRBSheet.current.close()}
          style={styles.eachOptionInBottonTab}>
          <Text style={styles.optionTextStyle}>انهاء</Text>
        </TouchableOpacity>
      </RBSheet>
      <View style={styles.buttonView}>
        <GeneralButton
          isLoading={isLoading}
          title="تم"
          onPress={() => onPressHandler()}
        />
      </View>
    </GeneralPage>
  );
}

export default DoctorPrescription;
