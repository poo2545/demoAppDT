import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

const FeatchFood = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchFoodData() {
      try {
        const response = await fetch('http://172.20.10.6:8000/food');
        const data = await response.json();

        if (response.status === 200) {
          setFoods(data);
        } else {
          console.error('Failed to fetch food data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFoodData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Filter foods based on the searchQuery
  const filteredFoods = foods.filter(food => food.FoodName?.toLowerCase().includes(searchQuery?.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for food..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredFoods}
        keyExtractor={(food) => food.FoodName}
        renderItem={({ item }) => (
          <View style={styles.foodContainer}>
            <Text style={styles.foodName}>Food Name: {item.FoodName}</Text>
            <Text>Protein: {item.FoodProtein}g</Text>
            <Text>Fat: {item.FoodFat}g</Text>
            <Text>Carbohydrates: {item.FoodCarbo}g</Text>
            <Text>Fiber: {item.FoodFiber}g</Text>
            <Text>Calories: {item.FoodCalorie}</Text>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
  },
  foodContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeatchFood;
