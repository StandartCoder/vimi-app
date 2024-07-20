import AsyncStorage from '@react-native-async-storage/async-storage';
import IANotifyManager from './IANotify';

class StorageManager {
	static async saveData(key, value) {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			IANotifyManager.showError('Error saving data: ', error);
		}
	}

	static async getData(key) {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				return JSON.parse(value);
			}
		} catch (error) {
			IANotifyManager.showError('Error getting data: ', error);
		}
		return null;
	}

	static async removeData(key) {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			IANotifyManager.showError('Error removing data: ', error);
		}
	}

	static async clearAll() {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			IANotifyManager.showError('Error clearing data: ', error);
		}
	}
}

export default StorageManager;