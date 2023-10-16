import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [user, setUser] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [weight , setWeight] = useState("");
  const [height , setHeight] = useState("");
  const [diabetesType , setDiabetesType] = useState("");
  const [userImage, setUserImage] = useState(null);
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.6:8000/profile/${userId}`
        );
        const { user , image, dateOfBirth, weight, height, diabetesType } = response.data;
        setUser(user);
        setUserImage(image);
        setDateOfBirth(dateOfBirth);
        setHeight(height);
        setWeight(weight);
        setDiabetesType(diabetesType);

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile(user);
  });

  const logout = () => {
    clearAuthToken();
  }
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Cleared auth token");
    navigation.replace("Login")
  }
  // // นี้เป็นฟังก์ชันที่ใช้ในการคำนวณอายุ
  // const calculateAge = (dateOfBirth) => {
  //   if (!dateOfBirth) return "ไม่ระบุ";
  //   const birthDate = new Date(dateOfBirth);
  //   const currentDate = new Date();
  //   const age = currentDate.getFullYear() - birthDate.getFullYear();
  //   const isSameMonth = currentDate.getMonth() === birthDate.getMonth();
  //   const isSameDay = currentDate.getDate() === birthDate.getDate();
  
  //   if (!isSameMonth || !isSameDay) {
  //     if (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
  //       return age - 1;
  //     }
  //   }
  //   return age;
  // };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.medicationContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: userImage }}
        />
        <Text style={{ fontSize: 20, fontFamily: 'Kanit_400Regular'}}>{user?.name}</Text>
        <Text style={styles.bio}>
          น้ำหนัก {user?.weight} กิโลกรัม | ส่วนสูง {user?.height} เซนติเมตร
        </Text>
        <Text style={styles.bio}>อายุ {(user?.dateOfBirth)} ปี</Text>
        <Text style={styles.sectionTitle}> ประเภทเบาหวาน : {user?.diabetesType}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Text>Edit Profile</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <Text>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#C2FFD3',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontFamily: 'Kanit_400Regular',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  medicationContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    width: '90%',
    height: '50%',
  },
  chartContainer: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#52B788', // Adjust color as needed
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen ;