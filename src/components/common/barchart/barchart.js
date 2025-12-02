import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BarChart, YAxis } from 'react-native-svg-charts';
import { Rect, G } from 'react-native-svg';
import colors from '../../constants/colors/colors';

export default function MyBarChart({ analytics }) {

  const barColors = [
    '#7DE973',
    '#F7E78B',
    '#FFB02E',
    '#9BE5FA',
    '#F8312F',
    '#B37DF6'
  ];

  const ICON_MAP = {
    happy: require('../../../../assets/icons/good.png'),
    neutral: require('../../../../assets/icons/great.png'),
    sad: require('../../../../assets/icons/sad.png'),
    excited: require('../../../../assets/icons/okay.png'),
    angry: require('../../../../assets/icons/angry.png'),
  };

  // console.log(analytics)

  // convert analytics → chart values
  const chartData = analytics?.map((item, index) => ({
    value: item.value * 1,   // 0–5 → convert to percent scale for Y axis
    svg: { fill: barColors[index] },
  })) || [];

  // convert analytics → icons
  const icons = analytics?.map(item => ICON_MAP[item.label]) || [];

  const RoundedTopBar = ({ x, y, bandwidth, data }) => (
    <G>
      {data.map((item, index) => {
        const barHeight = y(0) - y(item.value);
        return (
          <Rect
            key={index}
            x={x(index) + bandwidth * 0.1}
            y={y(item.value)}
            width={bandwidth * 0.8}
            height={barHeight}
            fill={item.svg.fill}
            rx={10}
            ry={10}
          />
        );
      })}
    </G>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: 250 }}>

        <YAxis
          data={[0, 20, 40, 60, 80, 100]}
          style={{ marginBottom: 6 }}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: 'gray', fontSize: 10 }}
          formatLabel={(value) => `${value}%`}
        />

        <BarChart
          style={{ flex: 1, marginLeft: 6 }}
          data={chartData}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 10, bottom: 10 }}
          spacingInner={0.5}
          yMin={0}
          yMax={100}
          animate
          animationDuration={1200}
        >
          <RoundedTopBar data={chartData} />
        </BarChart>
      </View>
      <View style={styles.iconRow}>
        {chartData.map((_, index) => (
          <View key={index} style={[styles.iconWrapper]}>
            <Image source={icons[index]} style={[styles.icon, { marginLeft: 30 }]} />
          </View>
        ))}
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
    marginVertical: 16,
    borderRadius: 12,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  iconWrapper: {
    width: "20%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },

});
