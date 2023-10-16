const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  nutrientsProtien: {
    type: String, // Additional nutrients you want to save (e.g., JSON or String)
  },
  nutrientsFat: {
    type: String, // Additional nutrients you want to save (e.g., JSON or String)
  },
  nutrientsCabohidrat: {
    type: String, // Additional nutrients you want to save (e.g., JSON or String)
  },
  nutrientsFiber: {
    type: String, // Additional nutrients you want to save (e.g., JSON or String)
  },
  date: {
    type: Date, // You can specify Date as the data type for the date field
    default: Date.now, // You can set a default value to the current date
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
});

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;
