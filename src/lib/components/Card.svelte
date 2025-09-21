<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';

	// Props
	interface Props {
		type: 'service' | 'project' | 'testimonial';
		data: any;
		showModal?: boolean;
	}

	let { type, data, showModal = false }: Props = $props();

	// State
	let isModalOpen = $state(false);
	let currentImageIndex = $state(0);

	// Animation refs
	let cardElement = $state<HTMLElement>();
	let imageElement = $state<HTMLElement>();
	let contentElement = $state<HTMLElement>();

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Card.svelte] ${message}`, error ? error : '');
	};

	// GSAP Hover Animations
	const initHoverAnimations = () => {
		if (!cardElement) return;

		try {
			// Hover in animation
			const hoverIn = () => {
				if (cardElement) {
					gsap.to(cardElement, {
						y: -10,
						scale: 1.02,
						duration: 0.3,
						ease: "power2.out"
					});
				}

				if (imageElement) {
					gsap.to(imageElement, {
						scale: 1.1,
						duration: 0.4,
						ease: "power2.out"
					});
				}

				if (contentElement) {
					gsap.to(contentElement, {
						y: -5,
						duration: 0.3,
						ease: "power2.out"
					});
				}
			};

			// Hover out animation
			const hoverOut = () => {
				if (cardElement) {
					gsap.to(cardElement, {
						y: 0,
						scale: 1,
						duration: 0.3,
						ease: "power2.out"
					});
				}

				if (imageElement) {
					gsap.to(imageElement, {
						scale: 1,
						duration: 0.4,
						ease: "power2.out"
					});
				}

				if (contentElement) {
					gsap.to(contentElement, {
						y: 0,
						duration: 0.3,
						ease: "power2.out"
					});
				}
			};

			// Add event listeners
			cardElement.addEventListener('mouseenter', hoverIn);
			cardElement.addEventListener('mouseleave', hoverOut);

			// Cleanup function
			return () => {
				cardElement?.removeEventListener('mouseenter', hoverIn);
				cardElement?.removeEventListener('mouseleave', hoverOut);
			};
		} catch (error) {
			logger('Error initializing hover animations:', error);
		}
	};

	// Handle card click
	const handleCardClick = () => {
		if (type === 'project' && data.gallery) {
			isModalOpen = true;
			logger('Project modal opened');
		}
	};

	// Handle modal close
	const closeModal = () => {
		isModalOpen = false;
		currentImageIndex = 0;
		logger('Modal closed');
	};

	// Handle image navigation
	const nextImage = () => {
		if (data.gallery && currentImageIndex < data.gallery.length - 1) {
			currentImageIndex++;
		}
	};

	const prevImage = () => {
		if (currentImageIndex > 0) {
			currentImageIndex--;
		}
	};

	// Handle keyboard navigation
	const handleKeydown = (event: KeyboardEvent) => {
		if (isModalOpen) {
			if (event.key === 'Escape') {
				closeModal();
			} else if (event.key === 'ArrowRight') {
				nextImage();
			} else if (event.key === 'ArrowLeft') {
				prevImage();
			}
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('keydown', handleKeydown);
			
			// Initialize hover animations
			const cleanupHover = initHoverAnimations();
			
			return () => {
				document.removeEventListener('keydown', handleKeydown);
				cleanupHover?.();
			};
		}
	});
</script>

<!-- Premium Service Card -->
{#if type === 'service'}
	<div bind:this={cardElement} class="group relative bg-gradient-to-br from-base-100 to-base-100/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-primary/10 h-full flex flex-col">
		
		<!-- Image Section -->
		<div class="relative z-10 p-3 pb-2">
			<div class="w-full h-32 sm:h-36 md:h-40 mx-auto rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-lg">
				<img 
					bind:this={imageElement}
					src={data.image} 
					alt={data.title}
					class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
					loading="lazy"
				/>
			</div>
		</div>
		
		<!-- Content Section -->
		<div class="relative z-10 p-4 pt-2 flex-1 flex flex-col">
			<h3 class="text-lg sm:text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors duration-300 text-center">
				{data.title}
			</h3>
			<p class="text-sm sm:text-base text-base-content/70 mb-4 leading-relaxed font-light text-center line-clamp-3">
				{data.description}
			</p>
			
			<!-- Premium Features List -->
			<div class="mb-4 flex-1">
				<ul class="space-y-2">
					{#each data.features as feature}
						<li class="flex items-center text-base-content/80 group-hover:text-base-content transition-colors duration-300">
							<div class="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
								<svg class="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<span class="font-medium text-xs sm:text-sm">{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Price and CTA -->
			<div class="flex flex-col gap-3 mt-auto">
				<div class="text-lg sm:text-xl font-bold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent text-center">
					{data.price}
				</div>
				<button 
					class="group/btn relative px-4 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-content font-bold rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-500 hover:scale-105 overflow-hidden text-sm"
					onclick={() => isModalOpen = true}
				>
					<span class="relative z-10 flex items-center justify-center">
						View More
						<svg class="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</span>
					<div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
				</button>
			</div>
		</div>
		
		<!-- Hover Effect Overlay -->
		<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
		
		<!-- Decorative Border -->
		<div class="absolute inset-0 rounded-2xl border border-primary/20 group-hover:border-primary/40 transition-colors duration-500"></div>
	</div>

	<!-- Service Detail Modal -->
	{#if isModalOpen}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onclick={() => isModalOpen = false}>
			<div class="relative w-full max-w-4xl max-h-[90vh] bg-base-100 rounded-2xl shadow-2xl overflow-hidden" onclick={(e) => e.stopPropagation()}>
				<!-- Modal Header -->
				<div class="flex items-center justify-between p-6 border-b border-base-300">
					<div class="flex items-center gap-4">
						<div class="w-16 h-16 rounded-xl overflow-hidden">
							<img src={data.image} alt={data.title} class="w-full h-full object-cover" />
						</div>
						<div>
							<h2 class="text-2xl font-bold text-primary">{data.title}</h2>
							<p class="text-base-content/70">{data.price}</p>
						</div>
					</div>
					<button 
						class="btn btn-ghost btn-circle hover:bg-base-200"
						onclick={() => isModalOpen = false}
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Modal Content -->
				<div class="p-6 overflow-y-auto max-h-[60vh]">
					<!-- Full Description -->
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-primary mb-3">Service Overview</h3>
						<p class="text-base-content/80 leading-relaxed">{data.description}</p>
					</div>

					<!-- Features List -->
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-primary mb-3">Key Features</h3>
						<ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
							{#each data.features as feature}
								<li class="flex items-center text-base-content/80">
									<div class="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
										<svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<span class="font-medium">{feature}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Service Image -->
					<div class="mb-6">
						<h3 class="text-lg font-semibold text-primary mb-3">Service Image</h3>
						<div class="rounded-xl overflow-hidden">
							<img src={data.image} alt={data.title} class="w-full h-64 object-cover" />
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="flex items-center justify-end gap-3 p-6 border-t border-base-300 bg-base-50">
					<button 
						class="btn btn-ghost"
						onclick={() => isModalOpen = false}
					>
						Close
					</button>
					<button 
						class="btn btn-primary"
						onclick={() => {
							isModalOpen = false;
							window.location.href = '/contact';
						}}
					>
						Contact Us
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}

<!-- Project Card -->
{#if type === 'project'}
	<div bind:this={cardElement} class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer" onclick={handleCardClick}>
		<figure class="relative overflow-hidden">
			<img 
				bind:this={imageElement}
				src={data.image} 
				alt={data.title}
				class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
			/>
			<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
				<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
			</div>
			{#if data.isFeatured}
				<div class="absolute top-4 right-4 bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-semibold">
					Featured
				</div>
			{/if}
		</figure>
		<div bind:this={contentElement} class="card-body">
			<div class="flex justify-between items-start mb-2">
				<h3 class="card-title text-xl font-bold text-primary">
					{data.title}
				</h3>
				<span class="badge badge-secondary badge-sm">
					{data.category}
				</span>
			</div>
			<p class="text-base-content/70 mb-4 leading-relaxed">
				{data.description}
			</p>
			
			<!-- Project Details -->
			<div class="grid grid-cols-2 gap-4 mb-4 text-sm">
				<div>
					<span class="text-base-content/60">Year:</span>
					<span class="font-semibold ml-1">{data.year}</span>
				</div>
				<div>
					<span class="text-base-content/60">Area:</span>
					<span class="font-semibold ml-1">{data.area}</span>
				</div>
			</div>

			<div class="card-actions justify-between items-center">
				<div class="text-sm text-base-content/60">
					Client: <span class="font-semibold">{data.client}</span>
				</div>
				<button class="btn btn-primary btn-sm hover:scale-105 transition-all duration-300">
					View Details
					<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Testimonial Card -->
{#if type === 'testimonial'}
	<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
		<div class="card-body">
			<!-- Rating -->
			<div class="flex items-center mb-4">
				{#each Array(data.rating) as _}
					<svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
				{/each}
			</div>

			<!-- Content -->
			<blockquote class="text-base-content/80 mb-6 leading-relaxed italic">
				"{data.content}"
			</blockquote>

			<!-- Client Info -->
			<div class="flex items-center">
				<div class="avatar">
					<div class="w-12 h-12 rounded-full">
						<img src={data.image} alt={data.name} />
					</div>
				</div>
				<div class="ml-4">
					<div class="font-bold text-base-content">{data.name}</div>
					<div class="text-sm text-base-content/60">{data.position}</div>
					<div class="text-sm text-primary font-semibold">{data.company}</div>
				</div>
			</div>

			<!-- Project Reference -->
			{#if data.project}
				<div class="mt-4 pt-4 border-t border-base-300">
					<div class="text-sm text-base-content/60">
						Project: <span class="font-semibold text-primary">{data.project}</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<!-- Project Modal -->
{#if isModalOpen && type === 'project' && data.gallery}
	<div class="modal modal-open">
		<div class="modal-box max-w-4xl">
			<div class="flex justify-between items-center mb-4">
				<h3 class="text-2xl font-bold text-primary">{data.title}</h3>
				<button onclick={closeModal} class="btn btn-sm btn-circle btn-ghost">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Image Gallery -->
			<div class="relative mb-6">
				<img 
					src={data.gallery[currentImageIndex]} 
					alt={data.title}
					class="w-full h-96 object-cover rounded-lg"
				/>
				
				<!-- Navigation Arrows -->
				{#if data.gallery.length > 1}
					<button 
						onclick={prevImage}
						class="absolute left-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-primary"
						disabled={currentImageIndex === 0}
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button 
						onclick={nextImage}
						class="absolute right-4 top-1/2 transform -translate-y-1/2 btn btn-circle btn-primary"
						disabled={currentImageIndex === data.gallery.length - 1}
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				{/if}

				<!-- Image Counter -->
				<div class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
					{currentImageIndex + 1} / {data.gallery.length}
				</div>
			</div>

			<!-- Project Details -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h4 class="text-lg font-bold mb-3">Project Details</h4>
					<div class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-base-content/60">Category:</span>
							<span class="font-semibold">{data.category}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-base-content/60">Year:</span>
							<span class="font-semibold">{data.year}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-base-content/60">Area:</span>
							<span class="font-semibold">{data.area}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-base-content/60">Client:</span>
							<span class="font-semibold">{data.client}</span>
						</div>
					</div>
				</div>
				<div>
					<h4 class="text-lg font-bold mb-3">Description</h4>
					<p class="text-base-content/80 leading-relaxed">
						{data.description}
					</p>
				</div>
			</div>

			<div class="modal-action">
				<button onclick={closeModal} class="btn btn-primary">Close</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* RTL Support */
	:global([dir="rtl"]) .card-body {
		text-align: right;
	}

	:global([dir="rtl"]) .flex {
		flex-direction: row-reverse;
	}

	:global([dir="rtl"]) .ml-4 {
		margin-left: 0;
		margin-right: 1rem;
	}

	:global([dir="rtl"]) .mr-2 {
		margin-right: 0;
		margin-left: 0.5rem;
	}

	/* Smooth transitions */
	.card {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Hover effects */
	.group:hover .group-hover\:scale-110 {
		transform: scale(1.1);
	}

	.group:hover .group-hover\:scale-110 {
		transform: scale(1.1);
	}
</style>
