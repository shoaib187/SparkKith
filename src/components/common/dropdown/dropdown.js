import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors/colors";

export default function TimeRangeDropdown({ selectedRange, onSelectRange }) {
  const ranges = ['Daily', 'Weekly', 'Monthly'];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={dropdownStyles.container}>
      <TouchableOpacity
        style={dropdownStyles.dropdownHeader}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={dropdownStyles.selectedText}>{selectedRange}</Text>
        <Image source={require("../../../../assets/png/chevron.png")} style={{ width: 20, height: 20, tintColor: colors.description, transform: [{ rotate: isOpen ? "270deg" : "90deg" }] }} />
      </TouchableOpacity>

      {isOpen && (
        <View style={dropdownStyles.dropdownMenu}>
          {ranges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                dropdownStyles.menuItem,
                selectedRange === range && dropdownStyles.menuItemActive,
              ]}
              onPress={() => {
                onSelectRange(range);
                setIsOpen(false);
              }}
            >
              <Text
                style={[
                  dropdownStyles.menuItemText,
                  selectedRange === range && dropdownStyles.menuItemTextActive,
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const dropdownStyles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
    justifyContent: 'space-between',
    gap: 6
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.description
  },
  arrow: {
    fontSize: 10,
    color: '#666',
    marginLeft: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 120,
    overflow: 'hidden',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemActive: {
    backgroundColor: '#FEF6E6',
  },
  menuItemText: {
    fontSize: 14,
    color: '#666',
  },
  menuItemTextActive: {
    color: '#333',
    fontWeight: '600',
  },
});