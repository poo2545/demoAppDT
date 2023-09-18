import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const FoodListScreen = () => {
  const [foods, setFoods] = useState([]);

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
    <View style={styles.container}>
      <Text style={styles.title}>Food List</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>ชื่ออาหาร: {item.name}</Text>
            <Text>แคลอลี่: {item.calorie}</Text>
            <Text>โปรตีน: {item.protein}</Text>
            <Text>ไขมัน: {item.fat}</Text>
            <Text>คาร์โบไฮเดรต: {item.carbohydrate}</Text>
            <Text>รวม: {item.carbohydrate + item.fat + item.protein }</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  foodItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodListScreen;
