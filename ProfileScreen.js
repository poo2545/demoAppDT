import React, { useState, useEffect, useContext , useLayoutEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet,TouchableOpacity } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>โปร์ไฟล์</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 , padding:10}}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Ionicons name="refresh" size={20} color="#BBBBBB" />
      </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, []);


  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [diabetesType, setDiabetesType] = useState("");
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  const logout = () => {
    clearAuthToken();
  }

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("Cleared auth token");
    navigation.replace("Login");
  }

  const editProfile = () => {
    // You can navigate to the profile editing screen here.
    navigation.navigate("EditProfileScreen");
  }

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchProfile(userId);
    setIsRefreshing(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://172.20.10.6:8000/profile/${userId}`
        );
        const { user, image, dateOfBirth, weight, height, diabetesType } = response.data;

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

    fetchProfile();
  }, [userId]);

    // นี้เป็นฟังก์ชันที่ใช้ในการคำนวณอายุ
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "ไม่ระบุ";
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const isSameMonth = currentDate.getMonth() === birthDate.getMonth();
    const isSameDay = currentDate.getDate() === birthDate.getDate();
  
    if (!isSameMonth || !isSameDay) {
      if (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        return age - 1;
      }
    }
    return age;
  };

// คำนวณค่า BMI
const calculateBMI = () => {
  if (!weight || !height) {
    return "ไม่สามารถคำนวณได้";
  }

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

  if (bmi < 18.5) {
    return `${bmi} (น้ำหนักต่ำ)`;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return `${bmi} (น้ำหนักปกติ)`;
  } else if (bmi >= 25 && bmi < 29.9) {
    return `${bmi} (น้ำหนักเกิน)`;
  } else {
    return `${bmi} (อ้วน)`;
  }
};

// สร้างฟังก์ชัน renderBMI เพื่อแสดงค่า BMI ในหน้า View
const renderBMI = () => (
  <Text style={styles.bio}>BMI: {calculateBMI()}</Text>
);


  return (
    <SafeAreaView style={styles.container}>

<TouchableOpacity style={{
          position: 'absolute', right: 0, alignItems: 'flex-end', backgroundColor: '#D9D9D9',
          borderTopLeftRadius: 30, width: '37%', height: 40, borderBottomLeftRadius: 30, marginTop: 10,
        }}
          onPress={() => navigation.navigate('DairySave')} >
          <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Kanit_400Regular', padding: 8, }}>ดูรายการที่บันทึกวันนี้</Text>
        </TouchableOpacity>
        
      <View style={styles.medicationContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: userImage }}
        />
        <Text style={{ fontSize: 20, fontFamily: 'Kanit_400Regular' }}>{user?.name}</Text>
        <Text style={styles.bio}>
          น้ำหนัก {weight} กิโลกรัม
        </Text>
        <Text style={styles.bio}>
          ส่วนสูง {height} เซนติเมตร
        </Text>

      <Text style={styles.bio}>อายุ {calculateAge(dateOfBirth)} ปี</Text>
      <Text style={styles.bio}>{renderBMI()} </Text>
        <Text style={styles.bio}>ประเภทของเบาหวาน:{diabetesType}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
        <Pressable
          style={styles.button}
          onPress={editProfile} // Navigate to edit profile screen
        >
          <Text>Edit Profile</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={styles.button}>
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
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRadius: 5,
  },
  // Add more styles as needed
});

export default ProfileScreen;
