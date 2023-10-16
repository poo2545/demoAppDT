import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity,SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const DragList = () => {
  const [medicationRecords, setMedicationRecords] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchMedication();
  }, []);

  const fetchMedication = async () => {
    try {
      const response = await axios.get('http://172.20.10.6:8000/medications');
      setMedicationRecords(response.data);
      console.log('Fetched medication records:', response.data);
    } catch (error) {
      console.error('Error fetching medication records:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{justifyContent:'center' , fontSize:30 , fontFamily: 'Kanit_400Regular'}}>แจ้งเตือนการกินยา</Text>

      <FlatList
        data={medicationRecords}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.medicationContainer}>
            <View style={styles.medicationInfo}>
              <Text style={styles.title1}> {item.time} </Text>
              <Text style={styles.title1}> {item.medicationName} {item.size}</Text>
              <Text style={styles.subtitle}> {item.dosage} </Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>แก้ไข</Text>
        </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('DragScreen')}>
        <Text style={styles.buttonText}>บันทึก</Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2FFD3',
    alignItems:'center',
    justifyContent:'center'
  },

  medicationContainer: {  
    width:'70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  
  },
  medicationInfo: {
    flex: 1,
  },
  title1: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Kanit_400Regular',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',fontFamily: 'Kanit_400Regular'
  },
  editButton: {
    backgroundColor: '#FF88F3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,fontFamily: 'Kanit_400Regular'
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',fontFamily: 'Kanit_400Regular'
  },
});

export default DragList;
