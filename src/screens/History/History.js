import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, StatusBar, ToastAndroid, Text,ActivityIndicator } from 'react-native';
import { COLORS, PADDINGS } from '../../constants/Constants';
import styles from './styles';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import AppointmentAndHistoryComponent from '../../components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
import { RFValue } from 'react-native-responsive-fontsize';
import { getHistory } from '../../Redux/Reducers/HistorySlice';

function History({ navigation }) {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const { isLoading, history } = globalState.HistoryReducer
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getHistory())
    });

    return unsubscribe;
  }, [navigation])

 
  /* const history = [
     {
       doctorName: "سامي علي",
       doctorSpeciality: "الطب العام والداخلي",
       day: "4",
       month: "سبتمبر",
       year: "2022",
     }, {
       doctorName: "احمد محمد",
       doctorSpeciality: "طب الاسنان",
       day: "6",
       month: "سبتمبر",
       year: "2022",
     }
 
   ]*/
  const getMonthName = monthnum => {
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
  keyextractor = (item, index) => index.toString();
  const renderitems = ({ item, index }) => {
    const { doctor, appointment_date } = item
    return (
      <AppointmentAndHistoryComponent
        doctorName={doctor.user_first_name}
        doctorSpeciality={doctor.speciality_name}
        dateShow={true}
        day={appointment_date.substring(8, 10)}
        month={getMonthName(appointment_date.substring(5, 7)).trim()}
        year={appointment_date.substring(0, 4)}
        doctorImageUri={doctor.user_image}
        style={styles.afterEachCardMargin}
        // onPress={()=>alert(index)}
        onPress={() => {
          navigation.navigate("Prescription")
        }}
      />

    )

  }
  const showToast = () => {
    ToastAndroid.show(visible == true ? 'تاريخك المرضي غير مرئي للأطباء !' : "تاريخك المرضي مرئي للأطباء !", ToastAndroid.SHORT);
  };

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="التاريخ"
        icon
        iconName={visible == false ? "lock" : "unlock"}
        color={COLORS.darkGray3}
        rightButtonHide
        onPressBtn={() => { setVisible(visible => { return !visible }); showToast() }}
        padding={PADDINGS.mdPadding}
      />
      {isLoading ? <ActivityIndicator size={RFValue(30)} color={COLORS.blue} /> :
        (history.length > 0 ? (
          <FlatList
            keyExtractor={keyextractor}
            data={history}
            renderItem={renderitems}
            style={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainerStyle}
          />) : (
          <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text >لا يوجد تاريخ مرضي حتي الأن</Text>
          </View>)
        )}

    </View>
  );
}
export default History;
