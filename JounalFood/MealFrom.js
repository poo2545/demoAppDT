import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
const MealForm = () => {
  const [mealType, setMealType] = useState('');
  const [mealDate, setMealDate] = useState('');
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSaveMeal = async () => {
    try {
      const loggedInUserId = '12345'; // Replace with the actual user ID
      const response = await axios.post(
        `http://172.20.10.6:8000/meals/${loggedInUserId}`, // Use the loggedInUserId here
        {
          mealType,
          mealDate,
          foodType,
          quantity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // Meal data saved successfully
        console.log('Meal data saved successfully');
        // You can add further logic here, such as resetting form fields or navigating to a different screen.
      } else {
        // Handle error, e.g., show an error message to the user.
        console.error('Error saving meal data');
      }
    } catch (error) {
      console.error('An error occurred:...', error);
    }
  };
  

  return (
    <View>
      <Text>Meal Type:</Text>
      <TextInput
        placeholder="Enter meal type"
        value={mealType}
        onChangeText={(text) => setMealType(text)}
      />

      <Text>Meal Date:</Text>
      <TextInput
        placeholder="Enter meal date"
        value={mealDate}
        onChangeText={(text) => setMealDate(text)}
      />

      <Text>Food Type:</Text>
      <TextInput
        placeholder="Enter food type"
        value={foodType}
        onChangeText={(text) => setFoodType(text)}
      />

      <Text>Quantity:</Text>
      <TextInput
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      <Button title="Save Meal" onPress={handleSaveMeal} />
    </View>
  );
};

export default MealForm;
