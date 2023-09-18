import React, { useState , useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput, Image,
    TouchableOpacity, SafeAreaView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: "bold", fontFamily: 'Kanit_400Regular',justifyContent:'center' }}>FOR YOU</Text>
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        });
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <Image style={{ width: 350, height: 170, borderRadius: 5, marginTop: 15 }} source={require('../assets/food.png')} />
                    <Text style={{ marginTop: 10, fontFamily: 'Kanit_400Regular', fontSize: 20, }} > ควรได้รับพลังงานจากอาหารวันละ</Text>
                    <Text style={{ marginTop: 1, fontFamily: 'Kanit_400Regular', fontSize: 20, }} > 1,200-1,600 กิโลแคลอรี่ </Text>
                </View>
            </View>
            <View style={styles.inputContainer2}>
                <Text style={{ marginTop: 20, fontFamily: 'Kanit_400Regular', fontSize: 10 }} > แนะนำอื่นๆ </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>อาหารที่ควรงด</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>อาหารที่แนะนำ</Text>
                </TouchableOpacity>
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
    inputContainer: {
        alignItems: 'center',
        width: '90%',
        marginTop:20,
    },    
    inputContainer2: {
        alignItems: 'center',
        width: '90%',
        marginBottom:50
    },
    input: {
        backgroundColor: '#fff',
        height: '65%',
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#52B788',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Kanit_400Regular',
    },
});
export default HomePage;
