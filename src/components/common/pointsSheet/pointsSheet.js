import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../constants/colors/colors';


export default function PointsSheet() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../../assets/icons/fire.png')}
            style={styles.headerIcon}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Glow Getters</Text>
          <Text style={styles.headerDescription}>
            847 active members
          </Text>
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {/* Row 1 - Two cards */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Image
              source={require('../../../../assets/icons/fire.png')}
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Total Points</Text>
            <Text style={styles.cardValue}>12,450</Text>
          </View>

          <View style={styles.card}>
            <Image
              source={require('../../../../assets/icons/star.png')}
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Weekly Points</Text>
            <Text style={styles.cardValue}>980</Text>
          </View>
        </View>

        {/* Row 2 - Full Width Card */}
        <View style={[styles.card, styles.fullWidthCard]}>
          <Image
            source={require('../../../../assets/png/rank.png')}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>All-Time Points</Text>
          <Text style={styles.cardValue}>45,230</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    // color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerDescription: {
    color: colors.description,
    fontSize: 13,
    marginTop: 2,
  },
  cardsContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.lightPink,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%'
  },
  cardIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  cardTitle: {
    color: colors.description,
    fontSize: 13,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  fullWidthCard: {
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
});
