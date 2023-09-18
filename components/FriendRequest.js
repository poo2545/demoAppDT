import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(
        "http://10.0.14.153:8000/friend-request/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        }
      );

      if (response.ok) {
        setFriendRequests(
          friendRequests.filter((request) => request._id !== friendRequestId)
        );
        navigation.navigate("Chats");
      }
    } catch (err) {
      console.log("error acceptin the friend request", err);
    }
  };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />

      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 ,  fontFamily: 'Kanit_400Regular', }}>
        {item?.name} ส่งคำร้องขอเป็นเพื่อนกับคุณ 
      </Text>

      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#52B788", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" ,  fontFamily: 'Kanit_400Regular' }}> ยอมรับคำขอ </Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
