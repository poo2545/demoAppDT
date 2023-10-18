import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const NutrientsGraph = ({ data }) => {

  const chartData = {
    labels: ['จันทร์','อังคาร', 'พุธ', 'พฤ', 'ศุกร์' , 'เสาร์' , 'อาทิตย์'],
    datasets: [
      {
        data: data, 
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      // ปรับแต่ง Label
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // สีของ Label
  decimalPlaces: 0, // จำนวนตำแหน่งทศนิยม
  style: {
    borderRadius: 16,
  },
    // ปรับสไตล์ข้อความ
    showValuesOnTopOfBars: true, // แสดงค่าบนแท่งกราฟ
    barPercentage: 0.6, // ความกว้างของแท่ง
    fontFamily: 'Kanit_400Regular',
};


  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={360}
        height={200}
        chartConfig={chartConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,

  },
});

export default NutrientsGraph;
