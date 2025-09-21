import type { PageLoad } from './$types';
import contactDataEn from '$lib/data/contact.json';

export const load: PageLoad = async ({ url }) => {
	try {
		// Get language from URL search params, default to 'en'
		const lang = url.searchParams.get('lang') || 'en';
		const validLang = (lang === 'ar') ? 'ar' : 'en';
		
		// Load data based on language
		const contactData = contactDataEn[validLang];
		
		console.log('Contact page loader - lang:', validLang, 'contactData:', contactData);
		
		return {
			contactData
		};
	} catch (error) {
		console.error('Error loading contact page data:', error);
		return {
			contactData: null
		};
	}
};
