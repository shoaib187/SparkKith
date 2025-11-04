import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/common/header/header'
import TextButton from '../../../components/common/textButton/textButton'
import colors from '../../../components/constants/colors/colors'
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont'
import Button from '../../../components/common/button/button'
import SignoutModal from '../../../components/common/signoutModal/signoutModal'

export default function Settings({ navigation }) {
  const [visible, setVisible] = useState(false)
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
        <Image source={require("../../../../assets/icons/bell.png")} style={{ width: 40, height: 40 }} />
        <Text style={styles.notify}>Stay on track with personalized reminders and community updates</Text>
        <Button title='Enable' style={{ backgroundColor: colors.blue, width: '100%' }} />
      </View>

      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.innerSection}>
          <TextButton title={"Privacy Settings"} />
          <TextButton title={"Help Center"} />
          <TextButton title={"About Sparkith"} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 14, marginTop: 12 }}>
        <Button onPress={() => setVisible(!visible)} title='Sign Out' style={{ backgroundColor: '#FFFCF7' }} textColor='red' />
      </View>
      <SignoutModal visible={visible} setVisible={setVisible} />
    </View>
  )
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
  notify: {
    textAlign: 'center',
    marginVertical: 16,
    width: '90%'
  }
})