/**
 * Default list of restricted URL patterns.
 * Content scripts are restricted on these URLs.
 */
export const DEFAULT_RESTRICTED_URLS = [
	/^chrome:\/\/.*/,
	/^about:.*/,
	/^view-source:.*/,
	/^devtools:\/\/.*/,
	/^chrome-error:\/\/.*/,
	/^chrome-extension:\/\/.*/,
	/^https:\/\/chromewebstore\.google\.com\/.*/,
];

export interface CanIExtendOptions {
	/**
	 * List of regex patterns for restricted URLs.
	 * If specified, these will be added to the default list.
	 */
	restrictedUrls?: RegExp[];
}

/**
 * Checks if a given URL is available for Chrome extension features
 * (e.g., if content scripts can be injected).
 *
 * @param url The URL string to check.
 * @param options Options to customize the check (e.g., adding restricted URLs).
 * @returns True if available, false if restricted.
 */
export function canIExtend(url: string, options?: CanIExtendOptions): boolean {
	if (DEFAULT_RESTRICTED_URLS.some((pattern) => pattern.test(url))) {
		return false;
	}

	if (options?.restrictedUrls?.some((pattern) => pattern.test(url))) {
		return false;
	}

	return true;
}
