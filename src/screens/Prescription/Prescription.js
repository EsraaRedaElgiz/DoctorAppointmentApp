import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import GeneralPage from '../../components/GeneralPage/GeneralPage';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import styles from './PrescriptionStyle';
import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
} from '../../constants/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import {requestCameraPermission} from '../../utils/CameraPermissin';
import RBSheet from 'react-native-raw-bottom-sheet';
import {HeaderNavigation} from '../../components/headerNavigation/HeaderNavigation';
const {height} = Dimensions.get('window');
import {style} from '../../styles/Style';
import {useSelector, useDispatch} from 'react-redux';
import {getPrescription} from '../../Redux/Reducers/PrescriptionSlice';

function Prescription({navigation, route}) {
  const {appointment_id} = route.params;
  const globalState = useSelector(state => state);
  const {diagnosis, diagnosisTreatment, isLoading} =
    globalState.PrescriptionReducer;
  const dispatch = useDispatch();
  const [photo_uri, setphoto_uri] = useState(null);
  const [analysis_uri, set_analysis_uri] = useState(null);
  const [rumor_uri, set_rumor_uri] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [head, setHead] = useState(['الدواء', 'المدة', 'ملاحظات']);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('appointment_id in Prescription ', appointment_id);
    dispatch(getPrescription({appointment_id: appointment_id}))
      .unwrap()
      .then(res => console.log('Response ', res))
      .catch(error => console.log('Error because diagnosis not Exits ', error));
  }, [appointment_id]);

  const treatments = diagnosisTreatment.map((el, idx) => el.treatment);
  const times = diagnosisTreatment.map((el, idx) => el.dose_per_day);
  const notes = diagnosisTreatment.map((el, idx) => el.notes);

  const row1 = [treatments[0], times[0], notes[0]];
  const row2 = [treatments[1], times[1], notes[1]];
  const row3 = [treatments[2], times[2], notes[2]];

  const data = [row1, row2, row3];

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
        if (imageIndex === 0) {
          set_analysis_uri(photo_uri => res.assets[0].uri);
        } else {
          set_rumor_uri(photo_uri => res.assets[0].uri);
        }
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
      }
    });
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
      {isLoading ? (
        <View style={styles.ActivityIndicatorStyleView}>
          <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={style.textContentBold}>التشخيص</Text>
          <View style={styles.diagnosisView}>
            <Text style={[style.textContent, styles.diagnosisText]}>
              {diagnosis ? diagnosis : 'المريض بحالة جيدة'}
            </Text>
          </View>
          <Text style={style.textContentBold}>العلاج</Text>
          {diagnosisTreatment.length ? (
            <Fragment>
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
            </Fragment>
          ) : (
            <Text
              style={[
                style.textContent,
                styles.diagnosisText,
                {marginVertical: MARGIN.mdMargin},
              ]}>
              لا يوجد علاج
            </Text>
          )}
          <Text style={style.textContentBold}>التحاليل</Text>
          <View style={styles.analysis}>
            <View
              style={[styles.rowTableStyle, {backgroundColor: COLORS.white}]}>
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
      )}

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
        {/* <View style={styles.line} /> */}
        {/* <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            setphoto_uri(photo_uri => '');
          }}
          style={styles.eachOptionInBottonTab}>
          <Text style={[styles.optionTextStyle, {color: COLORS.red}]}>
            مسح الصورة
          </Text>
        </TouchableOpacity> */}
        <View style={styles.line} />
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={styles.eachOptionInBottonTab}>
          <Text style={styles.optionTextStyle}>انهاء</Text>
        </TouchableOpacity>
      </RBSheet>
    </GeneralPage>
  );
}

export default Prescription;
