const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, // ใช้วันที่ปัจจุบันเริ่มต้น
    },
    name: String,
    calorie: Number,
    protein: Number,
    fat: Number,
    carbohydrate: Number,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
