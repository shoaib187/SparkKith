import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FONT_SIZES } from "../../constants/sizes/responsiveFont";
import colors from "../../constants/colors/colors";

export default function CustomDateTimePicker() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("Anytime");
  const [remind, setRemind] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [customDate, setCustomDate] = useState(null);
  const [customTime, setCustomTime] = useState(null);

  const handleDateSelection = (item) => {
    setSelectedDate(item);
    if (item === "On Date") {
      setShowDatePicker(true);
    } else {
      setCustomDate(null);
      setCustomTime(null);
    }
  };

  const onDateChange = (event, date) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      setCustomDate(date);
      setTimeout(() => setShowTimePicker(true), 300);
    } else {
      setShowDatePicker(false);
    }
  };

  const onTimeChange = (event, time) => {
    if (event.type === "set") {
      setShowTimePicker(false);
      setCustomTime(time);
    } else {
      setShowTimePicker(false);
    }
  };

  const formattedDate = customDate
    ? customDate.toLocaleDateString()
    : "Select date";
  const formattedTime = customTime
    ? customTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: FONT_SIZES.lg,
          fontWeight: "900",
          marginBottom: 12,
        }}
      >
        Date and Time
      </Text>

      {/* Date Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.iconBg}>
            <Image
              source={require("../../../../assets/png/calendar.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.sectionTitle}>Date</Text>
        </View>

        <View style={styles.rowOptions}>
          {["Today", "Tomorrow", "On Date"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionButton,
                selectedDate === item && styles.optionActive,
              ]}
              onPress={() => handleDateSelection(item)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedDate === item && styles.optionTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Show chosen custom date & time */}
        {selectedDate === "On Date" && customDate && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.selectedDateText}>
              📅 {formattedDate} {customTime && `• 🕒 ${formattedTime}`}
            </Text>
          </View>
        )}
      </View>

      {/* Time Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.iconBg}>
            <Image
              source={require("../../../../assets/png/clock.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.sectionTitle}>Time</Text>
        </View>

        <View style={styles.timeRow}>
          {[
            { label: "Anytime", icon: require("../../../../assets/png/ask.png") },
            { label: "Start the day", icon: require("../../../../assets/png/sun.png") },
            { label: "Afternoon", icon: require("../../../../assets/png/cloud-sun.png") },
            { label: "Bedtime", icon: require("../../../../assets/png/moon.png") },
          ].map((time) => (
            <TouchableOpacity
              key={time.label}
              style={[
                styles.timeColumn,
                selectedTime === time.label && styles.timeActive,
              ]}
              onPress={() => setSelectedTime(time.label)}
            >
              <Image source={time.icon} style={styles.timeIcon} />
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time.label && styles.timeTextActive,
                ]}
              >
                {time.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reminder Section */}
      <View style={styles.section}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={styles.row}>
            <View style={styles.iconBg}>
              <Image
                source={require("../../../../assets/png/bell.png")}
                style={styles.icon}
              />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Remind Me</Text>
              {remind && <Text style={styles.remindTimeText}>6:00 PM</Text>}
            </View>
          </View>
          <Switch
            value={remind}
            onValueChange={setRemind}
            thumbColor={remind ? "#60A5FA" : "#f4f3f4"}
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
          />
        </View>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={customDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={customTime || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 4,
  },
  section: {
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  rowOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBg: {
    backgroundColor: colors.lightBg,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: "center",
    backgroundColor: colors.lightBackground,
  },
  optionActive: {
    backgroundColor: `${colors.buttonColor}20`,
    borderColor: `${colors.buttonColor}`,
  },
  optionText: {
    fontSize: 14,
    color: "#6B7280",
  },
  optionTextActive: {
    color: colors.buttonColor,
    fontWeight: "900",
  },
  selectedDateText: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  timeColumn: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.lightBackground,
    width: "48%",
  },
  timeActive: {
    backgroundColor: `${colors.buttonColor}20`,
    borderColor: `${colors.buttonColor}`,
  },
  timeIcon: {
    width: 26,
    height: 26,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 13,
    color: "#6B7280",
  },
  timeTextActive: {
    color: colors.buttonColor,
    fontWeight: "600",
  },
  remindTimeText: {
    fontSize: 14,
    color: colors.description,
  },
});


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Switch,
// } from "react-native";
// import { FONT_SIZES } from "../../constants/sizes/responsiveFont";
// import colors from "../../constants/colors/colors";
// import IOSCheck from "../iosCheck/iosCheck";

// export default function DateTimePicker() {
//   const [selectedDate, setSelectedDate] = useState("Today");
//   const [selectedTime, setSelectedTime] = useState("Anytime");
//   const [remind, setRemind] = useState(true);

//   return (
//     <View style={styles.container}>
//       <Text style={{ textAlign: 'center', fontSize: FONT_SIZES.lg, fontWeight: "900", marginBottom: 12 }}>
//         Date and Time
//       </Text>
//       {/* Date Section */}
//       <View style={styles.section}>
//         <View style={styles.row}>
//           <View style={styles.iconBg}>
//             <Image
//               source={require("../../../../assets/png/calendar.png")}
//               style={styles.icon}
//             />
//           </View>
//           <Text style={styles.sectionTitle}>Date</Text>
//         </View>

//         <View style={styles.rowOptions}>
//           {["Today", "Tomorrow", "On Date"].map((item) => (
//             <TouchableOpacity
//               key={item}
//               style={[
//                 styles.optionButton,
//                 selectedDate === item && styles.optionActive,
//               ]}
//               onPress={() => setSelectedDate(item)}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   selectedDate === item && styles.optionTextActive,
//                 ]}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Time Section */}
//       <View style={styles.section}>
//         <View style={styles.row}>
//           <View style={styles.iconBg}>
//             <Image
//               source={require("../../../../assets/png/clock.png")}
//               style={styles.icon}
//             />
//           </View>
//           <Text style={styles.sectionTitle}>Time</Text>
//         </View>

//         <View style={styles.timeRow}>
//           {[
//             { label: "Anytime", icon: require("../../../../assets/png/ask.png") },
//             { label: "Start the day", icon: require("../../../../assets/png/sun.png") },
//             { label: "Afternoon", icon: require("../../../../assets/png/cloud-sun.png") },
//             { label: "Bedtime", icon: require("../../../../assets/png/moon.png") },
//           ].map((time) => (
//             <TouchableOpacity
//               key={time.label}
//               style={[
//                 styles.timeColumn,
//                 selectedTime === time.label && styles.timeActive,
//               ]}
//               onPress={() => setSelectedTime(time.label)}
//             >
//               <Image source={time.icon} style={styles.timeIcon} />
//               <Text
//                 style={[
//                   styles.timeText,
//                   selectedTime === time.label && styles.timeTextActive,
//                 ]}
//               >
//                 {time.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Reminder Section */}
//       <View style={styles.section}>
//         <View style={[styles.row, { justifyContent: "space-between" }]}>
//           <View style={styles.row}>
//             <View style={styles.iconBg}>
//               <Image
//                 source={require("../../../../assets/png/bell.png")}
//                 style={styles.icon}
//               />
//             </View>
//             <View>
//               <Text style={styles.sectionTitle}>Remind Me</Text>
//               {remind && (
//                 <Text style={styles.remindTimeText}>6:00 PM</Text>
//               )}
//             </View>
//           </View>
//           <Switch
//             value={remind}
//             onValueChange={setRemind}
//             thumbColor={remind ? "#60A5FA" : "#f4f3f4"}
//             trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
//           />
//         </View>


//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     marginTop: 4
//   },
//   section: {
//     marginBottom: 18,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 10,
//   },
//   icon: {
//     width: 22,
//     height: 22,
//     resizeMode: "contain",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//   },
//   rowOptions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   iconBg: {
//     backgroundColor: colors.lightBg,
//     width: 34, height: 34, alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 50
//   },
//   optionButton: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginHorizontal: 4,
//     alignItems: "center",
//     backgroundColor: colors.lightBackground,
//   },
//   optionActive: {
//     backgroundColor: `${colors.buttonColor}20`,
//     borderColor: `${colors.buttonColor}`,
//   },
//   optionText: {
//     fontSize: 14,
//     color: "#6B7280",
//   },
//   optionTextActive: {
//     color: colors.buttonColor,
//     fontWeight: "900",
//   },
//   timeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: 12,
//   },
//   timeColumn: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: colors.lightBackground,
//     width: '48%'
//   },
//   timeActive: {
//     backgroundColor: `${colors.buttonColor}20`,
//     borderColor: `${colors.buttonColor}`,
//   },
//   timeIcon: {
//     width: 26,
//     height: 26,
//     marginBottom: 6,
//   },
//   timeText: {
//     fontSize: 13,
//     color: "#6B7280",
//   },
//   timeTextActive: {
//     color: colors.buttonColor,
//     fontWeight: "600",
//   },
//   remindTimeText: {
//     fontSize: 14,
//     color: colors.description,
//   },
// });
