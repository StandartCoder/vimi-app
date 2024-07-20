import { showMessage } from 'react-native-flash-message';

const IANotifyManager = {
	showSuccess: (message, description = '') => {
		showMessage({
			message,
			description,
			type: 'success',
			icon: 'success',
		});
	},

	showError: (message, description = '') => {
		showMessage({
			message,
			description,
			type: 'danger',
			icon: 'danger',
		});
	},

	showInfo: (message, description = '') => {
		showMessage({
			message,
			description,
			type: 'info',
			icon: 'info',
		});
	},

	showWarning: (message, description = '') => {
		showMessage({
			message,
			description,
			type: 'warning',
			icon: 'warning',
		});
	},
};

export default IANotifyManager;