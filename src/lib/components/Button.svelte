<script lang="ts">
	// Props
	interface Props {
		variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'link';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		shape?: 'square' | 'circle' | 'normal';
		loading?: boolean;
		disabled?: boolean;
		href?: string;
		onclick?: () => void;
		class?: string;
		children: any;
	}

	let {
		variant = 'primary',
		size = 'md',
		shape = 'normal',
		loading = false,
		disabled = false,
		href,
		onclick,
		class: className = '',
		children
	}: Props = $props();

	// Logger function for error handling
	const logger = (message: string, error?: any) => {
		console.log(`[Button.svelte] ${message}`, error ? error : '');
	};

	// Size classes
	const sizeClasses = {
		xs: 'btn-xs',
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg',
		xl: 'btn-xl'
	};

	// Shape classes
	const shapeClasses = {
		square: 'btn-square',
		circle: 'btn-circle',
		normal: ''
	};

	// Handle click
	const handleClick = () => {
		try {
			if (!disabled && !loading && onclick) {
				onclick();
				logger('Button clicked');
			}
		} catch (error) {
			logger('Error handling button click:', error);
		}
	};

	// Base classes
	const baseClasses = `btn btn-${variant} ${sizeClasses[size]} ${shapeClasses[shape]} ${loading ? 'loading' : ''} ${disabled ? 'btn-disabled' : ''} hover:scale-105 transition-all duration-300 ${className}`;
</script>

{#if href}
	<a {href} class={baseClasses} onclick={handleClick}>
		{@render children?.()}
	</a>
{:else}
	<button class={baseClasses} {disabled} onclick={handleClick}>
		{@render children?.()}
	</button>
{/if}

<style>
	/* Custom button animations */
	.btn {
		position: relative;
		overflow: hidden;
	}

	.btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}

	.btn:hover::before {
		left: 100%;
	}

	/* RTL Support */
	:global([dir="rtl"]) .btn {
		text-align: right;
	}
</style>



