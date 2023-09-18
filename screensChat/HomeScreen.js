import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import { TextInput, View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";

const HomeScreenChat = () => {

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  //add 
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered users

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontWeight: "bold", fontFamily: 'Kanit_400Regular',justifyContent:'center' }}>แชท</Text>
      ),
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, padding: 10 }}>
          <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
        </View>
      ),
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, padding: 10 }}>
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  const filterUsers = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Call filterUsers whenever searchQuery changes
  useEffect(() => {
    filterUsers();
  }, [searchQuery]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://10.0.14.153:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        renderItem={({ item }) => <User item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C2FFD3",
  },
  header: {
    width: '100%',
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#52B788",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    marginTop: 30
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});
export default HomeScreenChat;