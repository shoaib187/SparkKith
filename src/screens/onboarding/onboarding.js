import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { FONT_SIZES } from '../../components/constants/sizes/responsiveFont';
import { colors } from '../../components/constants/colors/colors';
import Button from '../../components/button/button';


const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

const data = [
  { id: 'left-spacer' },
  {
    id: '1',
    image: 'https://picsum.photos/400/600?random=1',
    title: 'Discover the World',
    description: 'Explore new places and experiences with ease.',
  },
  {
    id: '2',
    image: 'https://picsum.photos/400/600?random=2',
    title: 'Connect Effortlessly',
    description: 'Stay in touch with the people who matter most.',
  },
  {
    id: '3',
    image: 'https://picsum.photos/400/600?random=3',
    title: 'Achieve More',
    description: 'Boost your productivity and reach your goals faster.',
  },
  { id: 'right-spacer' },
];

const OnboardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.upperTitle}>Choose your Spark</Text>
        <Text style={styles.uppderDes}>Pick an avatar that resonates with you</Text>
      </View>
      {/* Carousel */}
      <View style={{ flex: .6 }}>
        <Animated.FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            if (!item.image) return <View style={{ width: SPACER_ITEM_SIZE }} />;

            const inputRange = [
              (index - 2) * ITEM_WIDTH,
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1.4, 0.7],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            return (
              <View style={{ width: ITEM_WIDTH, alignItems: 'center' }}>
                <Animated.View
                  style={[styles.imageContainer, { transform: [{ scale }], opacity }]}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </Animated.View>
              </View>
            );
          }}
        />
        {/* Fixed Text Section */}
        <View style={styles.textWrapper}>
          {data.map((item, index) => {
            if (!item.title) return null;

            const inputRange = [
              (index - 2) * ITEM_WIDTH,
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
            ];

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [20, 0, -20],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.textContainer,
                  { opacity, transform: [{ translateY }] },
                ]}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View style={{ flexDirection: 'column', marginTop: 100, paddingHorizontal: 14 }}>
        <Image source={require("../../../assets/png/image1.jpeg")} style={{ width: 60, height: 60, alignSelf: 'center', marginBottom: 20 }} />
        <Button title={"Continue"} />
      </View>

    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingVertical: 14,
    // backgroundColor: "gold",
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    width: ITEM_WIDTH * 0.7,
    height: ITEM_WIDTH * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginTop: 8,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  upperTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "900"
  },
  uppderDes: {
    fontSize: FONT_SIZES.md,
  }
});
