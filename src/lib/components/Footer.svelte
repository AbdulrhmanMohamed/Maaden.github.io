<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';

	// State
	let footerData = $state<any>(null);
	let currentLocale = $state('en');

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Footer.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Subscribe to footer data
	dataStore.subscribe(store => {
		footerData = store.footer;
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

	// Handle link click
	const handleLinkClick = (href: string) => {
		if (href.startsWith('#')) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			// For page navigation, use SvelteKit's goto for SPA navigation with base path
			const fullPath = base + href;
			const urlWithLang = addLanguageParam(fullPath);
			goto(urlWithLang);
		}
		logger(`Footer link clicked: ${href}`);
	};

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		logger('Scrolled to top');
	};
</script>

{#if footerData}
	<!-- Compact Footer -->
	<footer class="relative overflow-hidden bg-construction-card w-full">
		<!-- Main Footer Content -->
		<div class="container mx-auto px-4 py-6 w-full">
			<!-- Company Brand Section -->
			<div class="text-center mb-8">
				<div class="flex items-center justify-center mb-4">
					<img src="./images/logo.png" alt="Maaden Construction Logo" class="h-12 w-auto mr-3" />
					<div>
						<h3 class="text-2xl font-bold">
							<span class="text-primary">{footerData.company.logo.text}</span>
							<span class="text-base-content ml-1">{footerData.company.logo.subtext}</span>
						</h3>
					</div>
				</div>
				<p class="text-sm text-base-content/70 max-w-lg mx-auto">
					{footerData.company.description}
				</p>
			</div>

			<!-- Main Footer Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
				<!-- Contact Information -->
				<div class="lg:col-span-1">
					<h4 class="text-lg font-bold text-primary mb-4">Contact Us</h4>
					<div class="space-y-2">
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span class="text-sm text-base-content/70">{footerData.contact.address}</span>
						</div>
						
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
							<span class="text-sm text-base-content/70">{footerData.contact.phone}</span>
						</div>
						
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							<span class="text-sm text-base-content/70">{footerData.contact.email}</span>
						</div>
						
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="text-sm text-base-content/70">{footerData.contact.hours}</span>
						</div>
					</div>
				</div>

				<!-- Services Links -->
				<div>
					<h4 class="text-lg font-bold text-primary mb-3">{footerData.links.services.title}</h4>
					<ul class="space-y-1">
						{#each footerData.links.services.items as item}
							<li>
								<button
									onclick={() => handleLinkClick(item.href)}
									class="text-sm text-base-content/70 hover:text-primary transition-colors duration-300 text-left"
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Company Links -->
				<div>
					<h4 class="text-lg font-bold text-primary mb-3">{footerData.links.company.title}</h4>
					<ul class="space-y-1">
						{#each footerData.links.company.items as item}
							<li>
								<button
									onclick={() => handleLinkClick(item.href)}
									class="text-sm text-base-content/70 hover:text-primary transition-colors duration-300 text-left"
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Projects Links -->
				<div>
					<h4 class="text-lg font-bold text-primary mb-3">{footerData.links.projects.title}</h4>
					<ul class="space-y-1">
						{#each footerData.links.projects.items as item}
							<li>
								<button
									onclick={() => handleLinkClick(item.href)}
									class="text-sm text-base-content/70 hover:text-primary transition-colors duration-300 text-left"
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Social Media Section -->
			<div class="text-center mb-6">
				<h4 class="text-lg font-bold text-primary mb-4">{footerData.social.title}</h4>
				<div class="flex justify-center gap-4">
					{#each footerData.social.links as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-content transition-all duration-300"
							title={link.name}
						>
							<svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
								{#if link.icon === 'facebook'}
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								{:else if link.icon === 'linkedin'}
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
								{:else if link.icon === 'instagram'}
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
								{:else if link.icon === 'twitter'}
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
								{/if}
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Bottom Bar -->
			<div class="border-t border-base-300 pt-4">
				<div class="flex flex-col md:flex-row justify-between items-center gap-4">
					<!-- Copyright -->
					<div class="text-xs text-base-content/60">
						{footerData.legal.copyright}
					</div>
					
					<!-- Legal Links -->
					<div class="flex gap-6">
						<button class="text-xs text-base-content/60 hover:text-primary transition-colors duration-300 hover:underline">
							{footerData.legal.privacy}
						</button>
						<button class="text-xs text-base-content/60 hover:text-primary transition-colors duration-300 hover:underline">
							{footerData.legal.terms}
						</button>
						<button class="text-xs text-base-content/60 hover:text-primary transition-colors duration-300 hover:underline">
							{footerData.legal.cookies}
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Scroll to Top Button -->
		<div class="fixed bottom-6 right-6 z-40">
			<button
				onclick={scrollToTop}
				class="btn btn-primary btn-circle shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
				aria-label="Scroll to top"
				title="Scroll to top"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
				</svg>
			</button>
		</div>
	</footer>
{/if}

<style>
	/* RTL Support */
	:global([dir="rtl"]) .footer-center {
		text-align: right;
	}

	:global([dir="rtl"]) .flex {
		flex-direction: row-reverse;
	}

	:global([dir="rtl"]) .ml-1 {
		margin-left: 0;
		margin-right: 0.25rem;
	}

	:global([dir="rtl"]) .gap-3 {
		flex-direction: row-reverse;
	}

	:global([dir="rtl"]) .gap-4 {
		flex-direction: row-reverse;
	}

	:global([dir="rtl"]) .gap-6 {
		flex-direction: row-reverse;
	}

	/* Smooth transitions */
	.link {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.btn {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
