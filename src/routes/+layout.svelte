<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header, Footer } from '$lib/components';
	import { onMount } from 'svelte';
	import { locale, isRTL } from '$lib/stores/locale';
	import { theme } from '$lib/stores/theme';

	let { children } = $props();
	let currentLocale = $state('en');
	let currentRTL = $state(false);
	let currentTheme = $state('madeen-light');

	// Subscribe to stores
	locale.subscribe(value => {
		currentLocale = value;
	});

	isRTL.subscribe(value => {
		currentRTL = value;
	});

	theme.subscribe(value => {
		currentTheme = value;
		// Apply theme to HTML element
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', value);
			document.documentElement.className = `theme-${value}`;
		}
	});

	// Initialize stores
	onMount(() => {
		// Initialize theme first
		theme.init();
		
		// Initialize locale (handles URL parameters and localStorage internally)
		locale.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-base-100 text-base-content transition-colors duration-300 overflow-x-hidden" lang={currentLocale} dir={currentRTL ? 'rtl' : 'ltr'}>
	<!-- Header -->
	<Header />
	
	<!-- Main Content with Diamond Pattern Background -->
	<main class="relative w-full overflow-x-hidden">
		<!-- Diamond Pattern Background - Only on main content -->
		<div class="absolute inset-0 pointer-events-none opacity-[0.02]" style="background-image: url('data:image/svg+xml,%3Csvg%20width%3D%22160%22%20height%3D%22160%22%20viewBox%3D%220%200%20160%20160%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22steel-grid%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22160%22%20height%3D%22160%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3C!--%20Steel%20Beam%20Grid%20Pattern%20--%3E%3C!--%20Vertical%20I-beams%20--%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%228%22%20height%3D%22160%22%20fill%3D%22%23D4AF37%22%20fill-opacity%3D%220.3%22/%3E%3Crect%20x%3D%2276%22%20y%3D%220%22%20width%3D%228%22%20height%3D%22160%22%20fill%3D%22%23D4AF37%22%20fill-opacity%3D%220.3%22/%3E%3Crect%20x%3D%22152%22%20y%3D%220%22%20width%3D%228%22%20height%3D%22160%22%20fill%3D%22%23D4AF37%22%20fill-opacity%3D%220.3%22/%3E%3C!--%20Horizontal%20beams%20--%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22160%22%20height%3D%228%22%20fill%3D%22%23D4AF37%22%20fill-opacity%3D%220.3%22/%3E%3Crect%20x%3D%220%22%20y%3D%2276%22%20width%3D%22160%22%20height%3D%228%22%20fill%3D%22%23D4AF37%22%20fill-opacity%3D%220.3%22/%3E%3Crect%20x%3D%220%22%20y%3D%22152%22%20width%3D%22160%22%20height%3D%228%22%20fill%3D%22%23D4AF37%22%20fill-opacity%3D%220.3%22/%3E%3C!--%20Cross%20bracing%20--%3E%3Cpath%20d%3D%22M0%200L160%20160M160%200L0%20160%22%20stroke%3D%22%23D4AF37%22%20stroke-width%3D%222%22%20stroke-opacity%3D%220.2%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22160%22%20height%3D%22160%22%20fill%3D%22url(%23steel-grid)%22/%3E%3C/svg%3E'); background-size: 160px 160px; background-position: 0 0;"></div>
		
		<!-- Content -->
		<div class="relative z-10 w-full">
			{@render children?.()}
		</div>
	</main>
	
	<!-- Footer -->
	<Footer />
</div>
