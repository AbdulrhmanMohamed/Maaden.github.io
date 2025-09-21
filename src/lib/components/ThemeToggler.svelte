<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Theme state management
	let currentTheme = $state('madeen-light');
	let isDark = $derived(currentTheme === 'madeen-dark');

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[ThemeToggler.svelte] ${message}`, error ? error : '');
	};

	// Initialize theme on mount
	onMount(() => {
		try {
			if (browser) {
				// Check for saved theme in localStorage
				const savedTheme = localStorage.getItem('madeen-theme');
				if (savedTheme && (savedTheme === 'madeen-light' || savedTheme === 'madeen-dark')) {
					currentTheme = savedTheme;
					applyTheme(currentTheme);
					logger(`Theme initialized from localStorage: ${currentTheme}`);
				} else {
					// Default to light theme
					currentTheme = 'madeen-light';
					applyTheme(currentTheme);
					localStorage.setItem('madeen-theme', currentTheme);
					logger('Theme initialized with default light theme');
				}
			}
		} catch (error) {
			logger('Error initializing theme:', error);
			// Fallback to light theme
			currentTheme = 'madeen-light';
			applyTheme(currentTheme);
		}
	});

	// Apply theme to document
	const applyTheme = (theme: string) => {
		try {
			if (browser) {
				document.documentElement.setAttribute('data-theme', theme);
				logger(`Theme applied: ${theme}`);
			}
		} catch (error) {
			logger('Error applying theme:', error);
		}
	};

	// Toggle theme function
	const toggleTheme = () => {
		try {
			const newTheme = currentTheme === 'madeen-light' ? 'madeen-dark' : 'madeen-light';
			currentTheme = newTheme;
			applyTheme(newTheme);
			
			if (browser) {
				localStorage.setItem('madeen-theme', newTheme);
			}
			
			logger(`Theme toggled to: ${newTheme}`);
		} catch (error) {
			logger('Error toggling theme:', error);
		}
	};
</script>

<!-- Theme Toggler Button -->
<button
	onclick={toggleTheme}
	class="btn btn-ghost btn-circle group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
	aria-label="Toggle theme"
	title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
>
	<!-- Sun Icon (Light Theme) -->
	<svg
		class="w-5 h-5 transition-all duration-500 ease-in-out {isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="12" cy="12" r="5" />
		<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
	</svg>

	<!-- Moon Icon (Dark Theme) -->
	<svg
		class="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out {isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>

	<!-- Ripple effect on click -->
	<div class="absolute inset-0 rounded-full bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-200 ease-out"></div>
</button>

<!-- Alternative: Toggle Switch Style -->
<!-- Uncomment this section if you prefer a switch-style toggler -->
<!--
<div class="form-control">
	<label class="label cursor-pointer gap-3">
		<span class="label-text font-medium">Dark Mode</span>
		<input
			type="checkbox"
			class="toggle toggle-primary"
			bind:checked={isDark}
			onchange={toggleTheme}
		/>
	</label>
</div>
-->

<style>
	/* Custom animations for smooth theme transitions */
	:global(html) {
		transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
	}
	
	:global(body) {
		transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
	}
</style>



