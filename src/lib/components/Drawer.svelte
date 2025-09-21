<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { locale, isRTL } from '$lib/stores/locale';
	import { theme } from '$lib/stores/theme';
	import LanguageToggler from './LanguageToggler.svelte';
	import ThemeTogglerAdvanced from './ThemeTogglerAdvanced.svelte';

	// Props
	let { 
		isOpen = $bindable(false),
		navData = null,
		onClose = () => {},
		onMenuItemClick = (href: string) => {},
		onCTAClick = () => {}
	} = $props();

	// State
	let currentLocale = $state('en');
	let currentRTL = $state(false);
	let isAnimating = $state(false);

	// Subscribe to RTL store
	isRTL.subscribe(value => {
		currentRTL = value;
	});

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Drawer.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to stores
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Add language parameter to href
	const addLanguageParam = (href: string) => {
		if (href.startsWith('#')) {
			return href; // Don't modify anchor links
		}
		
		const url = new URL(href, window.location.origin);
		url.searchParams.set('lang', currentLocale);
		return url.pathname + url.search;
	};

	// Check if a menu item is active based on current path
	const isActiveMenuItem = (href: string) => {
		const currentPath = window.location.pathname;
		
		// Handle home page
		if (href === '/' && currentPath === '/') {
			return true;
		}
		
		// Handle other pages
		if (href !== '/' && currentPath.startsWith(href)) {
			return true;
		}
		
		return false;
	};

	// Handle drawer close
	const handleClose = () => {
		try {
			isAnimating = true;
			setTimeout(() => {
				isOpen = false;
				isAnimating = false;
				onClose();
			}, 300);
			logger('Drawer closed');
		} catch (error) {
			logger('Error closing drawer:', error);
		}
	};

	// Handle menu item click
	const handleMenuItemClick = (href: string) => {
		try {
			handleClose();
			onMenuItemClick(href);
			logger('Menu item clicked:', href);
		} catch (error) {
			logger('Error handling menu item click:', error);
		}
	};

	// Handle CTA click
	const handleCTAClick = () => {
		try {
			handleClose();
			onCTAClick();
			logger('CTA clicked');
		} catch (error) {
			logger('Error handling CTA click:', error);
		}
	};

	// Handle escape key to close drawer
	const handleEscapeKey = (event: KeyboardEvent) => {
		try {
			if (event.key === 'Escape' && isOpen) {
				handleClose();
			}
		} catch (error) {
			logger('Error handling escape key:', error);
		}
	};


	// Handle click outside to close
	const handleClickOutside = (event: MouseEvent) => {
		try {
			const drawer = document.querySelector('[data-drawer="true"]');
			if (drawer && !drawer.contains(event.target as Node)) {
				handleClose();
			}
		} catch (error) {
			logger('Error handling click outside:', error);
		}
	};

	// Initialize on mount
	onMount(() => {
		try {
			// Add escape key listener
			document.addEventListener('keydown', handleEscapeKey);
			
			// Add click outside listener when drawer is open
			if (isOpen) {
				document.addEventListener('click', handleClickOutside);
			}
			
			// Cleanup
			return () => {
				document.removeEventListener('keydown', handleEscapeKey);
				document.removeEventListener('click', handleClickOutside);
			};
		} catch (error) {
			logger('Error initializing drawer:', error);
		}
	});
</script>

{#if navData}
	<!-- No overlay - drawer opens without darkening the background -->

	<!-- Drawer Content -->
	<div 
		class=" fixed inset-y-0 z-50 w-80 max-w-[85vw] shadow-2xl transform transition-transform duration-300 ease-in-out {currentRTL ? 'left-0' : 'right-0'} {isOpen ? 'translate-x-0' : currentRTL ? '-translate-x-full' : 'translate-x-full'}"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		data-drawer="true"
		
	>
		<!-- Drawer Header -->
		<div class="flex items-center justify-between p-6 border-b border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
			<!-- Logo -->
			<a href={addLanguageParam('/')} onclick={() => handleMenuItemClick('/')} class="flex items-center {currentRTL ? 'flex-row-reverse' : ''} hover:opacity-80 transition-opacity duration-300 cursor-pointer">
				<img src="./images/logo.png" alt="Maaden Construction Logo" class="w-10 h-10 rounded-lg object-contain {currentRTL ? 'ml-3' : 'mr-3'}" />
				<div class="{currentRTL ? 'text-right' : 'text-left'}">
					<h2 class="text-xl font-bold text-primary">{navData.logo.text}</h2>
					<p class="text-sm text-base-content/70">{navData.logo.subtext}</p>
				</div>
			</a>

			<!-- Close Button -->
			<button
				onclick={handleClose}
				class="btn btn-ghost btn-circle hover:bg-error/10 hover:text-error transition-all duration-300"
				aria-label="Close navigation menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Drawer Body -->
		<div class="flex flex-col h-full">
			<!-- Navigation Links -->
			<nav class="flex-1 p-6 space-y-2">
				<div class="mb-6">
					<h3 class="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-4">
						Navigation
					</h3>
					<div class="space-y-1">
						{#each navData.menu as item}
							<a
								href={addLanguageParam(item.href)}
								onclick={() => handleMenuItemClick(item.href)}
								class="flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 group {isActiveMenuItem(item.href) ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-base-content hover:bg-primary/10 hover:text-primary'} {currentRTL ? 'flex-row-reverse' : ''}"
							>
								<div class="flex items-center flex-1 {currentRTL ? 'flex-row-reverse' : ''}">
									<div class="w-2 h-2 rounded-full bg-primary/30 {currentRTL ? 'ml-3' : 'mr-3'} group-hover:bg-primary transition-colors duration-300"></div>
									<span>{item.label}</span>
								</div>
								{#if isActiveMenuItem(item.href)}
									<div class="w-2 h-2 rounded-full bg-primary"></div>
								{/if}
							</a>
						{/each}
					</div>
				</div>

			</nav>

			<!-- Drawer Footer -->
			<div class="p-6 border-t border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
				<!-- CTA Button -->
				<button
					onclick={handleCTAClick}
					class="btn btn-primary w-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mb-4 {currentRTL ? 'flex-row-reverse' : ''}"
				>
					{navData.cta.text}
					<svg class="w-4 h-4 {currentRTL ? 'mr-2' : 'ml-2'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</button>

				<!-- Contact Info -->
				<div class="text-center text-sm text-base-content/60">
					<p>Need help? Contact us anytime</p>
					<p class="font-semibold text-primary mt-1">+1 (555) 123-4567</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Force solid background for drawer */
	:global([data-drawer="true"]) {
		background-color: var(--color-base-100) !important;
		opacity: 1 !important;
		backdrop-filter: none !important;
	}

	/* Custom scrollbar for drawer */
	:global(.drawer-content) {
		scrollbar-width: thin;
		scrollbar-color: var(--color-primary) var(--color-base-200);
	}

	:global(.drawer-content::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.drawer-content::-webkit-scrollbar-track) {
		background: var(--color-base-200);
		border-radius: 3px;
	}

	:global(.drawer-content::-webkit-scrollbar-thumb) {
		background: var(--color-primary);
		border-radius: 3px;
	}

	:global(.drawer-content::-webkit-scrollbar-thumb:hover) {
		background: var(--color-primary-focus);
	}
</style>
