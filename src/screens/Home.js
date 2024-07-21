import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StorageManager from '../managers/Storage';
import ColorManager from '../managers/Color';
import TitleBar from '../components/TitleBar';
import { getFormattedDate } from '../utils/Date';

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
			<TitleBar
				title="Für Dich"
				subtitle={getFormattedDate()}
				showBackArrow={false}
				profilePicture="https://i.pinimg.com/736x/a9/8e/a6/a98ea6d4c50d25b68f79f561c176129b.jpg"
				menuItems={[
					{
						title: "Settings",
						icon: "cog",
						onPress: () => console.log("Settings pressed"),
					},
					{
						title: "Logout",
						icon: "logout",
						onPress: () => console.log("Logout pressed"),
					},
				]}
			/>
			<View style={styles.content}>
				<Text style={{ color: theme.textColor }}>Welcome to the Home Screen!</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
	},
});