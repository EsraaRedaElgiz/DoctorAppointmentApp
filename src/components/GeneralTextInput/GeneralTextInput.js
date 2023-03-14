import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  COLORS,
  FONTS,
  ICONS,
  MARGIN,
  PADDINGS,
  RADIUS,
} from '../../constants/Constants';

function GeneralTextInput(props) {
  const {
    style,
    password,
    iconName,
    line,
    placeholder,
    rightIcon,
    leftIcon,
    ...rest
  } = props;
  return (
    <View style={line ? null : styles.textIconWrapper}>
      {line ? (
        <Text style={styles.placeholderLineStyle}>{placeholder}</Text>
      ) : null}
      {rightIcon ? (
        <TouchableOpacity>
          <Icon name={rightIcon} size={ICONS.mdIcon} />
        </TouchableOpacity>
      ) : null}
      <TextInput
        {...rest}
        placeholder={!line ? placeholder : null}
        secureTextEntry={password}
        style={[
          line
            ? [
                styles.textInputStyle,
                {
                  borderBottomWidth: 1,
                  flex: 0,
                  marginBottom: MARGIN.mdMargin,
                },
              ]
            : styles.textInputStyle,
          style,
        ]}
      />
      {line ? null : (
        <TouchableOpacity>
          <Icon name={iconName} size={ICONS.mdIcon} />
        </TouchableOpacity>
      )}
      {leftIcon ? (
        <TouchableOpacity>
          <Icon name={leftIcon} size={ICONS.mdIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  textIconWrapper: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: RADIUS.xsRadius,
    padding: PADDINGS.xsPadding,
    backgroundColor: COLORS.white,
  },
  textInputStyle: {
    flex: 1,
    fontSize: FONTS.h5,
    fontFamily: FONTS.Amaranth,
    borderColor: COLORS.gray,
    color: COLORS.black,
    textAlign: 'right',
  },
  placeholderLineStyle: {
    color: COLORS.blue,
    fontSize: FONTS.h6,
    fontWeight: 'bold',
  },
});
export default GeneralTextInput;
