import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import { G, Rect } from 'react-native-svg';
import * as scale from 'd3-scale';
import TimeRangeDropdown from '../dropdown/dropdown';
import colors from '../../constants/colors/colors';

// Main Chart Component
export default function TaskActivityChart({ analytics, selectedRange, onSelectRange }) { // Add props

  const labels = analytics?.labels || [];
  const completed = analytics?.completed || [];
  const skipped = analytics?.skipped || [];

  const barColors = { completed: "#E85D75", skipped: colors.blue };
  const allValues = [...completed, ...skipped];
  const maxValue = Math.max(...allValues, 10); // at least 10


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
          onSelectRange={onSelectRange} // Use the passed handler
        />
      </View>

      {/* Chart */}
      <View style={{ flexDirection: 'row', height: 230 }}>
        <YAxis
          data={[0, maxValue / 2, maxValue]}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: '#999', fontSize: 10 }}
          formatLabel={(v) => `${Math.round(v)}`}
        />

        <BarChart
          style={{ flex: 1 }}
          data={completed}
          yAccessor={({ item }) => item}
          spacingInner={0.3}
          gridMin={0}
          yMax={maxValue}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: 'transparent' }}
          animate
          animationDuration={800}
        >
          <CustomBars />
        </BarChart>
      </View>
      <XAxis style={{ marginTop: 6 }} data={labels} scale={scale.scaleBand} formatLabel={(value, index) => labels[index]} svg={{ fontSize: 11, fill: colors.description }} />

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