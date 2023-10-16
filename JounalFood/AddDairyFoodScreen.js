import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const ThreadsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const handlePostSubmit = () => {
    const postData = {
      userId,
      content: content, // Include the content property
    };
    axios
      .post("http://172.20.10.6:8000/create-post", postData)
      .then((response) => {
        setContent(""); // Clear the content after successful submission
      })
      .catch((error) => {
        console.log("Error creating post", error.response.data); // Log the server's response
      });      
  };
  
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="Type your message..."
          multiline
        />
      </View>
      <View style={{ marginTop: 20 }} />
      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};
export default ThreadsScreen;
const styles = StyleSheet.create({});
