import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { BarChart, YAxis } from 'react-native-svg-charts';
import { Rect, G } from 'react-native-svg';
import colors from '../../constants/colors/colors';

export default function MyBarChart() {
  const data = [40, 70, 20, 90, 60];
  const barColors = ['#F7E78B', '#7DE973', '#FFB02E', '#9BE5FA', '#F8312F'];

  const ICONS = [
    require('../../../../assets/icons/okay.png'),
    require('../../../../assets/icons/good.png'),
    require('../../../../assets/icons/great.png'),
    require('../../../../assets/icons/sad.png'),
    require('../../../../assets/icons/angry.png'),
  ];

  // Custom Rounded Bar Shape
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
            rx={10} // round x corners
            ry={10} // round y corners
          />
        );
      })}
    </G>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: 250 }}>
        {/* Y Axis */}
        <YAxis
          data={[0, 20, 40, 60, 80, 100]}
          style={{ marginBottom: 6 }}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: 'gray', fontSize: 10 }}
          formatLabel={(value) => `${value}%`}
        />

        {/* BarChart */}
        <BarChart
          style={{ flex: 1, marginLeft: 10 }}
          data={data.map((value, index) => ({
            value,
            svg: { fill: barColors[index] },
          }))}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 10, bottom: 10 }}
          spacingInner={0.5}
          gridMin={0}
          gridMax={100}
          yMin={0}
          yMax={100}
          animate
          animationDuration={1500}
          renderDecorator={() => null} // disables default decorator
        >
          {/* Custom Rounded Bars */}
          <RoundedTopBar
            data={data.map((value, index) => ({
              value,
              svg: { fill: barColors[index] },
            }))}
          />
        </BarChart>
      </View>

      {/* Icons Row */}
      <View style={styles.iconRow}>
        {ICONS.map((icon, index) => (
          <Image key={index} source={icon} style={styles.icon} />
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
    width: '86%',
    marginTop: 8,
    marginLeft: 25,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
