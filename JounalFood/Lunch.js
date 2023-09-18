import { View, Text , StyleSheet , SafeAreaView} from 'react-native'
import React , {useLayoutEffect} from 'react'
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit'; 
import { useNavigation } from "@react-navigation/native"; 

const Lunch = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: "bold", fontFamily: 'Kanit_400Regular',justifyContent:'center' }}>บันทึกการกินอาหารเที่ยง</Text>
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
        });
      }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Breakfast</Text>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
});
export default Lunch
