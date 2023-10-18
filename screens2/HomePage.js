import React, { useState, useLayoutEffect } from 'react';
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
                <Text style={{ fontSize: 20, fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>สำหรับคุณ</Text>
            ),
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
        });
    }, []);

    const RecommendFood = () => {
        // You can navigate to the profile editing screen here.
        navigation.navigate("RecommendFood");
      }

      const RecommenFood2 = () => {
        // You can navigate to the profile editing screen here.
        navigation.navigate("RecommenFood2");
      }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.recomend}>
                <View style={styles.inputrecomend}>
                    <Image style={{ width: 350, height: 170, borderRadius: 5, marginTop: 15 }} source={require('../assets/food.png')} />
                    <Text style={{ marginTop: 10, fontFamily: 'Kanit_400Regular', fontSize: 20, }} > ควรได้รับพลังงานจากอาหารวันละ</Text>
                    <Text style={{ marginTop: 1, fontFamily: 'Kanit_400Regular', fontSize: 20, }} > 1,200-1,600 กิโลแคลอรี่ </Text>
                </View>
            </View>
            <View style={styles.inputContainerrecomend}>
                <Text style={{ marginTop: 20, fontFamily: 'Kanit_400Regular', fontSize: 10 }} > แนะนำอื่นๆ </Text>

                <TouchableOpacity style={styles.button22} onPress={RecommendFood} >
                    <Text style={styles.buttonText22}>อาหารที่ควรงด</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button22} onpress={RecommendFood}>
                    <Text style={styles.buttonText22}>อาหารที่แนะนำ</Text>
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
    recomend: {
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
    },
    inputContainerrecomend: {
        alignItems: 'center',
        width: '90%',
        marginBottom: 50
    },
    inputrecomend: {
        backgroundColor: '#fff',
        height: '65%',
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    button22: {
        width: '100%',
        height: 50,
        backgroundColor: '#52B788',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText22: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Kanit_400Regular',
    },
});
export default HomePage;
