<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// Props from page data
	let { data } = $props<{ data: { contactData: any } }>();

	// State
	let pageData = $state<any>(null);
	let currentLocale = $state<'en' | 'ar'>('en');
	let openFAQs = $state<Set<number>>(new Set());

	// Animation refs
	let heroElement = $state<HTMLElement>();
	let contactInfoElement = $state<HTMLElement>();
	let formElement = $state<HTMLElement>();
	let faqElement = $state<HTMLElement>();
	let mapElement = $state<HTMLElement>();

	// Logger function
	const logger = (message: string, error?: any) => {
		console.log(`[Contact.svelte] ${message}`, error ? error : '');
	};

	// FAQ toggle function with GSAP animation
	const toggleFAQ = (index: number) => {
		const newOpenFAQs = new Set(openFAQs);
		const isCurrentlyOpen = newOpenFAQs.has(index);
		
		if (isCurrentlyOpen) {
			newOpenFAQs.delete(index);
		} else {
			newOpenFAQs.add(index);
		}
		
		openFAQs = newOpenFAQs;
		
		// Animate the content with GSAP
		const contentElement = document.getElementById(`faq-content-${index}`);
		if (contentElement) {
			if (isCurrentlyOpen) {
				// Closing animation
				gsap.to(contentElement, {
					height: 0,
					duration: 0.3,
					ease: "power2.inOut",
					onComplete: () => {
						contentElement.style.maxHeight = '0px';
					}
				});
			} else {
				// Opening animation
				contentElement.style.maxHeight = 'none';
				const height = contentElement.scrollHeight;
				contentElement.style.maxHeight = '0px';
				
				gsap.fromTo(contentElement, 
					{ height: 0, opacity: 0 },
					{ 
						height: height,
						opacity: 1,
						duration: 0.4,
						ease: "power2.out",
						onComplete: () => {
							contentElement.style.maxHeight = '200px';
						}
					}
				);
			}
		}
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
		// Load data when locale changes
		dataStore.loadData('contact', value);
	});

	// Subscribe to contact data
	dataStore.subscribe(store => {
		pageData = store.contact;
	});

	// Also set pageData from page loader data
	$effect(() => {
		if (data.contactData) {
			pageData = data.contactData;
		}
	});

	// Initialize scroll animations
	const initScrollAnimations = () => {
		if (!pageData) return;

		try {
			// Hero section animation
			if (heroElement) {
				gsap.fromTo(heroElement.querySelector('.hero-content'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: heroElement,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// Contact info section animation
			if (contactInfoElement) {
				gsap.fromTo(contactInfoElement.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: contactInfoElement,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(contactInfoElement.querySelectorAll('.grid > div'), 
					{ opacity: 0, y: 80, scale: 0.8 }, 
					{ 
						opacity: 1, 
						y: 0, 
						scale: 1, 
						duration: 0.8, 
						stagger: 0.15,
						ease: "power3.out",
						scrollTrigger: {
							trigger: contactInfoElement,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// Form section animation
			if (formElement) {
				gsap.fromTo(formElement, 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: formElement,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// FAQ section animation
			if (faqElement) {
				gsap.fromTo(faqElement.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: faqElement,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(faqElement.querySelectorAll('.faq-item'), 
					{ opacity: 0, y: 80, scale: 0.9 }, 
					{ 
						opacity: 1, 
						y: 0, 
						scale: 1, 
						duration: 0.8, 
						stagger: 0.1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: faqElement,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// Floating animation for background elements
				const topElement = faqElement.querySelector('.absolute.top-0.right-0');
				if (topElement) {
					gsap.to(topElement, {
						y: -20,
						duration: 4,
						ease: "power2.inOut",
						repeat: -1,
						yoyo: true
					});
				}

				const bottomElement = faqElement.querySelector('.absolute.bottom-0.left-0');
				if (bottomElement) {
					gsap.to(bottomElement, {
						y: 20,
						duration: 5,
						ease: "power2.inOut",
						repeat: -1,
						yoyo: true
					});
				}
			}

			// Map section animation
			if (mapElement) {
				gsap.fromTo(mapElement, 
					{ opacity: 0, scale: 0.9 }, 
					{ 
						opacity: 1, 
						scale: 1, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: mapElement,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}
		} catch (error) {
			logger('Error initializing scroll animations:', error);
		}
	};

	onMount(async () => {
		// Reset pageData to ensure fresh start
		pageData = null;
		
		// Reset contact data in store to ensure fresh load
		dataStore.resetType('contact');
		
		// Load contact data fresh
		await dataStore.loadData('contact', currentLocale);
		
		// Also ensure we have the page loader data
		if (data.contactData) {
			pageData = data.contactData;
		}
		
		if (pageData) {
			initScrollAnimations();
		}
	});

	$effect(() => {
		if (pageData) {
			initScrollAnimations();
		}
	});

	// Debug logging
	$effect(() => {
		console.log('Contact page data:', data);
		console.log('Contact pageData:', pageData);
		console.log('Contact pageData type:', pageData?.hero?.title);
	});
</script>

<svelte:head>
	{#if pageData?.seo}
		<title>{pageData.seo.title}</title>
		<meta name="description" content={pageData.seo.description} />
		<meta name="keywords" content={pageData.seo.keywords} />
	{:else}
		<title>Contact Us - Madeen Construction</title>
		<meta name="description" content="Get in touch with Madeen Construction for your next project. Contact us for consultations, quotes, and expert construction services." />
	{/if}
</svelte:head>

{#if pageData}
	<!-- Hero Section -->
	<section bind:this={heroElement} class="hero h-screen relative overflow-hidden bg-gradient-to-br from-base-100 via-primary/3 to-secondary/5 pt-16 md:pt-20">
		<!-- Premium Background Elements -->
		<div class="absolute inset-0">
			<!-- Luxury Gradient Overlays -->
			<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
			<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl"></div>
		</div>

		<div class="hero-content text-center relative z-10 container mx-auto px-4 py-8 md:py-12">
			<div class="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto">
				<!-- Premium Badge -->
				<div class="inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-8">
					<div class="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
					<span class="text-sm font-semibold text-primary tracking-wide uppercase">
						{pageData.hero?.subtitle || 'Contact Us Today'}
					</span>
				</div>

				<!-- Main Title with Premium Typography -->
				<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-black mb-8 leading-[0.9] tracking-tight break-words">
					<span class="block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
						{(pageData.hero?.title || 'Get In Touch').split(' ')[0]}
					</span>
					<span class="block text-base-content/90 font-light">
						{(pageData.hero?.title || 'Get In Touch').split(' ').slice(1).join(' ')}
					</span>
				</h1>

				<!-- Description with Enhanced Typography -->
				<p class="text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-base-content/70 mb-16 max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto leading-relaxed font-light tracking-wide">
					{pageData.hero?.description || 'Ready to start your next construction project? Contact us today for a consultation and let\'s build something amazing together.'}
				</p>
			</div>
		</div>
	</section>

	<!-- Contact Information -->
	<section bind:this={contactInfoElement} class="py-20 bg-construction-section section-divider">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">
					{pageData.contactInfo?.title || 'Contact Information'}
				</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">
					{pageData.contactInfo?.subtitle || 'We\'re Here to Help'}
				</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.contactInfo?.description || 'We\'re here to help you with your construction needs. Reach out to us through any of these channels.'}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each pageData.contactInfo?.items || [] as item}
					<div class="card bg-construction-card card-elevated hover-lift group">
						<div class="card-body text-center p-8">
							<div class="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<div class="text-4xl">{item.icon}</div>
							</div>
							<h3 class="card-title text-xl font-bold text-primary mb-4 justify-center group-hover:text-secondary transition-colors duration-300">
								{item.title}
							</h3>
							<p class="text-base-content/80 mb-6 leading-relaxed text-lg">
								{item.content}
							</p>
							<div class="card-actions justify-center">
								<button class="btn btn-primary btn-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
									{item.action}
									<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Form Section -->
	<section bind:this={formElement} class="py-20">
		<div class="container mx-auto px-4">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-12">
					{#if pageData.form}
						<h2 class="text-5xl font-bold text-primary mb-4">{pageData.form.title}</h2>
						<p class="text-2xl text-secondary font-semibold mb-6">{pageData.form.subtitle}</p>
						<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
							{pageData.form.description}
						</p>
					{:else}
						<h2 class="text-5xl font-bold text-primary mb-4">Send Us a Message</h2>
						<p class="text-2xl text-secondary font-semibold mb-6">We'll Get Back to You</p>
						<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
							Fill out the form below and our team will contact you within 24 hours.
						</p>
					{/if}
				</div>

				{#if pageData.form}
					<ContactForm data={pageData.form} />
				{:else}
					<div class="text-center py-12">
						<div class="loading loading-spinner loading-lg text-primary"></div>
						<p class="text-base-content/80 mt-4">Loading form...</p>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section bind:this={faqElement} class="py-20 relative overflow-hidden bg-gradient-to-br from-base-100 via-primary/3 to-secondary/5">
		<!-- Premium Background Elements -->
		<div class="absolute inset-0">
			<!-- Luxury Gradient Overlays -->
			<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
			<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl"></div>
		</div>
		
		<div class="container mx-auto px-4 relative z-10">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">
					{pageData.faq?.title || 'Frequently Asked Questions'}
				</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">
					{pageData.faq?.subtitle || 'Quick Answers'}
				</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.faq?.description || 'Find answers to common questions about our services and process.'}
				</p>
			</div>

			<div class="max-w-5xl mx-auto">
				<div class="space-y-4">
					{#each pageData.faq?.items || [] as item, index}
						<div class="faq-item bg-construction-card card-elevated hover-lift rounded-lg overflow-hidden">
							<button 
								class="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:bg-base-200/50"
								onclick={() => toggleFAQ(index)}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										toggleFAQ(index);
									}
								}}
								aria-expanded={openFAQs.has(index)}
								aria-controls={`faq-content-${index}`}
								tabindex="0"
							>
								<div class="flex items-center justify-between">
									<div class="flex items-center flex-1">
										<div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
											<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<h3 class="text-xl font-bold text-primary hover:text-secondary transition-colors duration-300 pr-4">
											{item.question}
										</h3>
									</div>
									<div class="flex-shrink-0">
										<svg 
											class="w-6 h-6 text-primary transition-transform duration-300 {openFAQs.has(index) ? 'rotate-180' : ''}" 
											fill="none" 
											stroke="currentColor" 
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								</div>
							</button>
							<div 
								id={`faq-content-${index}`}
								class="faq-content overflow-hidden"
								style="max-height: {openFAQs.has(index) ? '200px' : '0px'}"
							>
								<div class="px-6 pb-6 pt-0">
									<div class="pl-12">
										<p class="text-base-content/80 leading-relaxed text-lg">
											{item.answer}
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Map Section -->
	<section bind:this={mapElement} class="py-20">
		<div class="container mx-auto px-4">
			<div class="text-center mb-12">
				<h2 class="text-5xl font-bold text-primary mb-4">
					{pageData.map?.title || 'Visit Our Office'}
				</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">
					{pageData.map?.subtitle || 'We\'re Located Here'}
				</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.map?.description || 'Come visit us at our main office in Dubai\'s Business District. We\'d love to meet you in person and discuss your project.'}
				</p>
			</div>

			<div class="max-w-6xl mx-auto">
				<div class="card bg-construction-card card-elevated">
					<div class="card-body p-0">
						<div class="h-96 bg-base-200 rounded-lg flex items-center justify-center">
							<div class="text-center">
								<div class="text-6xl mb-4">📍</div>
								<h3 class="text-2xl font-bold text-primary mb-2">Interactive Map</h3>
								<p class="text-base-content/80">Map integration would go here</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<!-- Loading State -->
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<div class="loading loading-spinner loading-lg text-primary mb-4"></div>
			<p class="text-base-content/80">Loading contact page...</p>
		</div>
	</div>
{/if}