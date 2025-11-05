import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { G, Rect } from 'react-native-svg';
import * as scale from 'd3-scale';
import TimeRangeDropdown from '../dropdown/dropdown';
import colors from '../../constants/colors/colors';

// Main Chart Component
export default function TaskActivityChart() {
  const [selectedRange, setSelectedRange] = useState('Monthly');

  // Example data sets
  const dataSets = {
    Daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      completed: [3, 6, 5, 8, 4, 7, 6],
      skipped: [1, 2, 0, 1, 2, 0, 1],
    },
    Weekly: {
      labels: ['W1', 'W2', 'W3', 'W4'],
      completed: [8, 2, 5, 2],
      skipped: [5, 3, 4, 6],
    },
    Monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      completed: [9, 10, 6, 8, 10, 9, 7, 8, 9, 10, 8, 11],
      skipped: [5, 7, 3, 6, 4, 5, 6, 4, 5, 3, 6, 4],
    },
  };

  const { labels, completed, skipped } = dataSets[selectedRange];
  const barColors = { completed: "#E85D75", skipped: colors.blue };
  // const barColors = { completed: '#9BD0F5', skipped: '#F59DB3' };

  // Custom bar layout (side-by-side)
  const CustomBars = ({ x, y, bandwidth }) => (
    <G>
      {completed.map((value, index) => {
        const barWidth = bandwidth / 4;
        return (
          <G key={index}>
            <Rect
              x={x(index) + bandwidth / 6}
              y={y(value)}
              rx={6}
              ry={6}
              width={barWidth}
              height={y(0) - y(value)}
              fill={barColors.completed}
            />
            <Rect
              x={x(index) + bandwidth / 2.2}
              y={y(skipped[index])}
              rx={6}
              ry={6}
              width={barWidth}
              height={y(0) - y(skipped[index])}
              fill={barColors.skipped}
            />
          </G>
        );
      })}
    </G>
  );

  return (
    <View style={styles.card}>
      {/* Header with Separate Dropdown */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Task Activity</Text>
          <Text style={styles.subtitle}>{selectedRange} Overview</Text>
        </View>

        <TimeRangeDropdown
          selectedRange={selectedRange}
          onSelectRange={setSelectedRange}
        />
      </View>

      {/* Chart */}
      <View style={{ flexDirection: 'row', height: 230 }}>
        <YAxis
          data={[0, 2, 4, 6, 8, 10]}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: '#999', fontSize: 10 }}
          formatLabel={(v) => `${v}`}
        />

        <View style={{ flex: 1 }}>
          <BarChart
            style={{ flex: 1 }}
            data={completed}
            yAccessor={({ item }) => item}
            spacingInner={0.3}
            gridMin={0}
            yMax={10}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ fill: 'transparent' }}
            animate
            animationDuration={800}
          >
            <CustomBars />
          </BarChart>

          <XAxis
            style={{ marginTop: 6 }}
            data={labels}
            scale={scale.scaleBand}
            formatLabel={(value, index) => labels[index]}
            svg={{ fontSize: 11, fill: colors.description }}
          />
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: barColors.completed }]}
          />
          <Text style={styles.legendLabel}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: barColors.skipped }]}
          />
          <Text style={styles.legendLabel}>Skipped</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF9F7',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.description,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: '#666',
  },
});