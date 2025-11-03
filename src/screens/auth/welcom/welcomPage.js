import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont'
import { colors } from '../../../components/constants/colors/colors'
import Button from '../../../components/button/button'

export default function WelcomPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontWeight: "700", fontSize: 20 }}>Welcome to</Text>
      <Text style={{ fontSize: FONT_SIZES.xxl, fontWeight: '900', marginBottom: 30 }}>SparkKith!</Text>
      <Text style={styles.text}>
        Your daily spart to stay motiviatedand grow stronger with your community
      </Text>
      <View style={{ width: '90%', alignItems: 'center', marginVertical: 20 }}>
        <Text style={styles.subtitle}>😅Log your small daily actions</Text>
        <Text style={styles.subtitle}>😅Log your small daily actions</Text>
        <Text style={styles.subtitle}>😅Log your small daily actions</Text>
      </View>
      <Text style={styles.note}>🙌🏼Note:SparkKith Log your small daily actionsLog your small daily actionsLog your small daily actionsLog your small daily actionsLog your small daily actions</Text>
      <Button title={"Let's Go"} style={{ width: '90%', position: "absolute", bottom: 14, backgroundColor: colors.danger }} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center'
  },
  subtitle: {
    color: colors.red
  },
  note: {

    textAlign: 'center',
    width: '90%'
  }
})