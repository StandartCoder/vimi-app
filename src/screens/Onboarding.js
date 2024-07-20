import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
} from "react-native";

import OnboardingItem from "../components/OnboardingItem";
import NextButton from "../components/NextButton";
import Slides from "../configs/Slides";

import StorageManager from "../managers/Storage";


const OnboardingScreen = ({ navigation }) => {
    const slidesRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
      }).current;
    
      const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    
      const scrollTo = async () => {
        if (currentIndex < Slides.length - 1) {
          slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            await StorageManager.saveData("startedOnce", true);

            await navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        }
      };

  return (
    <View style={styles.container}>
    <View style={{ flex: 3, paddingTop: 50 }}>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </View>

    <NextButton
      scrollTo={scrollTo}
      precentage={(currentIndex + 1) * (100 / Slides.length)}
    />
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContent: {
      height: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
    },
    description: {
      fontSize: 14,
      textAlign: "center",
      marginTop: 10,
      marginBottom: 20,
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#ccc",
      padding: 10,
      width: "80%",
      marginTop: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
      marginTop: 20,
    },
    button: {
      backgroundColor: "#004B8D",
      padding: 10,
      borderRadius: 5,
      width: "40%",
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
  });

export default OnboardingScreen;