<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Card, Button } from '$lib/components';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	// Props from page data
	let { data } = $props<{ data: { servicesData: any } }>();

	let pageData = $state<any>(null);
	let currentLocale = $state('en');

	// Animation refs
	let heroSection = $state<HTMLElement>();
	let servicesSection = $state<HTMLElement>();
	let processSection = $state<HTMLElement>();
	let ctaSection = $state<HTMLElement>();

	// Logger function
	const logger = (message: string, error?: any) => {
		console.log(`[Services.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Subscribe to services data
	dataStore.subscribe(store => {
		pageData = store.services;
	});

	// Initialize scroll animations
	const initScrollAnimations = () => {
		if (!pageData) return;

		try {
			// Hero section animation
			if (heroSection) {
				gsap.fromTo(heroSection.querySelector('.hero-content'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: heroSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// Services section animation
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
						stagger: 0.15,
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

			// Process section animation
			if (processSection) {
				gsap.fromTo(processSection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: processSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(processSection.querySelectorAll('.process-step'), 
					{ opacity: 0, y: 80, scale: 0.8 }, 
					{ 
						opacity: 1, 
						y: 0, 
						scale: 1, 
						duration: 0.8, 
						stagger: 0.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: processSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// CTA section animation
			if (ctaSection) {
				gsap.fromTo(ctaSection, 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: ctaSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// Floating animation for background elements
				const topElement = ctaSection.querySelector('.absolute.top-0.right-0');
				if (topElement) {
					gsap.to(topElement, {
						y: -20,
						duration: 4,
						ease: "power2.inOut",
						repeat: -1,
						yoyo: true
					});
				}

				const bottomElement = ctaSection.querySelector('.absolute.bottom-0.left-0');
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
		} catch (error) {
			logger('Error initializing scroll animations:', error);
		}
	};

	onMount(() => {
		if (pageData) {
			initScrollAnimations();
		}
	});

	$effect(() => {
		if (pageData) {
			initScrollAnimations();
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
	<section bind:this={heroSection} class="hero h-screen relative overflow-hidden bg-gradient-to-br from-base-100 via-primary/3 to-secondary/5 pt-16 md:pt-20">
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
						{pageData.hero.subtitle}
					</span>
				</div>

				<!-- Main Title with Premium Typography -->
				<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-black mb-8 leading-[0.9] tracking-tight break-words">
					<span class="block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
						{pageData.hero.title.split(' ')[0]}
					</span>
					<span class="block text-base-content/90 font-light">
						{pageData.hero.title.split(' ').slice(1).join(' ')}
					</span>
				</h1>

				<!-- Description with Enhanced Typography -->
				<p class="text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-base-content/70 mb-16 max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto leading-relaxed font-light tracking-wide">
					{pageData.hero.description}
				</p>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section bind:this={servicesSection} class="py-20 bg-construction-section section-divider">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">Our Services</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">Comprehensive Construction Solutions</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					From concept to completion, we deliver exceptional construction services tailored to your needs.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each pageData.services as service}
					<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
						<figure class="relative overflow-hidden">
							<img src={service.image} alt={service.title} class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
							<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
							<div class="absolute top-4 right-4 text-4xl">{service.icon}</div>
						</figure>
						<div class="card-body p-6">
							<h3 class="card-title text-2xl font-bold text-primary mb-3">
								{service.title}
							</h3>
							<p class="text-base-content/80 mb-4 leading-relaxed">
								{service.description}
							</p>
							
							<div class="space-y-2 mb-4">
								{#each service.features as feature}
									<div class="flex items-center text-sm text-base-content/70">
										<div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
										{feature}
									</div>
								{/each}
							</div>

							<div class="flex justify-between items-center text-sm">
								<div class="text-primary font-semibold">{service.price}</div>
								<div class="text-base-content/60">{service.duration}</div>
							</div>

							<div class="card-actions justify-end mt-4">
								<Button variant="primary" size="sm">
									Learn More
								</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Process Section -->
	<section bind:this={processSection} class="py-20">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">{pageData.process.title}</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">{pageData.process.subtitle}</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.process.description}
				</p>
			</div>

			<div class="max-w-4xl mx-auto">
				<div class="grid grid-cols-1 md:grid-cols-5 gap-8">
					{#each pageData.process.steps as step, index}
						<div class="process-step text-center">
							<div class="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
								{step.number}
							</div>
							<h3 class="text-xl font-bold text-primary mb-3">{step.title}</h3>
							<p class="text-base-content/80 text-sm leading-relaxed">{step.description}</p>
							
							{#if index < pageData.process.steps.length - 1}
								<div class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30 transform translate-x-4"></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section bind:this={ctaSection} class="py-20 relative overflow-hidden bg-gradient-to-br from-base-100 via-primary/3 to-secondary/5">
		<!-- Premium Background Elements -->
		<div class="absolute inset-0">
			<!-- Luxury Gradient Overlays -->
			<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
			<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl"></div>
		</div>
		
		<div class="container mx-auto px-4 text-center relative z-10">
			<div class="max-w-3xl mx-auto">
				<h2 class="text-5xl font-bold text-primary mb-6">
					{pageData.cta.title}
				</h2>
				<p class="text-xl text-base-content/90 mb-8">
					{pageData.cta.description}
				</p>
				<Button variant="secondary" size="lg" class="text-lg px-8 py-4">
					{pageData.cta.button}
				</Button>
			</div>
		</div>
	</section>
{/if}
