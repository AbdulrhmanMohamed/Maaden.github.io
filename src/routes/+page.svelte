<script lang="ts">
	import { onMount } from 'svelte';
	import { Hero, Card, ContactForm } from '$lib/components';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// State
	let pageData = $state<any>(null);
	let currentLocale = $state('en');

	// Animation refs
	let servicesSection = $state<HTMLElement>();
	let clientsSection = $state<HTMLElement>();
	let contactSection = $state<HTMLElement>();

	// Clients slider state
	let currentClientIndex = $state(0);
	let clientsPerView = $state(3);
	let maxClientIndex = $state(0);

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[+page.svelte] ${message}`, error ? error : '');
	};

	// Clients slider functions
	const updateClientsPerView = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1024) {
				clientsPerView = 3;
			} else if (window.innerWidth >= 640) {
				clientsPerView = 2;
			} else {
				clientsPerView = 1;
			}
			maxClientIndex = Math.max(0, (pageData?.clients?.items?.length || 0) - clientsPerView);
		}
	};

	const nextClient = () => {
		if (currentClientIndex < maxClientIndex) {
			currentClientIndex++;
		}
	};

	const prevClient = () => {
		if (currentClientIndex > 0) {
			currentClientIndex--;
		}
	};

	const goToClient = (index: number) => {
		currentClientIndex = index;
	};

	// Horizontal scroll handler
	const handleWheelScroll = (event: WheelEvent) => {
		event.preventDefault();
		
		// Determine scroll direction
		const delta = event.deltaY;
		
		if (delta > 0) {
			// Scroll down/right - next client
			nextClient();
		} else if (delta < 0) {
			// Scroll up/left - previous client
			prevClient();
		}
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Subscribe to home data
	dataStore.subscribe(store => {
		pageData = store.home;
	});

	// Initialize scroll-triggered animations
	const initScrollAnimations = () => {
		if (!pageData) return;

		try {
			// Services Section Animation
			if (servicesSection) {
				gsap.fromTo(servicesSection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: servicesSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				gsap.fromTo(servicesSection.querySelectorAll('.grid > div'), 
					{ opacity: 0, y: 80, scale: 0.8 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.8,
						stagger: 0.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: servicesSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}


			// Clients Section Animation
			if (clientsSection) {
				gsap.fromTo(clientsSection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: clientsSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				gsap.fromTo(clientsSection.querySelectorAll('.flex > div'), 
					{ opacity: 0, y: 80, scale: 0.9 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.8,
						stagger: 0.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: clientsSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// Floating animation for background elements
				const topElement = clientsSection.querySelector('.absolute.top-0.right-0');
				if (topElement) {
					gsap.to(topElement, {
						y: -20,
						duration: 4,
						ease: "power2.inOut",
						repeat: -1,
						yoyo: true
					});
				}

				const bottomElement = clientsSection.querySelector('.absolute.bottom-0.left-0');
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

			// Contact Section Animation
			if (contactSection) {
				gsap.fromTo(contactSection, 
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: contactSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			logger('Scroll animations initialized successfully');
		} catch (error) {
			logger('Error initializing scroll animations:', error);
		}
	};

	// Initialize animations on mount
	onMount(() => {
		if (pageData) {
			initScrollAnimations();
		}
	});

	// Re-initialize animations when data changes
	$effect(() => {
		if (pageData) {
			initScrollAnimations();
			updateClientsPerView();
		}
	});

	// Update clients per view on window resize
	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => updateClientsPerView();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});
</script>

<svelte:head>
	{#if pageData?.seo}
		<title>{pageData.seo.title}</title>
		<meta name="description" content={pageData.seo.description} />
		<meta name="keywords" content={pageData.seo.keywords} />
	{/if}
</svelte:head>

{#if pageData}
	<!-- Hero Section -->
	<section id="home">
		<Hero data={pageData.hero} />
	</section>

	<!-- Services Section -->
	<section bind:this={servicesSection} id="services" class="py-20 bg-construction-section section-divider">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">
					{pageData.services.title}
				</h2>
				<h3 class="text-2xl font-semibold text-secondary mb-6">
					{pageData.services.subtitle}
				</h3>
				<p class="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
					{pageData.services.description}
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
				{#each pageData.services.items as service}
					<Card type="service" data={service} />
				{/each}
			</div>
		</div>
	</section>


	<!-- Our Clients Section -->
	<section bind:this={clientsSection} id="clients" class="py-20 bg-base-200 w-full">
		<div class="container mx-auto px-4 w-full max-w-7xl">
			<div class="text-center mb-16">
				<h2 class="text-5xl 2xl:text-6xl 3xl:text-7xl font-bold text-primary mb-6">
					{pageData.clients.title}
				</h2>
				<h3 class="text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold text-base-content mb-4">
					{pageData.clients.subtitle}
				</h3>
				<p class="text-xl 2xl:text-2xl 3xl:text-3xl max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl mx-auto leading-relaxed text-base-content/70">
					{pageData.clients.description}
				</p>
			</div>

			<!-- Clients Carousel -->
			<div class="relative">
				<!-- Navigation Buttons -->
				<button 
					class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12"
					onclick={prevClient}
					disabled={currentClientIndex === 0}
				>
					<svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				
				<button 
					class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12"
					onclick={nextClient}
					disabled={currentClientIndex >= maxClientIndex}
				>
					<svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>

				<!-- Clients Grid -->
				<div 
					class="overflow-hidden mx-4 sm:mx-8 cursor-grab active:cursor-grabbing" 
					onwheel={handleWheelScroll}
					onmousedown={(e) => e.preventDefault()}
				>
					<div class="flex transition-transform duration-500 ease-in-out" style="transform: translateX(-{currentClientIndex * (100 / clientsPerView)}%)">
						{#each pageData.clients.items as client, index}
							<div class="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4">
								<div class="bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-base-300/50 overflow-hidden w-full">
									<!-- Client Logo Area - Full width responsive -->
									<div class="w-full aspect-[285/107] flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200">
										<img 
											src={client.image} 
											alt={client.name}
											class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
											loading="lazy"
										/>
									</div>
									
									<!-- Client Name -->
									<div class="p-3 sm:p-4 bg-primary text-primary-content">
										<h4 class="text-xs sm:text-sm font-bold text-center group-hover:text-primary-content/90 transition-colors duration-300">
											{currentLocale === 'ar' ? client.nameAr : client.name}
										</h4>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Dots Indicator -->
				<div class="flex justify-center mt-12 space-x-3">
					{#each Array(maxClientIndex + 1) as _, index}
						<button 
							class="w-3 h-3 rounded-full transition-all duration-300 {currentClientIndex === index ? 'bg-primary scale-125' : 'bg-base-300 hover:bg-base-400'}"
							onclick={() => goToClient(index)}
						></button>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section bind:this={contactSection} id="contact" class="w-full">
		<div class="container mx-auto px-4 w-full">
			<ContactForm />
		</div>
	</section>
{/if}
