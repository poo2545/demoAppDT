import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, TextInput, Button, selectImage } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    // send a POST  request to the backend API to register the user
    axios
      .post("http://10.0.14.153:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };
  
  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
});

if (!fontsLoaded) {
    return null;
}

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#C2FFD3', '#FFFFFF']} // Define your gradient colors here
        style={styles.gradient}>
        <View style={styles.inputContainer}>
          <Image style={styles.logo} source={require('../assets/logo3.png')} />
          <Image style={styles.bg} source={require('../assets/7.png')} />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            placeholder="กรอกชื่อของคุณ"
            placeholderTextColor="#808080"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="กรอกอีเมลของคุณ"
            placeholderTextColor="#808080"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            placeholder="ตั้งรหัสของคุณ"
            placeholderTextColor="#808080"
          />
          <TextInput
            value={image}
            onChangeText={(text) => setImage(text)}
            style={styles.input}
            placeholder="เพิ่มโปรไฟล์"
            placeholderTextColor="#808080"
          />


        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>ลงทะเบียน</Text>
        </TouchableOpacity>

      </LinearGradient>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#52B788',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold', // Add fontWeight to make the text bold
    fontFamily: 'Kanit_400Regular',
  },
  logo: {
    width: 250,
    height: 80,
    marginTop: 20
  },
  bg: {
    width: 200,
    height: 200,
    marginBottom:20,
  },
  inputContainer: {
    alignItems: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});
export default RegisterScreen