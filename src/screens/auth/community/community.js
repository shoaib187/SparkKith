import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';

const kithData = [
  {
    id: '1',
    title: 'Zen Den',
    subtitle: 'Grow & Flourish',
    image: 'https://img.icons8.com/emoji/96/deciduous-tree.png',
  },
  {
    id: '2',
    title: 'Glow Getters',
    subtitle: 'Fuel your fire',
    image: 'https://img.icons8.com/emoji/96/fire.png',
  },
  {
    id: '3',
    title: 'Vibe Tribe',
    subtitle: 'Lift each other',
    image: 'https://img.icons8.com/emoji/96/person-raising-hand.png',
  },
  {
    id: '4',
    title: 'Joy Squad',
    subtitle: 'Spark your joy',
    image: 'https://img.icons8.com/emoji/96/sun.png',
  },
];

const Community = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    const chosen = kithData.find((item) => item.id === id);
    console.log('Selected Kith:', chosen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Choose Your Kith!</Text>
      <Text style={styles.subHeading}>
        The Kith you choose becomes your tribe on this journey. The tasks you complete fuels your community and helps it rise on the leaderboard.
      </Text>
      <Text style={[styles.subHeading, { marginTop: 8 }]}>
        Choose the one that feels right for you. More ways to explore other communities coming soon…
      </Text>

      {/* Cards */}
      <View style={styles.grid}>
        {kithData.map((item) => {
          const isSelected = selected === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => handleSelect(item.id)}
              activeOpacity={0.8}
            >
              {isSelected && <View style={styles.badge} />}
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>"{item.subtitle}"</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selected ? '#f4b400' : '#ccc' },
        ]}
        disabled={!selected}
        onPress={() => console.log('Continue with:', selected)}
      >
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subHeading: {
    fontSize: FONT_SIZES.sm,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  grid: {
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCard: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.md,
    color: '#333',
  },
  cardSubtitle: {
    color: '#999',
    fontSize: FONT_SIZES.sm,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f4b400',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FONT_SIZES.md,
  },
});
