import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../../components/common/button/button';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import colors from '../../../components/constants/colors/colors';

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>SparkKith!</Text>
      </View>

      <Text style={styles.description}>
        Your daily spark to stay motivated and grow stronger with your community.
      </Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.feature}>🍃 Log your small daily actions</Text>
        <Text style={styles.feature}>🌟 Earn badges and streaks</Text>
        <Text style={styles.feature}>🏆 Join challenges with your crew</Text>
      </View>

      <Text style={styles.note}>
        💡 Note: Sparkkith is here to motivate and inspire, but it is not a medical tool.
        If you ever feel unsafe or in crisis, please reach out to your local emergency or crisis team right away.
      </Text>

      <Button
        onPress={() => navigation.navigate('Login')}
        title="Let's Go!"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '900',
    // color: colors.danger,
  },
  description: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    width: '90%',
    marginBottom: 24,
  },
  feature: {
    fontSize: FONT_SIZES.md,
    color: colors.red,
    textAlign: 'center',
    marginVertical: 4,
  },
  note: {
    fontSize: FONT_SIZES.sm,
    color: '#666',
    textAlign: 'center',
    width: '90%',
    lineHeight: 20,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    backgroundColor: colors.danger,
    borderRadius: 12,
  },
});
