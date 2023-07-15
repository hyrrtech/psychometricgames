import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {COLORS, FontStyle} from '../values/';

const Select = ({
  options,
  selection, //single or multiple
  selectionStyle, //background or text
  textColor,
  backgroundColor,
  activeColor,
  onChange,
}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    onChange(selected.map(item => item.value));
  }, [selected]);

  const handlePress = (option, index) => {
    if (selection === 'single') {
      if (selected[0].index === index) {
        setSelected([{value: '', index: -1}]);
        return;
      }
      setSelected([{value: option, index: index}]);
    }
    if (selection === 'multiple') {
      if (selected.some(item => item.index === index)) {
        setSelected(selected.filter(item => item.index !== index));
        return;
      }
      setSelected([...selected, {value: option, index: index}]);
    }
  };
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            style={[
              styles.button,
              {
                backgroundColor: backgroundColor,
              },
              selectionStyle === 'background' &&
                selected.some(item => item.index === index) && {
                  backgroundColor: activeColor,
                },
            ]}
            onPressIn={() => handlePress(option, index)}>
            <Text
              style={[
                FontStyle.title2,
                {
                  color: textColor,
                },
                selectionStyle === 'text' &&
                  selected.some(item => item.index === index) && {
                    color: activeColor,
                  },
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    margin: '2%',
    marginRight: 0,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Select;
