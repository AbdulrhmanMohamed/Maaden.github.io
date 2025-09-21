import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { locale } from './locale';
import { base } from '$app/paths';

// Logger function for error handling
const logger = (message: string, error?: any) => {
	console.log(`[data.ts] ${message}`, error ? error : '');
};

// Data store interface
interface DataStore {
	home: any | null;
	navigation: any | null;
	services: any | null;
	about: any | null;
	contact: any | null;
	footer: any | null;
	hero: any | null;
}

// Create the data store
function createDataStore() {
	const { subscribe, set, update } = writable<DataStore>({
		home: null,
		navigation: null,
		services: null,
		about: null,
		contact: null,
		footer: null,
		hero: null
	});

	// Load data for a specific type and locale
	const loadData = async (type: keyof DataStore, locale: 'en' | 'ar') => {
		try {
			if (browser) {
				const response = await fetch(`${base}/data/${type}.json`);
				if (response.ok) {
					const jsonData = await response.json();
					const data = jsonData[locale];
					
					update(current => ({
						...current,
						[type]: data
					}));
					
					logger(`${type} data loaded for locale: ${locale}`);
					return data;
				} else {
					throw new Error(`Failed to load ${type} data: ${response.status}`);
				}
			}
		} catch (error) {
			logger(`Error loading ${type} data:`, error);
			return null;
		}
	};

	// Load all data for current locale
	const loadAllData = async (locale: 'en' | 'ar') => {
		try {
		const dataTypes: (keyof DataStore)[] = [
			'home', 'navigation', 'services', 'about', 
			'contact', 'footer', 'hero'
		];

			await Promise.all(
				dataTypes.map(type => loadData(type, locale))
			);
			
			logger(`All data loaded for locale: ${locale}`);
		} catch (error) {
			logger('Error loading all data:', error);
		}
	};

	// Get data for specific type and locale
	const getData = (type: keyof DataStore, locale: 'en' | 'ar') => {
		return new Promise(async (resolve) => {
			try {
				const response = await fetch(`${base}/data/${type}.json`);
				if (response.ok) {
					const jsonData = await response.json();
					resolve(jsonData[locale]);
				} else {
					throw new Error(`Failed to load ${type} data: ${response.status}`);
				}
			} catch (error) {
				logger(`Error getting ${type} data:`, error);
				resolve(null);
			}
		});
	};

	return {
		subscribe,
		loadData,
		loadAllData,
		getData,
		reset: () => set({
			home: null,
			navigation: null,
			services: null,
			about: null,
			contact: null,
			footer: null,
			hero: null
		}),
		resetType: (type: keyof DataStore) => {
			update(current => ({
				...current,
				[type]: null
			}));
		}
	};
}

// Create the store instance
export const dataStore = createDataStore();

// Subscribe to locale changes to reload data
locale.subscribe(currentLocale => {
	if (browser) {
		dataStore.loadAllData(currentLocale);
	}
});