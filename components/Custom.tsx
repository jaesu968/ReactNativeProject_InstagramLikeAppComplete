import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Custom(props) {
  // will receive props from the Parent (App.js)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.input}
        secureTextEntry={props.secureTextEntry}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16, 
  },
  text: {
    padding: 8, 
    fontSize: 18
  },
  input: {
    padding: 8, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: "#ccc",
    borderRadius: 4, 
  }
})
