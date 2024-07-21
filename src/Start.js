import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import StorageManager from './managers/Storage';
import ColorManager from './managers/Color';

export default function Start({ navigation }) {
	const [theme, setTheme] = useState(ColorManager.lightTheme);

	useEffect(() => {
		const initialize = async () => {
            //await StorageManager.clearAll();

			const theme = await ColorManager.getTheme();
			setTheme(theme);

			const startedOnce = await StorageManager.getData('startedOnce');

            await new Promise((resolve) => setTimeout(resolve, 750));

			if (startedOnce === null) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Onboarding' }],
				});
			} else {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Home' }],
				});
			}
		};

		initialize();
	}, [navigation]);

	return (
		<View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
			<ActivityIndicator size="large" color={theme.textColor} />
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