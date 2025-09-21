<!--
	Theme Toggler Usage Examples
	
	This file demonstrates how to use the different theme toggler components
	in your SvelteKit application.
-->

<script lang="ts">
	import { ThemeToggler, ThemeTogglerAdvanced } from '$lib/components';
</script>

<!-- Example 1: Simple Button Toggler -->
<div class="mb-8">
	<h3 class="text-xl font-semibold mb-4">Simple Button Toggler</h3>
	<ThemeToggler />
</div>

<!-- Example 2: Switch with Label -->
<div class="mb-8">
	<h3 class="text-xl font-semibold mb-4">Switch with Label</h3>
	<ThemeTogglerAdvanced variant="switch" showLabel={true} />
</div>

<!-- Example 3: Dropdown Menu -->
<div class="mb-8">
	<h3 class="text-xl font-semibold mb-4">Dropdown Menu</h3>
	<ThemeTogglerAdvanced variant="dropdown" />
</div>

<!-- Example 4: Different Sizes -->
<div class="mb-8">
	<h3 class="text-xl font-semibold mb-4">Different Sizes</h3>
	<div class="flex gap-4 items-center">
		<ThemeTogglerAdvanced variant="button" size="sm" />
		<ThemeTogglerAdvanced variant="button" size="md" />
		<ThemeTogglerAdvanced variant="button" size="lg" />
	</div>
</div>

<!-- Example 5: Floating Position Options -->
<div class="mb-8">
	<h3 class="text-xl font-semibold mb-4">Floating Positions</h3>
	<p class="text-sm text-base-content/70 mb-4">
		Note: Only one floating toggler should be used per page. These are for demonstration.
	</p>
	<div class="grid grid-cols-2 gap-4">
		<div class="relative h-32 border-2 border-dashed border-base-300 rounded-lg">
			<ThemeTogglerAdvanced variant="floating" position="top-left" />
			<div class="absolute top-2 left-2 text-xs text-base-content/50">Top Left</div>
		</div>
		<div class="relative h-32 border-2 border-dashed border-base-300 rounded-lg">
			<ThemeTogglerAdvanced variant="floating" position="top-right" />
			<div class="absolute top-2 right-2 text-xs text-base-content/50">Top Right</div>
		</div>
		<div class="relative h-32 border-2 border-dashed border-base-300 rounded-lg">
			<ThemeTogglerAdvanced variant="floating" position="bottom-left" />
			<div class="absolute bottom-2 left-2 text-xs text-base-content/50">Bottom Left</div>
		</div>
		<div class="relative h-32 border-2 border-dashed border-base-300 rounded-lg">
			<ThemeTogglerAdvanced variant="floating" position="bottom-right" />
			<div class="absolute bottom-2 right-2 text-xs text-base-content/50">Bottom Right</div>
		</div>
	</div>
</div>

<!-- Example 6: Custom Styling -->
<div class="mb-8">
	<h3 class="text-xl font-semibold mb-4">Custom Styling</h3>
	<div class="flex gap-4 items-center">
		<!-- Custom colored button -->
		<button
			onclick={() => {
				// You can add custom click handlers here
				console.log('Custom theme toggle clicked');
			}}
			class="btn btn-primary btn-circle"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="5" />
				<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
			</svg>
		</button>
		
		<!-- Custom styled switch -->
		<div class="form-control">
			<label class="label cursor-pointer gap-3">
				<span class="label-text font-bold text-primary">Madeen Theme</span>
				<input type="checkbox" class="toggle toggle-primary toggle-lg" />
			</label>
		</div>
	</div>
</div>

<!-- Usage Instructions -->
<div class="alert alert-info">
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
	</svg>
	<div>
		<h4 class="font-bold">Usage Instructions</h4>
		<div class="text-sm">
			<p class="mb-2"><strong>Basic Usage:</strong> Import and use the components directly in your Svelte files.</p>
			<p class="mb-2"><strong>Props:</strong> The ThemeTogglerAdvanced component accepts variant, size, showLabel, and position props.</p>
			<p class="mb-2"><strong>Persistence:</strong> Theme preferences are automatically saved to localStorage.</p>
			<p><strong>Accessibility:</strong> All components include proper ARIA labels and keyboard navigation support.</p>
		</div>
	</div>
</div>



