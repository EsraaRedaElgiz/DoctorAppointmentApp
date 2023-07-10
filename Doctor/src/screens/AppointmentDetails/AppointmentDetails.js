import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import {RFValue} from 'react-native-responsive-fontsize';
import Dialog from 'react-native-dialog';
import {HeaderNavigation} from '../../../.././src/components/headerNavigation/HeaderNavigation';
import {style} from '../../../.././src/styles/Style';
// import { useNavigation } from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {
  getAppointmentDetails,
  setAppointmentDetails,
} from '../../Redux/Reducers/AppointmentDetailsSlice';
import {ActivityIndicator} from 'react-native-paper';
import {changeStatus} from '../../Redux/Reducers/UpdateAppointmentStatusSlice';
import Images from '../../../../src/constants/Images';
function AppointmentDetails({navigation}) {
  // const navigation=useNavigation()
  //const route = useRoute();
  //const PatientsArray = route.params.PatientsArray;
  //const appointmentStatus = route.params.appointmentStatus;
  const [dialogVisible, setDialogVisible] = useState(false);
  const [getDay, setGetDay] = useState('');
  const [getMonth, setGetMonth] = useState('');
  const [getYear, setGetYear] = useState('');
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {appointmentDetails, isLoading} = globalState.AppointmentDetailsReducer;
  const [appointmentDetailsObject, setAppointmentDetailsObject] =
    useState(appointmentDetails);
  const {historyArr, isLoading2} = globalState.PatientHistoryReducer;
  const historyFilter = historyArr.filter(el => el.diagnostics);
  useEffect(() => {
    setGetDay(getDay => {
      return new Date().getDate();
    });

    //console.log('appoin', appointmentDetails);
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
  const getMonthNameBack = monthnum => {
    if (monthnum == '01') {
      return 'يناير';
    } else if (monthnum == '02') {
      return 'فبراير';
    } else if (monthnum == '03') {
      return 'مارس';
    } else if (monthnum == '04') {
      return 'ابريل';
    } else if (monthnum == '05') {
      return 'مايو';
    } else if (monthnum == '06') {
      return 'يونيو';
    } else if (monthnum == '07') {
      return 'يوليو';
    } else if (monthnum == '08') {
      return 'اغسطس';
    } else if (monthnum == '09') {
      return 'سبتمبر';
    } else if (monthnum == '10') {
      return 'اكتوبر';
    } else if (monthnum == '11') {
      return 'نوفمبر';
    } else if (monthnum == '12') {
      return 'ديسمبر';
    }
  };
  const history = [
    {
      doctorName: 'سامي علي',
      doctorSpeciality: 'الطب العام والداخلي',
      day: '4',
      month: 'سبتمبر',
      year: '2022',
    },
  ];

  keyextractor = (item, index) => index.toString();
  const renderitems = ({item, index}) => {
    const {
      doctorName,
      doctorSpeciality,
      day,
      month,
      year,
      doctor,
      appointment_date,
      user,
    } = item;
    return (
      <AppointmentAndHistoryComponent
        doctorImageUri={user.user_image}
        doctorName={user.user_first_name}
        doctorSpeciality={doctor.speciality_name}
        dateShow={true}
        day={appointment_date.substring(8, 10)}
        month={getMonthNameBack(appointment_date.substring(5, 7)).trim()}
        year={appointment_date.substring(0, 4)}
        style={styles.afterEachCardMargin}
        onPress={() => {
          navigation.navigate('Prescription', {
            appointment_id: item.appointment_id,
          });
        }}
      />
    );
  };
  const changeAppointmentStatus = () => {
    const obj = {...appointmentDetailsObject};
    if (obj.appointment_status == '2') {
      dispatch(
        changeStatus({
          appointment_id: appointmentDetailsObject.appointment_id,
          appointment_status: '1',
        }),
      )
        .unwrap()
        .then(res => {
          if (res == true) {
            setAppointmentDetailsObject(prev => {
              return {...prev, appointment_status: '1'};
            });
          }
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
          navigation.goBack();
        }}
      />
      <View style={styles.appointmentDetailsContainer}>
        {isLoading ? (
          <View style={styles.activityIndicatorContainerStyle}>
            <Text>
              {' '}
              <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />{' '}
            </Text>
          </View>
        ) : !appointmentDetails.appointment_id ? (
          <View style={styles.activityIndicatorContainerStyle}>
            <Text>حدث خطأ اثناء الاتصال بالخادم من فضلك حاول مجددا</Text>
          </View>
        ) : (
          <>
            <View style={styles.imageAndTextViewStyle}>
              <View style={styles.viewImageStyle}>
                {appointmentDetailsObject.patient.user_image ? (
                  <Image
                    style={styles.imageStyle}
                    source={{uri: appointmentDetailsObject.patient.user_image}}
                  />
                ) : (
                  <Image
                    style={styles.imageStyle}
                    source={Images.userDefault}
                  />
                )}
              </View>
              <View>
                <View>
                  <Text style={styles.patientTextStyle}>
                    {appointmentDetailsObject.patient.user_first_name.trim()}
                  </Text>
                </View>
                <View>
                  <Text style={styles.historyAndTimeTextStyle}>
                    {appointmentDetailsObject.appointment_date.substring(
                      8,
                      10,
                    ) +
                      ' ' +
                      getMonthNameBack(
                        appointmentDetailsObject.appointment_date.substring(
                          5,
                          7,
                        ),
                      ).trim() +
                      ' ' +
                      appointmentDetailsObject.appointment_date.substring(0, 4)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.historyAndTimeTextStyle}>
                    {
                      appointmentDetailsObject.appointment_time.substring(
                        0,
                        5,
                      ) /*+
                  ' ' +
                  appointmentDetailsObject.status*/
                    }
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.appointmentDetailsContainerLeftViewStyle}>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {backgroundColor: 'rgba(47, 115, 252,0.1)'},
                ]}
                onPress={() => {
                  navigation.navigate(
                    'UserDetails' /*{
                    photo: PatientsArray.imageUri,
                    name: PatientsArray.name,
                  }*/,
                  );
                }}>
                <Text style={[styles.patientTextStyle, {color: COLORS.blue}]}>
                  التفاصيل
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    borderColor:
                      appointmentDetailsObject.appointment_status === '1' ||
                      appointmentDetailsObject.appointment_status === 'مكتمل'
                        ? COLORS.green
                        : COLORS.red,
                    backgroundColor:
                      appointmentDetailsObject.appointment_status === '1' ||
                      appointmentDetailsObject.appointment_status === 'مكتمل'
                        ? 'rgba(174, 210, 96,0.1)'
                        : 'rgba(255, 0, 0,0.1)',
                  },
                ]}
                disabled={
                  appointmentDetailsObject.appointment_status === '0' ||
                  appointmentDetailsObject.appointment_status === 'مكتمل' ||
                  appointmentDetailsObject.appointment_status === '1'
                }
                onPress={() => {
                  setDialogVisible(dialogVisible => true);
                }}>
                <Text
                  style={[
                    styles.patientTextStyle,
                    {
                      color:
                        appointmentDetailsObject.appointment_status === '1' ||
                        appointmentDetailsObject.appointment_status === 'مكتمل'
                          ? COLORS.green
                          : COLORS.red,
                    },
                  ]}>
                  {appointmentDetailsObject.appointment_status === '0'
                    ? 'ملغي'
                    : appointmentDetailsObject.appointment_status === '2'
                    ? 'معلق'
                    : appointmentDetailsObject.appointment_status === '1'
                    ? 'تم التأكيد'
                    : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.historyTextViewStyle}>
        <Text style={style.textContentBold}>التاريخ</Text>
      </View>
      {appointmentDetailsObject.patient.private_history === '0' ? (
        appointmentDetailsObject.appointment_status === '1' &&
        (appointmentDetailsObject.appointment_date.substring(8, 10)[0] === '0'
          ? JSON.parse(
              appointmentDetailsObject.appointment_date.substring(9, 10),
            )
          : JSON.parse(
              appointmentDetailsObject.appointment_date.substring(8, 10),
            )) == getDay &&
        getMonthNameBack(
          appointmentDetailsObject.appointment_date.substring(5, 7),
        ).trim() == getMonth &&
        JSON.parse(appointmentDetailsObject.appointment_date.substring(0, 4)) ==
          getYear ? (
          <>
            {/*  هنا لو كان اراي الهيستوري فاضي يبقي هيظهر كلام */}
            {isLoading2 == true ? (
              <View style={styles.viewForLockAndButtonStyle}>
                <View style={styles.viewForLockAndTextStyle}>
                  <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
                </View>
              </View>
            ) : historyFilter.length > 0 ? (
              <>
                <FlatList
                  keyExtractor={keyextractor}
                  data={historyFilter}
                  renderItem={renderitems}
                  style={styles.flatListStyle}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContentContainerStyle}
                />
                <View style={styles.buttonViewContainer}>
                  <GeneralButton
                    title="اضافة روشتة"
                    onPress={() => {
                      navigation.navigate('DoctorPrescription', {
                        appointment_id: appointmentDetailsObject.appointment_id,
                      });
                    }}
                  />
                </View>
              </>
            ) : (
              <View style={styles.viewForLockAndButtonStyle}>
                <View style={styles.viewForLockAndTextStyle}>
                  <Text>لا يوجد تاريخ مرضي حتي الأن</Text>
                </View>
                <View>
                  <GeneralButton
                    title="اضافة روشتة"
                    onPress={() => {
                      navigation.navigate('DoctorPrescription', {
                        appointment_id: appointmentDetailsObject.appointment_id,
                      });
                    }}
                  />
                </View>
              </View>
            )}
          </>
        ) : isLoading2 == true ? (
          <View style={styles.viewForLockAndButtonStyle}>
            <View style={styles.viewForLockAndTextStyle}>
              <ActivityIndicator size={RFValue(30)} color={COLORS.blue} />
            </View>
          </View>
        ) : historyFilter.length > 0 ? (
          <FlatList
            keyExtractor={keyextractor}
            data={historyFilter}
            renderItem={renderitems}
            style={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainerStyle}
          />
        ) : (
          <View style={styles.viewForLockAndButtonStyle}>
            <View style={styles.viewForLockAndTextStyle}>
              <Text>لا يوجد تاريخ مرضي حتي الأن</Text>
            </View>
          </View>
        )
      ) : appointmentDetailsObject.appointment_status === '1' &&
        (appointmentDetailsObject.appointment_date.substring(8, 10)[0] === '0'
          ? JSON.parse(
              appointmentDetailsObject.appointment_date.substring(9, 10),
            )
          : JSON.parse(
              appointmentDetailsObject.appointment_date.substring(8, 10),
            )) === getDay &&
        getMonthNameBack(
          appointmentDetailsObject.appointment_date.substring(5, 7),
        ).trim() === getMonth &&
        JSON.parse(
          appointmentDetailsObject.appointment_date.substring(0, 4),
        ) === getYear ? (
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
            <GeneralButton
              title="اضافة روشتة"
              onPress={() => {
                navigation.navigate('DoctorPrescription', {
                  appointment_id: appointmentDetailsObject.appointment_id,
                });
              }}
            />
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
