import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import Custom from "./components/Custom.tsx";

const SignUp = () => {
  // state variables for setting text in the custom components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [petsName, setPetsName] = useState("");
  const [petsBirth, setPetsBirth] = useState("");
  const [breed, setBreed] = useState("");
  const [toy, setToy] = useState("");

  // function to check the password (does it match the previous entry?)
  const checkPassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match, please try again!");
    }
  }


  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ecf0f1" }}
      contentContainerStyle={{ justifyContent: "center" }}
    >
      <Custom
        label="email:"
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
      />
      <Custom
        label="password"
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // hides characters as they are typed
      />
      {/* re-enter password and check if it matches */}
      <Custom 
        label="confirm password"
        placeholder="re-enter password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        onSubmitEditing={checkPassword}
      /> 
      <Custom
        label="pet's name"
        placeholder="enter your pet's name"
        value={petsName}
        onChangeText={setPetsName}
      />
      <Custom
        label="pet's date of birth"
        placeholder="enter pet's date of birth"
        value={petsBirth}
        onChangeText={setPetsBirth}
      />
      <Custom
        label="breed"
        placeholder="enter your pet's breed"
        value={breed}
        onChangeText={setBreed}
      />
      <Custom
        label="favorite toy"
        placeholder="enter your pet's favorite toy"
        value={toy}
        onChangeText={setToy}
      />
    </ScrollView>
  );
};

export default SignUp;
