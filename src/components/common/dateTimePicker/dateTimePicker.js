import React, { useEffect, useState } from "react";
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

export default function CustomDateTimePicker({ onChange }) {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("Anytime");
  const [remind, setRemind] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [customTime, setCustomTime] = useState(null);

  const getRandomFutureTime = (baseDate) => {
    const now = new Date();

    // Start with today's date or selected date
    let randomTime = new Date(baseDate);

    // Generate random hour + minute
    randomTime.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
      0,
      0
    );

    // If random time is already in past → push to next day
    if (randomTime <= now) {
      randomTime.setDate(randomTime.getDate() + 1);
    }

    return randomTime;
  };
  // Time frame configurations with specific hours
  const timeFrames = {
    "Anytime": { hour: 12, minute: 0, label: "12:00 PM" }, // 12 PM
    "Start the day": { hour: 8, minute: 0, label: "8:00 AM" }, // 8 AM
    "Afternoon": { hour: 14, minute: 0, label: "2:00 PM" }, // 2 PM
    "Bedtime": { hour: 21, minute: 0, label: "9:00 PM" }, // 9 PM
  };

  // Function to check if a time frame is in the past for today
  const isTimeFrameInPast = (timeFrame) => {
    if (selectedDate !== "Today") return false; // Only check for today

    const now = new Date();
    const timeConfig = timeFrames[timeFrame];
    const selectedDateTime = new Date();
    selectedDateTime.setHours(timeConfig.hour, timeConfig.minute, 0, 0);
    return selectedDateTime <= now;
  };

  // Function to get the next available time frame for today
  const getNextAvailableTimeFrame = () => {
    const timeFrameKeys = Object.keys(timeFrames);
    const now = new Date();

    for (let timeFrame of timeFrameKeys) {
      const timeConfig = timeFrames[timeFrame];
      const selectedDateTime = new Date();
      selectedDateTime.setHours(timeConfig.hour, timeConfig.minute, 0, 0);

      if (selectedDateTime > now) {
        return timeFrame;
      }
    }
    return "Anytime"; // Default fallback
  };

  useEffect(() => {
    // Create a new date object for today
    let finalDate = new Date();

    // Reset time part to avoid timezone issues
    finalDate.setHours(0, 0, 0, 0);

    // Handle date selection
    if (selectedDate === "Tomorrow") {
      finalDate.setDate(finalDate.getDate() + 1);
    } else if (selectedDate === "On Date" && customDate) {
      finalDate = new Date(customDate);
      finalDate.setHours(0, 0, 0, 0); // Reset time part
    }

    // Auto-adjust selected time if it's in the past for today
    if (selectedDate === "Today" && remind && isTimeFrameInPast(selectedTime)) {
      const nextAvailableTime = getNextAvailableTimeFrame();
      setSelectedTime(nextAvailableTime);
      return; // Skip this effect, let the next one handle it
    }

    // Handle time frame selection
    let finalTime;

    if (selectedTime === "Anytime") {
      finalTime = getRandomFutureTime(finalDate);

    } else {
      const timeConfig = timeFrames[selectedTime];
      finalTime = new Date(finalDate);
      finalTime.setHours(timeConfig.hour, timeConfig.minute, 0, 0);
    }


    const notificationTime = new Date(finalTime);

    // Ensure notification time is in the future
    const now = new Date();
    if (notificationTime <= now) {
      console.log('Notification time is in past, adjusting...');
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    onChange({
      date: finalDate,
      time: finalTime,
      notificationTime: notificationTime,
      reminder: remind,
      selectedTimeFrame: selectedTime,
      timeLabel:
        selectedTime === "Anytime"
          ? finalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : timeFrames[selectedTime]?.label,
    });
  }, [customDate, selectedTime, selectedDate, remind]);

  useEffect(() => {
    if (!customDate || !customTime) return;

    const finalDateTime = new Date(
      customDate.getFullYear(),
      customDate.getMonth(),
      customDate.getDate(),
      customTime.getHours(),
      customTime.getMinutes()
    );

    onChange({
      date: customDate,
      time: customTime,
      notificationTime: finalDateTime,
      reminder: remind,
      selectedTimeFrame: null,
      timeLabel: `${customTime.getHours() % 12 || 12}:${customTime.getMinutes().toString().padStart(2, '0')} ${customTime.getHours() >= 12 ? 'PM' : 'AM'}`,
    });
  }, [customDate, customTime, remind]);


  const handleDateSelection = (item) => {
    setSelectedDate(item);
    if (item === "On Date") {
      setShowDatePicker(true);
    } else {
      setCustomDate(null);
    }
  };

  const handleTimeSelection = (timeFrame) => {
    // Don't allow selection if time is in past for today
    if (selectedDate === "Today" && isTimeFrameInPast(timeFrame)) {
      return;
    }
    setSelectedTime(timeFrame);
  };

  const onDateChange = (event, date) => {
    if (event.type === "set" && date) {
      setShowDatePicker(false);
      setCustomDate(date);

      // Show time picker after picking a date
      setShowTimePicker(true);
      setRemind(true); // enable reminder
    } else {
      setShowDatePicker(false);
      if (selectedDate === "On Date") setSelectedDate("Today");
    }
  };

  const onTimeChange = (event, time) => {
    if (event.type === "set" && time) {
      setShowTimePicker(false);
      setCustomTime(time);
    } else {
      setShowTimePicker(false);
    }
  };



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

        <View style={[styles.timeRow, { opacity: remind ? 1 : 0.5 }]}>
          {[
            { label: "Anytime", icon: require("../../../../assets/png/ask.png") },
            { label: "Start the day", icon: require("../../../../assets/png/sun.png") },
            { label: "Afternoon", icon: require("../../../../assets/png/cloud-sun.png") },
            { label: "Bedtime", icon: require("../../../../assets/png/moon.png") },
          ].map((time) => {
            const isDisabled = !remind || (selectedDate === "Today" && isTimeFrameInPast(time.label));
            const isPast = selectedDate === "Today" && isTimeFrameInPast(time.label);

            return (
              <TouchableOpacity
                key={time.label}
                disabled={isDisabled}
                style={[
                  styles.timeColumn,
                  selectedTime === time.label && styles.timeActive,
                  isPast && styles.timePast,
                ]}
                onPress={() => handleTimeSelection(time.label)}
              >
                <Image
                  source={time.icon}
                  style={[
                    styles.timeIcon,
                    selectedTime === time.label,
                    isPast && styles.timeIconPast,
                  ]}
                />
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time.label && styles.timeTextActive,
                    isPast && styles.timeTextPast,
                  ]}
                >
                  {time.label}
                </Text>
                {isPast && (
                  <Text style={styles.pastLabel}>Past</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Warning message for past times */}
        {selectedDate === "Today" && remind && (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              Times in the past are disabled. Select a future time for today.
            </Text>
          </View>
        )}
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
              {remind && (
                <Text style={styles.remindTimeText}>
                  {timeFrames[selectedTime]?.label} • {selectedTime}
                </Text>
              )}
            </View>
          </View>
          <Switch
            value={remind}
            onValueChange={setRemind}
            thumbColor={remind ? "#60A5FA" : "#f4f3f4"}
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
          />
        </View>

        {remind && (
          <Text style={styles.reminderNote}>
            You'll receive a notification at {timeFrames[selectedTime]?.label}
          </Text>
        )}
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

      {showTimePicker && (
        <DateTimePicker
          value={customTime || new Date()}
          mode="time"
          is24Hour={false}
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
    paddingVertical: 18,
    borderRadius: 10,
    backgroundColor: colors.lightBackground,
    width: "48%",
  },
  timeActive: {
    backgroundColor: `${colors.buttonColor}20`,
    borderColor: `${colors.buttonColor}`,
  },
  timePast: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
    opacity: 0.5,
  },
  timeIcon: {
    width: 26,
    height: 26,
    marginBottom: 6,
  },
  timeIconActive: {
    tintColor: colors.buttonColor,
  },
  timeIconPast: {
    tintColor: "#9CA3AF",
  },
  timeText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  timeTextActive: {
    color: colors.buttonColor,
    fontWeight: "600",
  },
  timeTextPast: {
    color: "#9CA3AF",
    textDecorationLine: 'line-through',
  },
  pastLabel: {
    fontSize: 10,
    color: "#EF4444",
    fontWeight: "600",
    marginTop: 4,
  },
  remindTimeText: {
    fontSize: 14,
    color: colors.description,
  },
  reminderNote: {
    fontSize: 12,
    color: "#60A5FA",
    fontStyle: "italic",
  },
  debugText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
  currentTimeText: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 2,
  },
  warningContainer: {
    backgroundColor: "#FEF3F2",
    padding: 8,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FECACA60",
  },
  warningText: {
    fontSize: 12,
    color: "#DC2626",
  },
});
