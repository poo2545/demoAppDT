import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import NutrientsGraph from '../components/NutrientsGraph';

const JounalFood = () => {
  const navigation = useNavigation();
  const [foods, setFoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const graphData = [1650, 1500, 1652, 1858, 1534, 1550 , 1805 ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 20,fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>สมุดบันทึกการกินอาหารประจำวัน</Text>
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
    <ScrollView style={{ backgroundColor: '#C2FFD3' }}>
      <SafeAreaView style={styles.container1}>

        <TouchableOpacity style={{
          position: 'absolute', right: 0, alignItems: 'flex-end', backgroundColor: '#D9D9D9',
          borderTopLeftRadius: 30, width: '37%', height: 40, borderBottomLeftRadius: 30, marginTop: 10,
        }}
          onPress={() => navigation.navigate('DairySave')} >
          <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Kanit_400Regular', padding: 8, }}>ดูรายการที่บันทึกวันนี้</Text>
        </TouchableOpacity>

        <View style={styles.mealContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePreviousDay}>
              <Image source={require('../assets/15.png')}
                style={{ width: 30, height: 30 }} resizeMode="cover" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCalendarClick} style={{ width: '50%', height: 30, backgroundColor: '#52B788', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.buttonText}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNextDay}>
              <Image source={require('../assets/16.png')}
                style={{ width: 30, height: 30 }} resizeMode="cover" />
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
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Breakfast')} >
              <Text style={styles.buttonText}>อาหารเช้า</Text>
              <Image source={require('../assets/13.png')}
                style={{ width: 100, height: 100 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Lunch')} >
              <Image source={require('../assets/food3.png')}
                style={{ width: 100, height: 100 }} />
              <Text style={styles.buttonText}>อาหารกลางวัน</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Dinner')} >
              <Text style={styles.buttonText}>อาหารเย็น</Text>
              <Image source={require('../assets/dinner.png')}
                style={{ width: 100, height: 100 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button4} onPress={() => navigation.navigate('Snake')} >
              <Image source={require('../assets/10.png')}
                style={{ width: 100, height: 100 }} />
              <Text style={styles.buttonText}>อาหารว่าง</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.krop}>
            <View style={styles.container2}>
              <View style={styles.circle1}>
                <Image source={require('../assets/19.png')}
                  style={{ width: 100, height: 100, marginBottom: 10 }} resizeMode="cover" />
              </View>
              <View style={styles.circle2}>
                <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>แคลอรี่ที่ได้รับจากอาหาร</Text>
                <Text style={{ color: '#DD7979', fontSize: 20, fontFamily: 'Kanit_400Regular', fontWeight: 'bold' }}>0</Text>
                <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular', }}>Kcal</Text>
              </View>
            </View>
          </View>

          <View style={styles.meal}>
            <Text style={{ fontFamily: 'Kanit_400Regular', marginTop: 5, fontSize: 20, color: '#8B8383' }}>สารอาหารหลัก</Text>
            <View style={styles.meal2}>
              <View style={styles.meal3}>
                <Text style={styles.textMeal}>0</Text>
                <Text style={styles.textMeal}>โปรตีน</Text>
              </View>

              <View style={styles.meal4}>
                <Text style={styles.textMeal}>0</Text>
                <Text style={styles.textMeal}>ไขมัน</Text>
              </View>

              <View style={styles.meal5}>
                <Text style={styles.textMeal}>0</Text>
                <Text style={styles.textMeal}>คาร์โบ..</Text>
              </View>

            </View>
          </View>

          <View style={styles.graph}>
            <View style={styles.containerGraph}>
              <View style={{justifyContent: 'center',alignItems: 'center',marginTop: 8}}>
                <Text style={{ color: '#8B8383', fontSize: 20, fontFamily: 'Kanit_400Regular',marginTop: 8 }}>ปริมาณแคลอรี่ที่ได้รับต่อวัน</Text>
                 <NutrientsGraph data={graphData} />
              </View>
            </View>
          </View>

          <View style={{
            width: '90%',
            height: '15%',
            flexShrink: 0,
            backgroundColor: '#C2FFD3',
            borderRadius: 15,
            alignItems: 'center',
            marginTop: 50,
          }}>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#C2FFD3',
    marginTop: 10,
  },
  container1: {
    flex: 1,
    backgroundColor: '#C2FFD3',
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
    marginTop: 15,
    padding: 10,
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
  krop: {
    width: '90%',
    height: '15%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  text: {
    color: '#D7D7D9',
    fontSize: 20,
    fontFamily: 'Kanit_400Regular',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button1: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFDCDC',
    alignItems: 'center',
    padding: 25,
  },
  button2: {
    width: 150,
    height: 150,
    borderTopRightRadius: 20,
    backgroundColor: '#95D49B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  button3: {
    width: 150,
    height: 150,
    borderBottomLeftRadius: 20,
    backgroundColor: '#C0C7FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  button4: {
    width: 150,
    height: 150,
    borderBottomRightRadius: 20,
    backgroundColor: '#DFD0FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  meal: {
    width: '90%',
    height: '15%',
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
    marginTop: 8,
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
  textMeal: {
    color: '#8B8383',
    fontSize: 12,
    fontFamily: 'Kanit_400Regular',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginTop: 20,
  },
  mealImage: {
    width: 50,
    height: 50,
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
    gap: 5,
    marginTop: 5,
  },
  calendarContainer: {
    width: '80%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  mealContainer: {
    marginTop: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graph: {
    width: '90%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  containerGraph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom:15,
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

export default JounalFood;
