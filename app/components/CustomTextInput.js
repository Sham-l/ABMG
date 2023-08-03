import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function CustomTextInput({
    iconEnd,
    iconStart,
    keyboardType,
    onChangeText,
    onPress,
    placeholder,
    secureTextEntry=false,
    style,
    value,
    
}) {
  return (
    <View style={[styles.container, style]}>
      {iconStart && <Icon name={iconStart} size={20} color="#6E8C8C" />}
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#6E8C8C"
        placeholder={placeholder}
        style={styles.textInput}
      />
      {iconEnd && (
        <Icon name={iconEnd} size={15} color="#6E8C8C" onPress={onPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F2A3A',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#567D92',
    paddingHorizontal: '4%',
    gap: 15,
  },
  textInput: {
    height: 50,
    flex: 1,
    color: '#6E8C8C',
  },
});
