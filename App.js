import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './src/Start';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/Home';
import OnboardingScreen from './src/screens/Onboarding';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
				<Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}