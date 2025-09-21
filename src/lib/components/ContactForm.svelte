<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from './Button.svelte';
	import { locale } from '$lib/stores/locale';
	import { dataStore } from '$lib/stores/data';

	// Props
	interface Props {
		data?: any;
	}

	let { data }: Props = $props();

	// State
	let formData = $state<any>(null);
	let currentLocale = $state('en');
	let form = $state<{
		name: string;
		email: string;
		phone: string;
		company: string;
		service: string;
		budget: string;
		message: string;
	}>({
		name: '',
		email: '',
		phone: '',
		company: '',
		service: '',
		budget: '',
		message: ''
	});
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[ContactForm.svelte] ${message}`, error ? error : '');
	};

	// Subscribe to locale changes
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Set formData from props
	$effect(() => {
		if (data) {
			formData = data;
		}
	});

	// Initialize formData from props on mount
	onMount(() => {
		if (data) {
			formData = data;
		}
	});

	// Handle form submission
	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		
		try {
			isSubmitting = true;
			submitStatus = 'idle';
			
			// Simulate form submission (replace with actual API call)
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Reset form
			form = {
				name: '',
				email: '',
				phone: '',
				company: '',
				service: '',
				budget: '',
				message: ''
			};
			
			submitStatus = 'success';
			logger('Form submitted successfully');
			
			// Reset success message after 5 seconds
			setTimeout(() => {
				submitStatus = 'idle';
			}, 5000);
			
		} catch (error) {
			submitStatus = 'error';
			logger('Error submitting form:', error);
		} finally {
			isSubmitting = false;
		}
	};

	// Handle input change
	const handleInputChange = (field: keyof typeof form, value: string) => {
		form[field] = value;
	};
</script>

{#if formData && formData.fields}
	<div class="max-w-2xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-primary mb-4">
				{formData.title}
			</h2>
			<h3 class="text-2xl font-semibold text-secondary mb-4">
				{formData.subtitle}
			</h3>
			<p class="text-lg text-base-content/80 max-w-2xl mx-auto">
				{formData.description}
			</p>
		</div>

		<!-- Contact Form -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body p-8">
				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- Name -->
					<div class="form-control">
						<label for="name" class="label">
							<span class="label-text font-semibold text-base-content">
								{formData.fields.name.label}
								{#if formData.fields.name.required}
									<span class="text-error ml-1">*</span>
								{/if}
							</span>
						</label>
						<input
							id="name"
							type="text"
							placeholder={formData.fields.name.placeholder}
							class="input input-bordered w-full focus:input-primary"
							bind:value={form.name}
							required={formData.fields.name.required}
						/>
					</div>

					<!-- Email -->
					<div class="form-control">
						<label for="email" class="label">
							<span class="label-text font-semibold text-base-content">
								{formData.fields.email.label}
								{#if formData.fields.email.required}
									<span class="text-error ml-1">*</span>
								{/if}
							</span>
						</label>
						<input
							id="email"
							type="email"
							placeholder={formData.fields.email.placeholder}
							class="input input-bordered w-full focus:input-primary"
							bind:value={form.email}
							required={formData.fields.email.required}
						/>
					</div>

					<!-- Phone -->
					<div class="form-control">
						<label for="phone" class="label">
							<span class="label-text font-semibold text-base-content">
								{formData.fields.phone.label}
								{#if formData.fields.phone.required}
									<span class="text-error ml-1">*</span>
								{/if}
							</span>
						</label>
						<input
							id="phone"
							type="tel"
							placeholder={formData.fields.phone.placeholder}
							class="input input-bordered w-full focus:input-primary"
							bind:value={form.phone}
							required={formData.fields.phone.required}
						/>
					</div>

					<!-- Company -->
					<div class="form-control">
						<label for="company" class="label">
							<span class="label-text font-semibold text-base-content">
								{formData.fields.company.label}
								{#if formData.fields.company.required}
									<span class="text-error ml-1">*</span>
								{/if}
							</span>
						</label>
						<input
							id="company"
							type="text"
							placeholder={formData.fields.company.placeholder}
							class="input input-bordered w-full focus:input-primary"
							bind:value={form.company}
							required={formData.fields.company.required}
						/>
					</div>

						<!-- Service -->
						<div class="form-control">
							<label for="service" class="label">
								<span class="label-text font-semibold text-base-content">
									{formData.fields.service.label}
									{#if formData.fields.service.required}
										<span class="text-error ml-1">*</span>
									{/if}
								</span>
							</label>
							<select
								id="service"
								class="select select-bordered w-full focus:select-primary"
								bind:value={form.service}
								required={formData.fields.service.required}
							>
								<option value="">{formData.fields.service.placeholder}</option>
								{#each formData.fields.service.options as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>

						<!-- Budget -->
						<div class="form-control">
							<label for="budget" class="label">
								<span class="label-text font-semibold text-base-content">
									{formData.fields.budget.label}
									{#if formData.fields.budget.required}
										<span class="text-error ml-1">*</span>
									{/if}
								</span>
							</label>
							<select
								id="budget"
								class="select select-bordered w-full focus:select-primary"
								bind:value={form.budget}
								required={formData.fields.budget.required}
							>
								<option value="">{formData.fields.budget.placeholder}</option>
								{#each formData.fields.budget.options as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>

						<!-- Message -->
						<div class="form-control">
							<label for="message" class="label">
								<span class="label-text font-semibold text-base-content">
									{formData.fields.message.label}
									{#if formData.fields.message.required}
										<span class="text-error ml-1">*</span>
									{/if}
								</span>
							</label>
							<textarea
								id="message"
								class="textarea textarea-bordered w-full h-32 focus:textarea-primary resize-none"
								placeholder={formData.fields.message.placeholder}
								bind:value={form.message}
								required={formData.fields.message.required}
							></textarea>
						</div>

						<!-- Submit Button -->
						<div class="form-control mt-8">
							<Button
								variant="primary"
								size="lg"
								class="w-full"
								loading={isSubmitting}
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									{formData.sending || 'Sending...'}
								{:else}
									{formData.submit}
								{/if}
							</Button>
						</div>

						<!-- Status Messages -->
						{#if submitStatus === 'success'}
							<div class="alert alert-success">
								<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>{formData.success}</span>
							</div>
						{/if}

						{#if submitStatus === 'error'}
							<div class="alert alert-error">
								<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>{formData.error}</span>
							</div>
						{/if}
					</form>
				</div>
			</div>
		</div>
{/if}

<style>
	/* RTL Support */
	:global([dir="rtl"]) .form-control {
		text-align: right;
	}

	:global([dir="rtl"]) .label-text {
		text-align: right;
	}

	:global([dir="rtl"]) .input,
	:global([dir="rtl"]) .select,
	:global([dir="rtl"]) .textarea {
		text-align: right;
	}

	:global([dir="rtl"]) .card-title {
		text-align: right;
	}

	:global([dir="rtl"]) .flex {
		flex-direction: row-reverse;
	}

	:global([dir="rtl"]) .mr-2 {
		margin-right: 0;
		margin-left: 0.5rem;
	}
</style>
