<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Card } from '$lib/components';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	// Props from page data
	let { data } = $props<{ data: { aboutData: any } }>();

	let pageData = $state<any>(null);
	let currentLocale = $state('en');

	// Animation refs
	let heroSection = $state<HTMLElement>();
	let storySection = $state<HTMLElement>();
	let valuesSection = $state<HTMLElement>();
	let teamSection = $state<HTMLElement>();
	let statsSection = $state<HTMLElement>();

	// Logger function
	const logger = (message: string, error?: any) => {
		console.log(`[About.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Subscribe to about data
	dataStore.subscribe(store => {
		pageData = store.about;
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

			// Story section animation
			if (storySection) {
				gsap.fromTo(storySection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: storySection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(storySection.querySelectorAll('.timeline-item'), 
					{ opacity: 0, x: -50 }, 
					{ 
						opacity: 1, 
						x: 0, 
						duration: 0.8, 
						stagger: 0.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: storySection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// Values section animation
			if (valuesSection) {
				gsap.fromTo(valuesSection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: valuesSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(valuesSection.querySelectorAll('.grid > div'), 
					{ opacity: 0, y: 80, scale: 0.8 }, 
					{ 
						opacity: 1, 
						y: 0, 
						scale: 1, 
						duration: 0.8, 
						stagger: 0.15,
						ease: "power3.out",
						scrollTrigger: {
							trigger: valuesSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// Floating animation for background elements
				const topElement = valuesSection.querySelector('.absolute.top-0.right-0');
				if (topElement) {
					gsap.to(topElement, {
						y: -20,
						duration: 4,
						ease: "power2.inOut",
						repeat: -1,
						yoyo: true
					});
				}

				const bottomElement = valuesSection.querySelector('.absolute.bottom-0.left-0');
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

			// Team section animation
			if (teamSection) {
				gsap.fromTo(teamSection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: teamSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(teamSection.querySelectorAll('.grid > div'), 
					{ opacity: 0, y: 100, scale: 0.9 }, 
					{ 
						opacity: 1, 
						y: 0, 
						scale: 1, 
						duration: 0.8, 
						stagger: 0.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: teamSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
			}

			// Stats section animation
			if (statsSection) {
				gsap.fromTo(statsSection.querySelector('.text-center'), 
					{ opacity: 0, y: 50 }, 
					{ 
						opacity: 1, 
						y: 0, 
						duration: 1, 
						ease: "power3.out",
						scrollTrigger: {
							trigger: statsSection,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);
				gsap.fromTo(statsSection.querySelectorAll('.grid > div'), 
					{ opacity: 0, y: 80, scale: 0.8 }, 
					{ 
						opacity: 1, 
						y: 0, 
						scale: 1, 
						duration: 0.8, 
						stagger: 0.15,
						ease: "power3.out",
						scrollTrigger: {
							trigger: statsSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						}
					}
				);

				// Counter animation for stats
				gsap.fromTo(statsSection.querySelectorAll('.stat-number'), 
					{ textContent: 0 }, 
					{ 
						textContent: (index: number, target: any) => {
							const endValue = parseInt(target.textContent.replace(/[^\d]/g, ''));
							return isNaN(endValue) ? 0 : endValue;
						},
						duration: 2, 
						ease: "power2.out", 
						stagger: 0.2,
						scrollTrigger: {
							trigger: statsSection,
							start: "top 60%",
							end: "bottom 20%",
							toggleActions: "play none none reverse"
						},
						onUpdate: function() {
							const target = this.targets()[0];
							const currentValue = Math.ceil(this.targets()[0].textContent);
							target.textContent = currentValue.toString();
						}
					}
				);
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

	<!-- Story Section -->
	<section bind:this={storySection} class="py-20 bg-construction-section section-divider">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">{pageData.story.title}</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">{pageData.story.subtitle}</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.story.description}
				</p>
			</div>

			<!-- Timeline -->
			<div class="max-w-5xl mx-auto">
				<div class="relative">
					<!-- Timeline Line -->
					<div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>
					
					<div class="space-y-12">
						{#each pageData.story.timeline as item, index}
							<div class="timeline-item flex items-center {currentLocale === 'ar' ? 'flex-row-reverse' : ''} relative">
								<!-- Timeline Dot -->
								<div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-content font-bold text-lg shadow-xl border-4 border-base-100 {currentLocale === 'ar' ? 'ml-6' : 'mr-6'} relative z-10">
									{item.year}
								</div>
								
								<!-- Content Card -->
								<div class="flex-1 bg-base-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300/50 group">
									<div class="flex items-start justify-between mb-4">
										<h3 class="text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
											{item.title}
										</h3>
										<div class="text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
											{index + 1}
										</div>
									</div>
									<p class="text-base-content/80 text-lg leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section bind:this={valuesSection} class="py-20 relative overflow-hidden bg-gradient-to-br from-base-100 via-primary/3 to-secondary/5">
		<!-- Premium Background Elements -->
		<div class="absolute inset-0">
			<!-- Luxury Gradient Overlays -->
			<div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
			<div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/8 to-transparent rounded-full blur-3xl"></div>
		</div>
		
		<div class="container mx-auto px-4 relative z-10">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">{pageData.values.title}</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">{pageData.values.subtitle}</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.values.description}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each pageData.values.items as item}
					<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-300/50 hover:border-primary/30">
						<div class="card-body text-center p-8">
							<div class="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<div class="text-4xl">{item.icon}</div>
							</div>
							<h3 class="card-title text-2xl font-bold text-primary mb-4 justify-center group-hover:text-secondary transition-colors duration-300">
								{item.title}
							</h3>
							<p class="text-base-content/80 leading-relaxed text-lg">
								{item.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Team Section -->
	<section bind:this={teamSection} class="py-20 bg-base-200/30">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">{pageData.team.title}</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">{pageData.team.subtitle}</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.team.description}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each pageData.team.members as member}
					<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
						<figure class="px-6 pt-6">
							<img src={member.image} alt={member.name} class="w-32 h-32 rounded-full object-cover" />
						</figure>
						<div class="card-body text-center">
							<h3 class="card-title text-xl font-bold text-primary mb-2 justify-center">
								{member.name}
							</h3>
							<p class="text-secondary font-semibold mb-2">{member.position}</p>
							<p class="text-sm text-base-content/60 mb-2">{member.experience}</p>
							<p class="text-sm text-base-content/80">{member.specialization}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section bind:this={statsSection} class="py-20">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-5xl font-bold text-primary mb-4">{pageData.stats.title}</h2>
				<p class="text-2xl text-secondary font-semibold mb-6">{pageData.stats.subtitle}</p>
				<p class="text-lg text-base-content/80 max-w-3xl mx-auto">
					{pageData.stats.description}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each pageData.stats.items as stat}
					<div class="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl hover:shadow-2xl transition-all duration-300">
						<div class="card-body text-center p-8">
							<div class="stat-number text-6xl font-bold text-primary mb-4">
								{stat.number}
							</div>
							<h3 class="text-xl font-bold text-base-content mb-2">{stat.label}</h3>
							<p class="text-base-content/80">{stat.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
