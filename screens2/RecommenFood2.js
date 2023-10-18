import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const items = [
  { label: 'ทั้งหมด', value: 'All' },
  { label: 'ต้ม', value: 'Beauty' },
  { label: 'ผัด', value: 'Fashion' },
  { label: 'แกง', value: 'Health' },
  { label: 'ทอด', value: 'Recipes' },
  { label: 'อื่นๆ', value: 'Dining' },
];

const RecommenFood2 = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
  };

  return (
    <>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={[
            styles.categoryItem,
            selectedCategory === item.value && styles.selectedCategoryItem,
          ]}
          onPress={() => handleCategoryChange(item.value)}>
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.value && styles.selectedCategoryText,
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    paddingVertical: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: 'gray',
    backgroundColor: '#fce3e3',
  },
  selectedCategoryItem: {
    backgroundColor:
      'linear-gradient(17.69deg, rgba(255, 135, 135, 0.85) 12.73%, #FFCCCC 140.74%)',
  },
  categoryText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    padding: 5,
  },
  selectedCategoryText: {
    color: '#fff',
  },
});


export default RecommenFood2