import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const InputField = ({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
  showError = true,
  wrapperStyle,
  multiline,
  textAlignVertical,
  editable = true,
  leftIcon, // <- image icon support
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isEmailField = keyboardType === 'email-address';
  const isPasswordField = secureTextEntry;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
  const isInvalidPassword =
    isPasswordField && value && !passwordRegex.test(value);

  const isInvalidEmail =
    isEmailField && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputField,
          wrapperStyle,
          {
            borderColor: isInvalidEmail ? 'red' : '#EAECF0',
          },
        ]}>

        {/* LEFT ICON IMAGE */}
        {leftIcon && (
          <Image source={leftIcon} style={styles.leftIcon} resizeMode="contain" />
        )}

        <TextInput
          value={value}
          multiline={multiline}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPasswordField && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          textAlignVertical={textAlignVertical}
          style={[styles.input, { opacity: editable ? 1 : 0.5 }]}
          editable={editable}
        />

        {/* PASSWORD EYE TOGGLE */}
        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Image source={require("../../../../assets/icons/show.png")} style={styles.leftIcon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

      {/* EMAIL ERROR */}
      {showError && isInvalidEmail && (
        <Text style={styles.errorText}>Email not correct</Text>
      )}

      {/* PASSWORD ERROR */}
      {showError && isInvalidPassword && (
        <Text style={styles.errorText}>
          Use 01 Uppercase, 01 Special Character & 01 Number
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 8,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 6,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EAECF0',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#EDE8E2',
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#6B7280',
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;


// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';


// const { width } = Dimensions.get('window');

// const InputField = ({
//   label,
//   placeholder,
//   secureTextEntry = false,
//   value,
//   onChangeText,
//   keyboardType = 'default',
//   autoCapitalize = 'none',
//   showError = true,
//   wrapperStyle,
//   multiline,
//   textAlignVertical,
//   editable
// }) => {
//   const isEmailField = keyboardType === 'email-address';
//   const isPasswordField = label?.toLowerCase().includes('password');
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
//   const isInvalidPassword =
//     isPasswordField && value && !passwordRegex.test(value);

//   const isInvalidEmail =
//     isEmailField && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

//   return (
//     <View style={styles.inputWrapper}>
//       {label && <Text style={styles.label}>{label}</Text>}
//       <View
//         style={[
//           styles.inputField,
//           wrapperStyle,
//           {
//             // borderWidth: isInvalidEmail ? 1 : 0,
//             borderColor: isInvalidEmail ? 'red' : '#EAECF0',
//           },
//         ]}>
//         <TextInput
//           value={value}
//           multiline={multiline}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           placeholderTextColor="#9CA3AF"
//           secureTextEntry={secureTextEntry}
//           keyboardType={keyboardType}
//           autoCapitalize={autoCapitalize}
//           textAlignVertical={textAlignVertical}
//           style={[styles.input, { opacity: editable ? 1 : .5 }]}
//           editable={editable}
//         />
//       </View>
//       {showError && isInvalidEmail && (
//         <Text
//           style={[
//             styles.errorText,
//             { opacity: isInvalidEmail && showError ? 1 : 0 },
//           ]}>
//           Email not correct
//         </Text>
//       )}
//       {showError && isInvalidPassword && (
//         <Text style={styles.errorText}>
//           Use 01 Uppercase, 01 Special Character & 01 Number
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputWrapper: {
//     marginBottom: 8,
//     position: 'relative',
//   },
//   label: {
//     fontSize: 14,
//     color: '#111827',
//     marginBottom: 6,

//   },
//   inputField: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#EAECF0',
//     borderWidth: 1,
//     borderRadius: 8,
//     height: 50,
//     paddingHorizontal: width * 0.03,
//     justifyContent: 'space-between',
//     backgroundColor: '#EDE8E2'
//   },
//   input: {
//     flex: 1,
//     fontSize: 14,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

// export default InputField;
