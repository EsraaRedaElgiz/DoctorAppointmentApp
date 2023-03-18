import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  COLORS,
  FONTS,
  ICONS,
  PADDINGS,
  RADIUS,
} from '../../../.././src/constants/Constants';
import styles from './styles';
import AppointmentAndHistoryComponent from '../../../.././src/components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent';
import GeneralButton from '../../../.././src/components/GeneralButton/GeneralButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RFValue } from 'react-native-responsive-fontsize';
import Dialog from 'react-native-dialog';
import { HeaderNavigation } from '../../../.././src/components/headerNavigation/HeaderNavigation';
import { style } from '../../../.././src/styles/Style';


function AppointmentDetails() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [getDay, setGetDay] = useState('');
  const [getMonth, setGetMonth] = useState('');
  const [getYear, setGetYear] = useState('');
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const [appointmentDetailsObject, setAppointmentDetailsObject] = useState({
    name: 'عاطف محمد',
    day: '18',
    month: 'مارس',
    year: '2023',
    time: '12:00',
    status: 'م',
    appointmentStatus: 'معلق',
    histortStatus: 'private',
  });
  useEffect(() => {
    setGetDay(getDay => {
      return new Date().getDate();
    });
    //console.log(getDay)
    getMonthName(new Date().getMonth());
    //console.log(getMonth)
    setGetYear(getYear => {
      return new Date().getFullYear();
    });
    //console.log(getYear)

    //dispatch(getHistory())
  }, []);
  const getMonthName = monthnum => {
    switch (monthnum) {
      case 0:
        setGetMonth(getMonth => {
          return 'يناير';
        });
        break;
      case 1:
        setGetMonth(getMonth => {
          return 'فبراير';
        });
        break;
      case 2:
        setGetMonth(getMonth => {
          return 'مارس';
        });
        break;
      case 3:
        setGetMonth(getMonth => {
          return 'ابريل';
        });
        break;
      case 4:
        setGetMonth(getMonth => {
          return 'مايو';
        });
        break;
      case 5:
        setGetMonth(getMonth => {
          return 'يونيو';
        });
        break;
      case 6:
        setGetMonth(getMonth => {
          return 'يوليو';
        });
        break;
      case 7:
        setGetMonth(getMonth => {
          return 'اغسطس';
        });
        break;
      case 8:
        setGetMonth(getMonth => {
          return 'سبتمبر';
        });
        break;
      case 9:
        setGetMonth(getMonth => {
          return 'اكتوبر';
        });
        break;
      case 10:
        setGetMonth(getMonth => {
          return 'نوفمبر';
        });
        break;
      case 11:
        setGetMonth(getMonth => {
          return 'ديسمبر';
        });
        break;
    }
  };
  const history = [
    {
      doctorName: 'سامي علي',
      doctorSpeciality: 'الطب العام والداخلي',
      day: '4',
      month: 'سبتمبر',
      year: '2023',
    },
    {
      doctorName: 'سامي علي',
      doctorSpeciality: 'الطب العام والداخلي',
      day: '4',
      month: 'سبتمبر',
      year: '2023',
    },
  ];

  keyextractor = (item, index) => index.toString();
  const renderitems = ({ item, index }) => {
    const { doctorName, doctorSpeciality, day, month, year } = item;
    return (
      <AppointmentAndHistoryComponent
        doctorName={doctorName}
        doctorSpeciality={doctorSpeciality}
        dateShow={true}
        day={day}
        month={month}
        year={year}
        style={styles.afterEachCardMargin}
      //onPress={()=>alert(index)}
      />
    );
  };
  const changeAppointmentStatus = () => {
    const obj = { ...appointmentDetailsObject };
    if (obj.appointmentStatus == 'معلق') {
      setAppointmentDetailsObject(prev => {
        return { ...prev, appointmentStatus: 'تم التأكيد' };
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="تفاصيل الميعاد"
        color={COLORS.darkGray3}
        padding={PADDINGS.mdPadding}
        onPress={() => {
          console.log('hi');
        }}
      />
      <View style={styles.appointmentDetailsContainer}>
        <View style={styles.imageAndTextViewStyle}>
          <View style={styles.viewImageStyle}>
            <Image
              style={styles.imageStyle}
              source={require('../../assets/Images/patientImage.jpg')}
            />
          </View>
          <View>
            <View>
              <Text style={styles.patientTextStyle}>
                {appointmentDetailsObject.name}
              </Text>
            </View>
            <View>
              <Text style={styles.historyAndTimeTextStyle}>
                {appointmentDetailsObject.day +
                  ' ' +
                  appointmentDetailsObject.month +
                  ' ' +
                  appointmentDetailsObject.year}
              </Text>
            </View>
            <View>
              <Text style={styles.historyAndTimeTextStyle}>
                {appointmentDetailsObject.time +
                  ' ' +
                  appointmentDetailsObject.status}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.appointmentDetailsContainerLeftViewStyle}>


          <TouchableOpacity
            style={[styles.buttonStyle, { backgroundColor: 'rgba(47, 115, 252,0.1)' }]}
          >
            <Text
              style={[styles.patientTextStyle, { color: COLORS.blue }]}>
              التفاصيل
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, {
              borderColor: appointmentDetailsObject.appointmentStatus === 'تم التأكيد' ? COLORS.green : COLORS.red
              , backgroundColor: appointmentDetailsObject.appointmentStatus === 'تم التأكيد' ? 'rgba(174, 210, 96,0.1)' : 'rgba(255, 0, 0,0.1)'
            }

            ]}
            onPress={() => {
              setDialogVisible(dialogVisible => true);
            }}>
            <Text
              style={[
                styles.patientTextStyle,
                {
                  color:
                    appointmentDetailsObject.appointmentStatus === 'تم التأكيد'
                      ? COLORS.green
                      : COLORS.red,
                },
              ]}>
              {appointmentDetailsObject.appointmentStatus}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.historyTextViewStyle}>
        <Text style={style.textContentBold}>التاريخ</Text>
      </View>
      {appointmentDetailsObject.histortStatus === 'public' ? (
        appointmentDetailsObject.appointmentStatus === 'تم التأكيد' &&
          JSON.parse(appointmentDetailsObject.day) === getDay &&
          appointmentDetailsObject.month === getMonth &&
          JSON.parse(appointmentDetailsObject.year) === getYear ? (
          <>
            <FlatList
              keyExtractor={keyextractor}
              data={history}
              renderItem={renderitems}
              style={styles.flatListStyle}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContentContainerStyle}
            />
            <View style={styles.buttonViewContainer}>
              <GeneralButton title="اضافة روشته" />
            </View>
          </>
        ) : (
          <FlatList
            keyExtractor={keyextractor}
            data={history}
            renderItem={renderitems}
            style={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainerStyle}
          />
        )
      ) : appointmentDetailsObject.appointmentStatus === 'تم التأكيد' &&
        JSON.parse(appointmentDetailsObject.day) === getDay &&
        appointmentDetailsObject.month === getMonth &&
        JSON.parse(appointmentDetailsObject.year) === getYear ? (
        <View style={styles.viewForLockAndButtonStyle}>
          <View style={styles.viewForLockAndTextStyle}>
            <View>
              <Fontisto
                name="locked"
                size={RFValue(100)}
                color={COLORS.black}
              />
            </View>
            <View style={styles.viewForPrivateTextStyle}>
              <Text style={styles.privateTextStyle}>هذا التاريخ خاص</Text>
            </View>

          </View>

          <View>
            <GeneralButton title="اضافة روشته" />
          </View>
        </View>
      ) : (
        <View style={styles.viewForLockAndButtonStyle}>
          <View style={styles.viewForLockAndTextStyle}>

            <View>
              <Fontisto
                name="locked"
                size={RFValue(100)}
                color={COLORS.darkGray3}
              />
            </View>
            <View style={styles.viewForPrivateTextStyle}>
              <Text style={styles.privateTextStyle}>هذا التاريخ خاص</Text>
            </View>

          </View>
        </View>
      )}
      <View>
        <Dialog.Container
          visible={dialogVisible}
          footerStyle={styles.dialogFootorStyle}
          contentStyle={styles.dialogContainerStyle}>
          <Dialog.Description style={styles.dialogDescribtionTextStyle}>
            هل تريد تغيير حالة هذا المريض إلى تأكيد ؟
          </Dialog.Description>
          <Dialog.Button
            label="لا"
            color={COLORS.red}
            onPress={() => setDialogVisible(dialogVisible => false)}
          />
          <Dialog.Button
            label="|"
            color={COLORS.gray}
            disabled={true}
            style={styles.dialogSeperationLineStyle}
          />
          <Dialog.Button
            label="نعم"
            color={COLORS.blue}
            onPress={() => {
              setDialogVisible(dialogVisible => false);
              changeAppointmentStatus();
            }}
          />
        </Dialog.Container>
      </View>
    </View>
  );
}
export default AppointmentDetails;
