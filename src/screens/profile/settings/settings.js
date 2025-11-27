import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/common/header/header';
import TextButton from '../../../components/common/textButton/textButton';
import colors from '../../../components/constants/colors/colors';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import Button from '../../../components/common/button/button';
import SignoutModal from '../../../components/common/signoutModal/signoutModal';
import { checkNotificationPermission, requestAndroidPermission } from '../../../utils/notification/api';
import { DeleteAccountModal } from '../../../components/common/deleteModal/deleteModal';
import { logout } from '../../../redux/slices/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';

export default function Settings({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(`${baseUrl}/api/user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log("Account deleted successfully:", res.data);
      if (res.data.success) {
        await dispatch(logout())
      }
    } catch (error) {
      console.log("Error deleting account:", error)
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Check permission on mount
  useEffect(() => {
    const getStatus = async () => {
      const status = await checkNotificationPermission();
      setHasPermission(status);
      setChecking(false);
    };
    getStatus();
  }, []);

  const handleRequestPermission = async () => {
    const status = await requestAndroidPermission();
    setHasPermission(status);
  };

  return (
    <View style={styles.container}>
      <Header title={"Settings"} navigation={navigation} />

      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.innerSection}>
          <TextButton title={"Edit Profile"} onPress={() => navigation.navigate("EditProfile")} />
          <TextButton title={"Notifications"} onPress={() => navigation.navigate("Notifications")} />
        </View>
      </View>

      <View style={styles.notificationCard}>
        <Image source={require("../../../../assets/icons/bell.png")} style={styles.bellIcon} />
        <Text style={styles.notify}>
          Stay on track with personalized reminders and community updates
        </Text>

        {checking ? (
          <ActivityIndicator size="small" color={colors.buttonColor} style={styles.loader} />
        ) : hasPermission ? (
          <Text style={styles.permissionText}>Notifications access enabled</Text>
        ) : (
          <Button
            onPress={handleRequestPermission}
            title='Enable Notifications'
            style={styles.enableButton}
          />
        )}
      </View>

      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.innerSection}>
          <TextButton title={"Help Center"} onPress={() => navigation.navigate("Help")} />
          <TextButton onPress={() => navigation.navigate("About")} title={"About Sparkith"} />
        </View>
      </View>

      <View style={styles.signOutButton}>
        <Button
          onPress={() => setVisible(!visible)}
          title='Sign Out'
          style={styles.signOutBg}
          textColor='red'
        />
        <Button
          onPress={() => setShowDeleteModal(true)}
          title='Delete account'
          style={{ marginTop: 12 }}
          textColor='red'
        />
      </View>

      <SignoutModal visible={visible} setVisible={setVisible} />
      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  },
  sectionWrapper: {
    paddingHorizontal: 16
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    color: colors.description
  },
  innerSection: {
    backgroundColor: colors.white,
    borderRadius: 14,
    marginTop: 6,
    paddingHorizontal: 20
  },
  notificationCard: {
    marginHorizontal: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F4F9FA",
    borderRadius: 14,
    marginVertical: 20
  },
  bellIcon: {
    width: 40,
    height: 40
  },
  notify: {
    textAlign: 'center',
    marginVertical: 16,
    width: '90%'
  },
  loader: {
    marginTop: 10
  },
  permissionText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10
  },
  enableButton: {
    backgroundColor: colors.blue,
    width: '100%'
  },
  signOutButton: {
    paddingHorizontal: 14,
    marginTop: 12
  },
  signOutBg: {
    backgroundColor: '#FFFCF7'
  }
});
