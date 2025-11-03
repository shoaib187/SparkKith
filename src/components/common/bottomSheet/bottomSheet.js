import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import IconButton from '../iconbutton/iconButton';

const { height } = Dimensions.get('window');

export default function BottomSheet({ visible, onClose, children }) {
  const backdropAnim = React.useRef(new Animated.Value(0)).current;
  const sheetAnim = React.useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(sheetAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(sheetAnim, {
          toValue: height,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible && backdropAnim.__getValue() === 0) return null;

  return (
    <View style={styles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [
              {
                translateY: sheetAnim.interpolate({
                  inputRange: [0, height],
                  outputRange: [0, height],
                }),
              },
            ],
          },
        ]}
      >
        <View style={{ width: 60, height: 4, backgroundColor: '#ddd', top: 15, zIndex: 10, alignSelf: 'center', borderRadius: 30 }} />
        <IconButton
          onPress={onClose}
          iconSrc={require("../../../../assets/png/add.png")}
          style={{
            position: "absolute", zIndex: 11,
            right: 10,
            top: 16,
            transform: [{ rotate: "45deg" }]
          }}
        />
        <View style={styles.sheetContent}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheetContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  sheetContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
  },
});

// import React, { useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableWithoutFeedback,
//   Animated,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';

// const { height } = Dimensions.get('window');

// export default function CustomBottomSheet({ visible, onClose, children }) {
//   const slideAnim = useRef(new Animated.Value(height)).current; // Slide up
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Fade backdrop

//   useEffect(() => {
//     if (visible) {
//       Animated.parallel([
//         Animated.timing(slideAnim, {
//           toValue: 0,
//           duration: 450, // smoother duration
//           useNativeDriver: true,
//         }),
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       Animated.parallel([
//         Animated.timing(slideAnim, {
//           toValue: height,
//           duration: 450,
//           useNativeDriver: true,
//         }),
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 400,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     }
//   }, [visible]);

//   return (
//     <View
//       style={styles.wrapper}
//       pointerEvents={visible ? 'auto' : 'none'}
//     >
//       {/* Background overlay */}
//       <TouchableWithoutFeedback onPress={onClose}>
//         <Animated.View
//           style={[
//             styles.overlay,
//             { opacity: fadeAnim },
//           ]}
//         />
//       </TouchableWithoutFeedback>

//       {/* Bottom sheet */}
//       <Animated.View
//         style={[
//           styles.sheet,
//           {
//             transform: [{ translateY: slideAnim }],
//           },
//         ]}
//       >
//         {/* Small handle */}
//         <View style={styles.handle} />

//         {/* Content */}
//         {children || (
//           <>
//             <Text style={styles.title}>Bottom Sheet</Text>
//             <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     zIndex: 9999, // ✅ Ensures it stays on top of bottom tabs
//     elevation: Platform.OS === 'android' ? 20 : 0,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   sheet: {
//     height: height * 0.45,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     padding: 20,
//     elevation: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   handle: {
//     width: 60,
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: '#ccc',
//     alignSelf: 'center',
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   closeBtn: {
//     marginTop: 20,
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   closeText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });
