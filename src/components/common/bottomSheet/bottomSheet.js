import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, ScrollView } from 'react-native';
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
        <View style={styles.sheetContent}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {children}
          </ScrollView>
        </View>
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
    justifyContent: 'center',
    maxHeight: 500,
    paddingVertical: 20
  },
});
