<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register GSAP plugins
	gsap.registerPlugin(ScrollTrigger);

	// Props
	interface Props {
		data?: any;
	}

	let { data }: Props = $props();

	// State
	let heroData = $state<any>(null);
	let currentLocale = $state('en');

	// Image slider state
	let currentImageIndex = $state(0);
	let imageSliderInterval: number | null = null;
	const heroImages = [
		'./images/hero/1.jpeg',
		'./images/hero/2.jpeg', 
		'./images/hero/3.jpeg',
		'./images/hero/4.jpeg'
	];

	// Animation refs
	let heroSection = $state<HTMLElement>();
	let badgeElement = $state<HTMLElement>();
	let titleElement = $state<HTMLElement>();
	let descriptionElement = $state<HTMLElement>();
	let buttonsContainer = $state<HTMLElement>();
	let statsContainer = $state<HTMLElement>();
	let scrollIndicator = $state<HTMLElement>();
	let imageSlider = $state<HTMLElement>();

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Hero.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Subscribe to hero data
	dataStore.subscribe(store => {
		heroData = data || store.hero;
	});

	// Button click handlers
	const handlePrimaryClick = () => {
		if (heroData?.primaryButton?.action === 'contact') {
			// Scroll to contact section or navigate
			document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
		}
		logger('Primary button clicked');
	};

	const handleSecondaryClick = () => {
		if (heroData?.secondaryButton?.action === 'projects') {
			// Scroll to projects section or navigate
			document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
		}
		logger('Secondary button clicked');
	};

	// Image slider functions
	const startImageSlider = () => {
		if (imageSliderInterval) {
			clearInterval(imageSliderInterval);
		}
		
		imageSliderInterval = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % heroImages.length;
		}, 5000); // Change image every 5 seconds
	};

	const stopImageSlider = () => {
		if (imageSliderInterval) {
			clearInterval(imageSliderInterval);
			imageSliderInterval = null;
		}
	};

	const goToImage = (index: number) => {
		currentImageIndex = index;
		stopImageSlider();
		startImageSlider(); // Restart the timer
	};

	// GSAP Animations
	const initAnimations = () => {
		if (!heroData || !heroSection) return;

		try {
			// Set initial states
			const elementsToAnimate = [badgeElement, titleElement, descriptionElement, buttonsContainer].filter(Boolean);
			if (elementsToAnimate.length > 0) {
				gsap.set(elementsToAnimate, {
					opacity: 0,
					y: 50
				});
			}


			if (statsContainer?.children) {
				gsap.set(statsContainer.children, {
					opacity: 0,
					y: 60,
					scale: 0.9
				});
			}

			if (scrollIndicator) {
				gsap.set(scrollIndicator, {
					opacity: 0,
					y: 20
				});
			}

			// Create master timeline
			const tl = gsap.timeline({ delay: 0.5 });

			// Hero entrance sequence
			if (badgeElement) {
				tl.to(badgeElement, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out"
				});
			}

			if (titleElement) {
				tl.to(titleElement, {
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: "power3.out"
				}, "-=0.4");
			}

			if (descriptionElement) {
				tl.to(descriptionElement, {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out"
				}, "-=0.6");
			}

			if (buttonsContainer) {
				tl.to(buttonsContainer, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out"
				}, "-=0.4");
			}


			if (statsContainer?.children) {
				tl.to(statsContainer.children, {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					stagger: 0.15,
					ease: "power3.out"
				}, "-=0.4");
			}

			if (scrollIndicator) {
				tl.to(scrollIndicator, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power3.out"
				}, "-=0.2");
			}

			// Floating animation for background elements
			const topElement = heroSection.querySelector('.absolute.top-0.right-0');
			if (topElement) {
				gsap.to(topElement, {
					y: -20,
					duration: 4,
					ease: "power2.inOut",
					repeat: -1,
					yoyo: true
				});
			}

			const bottomElement = heroSection.querySelector('.absolute.bottom-0.left-0');
			if (bottomElement) {
				gsap.to(bottomElement, {
					y: 20,
					duration: 5,
					ease: "power2.inOut",
					repeat: -1,
					yoyo: true
				});
			}

			// Scroll indicator bounce
			if (scrollIndicator) {
				gsap.to(scrollIndicator, {
					y: -10,
					duration: 1.5,
					ease: "power2.inOut",
					repeat: -1,
					yoyo: true
				});
			}

			// Counter animation for stats
			if (statsContainer?.children) {
				Array.from(statsContainer.children).forEach((stat, index) => {
					const numberElement = stat.querySelector('.text-6xl, .text-7xl');
					if (numberElement && heroData.stats?.[index]?.number) {
						const endValue = parseInt(heroData.stats[index].number.replace(/[^\d]/g, ''));
						if (!isNaN(endValue)) {
							gsap.fromTo(numberElement, 
								{ textContent: 0 },
								{
									textContent: endValue,
									duration: 2,
									ease: "power2.out",
									delay: 1.5 + (index * 0.2),
									snap: { textContent: 1 },
									onUpdate: function() {
										numberElement.textContent = Math.ceil(this.targets()[0].textContent).toString();
									}
								}
							);
						}
					}
				});
			}

			logger('Hero animations initialized successfully');
		} catch (error) {
			logger('Error initializing hero animations:', error);
		}
	};

	// Initialize animations on mount
	onMount(() => {
		if (heroData) {
			initAnimations();
		}
		
		// Start image slider
		startImageSlider();
		
		// Cleanup on unmount
		return () => {
			stopImageSlider();
		};
	});

	// Re-initialize animations when data changes
	$effect(() => {
		if (heroData) {
			initAnimations();
		}
	});
</script>

{#if heroData}
	<!-- Hero Section -->
	<section bind:this={heroSection} class="hero min-h-screen relative overflow-hidden bg-gradient-to-br from-base-100 via-primary/3 to-secondary/5 pt-16 md:pt-20 w-full">
		<!-- Image Slider Background -->
		<div bind:this={imageSlider} class="absolute inset-0 z-0">
			{#each heroImages as image, index}
				<div 
					class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out {index === currentImageIndex ? 'opacity-100' : 'opacity-0'}"
					style="background-image: url('{image}')"
				></div>
			{/each}
			<!-- Dark overlay for text readability -->
			<div class="absolute inset-0 bg-black/40"></div>
		</div>

		<!-- Premium Background Elements -->
		<div class="absolute inset-0 z-10">
			<!-- Luxury Gradient Overlays -->
			<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
			<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl"></div>
		</div>

		<div class="hero-content text-center relative z-20 container mx-auto px-4 py-8 md:py-12 w-full" style="padding-top: 120px; padding-bottom: 120px;">
			<div class="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto">
				<!-- Premium Badge -->
				<div bind:this={badgeElement} class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);">
					<div class="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
					<span class="text-sm font-semibold text-white tracking-wide uppercase">
						{heroData.subtitle}
					</span>
				</div>

				<!-- Main Title with Premium Typography -->
				<h1 bind:this={titleElement} class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-black mb-8 leading-[0.9] tracking-tight break-words">
					<span class="block text-primary" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3);">
						{heroData.title.split(' ')[0]}
					</span>
					<span class="block text-white font-light" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3);">
						{heroData.title.split(' ').slice(1).join(' ')}
					</span>
				</h1>

				<!-- Company Slogan -->
				<div class="mb-8">
					<p class="text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-light italic tracking-wide text-white" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3);">
						"{heroData.slogan}"
					</p>
				</div>

				<!-- Description with Enhanced Typography -->
				<p bind:this={descriptionElement} class="text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl text-gray-100 mb-16 max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto leading-relaxed font-light tracking-wide" style="text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);">
					{heroData.description}
				</p>

				<!-- Premium Action Buttons -->
				<div bind:this={buttonsContainer} class="flex flex-col sm:flex-row gap-6 justify-center mb-20">
					<button
						onclick={handlePrimaryClick}
						class="group relative px-10 py-5 bg-gradient-to-r from-primary to-primary/90 text-primary-content font-bold text-lg rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden"
					>
						<!-- Button Background Effect -->
						<div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						
						<!-- Button Content -->
						<span class="relative z-10 flex items-center justify-center">
							{heroData.primaryButton.text}
							<svg class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</span>
						
						<!-- Shine Effect -->
						<div class="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
					</button>
					
					<button
						onclick={handleSecondaryClick}
						class="group px-10 py-5 bg-transparent border-2 border-primary/30 text-primary font-bold text-lg rounded-2xl backdrop-blur-sm hover:bg-primary/5 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
					>
						<span class="flex items-center justify-center">
							{heroData.secondaryButton.text}
							<svg class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
							</svg>
						</span>
					</button>
				</div>


				<!-- Premium Stats Section -->
				<div class="relative">
					<!-- Stats Background -->
					<div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
					
					<div bind:this={statsContainer} class="relative grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-8 p-8 max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto">
						{#each heroData.stats as stat, index}
							<div class="group text-center">
								<!-- Stat Number with Premium Styling -->
								<div class="relative inline-block">
									<div class="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl 3xl:text-8xl font-black bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-500">
										{stat.number}
									</div>
									<!-- Decorative Underline -->
									<div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-24 transition-all duration-500"></div>
								</div>
								
								<!-- Stat Label -->
								<div class="text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-base-content/80 mt-6 group-hover:text-base-content transition-colors duration-300 tracking-wide">
									{stat.label}
								</div>
								
								<!-- Decorative Element -->
								<div class="mt-4 w-8 h-8 mx-auto bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300"></div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Image Slider Navigation Dots -->
		<div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
			{#each heroImages as _, index}
				<button
					onclick={() => goToImage(index)}
					class="w-3 h-3 rounded-full transition-all duration-300 {index === currentImageIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'}"
					aria-label="Go to image {index + 1}"
				></button>
			{/each}
		</div>

		<!-- Scroll Indicator -->
		<div bind:this={scrollIndicator} class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
			<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</div>
	</section>
{/if}

<style>
	/* Custom animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}

	.hero {
		animation: float 6s ease-in-out infinite;
	}

	/* RTL Support */
	:global([dir="rtl"]) .hero-content {
		text-align: right;
	}
</style>
