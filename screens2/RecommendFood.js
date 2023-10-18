import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image ,ScrollView } from 'react-native'
import { React, useLayoutEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
const RecommendFood = () => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{ fontSize: 20, fontFamily: 'Kanit_400Regular', justifyContent: 'center' }}>อาหารที่ควรงด</Text>
            ),
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
        });
    }, []);

    const navigation = useNavigation();


    return (
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View style={styles.krop}>
              <Text style={styles.buttonText1}>อาหารที่ควรงด</Text>
            </View>
    
            <View style={styles.rectangle}>
              <Text style={styles.textTopic}>เฟรนช์ฟรายส์</Text>
              <Image style={styles.logo1} source={require('../assets/food.png')} />
              <Text style={styles.textDetail}>
                หากแป้งขัดขาวเป็นสิ่งที่ไม่ดีสำหรับผู้ป่วยเบาหวานแล้ว
                แป้งขัดขาวที่ผ่านการทอดคงเป็นอะไรที่แย่ยิ่งกว่า และเราเรียกมันว่า
                “เฟรนช์ฟรายส์” เฟรนช์ฟรายส์เป็นมันฝรั่งที่ผ่านการแปรรูป
                จนแทบไม่เหลือใยอาหาร มิหนำซ้ำ น้ำมันที่ใช้ทอดก็มักจะเป็นน้ำมันปาล์ม
                ซึ่งมีไขมันอิ่มตัวสูงมาก
                การทานเฟรนช์ฟรายส์จึงไม่เป็นเพียงแค่การเพิ่มระดับน้ำตาลในเลือดเท่านั้น
                แต่ยังเพิ่มความเสี่ยงในการเกิดโรคหัวใจและหลอดเลือดอีกด้วย
              </Text>
            </View>
    
            <View style={styles.rectangle}>
              <Text style={styles.textTopic}>ชานมไข่มุก</Text>
              <Image style={styles.logo1} source={require('../assets/food.png')} />
              <Text style={styles.textDetail}>
                ชาถือเป็นเครื่องดื่มที่ดีสำหรับผู้ป่วยเบาหวาน แต่ไม่ใช่กับชานมไข่มุก
                ชานมไข่มุกหวานปกติ 1 แก้ว มีน้ำตาลสูงถึง 40 กรัม
                ซึ่งน้ำตาลเหล่านี้ก็พร้อมที่จะเข้าไปโลดแล่นในร่างกาย
                และทำให้ระดับน้ำตาลของคุณสูงขึ้นอย่างรวดเร็ว
              </Text>
            </View>
    
            <View style={styles.rectangle}>
              <Text style={styles.textTopic}>ชานมไข่มุก</Text>
              <Image style={styles.logo1} source={require('../assets/food.png')} />
              <Text style={styles.textDetail}>
                ชาถือเป็นเครื่องดื่มที่ดีสำหรับผู้ป่วยเบาหวาน แต่ไม่ใช่กับชานมไข่มุก
                ชานมไข่มุกหวานปกติ 1 แก้ว มีน้ำตาลสูงถึง 40 กรัม
                ซึ่งน้ำตาลเหล่านี้ก็พร้อมที่จะเข้าไปโลดแล่นในร่างกาย
                และทำให้ระดับน้ำตาลของคุณสูงขึ้นอย่างรวดเร็ว
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#C2FFD3',
        alignItems: 'center',
      },
      krop: {
        width: '90%',
        height: '5%',
        flexShrink: 0,
        backgroundColor: '#FFF',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
      },
      buttonText1: {
        fontSize: 20,
        color: '#000',
      },
      rectangle: {
        width: '90%',
        height: '35%',
        flexShrink: 0,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
      },
      textTopic: {
        flexShrink: 0,
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
      },
      textDetail: {
        marginTop: 10,
        color: '#000',
        textAlign: 'center',
        fontSize: 12,
      },
      logo1: {
        width: 250,
        height: 150,
        flexShrink: 0,
        borderRadius: 5,
        marginTop: 10,
      },
    });

export default RecommendFood