import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  COLORS,
  PADDINGS,
  RADIUS,
  FONTS,
  ICONS,
} from '../../constants/Constants';
import GeneralButton from '../GeneralButton/GeneralButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RatingInput } from 'react-native-stock-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import { sendRate } from '../../Redux/Reducers/RateDoctorSlice';
const ReviewModal = props => {
  const globalState = useSelector(state => state);
  const dispatch = useDispatch();
  const { isLoading } = globalState.RateDoctorReducer
  const { visiableAddReview, setVisiableAddReview, doctorArray } = props;
  const [Rating, setRating] = useState(0);
  const [ReviewText, setReviewText] = useState('');
  const [error, setError] = useState('')
  const changeText = enteredText => {
    setReviewText(enteredText);
  };
  return (
    <>
      <Modal visible={visiableAddReview} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.ReviewContainer}>
            <Pressable
              style={styles.closeIconStyle}
              onPress={() => {
                setVisiableAddReview(false);
                setRating(Rating => 0);
                setReviewText(ReviewText => '')
                setError(error => '')
              }}>
              <AntDesign name="close" size={ICONS.mdIcon} />
            </Pressable>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="أخبرنا برأيك عن زيارتك لهذا الطبيب"
                multiline={true}
                value={ReviewText}
                onChangeText={changeText}
              />

              <RatingInput
                maxStars={5}
                rating={Rating}
                setRating={setRating}
                size={ICONS.lgIcon}
              />
              <Text style={{ color: COLORS.red }}>{error}</Text>
            </View>
            <GeneralButton
              title="تم"
              isLoading={isLoading}
              onPress={() => {
                if (Rating != 0) {
                  dispatch(sendRate({
                    "rating": Rating,
                    "doctor_id": doctorArray.doctor_id,
                    "patient_id": doctorArray.user_id
                  })).unwrap().then((res) => {
                    if (res == true) {
                      setVisiableAddReview(false);
                      console.log(ReviewText + "stars" + Rating)
                      setRating(Rating => 0);
                      setReviewText(ReviewText => '')
                      setError(error => '')
                    }
                  })

                } else {
                  setError(error => "يجب تحديد عدد النجوم")
                }

              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
export default ReviewModal;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ReviewContainer: {
    width: RFValue(230),
    height: RFValue(280),
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.mdRadius,
    elevation: RFValue(2),
    paddingHorizontal: PADDINGS.mdPadding,
  },
  textInput: {
    width: '100%',
    height: RFValue(60),
    borderColor: '#ddd',
    borderWidth: RFValue(2),
    paddingHorizontal: PADDINGS.smPadding,
    borderRadius: RADIUS.smRadius,
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
  },
  closeIconStyle: {
    width: RFValue(40),
    height: RFValue(40),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textInputContainer: {
    width: '100%',
    height: RFValue(150),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
