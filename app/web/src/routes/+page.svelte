<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Locales } from '$i18n/i18n-types';
	import { baseLocale, locales } from '$i18n/i18n-util';
	import resolveAcceptLanguage from 'resolve-accept-language';

	const currentLocale = localStorage.getItem('currentLocale');

	if (currentLocale) {
		goto(`/${currentLocale}`, { replaceState: true });
	} else {
		const userLanguage = navigator.language;
		const preferredLocale = resolveAcceptLanguage(userLanguage, locales, baseLocale) as Locales;
		localStorage.setItem('currentLocale', preferredLocale);
		goto(`/${preferredLocale}`, { replaceState: true });
	}
</script>
