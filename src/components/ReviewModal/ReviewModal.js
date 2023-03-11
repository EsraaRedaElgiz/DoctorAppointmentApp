import React, {useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  COLORS,
  PADDINGS,
  RADIUS,
  MARGIN,
  FONTS,
  ICONS,
} from '../../constants/Constants';
import GeneralButton from '../GeneralButton/GeneralButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ReviewModal = props => {
  const {visiableAddReview, setVisiableAddReview} = props;
  const [defultRating, setDefultRating] = useState();
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      <Modal visible={visiableAddReview} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.ReviewContainer}>
            <Pressable
              style={styles.closeIconStyle}
              onPress={() => {
                setVisiableAddReview(false);
              }}>
              <AntDesign name="close" size={ICONS.mdIcon}  />
            </Pressable>
            <View
              style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="أخبرنا برأيك عن زيارتك لهذا الطبيب"
                multiline={true}
              />
              <View
                style={styles.starsContainer}>
                {maxRating.map((item, index) => {
                  return (
                    <>
                      <Pressable
                        key={item}
                        onPress={() => {
                          setDefultRating(item);
                        }}>
                        <FontAwesome
                          name={defultRating ? 'star-o' : 'star'}
                          size={ICONS.lgIcon}
                          color={COLORS.star}
                        />
                      </Pressable>
                    </>
                  );
                })}
              </View>
            </View>
            <GeneralButton
              title="تم"
              style={{marginHorizontal: MARGIN.smMargin}}
              onPress={() => {
                setVisiableAddReview(false);
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
    width: RFValue(250),
    height: RFValue(280),
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.mdRadius,
    // padding: PADDINGS.smPadding,
    elevation: RFValue(2),
  },
  textInput: {
    width: '100%',
    maxHeight: RFValue(100),
    minHeight: RFValue(20),
    borderColor: '#DDD',
    borderWidth: RFValue(2),
    borderRadius: RADIUS.mdRadius,
    padding: PADDINGS.mdPadding,
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
  },
  closeIconStyle:{
    width: RFValue(40),
    height:RFValue(40) ,
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  textInputContainer:{
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: PADDINGS.xlPadding,
    alignItems: 'center',
    paddingHorizontal: PADDINGS.smPadding,
  },
  starsContainer:{
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between',
  }
});
