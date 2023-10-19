import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import { UserType } from "../UserContext";

const EditProfileScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>แก้ไขข้อมูลส่วนตัว</Text>
      ),
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, []);


  const [editedUser, setEditedUser] = useState({});
  const { userId, setUserId } = useContext(UserType);
  const [userImage, setUserImage] = useState(null);
  
  const pickImage = () => {
    ImagePicker.showImagePicker({ title: "Select Image" }, (response) => {
      if (!response.didCancel && !response.error) {
        setEditedUser({ ...editedUser, image: response.uri });
      }
    });
  };

  const saveChanges = () => {
    axios
      .put(`http://172.20.10.6:8000/profile/${userId}`, editedUser)
      .then((response) => {
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.log("Error updating profile:", error);
      });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.6:8000/profile/${userId}`
        );
        const { image } = response.data;
        setUserImage(image);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <View style={styles.container}>

      {userImage ? (
        <Image style={styles.profileImage} source={{ uri: userImage }} />
      ) : (
        <Image source={{ uri: editedUser.image }} style={styles.profileImage} />
      )}
      <TouchableOpacity style={{alignItems: 'center' }} onPress={pickImage}>
        <Text style={{ color: '#969696', fontSize: 18, fontFamily: 'Kanit_400Regular', marginBottom: 5 }}>แก้ไขรูปภาพ</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="แก้ไขชื่อ-สกุล"
        onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="แก้ไขน้ำหนัก(kg)"
        onChangeText={(text) => setEditedUser({ ...editedUser, weight: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="แก้ไขส่วนสูง(cm)"
        onChangeText={(text) => setEditedUser({ ...editedUser, height: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="แก้ไขวันเดือนปีเกิด 00/00/00"
        onChangeText={(text) => setEditedUser({ ...editedUser, dateOfBirth: text })}
      />
      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>บันทึกการแก้ไข</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#C2FFD3',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems:'center',
    marginTop: 30,
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '90%',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#52B788',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Kanit_400Regular',
  },
});

export default EditProfileScreen;
