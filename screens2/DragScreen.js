import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { UserType } from "../UserContext";

const DragScreen = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [size, setSize] = useState('');
  const [medicationRecords, setMedicationRecords] = useState([]);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  //Add Medication
  const recordMedication = async () => {
    if (medicationName.trim() === '' || dosage.trim() === '' || time.trim() === '' || size.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://172.20.10.6:8000/medications', {
        userId,
        time,
        dosage,
        medicationName,
        size,
      });
      console.log('Created:', response.data);
      // Clear input fields
      setMedicationName('');
      setDosage('');
      setTime('');
      setSize('');
      alert('บันทึกสำเร็จ');
    } catch (error) {
      console.error('Error creating:', error);
      // Log detailed error information
      console.error('Error response data:', error.response?.data);
      console.error('Error status code:', error.response?.status);
      // Show an error alert with a user-friendly message
      alert('An error occurred while recording medication. Please try again later.');
    }
  };
  //Show Data
  const fetchMedication = async (userId) => {
    try {
      const response = await axios.get(`http://172.20.10.6:8000/medications/${userId}`);
      setMedicationRecords(response.data);
      console.log('Fetched medication records:', response.data);
    } catch (error) {
      console.error('Error fetching medication records:', error);
    }
  };
  useEffect(() => {
    fetchMedication(userId);
  }, []);



  return (
    <View style={styles.container}>
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
      <View style={styles.medicationInfo} >
        <FlatList
          data={medicationRecords}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.medicationContainer}>
              <View style={styles.infoContainer1}>
                <Text style={styles.title1}>{item.time}</Text>
                <Text style={styles.title1}>{item.medicationName} {item.size}</Text>
                <Text style={styles.subtitle}>{item.dosage}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}>
                <Text style={styles.editButtonText}>แก้ไข</Text>
              </TouchableOpacity>

            </View>
          )}
        />
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#C2FFD3',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Kanit_400Regular',
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
    fontFamily: 'Kanit_400Regular',
  },
  medicationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  medicationInfo: {
    flex: 1,
    width: '90%',
    marginTop: 20
  },
  infoContainer1: {
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
    justifyContent: 'center'
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
});

export default DragScreen;
