<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';

	// Props for customization
	interface Props {
		variant?: 'button' | 'switch' | 'dropdown' | 'floating';
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
	}

	let {
		variant = 'button',
		size = 'md',
		showLabel = false,
		position = 'top-right'
	}: Props = $props();

	// Theme state management
	let currentTheme = $state('madeen-light');
	let isDark = $derived(currentTheme === 'madeen-dark');
	let isOpen = $state(false);

	// Subscribe to theme store
	theme.subscribe(value => {
		currentTheme = value;
	});

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[ThemeTogglerAdvanced.svelte] ${message}`, error ? error : '');
	};

	// Size classes
	const sizeClasses = {
		sm: 'w-8 h-8 text-sm',
		md: 'w-10 h-10 text-base',
		lg: 'w-12 h-12 text-lg'
	};

	// Position classes
	const positionClasses = {
		'top-right': 'top-4 right-4',
		'top-left': 'top-4 left-4',
		'bottom-right': 'bottom-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
	};

	// Initialize theme on mount
	onMount(() => {
		try {
			theme.init();
			logger('Theme initialized:', currentTheme);
		} catch (error) {
			logger('Error initializing theme:', error);
		}
	});


	// Toggle theme function
	const toggleTheme = () => {
		try {
			theme.toggle();
			logger('Theme toggled to:', currentTheme);
		} catch (error) {
			logger('Error toggling theme:', error);
		}
	};

	// Set specific theme
	const setTheme = (newTheme: 'madeen-light' | 'madeen-dark') => {
		try {
			theme.set(newTheme);
			isOpen = false;
			logger(`Theme set to: ${newTheme}`);
		} catch (error) {
			logger('Error setting theme:', error);
		}
	};
</script>

<!-- Button Variant -->
{#if variant === 'button'}
	<button
		onclick={toggleTheme}
		class="btn btn-ghost btn-circle group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 {sizeClasses[size]}"
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

		<!-- Ripple effect -->
		<div class="absolute inset-0 rounded-full bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-200 ease-out"></div>
	</button>
{/if}

<!-- Switch Variant -->
{#if variant === 'switch'}
	<div class="form-control">
		<label class="label cursor-pointer gap-3">
			{#if showLabel}
				<span class="label-text font-medium">Dark Mode</span>
			{/if}
			<input
				type="checkbox"
				class="toggle toggle-primary"
				bind:checked={isDark}
				onchange={toggleTheme}
			/>
		</label>
	</div>
{/if}

<!-- Dropdown Variant -->
{#if variant === 'dropdown'}
	<div class="dropdown dropdown-end">
		<button
			class="btn btn-ghost btn-circle {sizeClasses[size]}"
			aria-label="Theme selector"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
		</button>
		<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border">
			<li>
				<button
					onclick={() => setTheme('madeen-light')}
					class="flex items-center gap-3 {currentTheme === 'madeen-light' ? 'active' : ''}"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
					</svg>
					<span>Light Theme</span>
				</button>
			</li>
			<li>
				<button
					onclick={() => setTheme('madeen-dark')}
					class="flex items-center gap-3 {currentTheme === 'madeen-dark' ? 'active' : ''}"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
					<span>Dark Theme</span>
				</button>
			</li>
		</ul>
	</div>
{/if}

<!-- Floating Variant -->
{#if variant === 'floating'}
	<div class="fixed {positionClasses[position]} z-50">
		<div class="tooltip tooltip-left" data-tip={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
			<button
				onclick={toggleTheme}
				class="btn btn-primary btn-circle shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 {sizeClasses[size]}"
				aria-label="Toggle theme"
			>
				<svg
					class="w-5 h-5 transition-all duration-500 ease-in-out {isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<circle cx="12" cy="12" r="5" />
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
				</svg>
				<svg
					class="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out {isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	/* Custom animations for smooth theme transitions */
	:global(html) {
		transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
	}
	
	:global(body) {
		transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
	}
</style>
