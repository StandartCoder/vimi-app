import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StorageManager from '../managers/Storage';
import ColorManager from '../managers/Color';

export default function HomeScreen() {
	const [theme, setTheme] = useState(ColorManager.lightTheme);

	useEffect(() => {
		const initialize = async () => {
			const theme = await ColorManager.getTheme();
			setTheme(theme);
		};

		initialize();
	}, []);

	return (
		<View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
			<Text style={{ color: theme.textColor }}>Welcome to the Home Screen!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});