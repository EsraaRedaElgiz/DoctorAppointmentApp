import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, FlatList, StatusBar } from 'react-native';
import { COLORS, PADDINGS } from '../../constants/Constants';
import styles from './styles';
import HeaderArrowAndWord from '../../components/HeaderArrowAndWord/HeaderArrowAndWord';
import AppointmentAndHistoryComponent from '../../components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent';
import { HeaderNavigation } from '../../components/headerNavigation/HeaderNavigation';
//back end
//import { getHistory } from '../../Redux/Reducers/HistorySlice'
//

function History({ navigation }) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  /*useEffect(() => {
    dispatch(getHistory())
  }, [])*/
  const history = [
    {
      doctorName: "سامي علي",
      doctorSpeciality: "الطب العام والداخلي",
      day: "4",
      month: "سبتمبر",
      year: "2022",
    }, {
      doctorName: "سامي علي",
      doctorSpeciality: "الطب العام والداخلي",
      day: "4",
      month: "سبتمبر",
      year: "2022",
    }

  ]
  keyextractor = (item, index) => index.toString();
  const renderitems = ({ item, index }) => {
    const { doctorName, doctorSpeciality, day, month, year } = item
    return (
      <AppointmentAndHistoryComponent
        doctorName={doctorName}
        doctorSpeciality={doctorSpeciality}
        dateShow={true}
        day={day}
        month={month}
        year={year}
        style={styles.afterEachCardMargin}
        // onPress={()=>alert(index)}
        onPress={() => {
          navigation.navigate("Prescription")
        }}
      />

    )

  }
  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <HeaderNavigation
        title="التاريخ"
        onPress={() => {
          navigation.goBack();
        }}
        padding={PADDINGS.mdPadding}
      />
      <FlatList
        keyExtractor={keyextractor}
        data={history}
        renderItem={renderitems}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainerStyle}

      />

    </View>
  );
}
export default History;
