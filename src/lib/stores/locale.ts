import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Logger function for error handling
const logger = (message: string, error?: any) => {
	console.log(`[locale.ts] ${message}`, error ? error : '');
};

// Create the locale store
function createLocaleStore() {
	const { subscribe, set, update } = writable<'en' | 'ar'>('en');

	return {
		subscribe,
		set: (locale: 'en' | 'ar') => {
			try {
				if (browser) {
					localStorage.setItem('madeen-language', locale);
					// Update document attributes
					document.documentElement.setAttribute('lang', locale);
					document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
					
					// Update URL parameter to match the locale
					const url = new URL(window.location.href);
					url.searchParams.set('lang', locale);
					window.history.replaceState({}, '', url.toString());
					
					logger(`Locale set to: ${locale}`);
				}
				set(locale);
			} catch (error) {
				logger('Error setting locale:', error);
			}
		},
		init: () => {
			try {
				if (browser) {
					// Check localStorage first (user's previous choice)
					const savedLocale = localStorage.getItem('madeen-language');
					const urlParams = new URLSearchParams(window.location.search);
					const urlLang = urlParams.get('lang');
					
					let finalLocale: 'en' | 'ar' = 'en'; // Default
					
					if (savedLocale && (savedLocale === 'en' || savedLocale === 'ar')) {
						// Use stored preference
						finalLocale = savedLocale as 'en' | 'ar';
						logger(`Locale initialized from localStorage: ${savedLocale}`);
					} else if (urlLang && (urlLang === 'en' || urlLang === 'ar')) {
						// Fallback to URL parameter
						finalLocale = urlLang as 'en' | 'ar';
						localStorage.setItem('madeen-language', urlLang);
						logger(`Locale initialized from URL parameter: ${urlLang}`);
					} else {
						// Default to English
						finalLocale = 'en';
						localStorage.setItem('madeen-language', 'en');
						logger('Locale initialized with default English');
					}
					
					// Set the final locale
					set(finalLocale);
					document.documentElement.setAttribute('lang', finalLocale);
					document.documentElement.setAttribute('dir', finalLocale === 'ar' ? 'rtl' : 'ltr');
					
					// Update URL to match the chosen locale
					const url = new URL(window.location.href);
					url.searchParams.set('lang', finalLocale);
					window.history.replaceState({}, '', url.toString());
				}
			} catch (error) {
				logger('Error initializing locale:', error);
				set('en');
			}
		},
		toggle: () => {
			update(current => {
				const newLocale = current === 'en' ? 'ar' : 'en';
				try {
					if (browser) {
						localStorage.setItem('madeen-language', newLocale);
						// Update document attributes
						document.documentElement.setAttribute('lang', newLocale);
						document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
						
						// Update URL parameter to match the new locale
						const url = new URL(window.location.href);
						url.searchParams.set('lang', newLocale);
						window.history.replaceState({}, '', url.toString());
						
						logger(`Locale toggled to: ${newLocale}`);
					}
				} catch (error) {
					logger('Error toggling locale:', error);
				}
				return newLocale;
			});
		}
	};
}

// Create the store instance
export const locale = createLocaleStore();

// Derived store for RTL direction
export const isRTL = writable(false);

// Subscribe to locale changes to update RTL
locale.subscribe(currentLocale => {
	isRTL.set(currentLocale === 'ar');
});
