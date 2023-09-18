import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CreateFoodScreen = () => {
  const [name, setName] = useState('');
  const [calorie, setCalorie] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbohydrate, setCarbohydrate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());


  const navigation = useNavigation();

  const createFood = async () => {
    try {
      const response = await axios.post('http://10.0.14.153:8000/foods', { name,calorie,protein,fat,carbohydrate,currentDate });
      // Handle success, maybe show a success message
      console.log('Food created:', response.data);
      navigation.navigate('FoodList'); // Navigate back to the food list
    } catch (error) {
      // Handle error, show an error message
      console.error('Error creating food:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Create Food</Text>
      <Text>{currentDate}</Text>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder="Name" style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="แคลอลี่" style={styles.input}
        onChangeText={(text) => setCalorie(text)}
        value={calorie}
      />
            <TextInput
        placeholder="โปรตีน" style={styles.input}
        onChangeText={(text) => setProtein(text)}
        value={protein}
      />
            <TextInput
        placeholder="ไขมัน" style={styles.input}
        onChangeText={(text) => setFat(text)}
        value={fat}
      />
      <TextInput
        placeholder="คาร์โบไฮเดรต" style={styles.input}
        onChangeText={(text) => setCarbohydrate(text)}
        value={carbohydrate}
      />      
      
      <TouchableOpacity
            style={styles.button}
            onPress={createFood}>
            <Text style={styles.buttonText}>บันทึก</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    alignItems: 'center',
    width: '90%',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    fontSize: 16,
    marginBottom: -20,
    marginTop: 30,
    fontFamily: 'Kanit_400Regular',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#52B788',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Kanit_400Regular',
  },
});

export default CreateFoodScreen;