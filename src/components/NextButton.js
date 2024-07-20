import React, { useEffect, useRef, useState } from "react";
import {View, StyleSheet, Animated} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default NextButton = ({precentage, scrollTo}) => {
    const size = 128;
    const stokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - stokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);
    const [icon, setIcon] = useState("arrowright");

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animation(precentage);

        if (precentage === 100) {
            setIcon("check");
        } else {
            setIcon("arrowright");
        }
    }, [precentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;

            if(progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                })
            }
        }, [precentage]);
        
        return () => {
            progressAnimation.removeAllListeners();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} fill='white'>
                <G rotation="-90" origin={center}>
                    <Circle stroke="#cccccc" cx={center} cy={center} r={radius} strokeWidth={stokeWidth}
                    />
                    <Circle
                        ref={progressRef}
                        stroke="#004B8D"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={stokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                <AntDesign name={icon} size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#004B8D',
        borderRadius: 100,
        padding: 20,
    }
})