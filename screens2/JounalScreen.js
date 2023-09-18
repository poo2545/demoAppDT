import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const JounalFood = () => {
  const navigation = useNavigation();
  const [foods, setFoods] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontWeight: "bold", fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>สมุดบันทึกการกินอาหารประจำวัน</Text>
      ),
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, []);

  useEffect(() => {
    // Fetch the list of food items when the component mounts
    async function fetchFoods() {
      try {
        const response = await axios.get('http://10.0.14.153:8000/foods');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    }

    fetchFoods();
  }, []);

  return (
    <SafeAreaView style={styles.container1}>
      <FlatList
        data={foods}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.circleTopic}>
              <Text style={{ fontFamily: 'Kanit_400Regular' }}>{item.calorie}</Text>
              <Text style={{ fontFamily: 'Kanit_400Regular' }}> แคลอรี่ </Text>
            </View>

            {/* Rest of your code for this item */}
            <View style={styles.krop}>
              <Text style={{ fontFamily: 'Kanit_400Regular', marginTop: 5, fontSize: 20 }}>สารอาหารหลัก</Text>
              <View style={styles.container2}>
                <View style={styles.circle}>
                  <Text style={styles.text}>{item.protein}</Text>
                  <Text style={styles.text}>โปรตีน</Text>
                </View>
                <View style={styles.circle1}>
                  <Text style={styles.text}>{item.fat}</Text>
                  <Text style={styles.text}>ไขมัน</Text>
                </View>
                <View style={styles.circle2}>
                  <Text style={styles.text}>{item.carbohydrate}</Text>
                  <Text style={styles.text}>คาร์โบ..</Text>
                </View>
              </View>
            </View>

            <View style={styles.mealContainer}>
              <View style={styles.mealRow}>
                <Text>previosday</Text>
                <Text>Today</Text>
                <Text>Nextday</Text>
              </View>

              <View style={styles.mealRow}>
                <Image
                  source={require('../assets/breakfast.png')}
                  style={styles.mealImage}
                  resizeMode="cover"
                />
                <Text style={styles.mealHeaderText}>อาหารเช้า</Text>
                {item.name && item.calorie ? ( // Check if data exists
                  <Text>{item.name} {item.calorie} Kal</Text>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Breakfast')}>
                    <Text style={styles.buttonText}>เพิ่ม</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.mealRow}>
                <Image
                  source={require('../assets/lunch.png')}
                  style={styles.mealImage}
                  resizeMode="cover"
                />
                <Text style={styles.mealHeaderText}>อาหารเที่ยง</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Lunch')}>
                  <Text style={styles.buttonText}>เพิ่ม</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mealRow}>
                <Image
                  source={require('../assets/dinner.png')}
                  style={styles.mealImage}
                  resizeMode="cover"
                />
                <Text style={styles.mealHeaderText}>อาหารเย็น</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Dinner')}>
                  <Text style={styles.buttonText}>เพิ่ม</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* End of your code for this item */}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#C2FFD3',
  },
  container1: {
    flex: 1,
    backgroundColor: '#C2FFD3',
  },
  inputContainer: {
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#FFFFF',
    fontSize: 18,
    fontFamily: 'Kanit_400Regular',
  },
  circleTopic: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: '#FFFFFF', // Change to your desired background color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#005B34',
    marginTop: 10,
  },
  krop: {
    width: '90%',
    height: '25%',
    flexShrink: 0,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 25,
    flexDirection: 'row',
    marginTop: 15,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#FF88F3',
  },
  circle1: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#FFE68C',
  },
  circle2: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#A6E4FF',
  },
  text: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Kanit_400Regular',
  },
  mealContainer: {
    alignItems: 'left', // Center horizontally
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '60%',
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center', // Center vertically
    gap: 30,
    marginTop: 20,
  },
  mealImage: {
    width: 75,
    height: 75,
  },
  mealHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#52B788',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default JounalFood;
