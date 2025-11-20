import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { FONT_SIZES } from '../../constants/sizes/responsiveFont'
import colors from '../../constants/colors/colors'

export default function SuggestionCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.suggestionCard} onPress={onPress}>
      <View style={styles.suggestionIconBg}>
        <Text style={styles.suggestionIcon}>{item?.emoji}</Text>
      </View>
      <View style={styles.suggestionTextWrap}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <Text style={styles.suggestionDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  suggestionCard: {
    flexDirection: "row",
    backgroundColor: "#E9E7E7",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  suggestionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 6,
  },
  suggestionIcon: {
    fontSize: 22
  },
  suggestionTextWrap: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "900",
    color: "#111827",
  },
  suggestionDesc: {
    fontSize: 13,
    color: colors.description,
    marginTop: 2,
  },
})