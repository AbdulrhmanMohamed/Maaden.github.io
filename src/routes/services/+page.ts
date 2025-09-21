import type { PageLoad } from './$types';
import servicesDataEn from '$lib/data/services.json';

export const load: PageLoad = async ({ url }) => {
	try {
		// Get language from URL search params, default to 'en'
		const lang = url.searchParams.get('lang') || 'en';
		const validLang = (lang === 'ar') ? 'ar' : 'en';
		
		// Load data based on language
		const servicesData = servicesDataEn[validLang];
		
		return {
			servicesData
		};
	} catch (error) {
		console.error('Error loading services page data:', error);
		return {
			servicesData: null
		};
	}
};
