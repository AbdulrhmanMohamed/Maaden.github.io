<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { ThemeTogglerAdvanced, LanguageToggler } from '$lib/components';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';

	// State
	let navData = $state<any>(null);
	let currentLocale = $state('en');
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Navigation.svelte] ${message}`, error ? error : '');
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
			logger('Error in Navigation onMount:', error);
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

	// Handle menu item click
	const handleMenuItemClick = (href: string) => {
		if (href.startsWith('#')) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			// Use SvelteKit's goto for proper routing
			goto(href);
		}
		isMenuOpen = false;
		logger(`Navigated to: ${href}`);
	};

	// Handle CTA click
	const handleCTAClick = () => {
		goto('/contact');
		logger('CTA button clicked');
	};
</script>

{#if navData}
	<!-- Navigation -->
	<nav class="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-base-100/95 backdrop-blur-md shadow-lg' : 'bg-transparent'} w-full">
		<div class="container mx-auto px-4 w-full">
			<div class="navbar-start">
				<!-- Logo -->
				<button onclick={() => goto('/')} class="btn btn-ghost hover:bg-transparent flex items-center">
					<img src="./images/logo.png" alt="Maaden Construction Logo" class="h-8 w-auto" />
					<div class="ml-2 hidden sm:block">
						<span class="text-primary text-lg font-bold">{navData.logo.text}</span>
						<span class="text-base-content ml-1 text-sm">{navData.logo.subtext}</span>
					</div>
				</button>
			</div>

			<!-- Desktop Menu -->
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1 gap-2">
					{#each navData.menu as item}
						<li>
							<button
								onclick={() => handleMenuItemClick(item.href)}
								class="btn btn-ghost font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 {item.active ? 'text-primary bg-primary/10' : 'text-base-content'}"
							>
								{item.label}
							</button>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Desktop Actions -->
			<div class="navbar-end hidden lg:flex items-center gap-2">
				<!-- Language Toggler -->
				<LanguageToggler variant="button" size="sm" />
				
				<!-- Theme Toggler -->
				<ThemeTogglerAdvanced variant="button" size="sm" />
			</div>

			<!-- Mobile Menu Button -->
			<div class="navbar-end lg:hidden">
				<div class="flex items-center gap-2">
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

		<!-- Mobile Menu Overlay -->
		{#if isMenuOpen}
			<div class="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onclick={closeMenu}></div>
		{/if}

		<!-- Mobile Menu -->
		<div class="lg:hidden fixed top-16 left-0 right-0 z-50 bg-base-100 shadow-xl border-t border-base-300 transition-all duration-300 {isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}">
			<div class="container mx-auto px-4 py-6">
				<ul class="menu menu-vertical w-full gap-2">
					{#each navData.menu as item}
						<li>
							<button
								onclick={() => handleMenuItemClick(item.href)}
								class="btn btn-ghost justify-start font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 {item.active ? 'text-primary bg-primary/10' : 'text-base-content'}"
							>
								{item.label}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</nav>
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

	/* Mobile menu animation */
	.mobile-menu {
		transform-origin: top;
	}
</style>
