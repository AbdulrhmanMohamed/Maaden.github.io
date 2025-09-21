<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ThemeTogglerAdvanced, LanguageToggler, Drawer } from '$lib/components';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';
	// State
	let navData = $state<any>(null);
	let currentLocale = $state('en');
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Header.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Subscribe to navigation data
	dataStore.subscribe(store => {
		navData = store.navigation;
	});

	// Load navigation data
	onMount(() => {
		try {
			// Handle scroll effect
			if (browser) {
				const handleScroll = () => {
					isScrolled = window.scrollY > 50;
				};
				window.addEventListener('scroll', handleScroll);
				return () => window.removeEventListener('scroll', handleScroll);
			}
		} catch (error) {
			logger('Error in Header onMount:', error);
		}
	});

	// Menu toggle
	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
		logger(`Menu ${isMenuOpen ? 'opened' : 'closed'}`);
	};

	// Close menu when clicking outside
	const closeMenu = () => {
		isMenuOpen = false;
	};

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
		const currentPath = $page.url.pathname;
		
		// Debug logging
		logger(`Checking active menu item: href="${href}", currentPath="${currentPath}"`);
		
		// Handle home page
		if (href === '/' && currentPath === '/') {
			logger(`Home page active: ${href} === ${currentPath}`);
			return true;
		}
		
		// Handle other pages
		if (href !== '/' && currentPath.startsWith(href)) {
			logger(`Page active: ${currentPath} starts with ${href}`);
			return true;
		}
		
		logger(`No active match for: ${href}`);
		return false;
	};

	// Handle menu item click
	const handleMenuItemClick = (href: string) => {
		if (href.startsWith('#')) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			// For page navigation, use SvelteKit's goto for SPA navigation
			const urlWithLang = addLanguageParam(href);
			goto(urlWithLang);
		}
		isMenuOpen = false;
		logger(`Navigated to: ${href}`);
	};

	// Handle CTA click
	const handleCTAClick = () => {
		const element = document.querySelector('#contact');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		logger('CTA button clicked');
	};
</script>

{#if navData}
	<!-- Header -->
	<header class="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-base-100/95 backdrop-blur-md shadow-lg' : 'bg-transparent'} w-full">
		<div class="container mx-auto px-4 w-full">
			<div class="flex items-center justify-between w-full">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<a href={addLanguageParam('/')} class="btn btn-ghost hover:bg-transparent group flex items-center" onclick={() => handleMenuItemClick('/')}>
						<img src="./images/logo.png" alt="Maaden Construction Logo" class="h-10 w-auto group-hover:scale-110 transition-transform duration-300" />
						<div class="ml-3 hidden sm:block">
							<span class="text-primary group-hover:scale-110 transition-transform duration-300 text-xl font-bold">{navData.logo.text}</span>
							<span class="text-base-content ml-1 group-hover:text-primary transition-colors duration-300 text-sm">{navData.logo.subtext}</span>
						</div>
					</a>
				</div>

				<!-- Desktop Menu -->
				<nav class="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center max-w-2xl">
					{#each navData.menu as item}
						<a
							href={addLanguageParam(item.href)}
							onclick={() => handleMenuItemClick(item.href)}
							class="relative px-3 xl:px-4 py-2 rounded-lg font-medium transition-all duration-300 group {isActiveMenuItem(item.href) ? 'text-primary bg-primary/10' : 'text-base-content hover:bg-primary/10 hover:text-primary'}"
						>
							{item.label}
							<!-- Hover indicator -->
							<span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4"></span>
						</a>
					{/each}
				</nav>

				<!-- Desktop Actions -->
				<div class="hidden lg:flex items-center gap-2 flex-shrink-0">
					<!-- Language Toggler -->
					<LanguageToggler variant="button" size="sm" />
					
					<!-- Theme Toggler -->
					<ThemeTogglerAdvanced variant="button" size="sm" />
				</div>

				<!-- Mobile Menu Button -->
				<div class="lg:hidden flex items-center gap-2">
					<!-- Language Toggler for Mobile -->
					<LanguageToggler variant="button" size="sm" />
					
					<!-- Theme Toggler for Mobile -->
					<ThemeTogglerAdvanced variant="button" size="sm" />
					
					<!-- Menu Toggle -->
					<button
						onclick={toggleMenu}
						class="btn btn-ghost btn-square"
						aria-label={isMenuOpen ? navData.mobile.closeText : navData.mobile.openText}
					>
						{#if isMenuOpen}
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Drawer -->
		<Drawer 
			bind:isOpen={isMenuOpen}
			{navData}
			onClose={closeMenu}
			onMenuItemClick={handleMenuItemClick}
			onCTAClick={handleCTAClick}
		/>
	</header>
{/if}

<style>
	/* RTL Support */
	:global([dir="rtl"]) .navbar-start {
		order: 3;
	}

	:global([dir="rtl"]) .navbar-center {
		order: 2;
	}

	:global([dir="rtl"]) .navbar-end {
		order: 1;
	}

	:global([dir="rtl"]) .menu-horizontal {
		flex-direction: row-reverse;
	}

	:global([dir="rtl"]) .btn-ghost {
		text-align: right;
	}

	/* Smooth transitions */
	.navbar {
		backdrop-filter: blur(10px);
	}

</style>
