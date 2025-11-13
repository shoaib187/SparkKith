import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Button from '../../components/common/button/button';
import { FONT_SIZES } from '../../components/constants/sizes/responsiveFont';
import colors from '../../components/constants/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSpark } from '../../utils/spark/api';
import Loading from '../../components/common/loading/loading';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;
const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

const OnboardingScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(1);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);

  useEffect(() => {
    getSparks();
  }, []);

  const getSparks = async () => {
    setLoading(true);
    try {
      const res = await getSpark();

      // Add spacer items to the data for proper carousel functionality
      const sparksWithSpacers = [
        { id: 'left-spacer' }, // Left spacer
        ...res?.sparks || [],
        { id: 'right-spacer' }, // Right spacer
      ];

      setData(sparksWithSpacers);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false)
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
      }
    }
  );

  const handleContinue = async () => {
    // Filter out spacer items and get the actual data items
    const actualDataItems = data.filter(item => item.imageUrl);

    // Find the active item
    const activeItem = actualDataItems[activeIndex - 1]; // -1 to account for left spacer

    if (activeItem) {
      console.log('Selected Active Image:', activeItem);
      navigation.navigate("ContinueWith", { activeItem });
    } else {
      console.log('No active item found');
    }
  };

  // Check if item has image (not a spacer)
  const isSpacerItem = (item) => {
    return item.id === 'left-spacer' || item.id === 'right-spacer' || !item.imageUrl;
  };

  if (loading) {
    return <Loading />
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
          keyExtractor={(item) => item._id || item.id}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          renderItem={({ item, index }) => {
            // Render spacer items
            if (isSpacerItem(item)) {
              return <View style={{ width: SPACER_ITEM_SIZE }} />;
            }

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
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
                    onLoad={() => console.log('Image loaded successfully:', item.imageUrl)}
                  />
                </Animated.View>
              </View>
            );
          }}
        />

        {/* Fixed Text Section */}
        <View style={styles.textWrapper}>
          {data.map((item, index) => {
            if (isSpacerItem(item)) return null;

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
                key={item._id}
                style={[
                  styles.textContainer,
                  { opacity, transform: [{ translateY }] },
                ]}
              >
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View style={{ flexDirection: 'column', marginTop: 100, flex: .3, justifyContent: 'space-between', paddingHorizontal: 14 }}>
        <Image source={require("../../../assets/png/image.png")} style={{ width: 60, height: 60, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' }} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Add background to see if container is visible
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
  textWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
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

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   Image,
// } from 'react-native';
// import Button from '../../components/common/button/button';
// import { FONT_SIZES } from '../../components/constants/sizes/responsiveFont';
// import colors from '../../components/constants/colors/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getSpark } from '../../utils/spark/api';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = width * 0.4;
// const SPACER_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

// // const data = [
// //   { id: 'left-spacer' },
// //   {
// //     id: '1',
// //     image: require("../../../assets/png/twinkle.png"),
// //     title: 'Twinkle',
// //     description: 'Radiant and uplifting.',
// //   },
// //   {
// //     id: '2',
// //     image: require("../../../assets/png/paws.png"),
// //     title: 'Paws',
// //     description: 'Caring and playful.',
// //   },
// //   {
// //     id: '3',
// //     image: require("../../../assets/png/bolt.png"),
// //     title: 'Bolt',
// //     description: 'Rooted and flourishing.',
// //   },
// //   {
// //     id: '4',
// //     image: require("../../../assets/png/willow.png"),
// //     title: 'Willow',
// //     description: 'Energetic & Bold.',
// //   },
// //   { id: 'right-spacer' },
// // ];

// const OnboardingScreen = ({ navigation }) => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [activeIndex, setActiveIndex] = useState(1); // Start with first real item (index 1)
//   const [data, setData] = useState([])
//   console.log("data", data)

//   useEffect(() => {
//     getSparks();
//   }, [])

//   const getSparks = async () => {
//     try {
//       const res = await getSpark();
//       setData(res?.sparks)
//       console.log("res", res)
//     } catch (error) {
//       console.log("error", error)
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
//     const actualDataItems = data.filter(item => item.imageUrl);

//     // Find the active item
//     const activeItem = actualDataItems.find((item, index) => {
//       // Map the actual data index back to the original data array index
//       const originalIndex = data.findIndex(dataItem => dataItem._id === item._id);
//       return originalIndex === activeIndex;
//     });

//     if (activeItem) {
//       console.log('Selected Active Image:', activeItem._imageUrl);
//       // await AsyncStorage.setItem('userToken', "dummyToken");
//       navigation.navigate("Community", { activeItem })
//     } else {
//       console.log('No active item found');
//     }
//   };

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
//             if (!item.imageUrl) return <View style={{ width: SPACER_ITEM_SIZE }} />;

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
//                   <Image source={{ uri: encodeURI(item?.imageUrl) }} style={styles.image} />
//                 </Animated.View>
//               </View>
//             );
//           }}
//         />
//         {/* Fixed Text Section */}
//         <View style={styles.textWrapper}>
//           {data.map((item, index) => {
//             if (!item.name) return null;

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
//                 key={item._id}
//                 style={[
//                   styles.textContainer,
//                   { opacity, transform: [{ translateY }] },
//                 ]}
//               >
//                 <Text style={styles.title}>{item?.name}</Text>
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
