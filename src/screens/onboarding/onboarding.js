import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';
import Button from '../../components/common/button/button';
import { FONT_SIZES } from '../../components/constants/sizes/responsiveFont';
import colors from '../../components/constants/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../utils/api';
import Loading from '../../components/common/loading/loading';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

// Default emoji for each avatar title (fallback if API doesn't provide emoji)
const DEFAULT_EMOJIS = {
  'Twinkle': '✨',
  'Paws': '🐾',
  'Willow': '🌿',
  'Bolt': '⚡',
  'Chirpy': '🐦',
  'Flare': '🔥',
  'Bliss': '😊',
};

const OnboardingScreen = ({ navigation, route }) => {
  const userInfo = route?.params?.userInfo ?? null;
  const [data, setData] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState('✨'); // Default emoji

  useEffect(() => {
    getAvatars();
  }, []);

  const getAvatars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/avatar/get-all`);
      const fetched = res?.data?.data;

      const formatted = [
        { id: "left-spacer" },
        ...fetched.map(item => ({
          id: item._id,
          image: item.image,
          title: item.title,
          description: item.description,
          emoji: item.emoji || DEFAULT_EMOJIS[item.title] || '✨' // Use API emoji or fallback
        })),
        { id: "right-spacer" }
      ];

      setData(formatted);
      // Set initial emoji based on first real item
      if (formatted.length > 2) {
        setActiveEmoji(formatted[1]?.emoji || '✨');
      }
    } catch (error) {
      console.log("error ", error);
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH) + 1; // +1 to account for left spacer
        setActiveIndex(index);

        // Update active emoji when index changes
        if (data[index] && data[index].emoji) {
          setActiveEmoji(data[index].emoji);
        }
      }
    }
  );

  const handleContinue = async () => {
    // Filter out spacer items and get the actual data items
    const actualDataItems = data.filter(item => item.image);

    // Find the active item
    const activeItem = actualDataItems.find((item, index) => {
      // Map the actual data index back to the original data array index
      const originalIndex = data.findIndex(dataItem => dataItem.id === item.id);
      return originalIndex === activeIndex;
    });

    if (activeItem) {
      console.log('Selected Active Image:', activeItem.image);
      await AsyncStorage.setItem('userToken', "dummyToken");
      navigation.navigate("Community", { activeItem, userInfo })
    } else {
      console.log('No active item found');
    }
  };

  if (loading) {
    return <Loading />;
  }

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
          keyExtractor={(item) => item.id} // Changed from item._id to item.id
          bounces={false}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          scrollEventThrottle={16}
          onScroll={handleScroll}
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
                  <Image source={{ uri: item?.image }} style={styles.image} key={index} />
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
                key={item?.id} // Changed from item._id to item.id
                style={[
                  styles.textContainer,
                  { opacity, transform: [{ translateY }] },
                ]}
              >
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.description}>{item?.description}</Text>
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View style={{ flexDirection: 'column', marginTop: 100, flex: .3, justifyContent: 'space-between', paddingHorizontal: 14 }}>
        {/* Dynamic Emoji Display */}
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiText}>{activeEmoji}</Text>
        </View>

        <Button title={"Continue"} onPress={handleContinue} />
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
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    width: ITEM_WIDTH * 0.7,
    height: ITEM_WIDTH * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
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
  },
  emojiContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 50, // Adjust size as needed
    textAlign: 'center',
  }
});


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Image,
//   ToastAndroid,
// } from 'react-native';
// import Button from '../../components/common/button/button';
// import { FONT_SIZES } from '../../components/constants/sizes/responsiveFont';
// import colors from '../../components/constants/colors/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { baseUrl } from '../../utils/api';
// import Loading from '../../components/common/loading/loading';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = width * 0.4;
// const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

// const OnboardingScreen = ({ navigation, route }) => {
//   const userInfo = route?.params?.userInfo ?? null;
//   // console.log("params", userInfo)
//   const [data, setData] = useState([])
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [activeIndex, setActiveIndex] = useState(1); // Start with first real item (index 1)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     getAvatars()
//   }, [])

//   const getAvatars = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/api/avatar/get-all`);
//       const fetched = res?.data?.data;
//       console.log(fetched)

//       const formatted = [
//         { id: "left-spacer" },
//         ...fetched.map(item => ({
//           id: item._id,
//           image: item.image,
//           title: item.title,
//           description: item.description
//         })),
//         { id: "right-spacer" }
//       ];

//       setData(formatted);
//     } catch (error) {
//       console.log("error ", error);
//       ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
//     } finally {
//       setLoading(false);
//     }
//   }


//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     {
//       useNativeDriver: true,
//       listener: (event) => {
//         const offsetX = event.nativeEvent.contentOffset.x;
//         const index = Math.round(offsetX / ITEM_WIDTH) + 1; // +1 to account for left spacer
//         setActiveIndex(index);
//       }
//     }
//   );

//   const handleContinue = async () => {
//     // Filter out spacer items and get the actual data items
//     const actualDataItems = data.filter(item => item.image);

//     // Find the active item
//     const activeItem = actualDataItems.find((item, index) => {
//       // Map the actual data index back to the original data array index
//       const originalIndex = data.findIndex(dataItem => dataItem.id === item.id);
//       return originalIndex === activeIndex;
//     });

//     if (activeItem) {
//       console.log('Selected Active Image:', activeItem.image);
//       await AsyncStorage.setItem('userToken', "dummyToken");
//       navigation.navigate("Community", { activeItem, userInfo })
//     } else {
//       console.log('No active item found');
//     }
//   };

//   if (loading) {
//     return <Loading />
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContent}>
//         <Text style={styles.upperTitle}>Choose your Spark</Text>
//         <Text style={styles.uppderDes}>Pick an avatar that resonates with you</Text>
//       </View>
//       {/* Carousel */}
//       <View style={{ flex: .6 }}>
//         <Animated.FlatList
//           data={data}
//           horizontal
//           keyExtractor={(item) => item._id}
//           bounces={false}
//           decelerationRate="fast"
//           snapToInterval={ITEM_WIDTH}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ alignItems: 'center' }}
//           scrollEventThrottle={16}
//           onScroll={handleScroll}
//           renderItem={({ item, index }) => {
//             // console.log(item)
//             if (!item.image) return <View style={{ width: SPACER_ITEM_SIZE }} />;

//             const inputRange = [
//               (index - 2) * ITEM_WIDTH,
//               (index - 1) * ITEM_WIDTH,
//               index * ITEM_WIDTH,
//             ];

//             const scale = scrollX.interpolate({
//               inputRange,
//               outputRange: [0.7, 1.4, 0.7],
//               extrapolate: 'clamp',
//             });

//             const opacity = scrollX.interpolate({
//               inputRange,
//               outputRange: [0.5, 1, 0.5],
//               extrapolate: 'clamp',
//             });

//             return (
//               <View style={{ width: ITEM_WIDTH, alignItems: 'center' }}>
//                 <Animated.View
//                   style={[styles.imageContainer, { transform: [{ scale }], opacity }]}
//                 >
//                   <Image source={{ uri: item?.image }} style={styles.image} key={index} />
//                 </Animated.View>
//               </View>
//             );
//           }}
//         />
//         {/* Fixed Text Section */}
//         <View style={styles.textWrapper}>
//           {data.map((item, index) => {
//             if (!item.title) return null;

//             const inputRange = [
//               (index - 2) * ITEM_WIDTH,
//               (index - 1) * ITEM_WIDTH,
//               index * ITEM_WIDTH,
//             ];

//             const opacity = scrollX.interpolate({
//               inputRange,
//               outputRange: [0, 1, 0],
//               extrapolate: 'clamp',
//             });

//             const translateY = scrollX.interpolate({
//               inputRange,
//               outputRange: [20, 0, -20],
//               extrapolate: 'clamp',
//             });

//             return (
//               <Animated.View
//                 key={item?._id}
//                 style={[
//                   styles.textContainer,
//                   { opacity, transform: [{ translateY }] },
//                 ]}
//               >
//                 <Text style={styles.title}>{item?.title}</Text>
//                 <Text style={styles.description}>{item?.description}</Text>
//               </Animated.View>
//             );
//           })}
//         </View>
//       </View>

//       <View style={{ flexDirection: 'column', marginTop: 100, flex: .3, justifyContent: 'space-between', paddingHorizontal: 14 }}>
//         <Image source={require("../../../assets/png/image.png")} style={{ width: 60, height: 60, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' }} />
//         <Button title={"Continue"} onPress={handleContinue} />
//       </View>
//     </View>
//   );
// };

// export default OnboardingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bgColor,
//     paddingVertical: 14,
//     justifyContent: 'space-evenly'
//   },
//   imageContainer: {
//     width: ITEM_WIDTH * 0.7,
//     height: ITEM_WIDTH * 0.9,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   image: {
//     // width: '100%',
//     // height: '100%',
//     width: 100,
//     height: 100,
//     resizeMode: 'contain'
//   },
//   textWrapper: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   textContainer: {
//     position: 'absolute',
//     alignItems: 'center',
//     width: '80%',
//   },
//   title: {
//     fontSize: FONT_SIZES.xl,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: FONT_SIZES.md,
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   headerContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%'
//   },
//   upperTitle: {
//     fontSize: FONT_SIZES.xl,
//     fontWeight: "900"
//   },
//   uppderDes: {
//     fontSize: FONT_SIZES.md,
//   }
// });
