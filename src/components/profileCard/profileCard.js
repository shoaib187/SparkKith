import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../constants/colors/colors'

export default function ProfileCard({ userInfo }) {
  // console.log(userInfo)
  return (
    <View style={styles.profileCard}>
      <Image
        style={styles.image}
        source={
          userInfo?.profilePicture
            ? { uri: userInfo.profilePicture }
            : require("../../../assets/png/twinkle.png")
        }
      />
      <Text style={styles.profileName}>{userInfo?.username + " " + userInfo?.lastName}</Text>
      <Text style={styles.profileSubText}>@{userInfo?.username} · Joined {userInfo?.joinedOn?.slice(0, 10)}</Text>
      <Text style={styles.highlight}>
        You are a proud member of {userInfo?.spark?.name}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 16,
  },
  image: {
    width: 140, height: 140,
    resizeMode: 'contain'
  },
  profileEmoji: {
    fontSize: 60,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginTop: 12,
    textTransform: 'capitalize'
  },
  profileSubText: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 2,
  },
  highlight: {
    color: colors.buttonColor
  },
})