
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/colors/colors';

const quotes = [
  "“What did the big flower say to the little flower? Hi, bud!”",
  "“Every day may not be good, but there’s something good in every day.”",
  "“Be a rainbow in someone else’s cloud.”",
  "“You’re doing better than you think.”",
  "“Bloom where you are planted.”"
];

const MAX_QUOTES_PER_DAY = 5;

export default function QuotesSection() {
  const [quote, setQuote] = useState(quotes[0]);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Load saved count for today
    const loadCount = async () => {
      try {
        const today = new Date().toDateString();
        const saved = await AsyncStorage.getItem('quoteCount');
        const savedDate = await AsyncStorage.getItem('quoteDate');

        if (savedDate === today && saved) {
          const parsed = parseInt(saved, 10);
          setCount(parsed);
          if (parsed >= MAX_QUOTES_PER_DAY) setDisabled(true);
        } else {
          // Reset count for a new day
          await AsyncStorage.setItem('quoteCount', '0');
          await AsyncStorage.setItem('quoteDate', today);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCount();
  }, []);

  const showAnotherQuote = async () => {
    if (count >= MAX_QUOTES_PER_DAY) {
      Alert.alert("Limit reached", "You can only generate 5 quotes per day. Come back tomorrow!");
      setDisabled(true);
      return;
    }

    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(newQuote);

    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= MAX_QUOTES_PER_DAY) setDisabled(true);

    // Save count and date
    try {
      await AsyncStorage.setItem('quoteCount', newCount.toString());
      await AsyncStorage.setItem('quoteDate', new Date().toDateString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.cheerCard}>
      <Text style={styles.cheerTitle}>🌻 Cheer Dose</Text>
      <Text style={styles.cheerQuote}>{quote}</Text>

      <TouchableOpacity
        style={[styles.showAnotherWrap, disabled && { opacity: 0.5 }]}
        activeOpacity={0.8}
        onPress={showAnotherQuote}
        disabled={disabled}
      >
        <Image
          source={require('../../../../assets/icons/cycle.png')}
          style={styles.refreshIcon}
        />
        <Text style={styles.showAnother}>
          {disabled ? "Limit Reached" : "Show Another"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cheerCard: {
    backgroundColor: colors.qoutesCard.bgColor,
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14
  },
  cheerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 10,
  },
  cheerQuote: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    fontStyle: "italic"
  },
  showAnotherWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  showAnother: {
    fontSize: 14,
    color: colors.description,
    fontWeight: '600',
    marginLeft: 8,
  },
  refreshIcon: {
    width: 20,
    height: 20,
  },
});
