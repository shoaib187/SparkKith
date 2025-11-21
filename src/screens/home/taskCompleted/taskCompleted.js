import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import colors from '../../../components/constants/colors/colors';
import Button from '../../../components/common/button/button';

const { width } = Dimensions.get('window');

export default function TaskCompleted({ route, navigation }) {
  const { selectedTask } = route?.params;
  console.log("selectedTask from TaskCompleted", selectedTask);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/icons/wow.png')}
        style={styles.mainImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>{selectedTask?.title || "Task Complete!"}</Text>
      <Text numberOfLines={2} style={styles.description}>{selectedTask?.description}</Text>

      <View style={styles.bottomRow}>
        {/* Left Card: Total Points */}
        <View style={[styles.outerCard, { backgroundColor: colors.charcol }]}>
          <Text style={styles.cardTitle}>Total Points</Text>
          <View style={styles.innerCard}>
            <Image
              source={require('../../../../assets/icons/star.png')}
              style={[styles.icon, { tintColor: colors.charcol }]}
            />
            <Text style={[styles.innerText, { color: colors.charcol }]}>
              {selectedTask?.points || 0}
            </Text>
          </View>
        </View>

        {/* Right Card: Streak */}
        <View style={[styles.outerCard, { backgroundColor: '#FFB02E' }]}>
          <Text style={styles.cardTitle}>Streak</Text>
          <View style={styles.innerCard}>
            <Image
              source={require('../../../../assets/icons/fire.png')}
              style={styles.icon}
            />
            <Text style={[styles.innerText, { color: '#FFB02E' }]}>
              {selectedTask?.streak || 1}
            </Text>
          </View>
        </View>
      </View>

      <Button
        title='Continue'
        style={{ marginTop: 50, width: '90%', backgroundColor: colors.blue }}
        textColor='white'
        onPress={() => navigation.navigate("HomePage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
  },
  mainImage: {
    width: width * 0.7,
    height: width * 0.7,
    marginTop: "25%"
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.buttonColor,
    textAlign: 'center',
    marginTop: 20
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40
  },
  outerCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
  },
  innerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    height: 80,
    justifyContent: 'center'
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  innerText: {
    fontSize: 24,
    fontWeight: '600',
  },
});
