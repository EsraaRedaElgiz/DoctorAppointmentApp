import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, View, TextInput} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../../constants/Constants';
import {style} from '../../../styles/Style';
const SearchBar = props => {
  const {placeholder, styleProp} = props;

  const [textInput, setTextInput] = useState('');
  const changeTextInput = enteredText => {
    setTextInput(enteredText);
  };

  return (
    <>
      <View style={[styles.container, styleProp]}>
        <View style={styles.iconConatiner}>
          <AntDesign
            name="search1"
            size={ICONS.mdIcon}
            color={COLORS.searchCostumeColor}
          />
        </View>
        <TextInput
          value={textInput}
          onChangeText={changeTextInput}
          style={[
            style.textContent,
            {
              flex: 1,
              paddingHorizontal: PADDINGS.smPadding,
              color: COLORS.darkGray,
            },
          ]}
          placeholder={placeholder}
        />
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(40),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: RFValue(1.5),
    borderColor: COLORS.searchCostumeColor,
    alignSelf: 'center',
    marginLeft: MARGIN.xsMargin,
    borderRadius: RADIUS.xsRadius,
  },
  iconConatiner: {
    width: RFValue(40),
    height: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
