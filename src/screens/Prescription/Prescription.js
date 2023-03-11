import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
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

function Prescription({navigation}) {
  const [photo_uri, setphoto_uri] = useState(null);
  const [analysis_uri, set_analysis_uri] = useState(null);
  const [rumor_uri, set_rumor_uri] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [head, setHead] = useState(['الدواء', 'المدة', 'ملاحظات']);
  const [data, setData] = useState([
    ['lorim', 'يومان', 'مرة'],
    ['hello', 'يوم', '3 مرات'],
    ['Hiii', 'يومان', 'مرة'],
    ['tmam', 'يومان', 'مرة'],
  ]);
  const [visible, setVisible] = useState(false);

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
  return (
    <GeneralPage>
      <HeaderNavigation
        title="الروشتة"
        onPress={() => {
          navigation.goBack();
        }}
        padding={PADDINGS.mdPadding}
      />
      <View style={styles.container}>
        <Text style={style.textContentBold}>التشخيص</Text>
        <View style={styles.diagnosisView}>
          <Text style={[style.textContent, styles.diagnosisText]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non
            velit vel nunc blandit venenatis. Quisque vulputate lacinia elit,
            nec varius enim mollis eu. Sed eget eleifend eros. Etiam vel eros id
            elit mattis efficitur. Pellentesque hendrerit quis mi ut commodo.
            Nullam est est, imperdiet vel mi maximus, pulvinar sodales orci.
          </Text>
        </View>
        <Text style={style.textContentBold}>العلاج</Text>
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
        <Text style={style.textContentBold}>التحاليل</Text>
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
              <Text style={styles.titleModal}>التحليل</Text>
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
