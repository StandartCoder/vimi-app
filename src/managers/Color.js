import StorageManager from './Storage';

const lightTheme = {
	backgroundColor: '#ffffff',
	textColor: '#000000',
};

const darkTheme = {
	backgroundColor: '#111111',
	textColor: '#ffffff',
};

class ColorManager {
	static lightTheme = lightTheme;
	static darkTheme = darkTheme;

	static async getTheme() {
		const mode = await StorageManager.getData('theme');
		return mode === 'dark' ? darkTheme : lightTheme;
	}

	static async setTheme(mode) {
		await StorageManager.saveData('theme', mode);
	}
}

export default ColorManager;