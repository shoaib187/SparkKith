import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors/colors';

const quotes = [
  "“What did the big flower say to the little flower? Hi, bud!”",
  "“Every day may not be good, but there’s something good in every day.”",
  "“Be a rainbow in someone else’s cloud.”",
  "“You’re doing better than you think.”",
  "“Bloom where you are planted.”"
];

export default function QuotesSection() {
  const [quote, setQuote] = useState(quotes[0]);

  const showAnotherQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(newQuote);
  };

  return (
    <View style={styles.cheerCard}>
      <Text style={styles.cheerTitle}>🌻 Cheer Dose</Text>
      <Text style={styles.cheerQuote}>{quote}</Text>

      <TouchableOpacity
        style={styles.showAnotherWrap}
        activeOpacity={0.8}
        onPress={showAnotherQuote}
      >
        <Image
          source={require('../../../../assets/icons/cycle.png')}
          style={styles.refreshIcon}
        />
        <Text style={styles.showAnother}>Show Another</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cheerCard: {
    // backgroundColor: '#FDF6E4',
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
    // backgroundColor: '#FFF7ED',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#FED7AA',
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
    // tintColor: '#F97316',
  },
});
