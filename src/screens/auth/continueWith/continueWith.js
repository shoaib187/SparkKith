import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../../components/common/button/button';
import colors from '../../../components/constants/colors/colors';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';

export default function ContinueWith({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/png/app_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        A fun way to light the path to wellness — one spark at a time.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue with Google"
          onPress={() => navigation.navigate('Welcome')}
          icon={require('../../../../assets/png/google.png')}
          style={[styles.button, { backgroundColor: '#fff' }]}
          textStyle={{ color: '#000' }}
        />
        <Button
          title="Continue with Email"
          onPress={() => navigation.navigate('Welcome')}
          icon={require('../../../../assets/png/email.png')}
          style={[styles.button, { backgroundColor: "black" }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB858',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
    position: "absolute",
    bottom: 20
  },
  button: {
    width: '100%',
    elevation: 2,
  },
  footerText: {
    marginTop: 50,
    fontSize: FONT_SIZES.sm,
    color: '#333',
    textAlign: 'center',
  },
  link: {
    color: colors.danger,
    fontWeight: '700',
  },
});
