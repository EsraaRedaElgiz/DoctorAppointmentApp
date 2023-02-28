import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StatusBar, FlatList } from 'react-native'
import { COLORS, PADDINGS } from '../../constants/Constants'
import styles from './styles'
import HeaderArrowAndWord from "../../components/HeaderArrowAndWord/HeaderArrowAndWord";
import AppointmentAndHistoryComponent from '../../components/AppointmentAndHistoryComponent/AppointmentAndHistoryComponent'
//for backend
//import { getAppointmentes } from '../../Redux/Reducers/AppointmentSlice'
//
//import {appointment} from '../../utils/DummyData'

function Appointment() {
    const dispatch = useDispatch();
    const globalState = useSelector(state => state);
    /*useEffect(() => {
        dispatch(getAppointmentes())
    }, [])*/
    const appointments = [
        {
            doctorName: "سامي علي",
            doctorSpeciality: "الطب العام والداخلي",
            day: "٤",
            month: "سبتمبر",
            year: "٢٠٢٢",
            time: "٣٠:٥",
            status: "م"
        }, {
            doctorName: "سامي علي",
            doctorSpeciality: "الطب العام والداخلي",
            day: "٤",
            month: "سبتمبر",
            year: "٢٠٢٢",
            time: "٣٠:٥",
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
            />

        )

    }
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.blue} />
            <View style={styles.headerViewStyleAndFlatListContainerStyle}>
                <HeaderArrowAndWord
                    text="المواعيد"
                    arrowButtonStyle={styles.arrowButtonStyle}
                    textColor={COLORS.black}
                    textStyle={styles.textHeaderStyle}
                />
            </View>
            <FlatList
                keyExtractor={keyextractor}
                data={appointments}
                renderItem={renderitems}
                style={styles.flatListStyle}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.headerViewStyleAndFlatListContainerStyle, { paddingTop: '5%' }]}

            />
        </View>


    )


}
export default Appointment;