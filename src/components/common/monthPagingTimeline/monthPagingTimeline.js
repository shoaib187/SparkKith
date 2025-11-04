import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import colors from '../../constants/colors/colors';
import { FONT_SIZES } from '../../constants/sizes/responsiveFont';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MonthPagingTimeline = ({ onDateSelect, selectedDate, sessionsData }) => {
  const scrollViewRef = useRef(null);
  const dates = generateDates();

  // Generate 30 days (15 before + 15 after today)
  function generateDates() {
    const list = [];
    const startDate = moment().subtract(15, 'days');
    for (let i = 0; i < 30; i++) {
      list.push(moment(startDate).add(i, 'days'));
    }
    return list;
  }

  const scrollToDate = (index) => {
    if (scrollViewRef.current) {
      const itemWidth = 70;
      const scrollX = index * itemWidth - (SCREEN_WIDTH / 2 - itemWidth / 2);
      scrollViewRef.current.scrollTo({ x: Math.max(0, scrollX), animated: true });
    }
  };

  useEffect(() => {
    const selectedIndex = dates.findIndex((d) => d.isSame(moment(selectedDate), 'day'));
    if (selectedIndex !== -1) {
      setTimeout(() => scrollToDate(selectedIndex), 100);
    }
  }, []);

  const getSessionsForDate = (date) => {
    const key = date.format('YYYY-MM-DD');
    return sessionsData?.[key] || [];
  };

  const DateItem = ({ date, index }) => {
    const isSelected = date.isSame(moment(selectedDate), 'day');
    const isToday = date.isSame(moment(), 'day');
    const isFuture = date.isAfter(moment(), 'day');
    const hasSessions = !isFuture && getSessionsForDate(date).length > 0;

    const handlePress = () => {
      if (!isFuture) {
        onDateSelect(date.toDate());
        scrollToDate(index);
      }
    };

    return (
      <TouchableOpacity
        disabled={isFuture}
        onPress={handlePress}
        style={[
          styles.dateItem,
          isSelected && styles.selectedDateItem,
          isFuture && styles.disabledDateItem,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            isSelected && styles.selectedText,
            isFuture && styles.disabledText,
          ]}
        >
          {date.format('ddd').charAt(0)}
        </Text>

        <Text
          style={[
            styles.dateText,
            isSelected && styles.selectedText,
            isFuture && styles.disabledText,
          ]}
        >
          {date.format('D')}
        </Text>

        {/* Dot indicator for today/past days with sessions */}
        {<View style={styles.dot} />}
        {/* {isToday && <View style={[styles.dot, styles.todayDot]} />} */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {dates.map((date, index) => (
          <DateItem key={date.format('YYYY-MM-DD')} date={date} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    paddingVertical: 6,
    borderRadius: 16,
  },
  selectedDateItem: {
    backgroundColor: colors.buttonColor,
  },
  disabledDateItem: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: FONT_SIZES.sm,
    color: colors.description,
  },
  dateText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: colors.textPrimary || '#000',
  },
  selectedText: {
    color: colors.white,
  },
  disabledText: {
    color: '#aaa',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray || '#888',
    marginTop: 4,
  },
  todayDot: {
    backgroundColor: colors.white || '#FF3B30',
    width: 24, height: 24,
    borderRadius: 40,
    position: "absolute",
    zIndex: -1,
    top: -2
  },
});

export default MonthPagingTimeline;
