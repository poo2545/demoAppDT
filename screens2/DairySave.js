import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react';

const DairySave = () => {
    const [mealRecords, setMealRecords] = useState([]);
    // const fetchMeal = async (userId) => {
    //     try {
    //       const response = await axios.get(`http://10.0.14.153:8000/patientMeals/${userId}`);
    //       setMealRecords(response.data);
    //       console.log('Fetched meal records:', response.data);
    //     } catch (error) {
    //       console.error('Error fetching meal records:', error);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchMeal(userId);
    //   }, []);
      
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', color: '#D9D9D9', fontSize: 18, padding: 7, fontFamily: 'Kanit_400Regular', }}> แทปที่ชื่ออาหารเพื่อดู / แก้ไข</Text>

            <View style={styles.header}>
                <Text style={styles.textStyle}>อาหารเช้า</Text>
            </View>

            <View style={styles.krop}>
                <View style={styles.container2}>
                    <View style={styles.circle2}>
                        <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>ผัดไทย</Text>
                        <Text style={{ color: '#DD7979', fontSize: 20, fontFamily: 'Kanit_400Regular', fontWeight: 'bold' }}>150</Text>
                        <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>Kcal</Text>
                    </View>
                </View>
            </View>

            <View style={styles.header}>
                <Text style={styles.textStyle}>อาหารเที่ยง</Text>
            </View>

            <View style={styles.krop}>
                <View style={styles.container2}>
                    <View style={styles.circle2}>
                        <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>ผัดไทย</Text>
                        <Text style={{ color: '#DD7979', fontSize: 20, fontFamily: 'Kanit_400Regular', fontWeight: 'bold' }}>150</Text>
                        <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>Kcal</Text>
                    </View>
                </View>
            </View>

            <View style={styles.header}>
                <Text style={styles.textStyle}>อาหารเย็น</Text>
            </View>

            <View style={styles.krop}>
                <View style={styles.container2}>
                    <View style={styles.circle2}>
                        <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>ผัดไทย</Text>
                        <Text style={{ color: '#DD7979', fontSize: 20, fontFamily: 'Kanit_400Regular', fontWeight: 'bold' }}>150</Text>
                        <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>Kcal</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: 45,
        backgroundColor: '#52B788',
        marginTop: 5,
    },
    textStyle: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 18,
        padding: 7,
        fontFamily: 'Kanit_400Regular',
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 25,
        flexDirection: 'row',
        marginTop: 15,
    },
    circle1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    circle2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        padding: 2,
    },
    krop: {
        width: '90%',
        height: '12%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        marginTop:5,
        marginBottom:5,
    },
});

export default DairySave;