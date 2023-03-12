import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StatusBar, FlatList } from 'react-native';
import { COLORS, PADDINGS } from '../../constants/Constants';
import styles from './styles';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import AppointmentAndHistoryComponent from '../../components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent';
//for backend
//import { getAppointmentes } from '../../Redux/Reducers/AppointmentSlice'
//
//import {appointment} from '../../utils/DummyData'
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
function Appointment({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  /*useEffect(() => {
        dispatch(getAppointmentes())
    }, [])*/
  const appointments = [
    {
      doctorName: "سامي علي",
      doctorSpeciality: "الطب العام والداخلي",
      day: "4",
      month: "سبتمبر",
      year: "2023",
      time: "5:30",
      status: "م"
    }, {
      doctorName: "احمد محمد",
      doctorSpeciality:"طب الاسنان",
      day: "5",
      month: "سبتمبر",
      year: "2023",
      time: "5:30",
      status: "م"
    }

  ]
  keyextractor = (item, index) => index.toString();
  const renderitems = ({ item, index }) => {
    const { doctorName, doctorSpeciality, day, month, year, time, status } = item
    return (
      <AppointmentAndHistoryComponent
        doctorName={doctorName}
        doctorSpeciality={doctorSpeciality}
        dateShow={true}
        day={day}
        month={month}
        year={year}
        timeShow={true}
        time={time}
        status={status}
        style={styles.afterEachCardMargin}
        disabled={true}

      />

    )

  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="المواعيد"
        color={COLORS.darkGray3}
        onPress={() => {
          navigation.goBack();
        }}
        padding={PADDINGS.mdPadding}
      />

      <FlatList
        keyExtractor={keyextractor}
        data={appointments}
        renderItem={renderitems}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainerStyle}
      />
    </View>
  );
}
export default Appointment;
