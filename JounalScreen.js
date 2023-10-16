import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const JounalFood = () => {
  const navigation = useNavigation();
  const [foods, setFoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);

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
  
  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };
  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleCalendarClick = () => {
    setCalendarVisible(true);
  };
  const handleDateClick = (date) => {
    setSelectedDate(new Date(date.dateString));
    setCalendarVisible(false);
  };

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.container}>
        <View style={styles.circleTopic}>
          <Text style={{ fontFamily: 'Kanit_400Regular' }}> 0 </Text>
          <Text style={{ fontFamily: 'Kanit_400Regular' }}> แคลอรี่ </Text>
        </View>
        <View style={styles.meal}>
          <Text style={{ fontFamily: 'Kanit_400Regular', marginTop: 5, fontSize: 20 }}>สารอาหารหลัก</Text>
          <View style={styles.meal2}>
            <View style={styles.meal3}>
              <Text style={styles.text}>0</Text>
              <Text style={styles.text}>โปรตีน</Text>
            </View>
            <View style={styles.meal4}>
              <Text style={styles.text}>0</Text>
              <Text style={styles.text}>ไขมัน</Text>
            </View>
            <View style={styles.meal5}>
              <Text style={styles.text}>0</Text>
              <Text style={styles.text}>คาร์โบ..</Text>
            </View>
          </View>
        </View>

        <View style={styles.mealContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePreviousDay}>
              <Image source={require('../assets/15.png')}
                style={{ width: 50, height: 50 }} resizeMode="cover" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCalendarClick} style={{width: '50%', height: 50,backgroundColor: '#52B788',borderRadius: 50 , justifyContent:'center' , alignItems:'center'}}> 
              <Text style={styles.buttonText}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNextDay}>
              <Image source={require('../assets/16.png')}
                style={{ width: 50, height: 50 }} resizeMode="cover" />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isCalendarVisible}
            onRequestClose={() => {
              setCalendarVisible(false);
            }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <Button title="Close Calendar" onPress={() => setCalendarVisible(false)} />
              <Calendar
                markedDates={{
                  [selectedDate.toISOString().split('T')[0]]: {
                    selected: true,
                    selectedColor: 'blue',
                  },
                }}
                onDayPress={handleDateClick}
              />
            </SafeAreaView>
          </Modal>

          <View style={styles.mealRow}>
            <Image
              source={require('../assets/breakfast.png')}
              style={styles.mealImage}
              resizeMode="cover"
            />
            <Text style={styles.mealHeaderText}>อาหารเช้า   </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('MealScreen')}>
              <Text style={styles.buttonText}>เพิ่ม</Text>
            </TouchableOpacity>
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
            <Text style={styles.mealHeaderText}>อาหารเย็น   </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Dinner')}>
              <Text style={styles.buttonText}>เพิ่ม</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    backgroundColor: '#C2FFD3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#52B788',
    marginTop: 20,
  },
  meal: {
    width: '90%',
    height: '20%',
    flexShrink: 0,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  meal2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 25,
    flexDirection: 'row',
    marginTop: 15,
  },
  meal3: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#FF88F3',
  },
  meal4: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 7,
    borderColor: '#FFE68C',
  },
  meal5: {
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
    alignItems: 'left',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '50%',
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Kanit_400Regular',
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
    fontFamily: 'Kanit_400Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20
  },
  calendarContainer: {
    width: '80%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});

export default JounalFood;
