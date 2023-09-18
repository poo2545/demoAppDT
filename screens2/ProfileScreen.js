import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios for making API requests
import { Alert } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.textStyle}>โปรไฟล์</Text>
      </View>
    );
};

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              await AsyncStorage.removeItem('authToken');
              navigation.replace('Login');
            } catch (error) {
              console.error('Logout Error', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
});

if (!fontsLoaded) {
    return null;
}


  return (
    <SafeAreaView>
      <ListHeader />
        <Button title="Logout" onPress={handleLogout} />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 45,
    backgroundColor: '#52B788',
},
textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
    fontFamily: 'Kanit_400Regular',
},
});

export default ProfileScreen;
