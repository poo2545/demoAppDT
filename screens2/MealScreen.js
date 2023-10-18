import React, { useState , useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { UserType } from '../UserContext';

const MealForm = () => {
    const [mealName, setMealName] = useState('');
    const [mealCalorie, setMealCalorie] = useState('');
    const { userId } = useContext(UserType);

    const handlePostSubmit = () => {
        const postData = {
            userId,
        };
        if (mealName && mealCalorie) {
            postData.mealName = mealName;
            postData.mealCalorie = mealCalorie;
        }

        axios
            .post("http://10.0.14.153:8000/meals", postData)
            .then((response) => {
                setMealName("");
                setMealCalorie("");
            })
            .catch((error) => {
                console.log("Error creating post:", error);
            });
    }
    return (
        <View>
            <Text>Create a Meal</Text>
            <TextInput
                placeholder="Name"
                value={mealName}
                onChangeText={(text) => setMealName(text)}
            />
            <TextInput
                placeholder="Calorie"
                value={mealCalorie}
                onChangeText={(text) => setMealCalorie(text)}
            />
            <Button title="Create Meal" onPress={handlePostSubmit} />
        </View>
    );
};

export default MealForm;
