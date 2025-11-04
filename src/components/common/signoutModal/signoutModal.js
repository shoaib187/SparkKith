import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../../constants/sizes/responsiveFont'
import Button from '../button/button'

export default function SignoutModal({ visible, setVisible }) {
  return (
    <Modal visible={visible} backdropColor={"#00000020"}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 24, width: '80%', borderRadius: 30 }}>
          <Text style={styles.title}>Sign Out</Text>
          <Text style={styles.descripiton}>Are you sure you want to sign out? You’ll need to log in again to access your progress and community.</Text>
          <Button onPress={() => setVisible(!visible)} title='cancel' textStyle={{ textTransform: 'capitalize' }} style={{ borderRadius: 60, marginTop: 12, backgroundColor: "blue" }} />
          <Button onPress={() => setVisible(!visible)} title='Sign out' textStyle={{ textTransform: 'capitalize' }} style={{ borderRadius: 60, marginTop: 12, backgroundColor: "#B8B8B860" }} textColor='red' />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '900',
    fontSize: FONT_SIZES.md,
  },
  descripiton: {
    fontSize: FONT_SIZES.md,
    marginVertical: 8
  }
})