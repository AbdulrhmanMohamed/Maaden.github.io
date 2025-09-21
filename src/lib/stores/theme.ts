import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'madeen-light' | 'madeen-dark';

// Writable store for the current theme
const createThemeStore = () => {
	const { subscribe, set, update } = writable<Theme>('madeen-light'); // Default to light theme

	return {
		subscribe,
		set: (newTheme: Theme) => {
			if (browser) {
				localStorage.setItem('madeen-theme', newTheme);
				document.documentElement.setAttribute('data-theme', newTheme);
				document.documentElement.className = `theme-${newTheme}`;
			}
			set(newTheme);
		},
		update,
		// Initialize theme from localStorage or set default
		init: () => {
			if (browser) {
				const savedTheme = localStorage.getItem('madeen-theme') as Theme;
				if (savedTheme && (savedTheme === 'madeen-light' || savedTheme === 'madeen-dark')) {
					set(savedTheme);
					document.documentElement.setAttribute('data-theme', savedTheme);
					document.documentElement.className = `theme-${savedTheme}`;
				} else {
					set('madeen-light'); // Default if no saved theme
					document.documentElement.setAttribute('data-theme', 'madeen-light');
					document.documentElement.className = 'theme-madeen-light';
				}
			}
		},
		// Toggle between light and dark themes
		toggle: () => {
			update(currentTheme => {
				const newTheme = currentTheme === 'madeen-light' ? 'madeen-dark' : 'madeen-light';
				if (browser) {
					localStorage.setItem('madeen-theme', newTheme);
					document.documentElement.setAttribute('data-theme', newTheme);
					document.documentElement.className = `theme-${newTheme}`;
				}
				return newTheme;
			});
		}
	};
};

export const theme = createThemeStore();



