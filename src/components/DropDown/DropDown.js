import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, ICONS, MARGIN} from '../../constants/Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import SelectDropdown from 'react-native-select-dropdown';

function DropDown(props) {
  const {
    data,
    placeholder,
    style,
    onSelect,
    borderColor,
    color,
    defaultValue,
    ...rest
  } = props;
  return (
    <View style={[styles.dropDownView, style]}>
      <SelectDropdown
        defaultValue={defaultValue}
        renderDropdownIcon={() => (
          <Icon name="caretdown" size={ICONS.xsIcon} color={COLORS.darkGray} />
        )}
        buttonTextStyle={[styles.buttonTextStyle, {color: color}]}
        rowTextStyle={{textAlign: 'right'}}
        buttonStyle={{
          flex: 1,
          borderWidth: RFValue(1),
          borderRadius: RFValue(5),
          borderColor: borderColor,
          backgroundColor: COLORS.white,
          minHeight: RFValue(47),
        }}
        defaultButtonText={placeholder}
        data={data}
        /* onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}*/
        onSelect={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    // marginBottom: MARGIN.mdMargin,
  },
  buttonTextStyle: {
    textAlign: 'left',
    fontSize: FONTS.h5,
    fontFamily: 'Amaranth-Regular',
  },
});

export default DropDown;
