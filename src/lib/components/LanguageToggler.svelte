<script lang="ts">
	import { locale } from '$lib/stores/locale';

	// Props
	interface Props {
		variant?: 'button' | 'dropdown' | 'flags';
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
	}

	let { variant = 'dropdown', size = 'md', showLabel = false }: Props = $props();

	// State
	let currentLocale = $state('en');
	let isOpen = $state(false);

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[LanguageToggler.svelte] ${message}`, error ? error : '');
	};

	// Language options
	const languages = [
		{ code: 'en' as const, name: 'English', flag: '🇺🇸' },
		{ code: 'ar' as const, name: 'العربية', flag: '🇸🇦' }
	];

	// Size classes
	const sizeClasses = {
		sm: 'w-8 h-8 text-sm',
		md: 'w-10 h-10 text-base',
		lg: 'w-12 h-12 text-lg'
	};

	// Subscribe to locale store
	locale.subscribe(value => {
		currentLocale = value;
	});

	// Set specific language
	const setLanguage = (newLocale: 'en' | 'ar') => {
		try {
			locale.set(newLocale);
			isOpen = false;
			logger(`Language set to: ${newLocale}`);
		} catch (error) {
			logger('Error setting language:', error);
		}
	};

	// Get current language info
	const currentLanguage = $derived(languages.find(lang => lang.code === currentLocale));
</script>

<!-- Button Variant -->
{#if variant === 'button'}
	<button
		onclick={() => setLanguage(currentLocale === 'en' ? 'ar' : 'en')}
		class="btn btn-ghost btn-circle group relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 {sizeClasses[size]}"
		aria-label="Toggle language"
		title={currentLanguage?.name}
	>
		<span class="text-2xl group-hover:scale-110 transition-transform duration-300">
			{currentLanguage?.flag}
		</span>
	</button>
{/if}

<!-- Dropdown Variant -->
{#if variant === 'dropdown'}
	<div class="dropdown dropdown-end">
		<button
			class="btn btn-ghost btn-circle {sizeClasses[size]}"
			aria-label="Language selector"
			onclick={() => isOpen = !isOpen}
		>
			<span class="text-xl">
				{currentLanguage?.flag}
			</span>
		</button>
		<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow-lg border">
			{#each languages as language}
				<li>
					<button
						onclick={() => setLanguage(language.code)}
						class="flex items-center gap-3 {currentLocale === language.code ? 'active' : ''}"
					>
						<span class="text-lg">{language.flag}</span>
						<span class="font-medium">{language.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<!-- Flags Variant -->
{#if variant === 'flags'}
	<div class="flex gap-2">
		{#each languages as language}
			<button
				onclick={() => setLanguage(language.code)}
				class="btn btn-ghost btn-circle {sizeClasses[size]} {currentLocale === language.code ? 'bg-primary/10 text-primary' : ''}"
				aria-label={language.name}
				title={language.name}
			>
				<span class="text-xl hover:scale-110 transition-transform duration-300">
					{language.flag}
				</span>
			</button>
		{/each}
	</div>
{/if}

<style>
	/* RTL Support */
	:global([dir="rtl"]) .dropdown-end {
		right: auto;
		left: 0;
	}

	:global([dir="rtl"]) .dropdown-content {
		text-align: right;
	}

	/* Smooth transitions */
	.btn {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
