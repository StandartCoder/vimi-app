import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ColorManager from '../managers/Color';

const TitleBar = ({ title, subtitle, showBackArrow, profilePicture, menuItems }) => {
	const navigation = useNavigation();
	const [theme, setTheme] = React.useState(ColorManager.lightTheme);

	React.useEffect(() => {
		const initialize = async () => {
			const theme = await ColorManager.getTheme();
			setTheme(theme);
		};

		initialize();
	}, []);

	return (
		<MenuProvider>
			<View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
				<View style={styles.row}>
					{showBackArrow && (
						<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
							<Icon name="arrow-left" size={24} color={theme.textColor} />
						</TouchableOpacity>
					)}
					<View style={styles.textContainer}>
						{subtitle && <Text style={[styles.subtitle, { color: "#aaa" }]}>{subtitle}</Text>}
						<Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
					</View>
					<Menu>
						<MenuTrigger>
							<Image source={{ uri: profilePicture }} style={styles.profilePicture} onError={(e) => console.log(e.nativeEvent.error)} />
						</MenuTrigger>
						<MenuOptions customStyles={optionsStyles}>
							{menuItems.map((item, index) => (
								<MenuOption key={index} onSelect={item.onPress} style={styles.menuOption}>
									<View style={styles.menuItem}>
										<Icon name={item.icon} size={20} color={theme.textColor} />
										<Text style={[styles.menuText, { color: theme.textColor }]}>{item.title}</Text>
									</View>
								</MenuOption>
							))}
						</MenuOptions>
					</Menu>
				</View>
			</View>
		</MenuProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 70,
		paddingHorizontal: 20,
		zIndex: 1000,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	subtitle: {
		fontSize: 14,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	backArrow: {
		marginRight: 10,
	},
	profileContainer: {
		paddingLeft: 10,
	},
	profilePicture: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	menuOption: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuText: {
		marginLeft: 10,
		fontSize: 16,
	},
});

const optionsStyles = {
	optionsContainer: {
		borderRadius: 10,
		padding: 5,
		backgroundColor: '#333',
	},
	optionsWrapper: {
		backgroundColor: '#333',
	},
	optionWrapper: {
		backgroundColor: '#333',
		margin: 5,
	},
	optionTouchable: {
		underlayColor: '#555',
		activeOpacity: 70,
	},
	optionText: {
		color: '#fff',
	},
};

export default TitleBar;