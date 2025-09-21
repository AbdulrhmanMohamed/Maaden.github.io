<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	// Props
	let { 
		isOpen = $bindable(false),
		service = null,
		onClose = () => {}
	} = $props();

	// Logger function
	const logger = (message: string, error?: any) => {
		console.log(`[ServiceModal.svelte] ${message}`, error ? error : '');
	};

	// Handle modal close
	const closeModal = () => {
		isOpen = false;
		onClose();
		logger('Service modal closed');
	};

	// Handle contact button click
	const handleContactClick = () => {
		closeModal();
		const fullPath = base + '/contact';
		goto(fullPath);
		logger('Redirecting to contact page');
	};

	// Handle keyboard navigation
	const handleKeydown = (event: KeyboardEvent) => {
		if (isOpen && event.key === 'Escape') {
			closeModal();
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('keydown', handleKeydown);
			
			return () => {
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

<!-- Service Detail Modal -->
{#if isOpen && service}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
		onclick={closeModal}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div 
			class="relative w-full max-w-4xl max-h-[90vh] bg-base-100 rounded-2xl shadow-2xl overflow-hidden" 
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between p-6 border-b border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
				<div class="flex items-center gap-4">
					<div class="w-16 h-16 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
						<span class="text-3xl">{service.icon}</span>
					</div>
					<div>
						<h2 id="modal-title" class="text-2xl font-bold text-primary">{service.title}</h2>
						<p class="text-base-content/70 font-medium">{service.price}</p>
					</div>
				</div>
				<button 
					class="btn btn-ghost btn-circle hover:bg-base-200 transition-colors duration-200"
					onclick={closeModal}
					aria-label="Close modal"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Modal Content -->
			<div class="p-6 overflow-y-auto max-h-[60vh]">
				<!-- Service Image -->
				<div class="mb-6">
					<div class="rounded-xl overflow-hidden shadow-lg">
						<img 
							src={service.image} 
							alt={service.title} 
							class="w-full h-64 object-cover"
							loading="lazy"
						/>
					</div>
				</div>

				<!-- Full Description -->
				<div class="mb-6">
					<h3 class="text-lg font-semibold text-primary mb-3 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Service Overview
					</h3>
					<p class="text-base-content/80 leading-relaxed text-lg">{service.description}</p>
				</div>

				<!-- Features List -->
				<div class="mb-6">
					<h3 class="text-lg font-semibold text-primary mb-3 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Key Features
					</h3>
					<ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
						{#each service.features as feature}
							<li class="flex items-center text-base-content/80 p-3 rounded-lg bg-base-50 hover:bg-primary/5 transition-colors duration-200">
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

				<!-- Service Details -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl">
						<h4 class="font-semibold text-primary mb-2 flex items-center">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
							</svg>
							Pricing
						</h4>
						<p class="text-base-content/80 font-medium">{service.price}</p>
					</div>
					<div class="bg-gradient-to-br from-secondary/5 to-primary/5 p-4 rounded-xl">
						<h4 class="font-semibold text-primary mb-2 flex items-center">
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Duration
						</h4>
						<p class="text-base-content/80 font-medium">{service.duration}</p>
					</div>
				</div>
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between gap-3 p-6 border-t border-base-300 bg-base-50">
				<button 
					class="btn btn-ghost"
					onclick={closeModal}
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
					Close
				</button>
				<button 
					class="btn btn-primary"
					onclick={handleContactClick}
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Contact Us
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Smooth modal animations */
	:global(.modal-enter) {
		animation: modalEnter 0.3s ease-out;
	}

	:global(.modal-exit) {
		animation: modalExit 0.3s ease-in;
	}

	@keyframes modalEnter {
		from {
			opacity: 0;
			transform: scale(0.9) translateY(-20px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes modalExit {
		from {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
		to {
			opacity: 0;
			transform: scale(0.9) translateY(-20px);
		}
	}
</style>
