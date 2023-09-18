import React, { useState , useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, SafeAreaView,FlatList
} from 'react-native';
import axios  from 'axios';
import { useNavigation } from '@react-navigation/native';

const DragScreen = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [size, setSize] = useState('');
  const [medicationRecords, setMedicationRecords] = useState([]);
  const navigation = useNavigation();

  const recordMedication = async () => {
    if (medicationName.trim() === '' || dosage.trim() === '' || time.trim() === '' || size.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://10.0.14.153:8000/record-medication', {
        time,
        dosage,
        medicationName,
        size,
      });
      // Log the response data after a successful request
      console.log('Created:', response.data);
      // You can perform additional actions here if needed
      // Clear the input fields
      setMedicationName('');
      setDosage('');
      setTime('');
      setSize('');
      // Show a success message or perform other actions
      alert('Medication recorded successfully');
    } catch (error) {
      // Handle error, show an error message
      console.error('Error creating:', error);
      alert('An error occurred while recording medication.');
    }
  };

  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.textStyle}>แจ้งเตือนการกินยา</Text>
      </View>
    );
  };

  return (

    <SafeAreaView style={styles.container}>
      <ListHeader />
      <TextInput
        style={styles.input}
        placeholder="เวลา (เช่น 06:00 น.)"
        value={time}
        onChangeText={setTime}
      />

      <TextInput
        style={styles.input}
        placeholder="ช่วงเวลา (ก่อนอาหาร/หลังอาหาร)"
        value={dosage}
        onChangeText={setDosage}
      />

      <TextInput
        style={styles.input}
        placeholder="ชื่อยา"
        value={medicationName}
        onChangeText={setMedicationName}
      />

      <TextInput
        style={styles.input}
        placeholder="ขนาด (เช่น 1 เม็ด)"
        value={size}
        onChangeText={setSize}
      />

      <TouchableOpacity style={styles.recordButton} onPress={recordMedication}>
        <Text style={styles.buttonText}>บันทึก</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  recordButton: {
    backgroundColor: '#52B788',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationContainer: {
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
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    backgroundColor: '#FF88F3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    height: 45,
    backgroundColor: '#52B788',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
    fontFamily: 'Kanit_400Regular',
  },
});

export default DragScreen;
