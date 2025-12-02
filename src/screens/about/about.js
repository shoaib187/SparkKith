import DeviceInfo from 'react-native-device-info';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../components/constants/colors/colors';
import Header from '../../components/common/header/header';

export default function About({ navigation }) {
  const [appInfo, setAppInfo] = useState({});
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const loadInfo = async () => {
      const appData = {
        appName: DeviceInfo.getApplicationName(),
        version: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        bundleId: DeviceInfo.getBundleId(),
      };

      const deviceData = {
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        deviceName: await DeviceInfo.getDeviceName(),
      };

      setAppInfo(appData);
      setDeviceInfo(deviceData);
    };

    loadInfo();
  }, []);

  const handleContact = () => {
    Linking.openURL('mailto:support@sparkkith.com');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header showBack navigation={navigation} />
      <View style={{ padding: 14 }}>
        <View style={styles.header}>
          <Text style={styles.title}>About {appInfo.appName || 'SparkKith'}</Text>
          <Text style={styles.subtitle}>Version {appInfo.version} (Build {appInfo.buildNumber})</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <InfoRow label="App Name" value={appInfo.appName} />
          <InfoRow label="Version" value={appInfo.version} />
          <InfoRow label="Build Number" value={appInfo.buildNumber} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Information</Text>
          <InfoRow label="Device" value={deviceInfo.deviceName} />
          <InfoRow label="Platform" value={deviceInfo.systemName} />
          <InfoRow label="OS Version" value={deviceInfo.systemVersion} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactText} onPress={handleContact}>
            support@sparkkith.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value || 'Loading...'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: colors.description,
    marginTop: 8,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  infoLabel: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  contactText: {
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
    paddingVertical: 8,
  },
});