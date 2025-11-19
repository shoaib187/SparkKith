import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FONT_SIZES } from '../../constants/sizes/responsiveFont';
import colors from '../../constants/colors/colors';
import { getEmojiForTask } from '../../../utils/services/services';

export default function Task({ item }) {
  const isDone = item.status;
  const emoji = getEmojiForTask(item.title, item.desc);

  // check if task is today
  const todayStr = new Date().toISOString().split('T')[0];
  const taskDateStr = new Date(item.date).toISOString().split('T')[0];
  const isToday = todayStr === taskDateStr;

  // If task is done OR not today => apply opacity and disable
  const disabled = isDone || !isToday;
  const opacity = disabled ? 0.6 : 1;

  return (
    <TouchableOpacity
      style={[styles.card, { opacity }]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {/* Emoji Section */}
      <View style={styles.iconContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
        {isDone && (
          <Image
            source={require('../../../../assets/png/check1.png')}
            style={styles.checkIcon}
          />
        )}
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              textDecorationLine: isDone ? 'line-through' : 'none',
              color: isDone ? '#000' : colors.textPrimary,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.desc}>{item.desc}</Text>
      </View>

      {/* Skipped Label */}
      {!isDone && !isToday && (
        <Text style={styles.skippedLabel}>Skipped</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  emoji: {
    fontSize: 26,
  },
  checkIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '900',
    color: '#111827',
  },
  desc: {
    fontSize: 13,
    color: colors.description,
    marginTop: 2,
  },
  skippedLabel: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: colors.description,
    fontSize: 12,
  },
});


// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
// import React from 'react'
// import { FONT_SIZES } from '../../constants/sizes/responsiveFont'
// import colors from '../../constants/colors/colors'

// export default function Task({ item }) {
//   return (
//     <TouchableOpacity style={[styles.suggestionCard, { opacity: item.status === "pending" ? 1 : .6 }]}>
//       <View style={styles.suggestionIconBg}>
//         <Image source={item.icon} style={styles.suggestionIcon} />
//         {item.status === "done" && <Image source={require("../../../../assets/png/check1.png")} style={styles.check} />}
//       </View>
//       <View style={styles.suggestionTextWrap}>
//         <Text style={[styles.suggestionTitle, {
//           textDecorationLine:
//             item.status === "done" || item.status === "skipped" ? "line-through" : "none",
//           color: item.status === "pending" ? "black" : colors.description
//         }]}>{item.title}</Text>
//         <Text style={styles.suggestionDesc}>{item.desc}</Text>
//       </View>
//       {item?.status === "skipped" && <Text style={{ position: 'absolute', right: 10, top: 10, color: colors.description }}>Skipped</Text>}
//     </TouchableOpacity>
//   )
// }


// const styles = StyleSheet.create({
//   suggestionCard: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     position: 'relative',
//   },
//   suggestionIconBg: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     alignItems: "center",
//     marginRight: 6,
//   },
//   suggestionIcon: {
//     width: 26,
//     height: 26,
//     resizeMode: "contain",
//   },
//   suggestionTextWrap: {
//     flex: 1,
//   },
//   suggestionTitle: {
//     fontSize: FONT_SIZES.md,
//     fontWeight: "900",
//     color: "#111827",
//   },
//   suggestionDesc: {
//     fontSize: 13,
//     color: colors.description,
//     marginTop: 2,
//   },
//   check: {
//     width: 18,
//     height: 18,
//     position: 'absolute',
//     bottom: 0, right: 0

//   }
// })