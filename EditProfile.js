import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker'; // Import react-native-image-picker
import axios from "axios";
import { UserType } from "../UserContext";

const EditProfileScreen = ({ navigation }) => {
  const [editedUser, setEditedUser] = useState({});
  const { userId, setUserId } = useContext(UserType);

  const pickImage = () => {
    // Launch the image picker
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (!response.didCancel && !response.error) {
        // Use the response.uri to set the edited user's image
        setEditedUser({ ...editedUser, image: response.uri });
      }
    });
  };

  const saveChanges = () => {
    // Send a request to update the user's profile with the edited data
    axios
      .put(`http://172.20.10.6:8000/profile/${userId}`, editedUser)
      .then((response) => {
        // Handle successful update, if needed
        navigation.navigate("Profile"); // Navigate back to the profile screen
      })
      .catch((error) => {
        // Handle error, if the update fails
        console.log("Error updating profile:", error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Image picker button */}
      <Button title="Pick Image" onPress={pickImage} />
      <Image source={{ uri: editedUser.image }} style={styles.profileImage} />

      {/* Input fields for editing user information */}
      <TextInput
        placeholder="Edit Name"
        onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
      />
      <TextInput
        placeholder="Edit Weight (kg)"
        onChangeText={(text) => setEditedUser({ ...editedUser, weight: text })}
      />
      <TextInput
        placeholder="Edit Height (cm)"
        onChangeText={(text) => setEditedUser({ ...editedUser, height: text })}
      />
      <TextInput
        placeholder="Edit Date of Birth"
        onChangeText={(text) => setEditedUser({ ...editedUser, dateOfBirth: text })}
      />
      {/* Add more input fields for other profile information here */}
      <Button title="Save Changes" onPress={saveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  // Add styles for input fields and buttons, if needed
});

export default EditProfileScreen;
