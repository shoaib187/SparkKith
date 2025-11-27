import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
import { getSpark } from '../../../utils/spark/api';
import Button from '../../../components/common/button/button';
import Loading from '../../../components/common/loading/loading';
import colors from '../../../components/constants/colors/colors';

const Community = ({ navigation, route }) => {
  const { activeItem, userInfo } = route?.params || {};
  const [community, setCommunity] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("community", activeItem, userInfo)

  useEffect(() => {
    getcommunities();
  }, []);

  const getcommunities = async () => {
    try {
      setLoading(true);
      const res = await getSpark();
      setCommunity(res?.sparks || []);
      console.log("res", res);
    } catch (error) {
      console.log("error ", error);
      // Fallback to kithData if API fails
      ToastAndroid.show("Failed to load communities, using default data.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelected(id);
    const selectedCommunity = community?.find((item) => item?._id === id || item?.id === id);
    setChosen(selectedCommunity);
  };

  const handleContinue = async () => {
    if (!chosen) return;

    console.log('Selected Kith:', chosen);
    navigation.navigate("Register", {
      activeItem,
      chosen,
      userInfo
    });
  };

  if (loading) {
    return <Loading />
  }

  // Fallback to kithData if community is empty
  const displayData = community.length > 0 ? community : [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Choose Your Kith!</Text>
      <Text style={styles.subHeading}>
        The Kith you choose becomes your tribe on this journey. The tasks you complete fuels your community and helps it rise on the leaderboard.
      </Text>
      <Text style={[styles.subHeading, { marginTop: 8 }]}>
        Choose the one that feels right for you. More ways to explore other communities coming soon…
      </Text>

      {/* Cards */}
      <View style={styles.grid}>
        {displayData?.map((item) => {
          const isSelected = selected === (item?._id);
          return (
            <TouchableOpacity
              key={item._id}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => handleSelect(item._id)}
              activeOpacity={0.8}
            >
              {isSelected && <View style={styles.badge} />}
              <Image
                source={{ uri: item?.imageUrl || item?.image }}
                style={styles.image}
                onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
              />
              <Text style={styles.cardTitle}>{item?.name || item?.title}</Text>
              <Text style={styles.cardSubtitle}>"{item?.description || item?.subtitle}"</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Continue Button */}
      <Button style={{ position: 'absolute', bottom: 40, width: '100%', alignSelf: 'center' }} disabled={!selected} title='Continue' onPress={handleContinue} />
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subHeading: {
    fontSize: FONT_SIZES.sm,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  grid: {
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'relative',
  },
  selectedCard: {
    borderColor: colors.buttonColor,
    borderWidth: 2,
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.md,
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: colors.description,
    fontSize: FONT_SIZES.sm,
    marginTop: 2,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: '#f4b400',
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FONT_SIZES.md,
  },
});

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import { FONT_SIZES } from '../../../components/constants/sizes/responsiveFont';
// import { getSpark } from '../../../utils/spark/api';
// import Button from '../../../components/common/button/button';
// import Loading from '../../../components/common/loading/loading';

// const kithData = [
//   {
//     id: '1',
//     title: 'Zen Den',
//     subtitle: 'Grow & Flourish',
//     image: 'https://img.icons8.com/emoji/96/deciduous-tree.png',
//   },
//   {
//     id: '2',
//     title: 'Glow Getters',
//     subtitle: 'Fuel your fire',
//     image: 'https://img.icons8.com/emoji/96/fire.png',
//   },
//   {
//     id: '3',
//     title: 'Vibe Tribe',
//     subtitle: 'Lift each other',
//     image: 'https://img.icons8.com/emoji/96/person-raising-hand.png',
//   },
//   {
//     id: '4',
//     title: 'Joy Squad',
//     subtitle: 'Spark your joy',
//     image: 'https://img.icons8.com/emoji/96/sun.png',
//   },
// ];

// const Community = ({ navigation, route }) => {
//   const { activeItem } = route?.params || {};
//   const [community, setCommunity] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [chosen, setChosen] = useState(null);
//   const [loading, setLoading] = useState(false);

//   console.log("community", activeItem)

//   useEffect(() => {
//     getcommunities();
//   }, []);

//   const getcommunities = async () => {
//     try {
//       setLoading(true);
//       const res = await getSpark();
//       setCommunity(res?.sparks || []);
//       console.log("res", res);
//     } catch (error) {
//       console.log("error ", error);
//       // Fallback to kithData if API fails
//       setCommunity(kithData);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (id) => {
//     setSelected(id);
//     const selectedCommunity = community?.find((item) => item?._id === id || item?.id === id);
//     setChosen(selectedCommunity);
//   };

//   const handleContinue = async () => {
//     if (!chosen) return;

//     console.log('Selected Kith:', chosen);
//     navigation.navigate("ContinueWith", {
//       activeItem,
//       chosen
//     });
//   };

//   if (loading) {
//     return <Loading />
//   }

//   // Fallback to kithData if community is empty
//   const displayData = community.length > 0 ? community : kithData;

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.heading}>Choose Your Kith!</Text>
//       <Text style={styles.subHeading}>
//         The Kith you choose becomes your tribe on this journey. The tasks you complete fuels your community and helps it rise on the leaderboard.
//       </Text>
//       <Text style={[styles.subHeading, { marginTop: 8 }]}>
//         Choose the one that feels right for you. More ways to explore other communities coming soon…
//       </Text>

//       {/* Cards */}
//       <View style={styles.grid}>
//         {displayData.map((item) => {
//           const isSelected = selected === (item._id || item.id);
//           return (
//             <TouchableOpacity
//               key={item._id || item.id}
//               style={[styles.card, isSelected && styles.selectedCard]}
//               onPress={() => handleSelect(item._id || item.id)}
//               activeOpacity={0.8}
//             >
//               {isSelected && <View style={styles.badge} />}
//               <Image
//                 source={{ uri: item?.imageUrl || item?.image }}
//                 style={styles.image}
//                 onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
//               />
//               <Text style={styles.cardTitle}>{item?.name || item?.title}</Text>
//               <Text style={styles.cardSubtitle}>"{item?.description || item?.subtitle}"</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Continue Button */}
//       <Button disabled={!selected} title='"Continue' onPress={handleContinue} />
//     </View>
//   );
// };

// export default Community;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F4EC',
//     paddingHorizontal: 20,
//     paddingTop: 80,
//   },
//   heading: {
//     fontSize: FONT_SIZES.xl,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//   },
//   subHeading: {
//     fontSize: FONT_SIZES.sm,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 6,
//     lineHeight: 20,
//   },
//   grid: {
//     marginTop: 40,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: '47%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     alignItems: 'center',
//     paddingVertical: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#eee',
//     position: 'relative',
//   },
//   selectedCard: {
//     borderColor: '#3B82F6',
//     borderWidth: 2,
//   },
//   image: {
//     width: 48,
//     height: 48,
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: FONT_SIZES.md,
//     color: '#333',
//     textAlign: 'center',
//   },
//   cardSubtitle: {
//     color: '#999',
//     fontSize: FONT_SIZES.sm,
//     marginTop: 2,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   badge: {
//     position: 'absolute',
//     top: 6,
//     right: 6,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#f4b400',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 40,
//     alignSelf: 'center',
//     width: '90%',
//     paddingVertical: 16,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: FONT_SIZES.md,
//   },
// });