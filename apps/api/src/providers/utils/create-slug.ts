
/**
 * Create a URL-friendly slug from an arbitrary string.
 *
 * Behavior:
 * - Normalizes Unicode and strips diacritics.
 * - Replaces whitespace, punctuation and symbol characters with the separator.
 * - Collapses repeated separators and trims them from ends.
 * - Optionally lowercases the result and enforces a max length.
 *
 * @param text - Input text to slugify
 * @param opts.separator - Character used to separate words (default: `-`)
 * @param opts.lowercase - Convert to lower case (default: true)
 * @param opts.maxLength - Optional maximum length for the slug
 */
export function createSlug(
	text: string,
	opts: { separator?: string; lowercase?: boolean; maxLength?: number } = {}
): string {
	const { separator = '-', lowercase = true, maxLength } = opts;
	if (!text) return '';

	// Normalize and remove diacritics
	let slug = text
		.normalize('NFKD')
		.replace(/\p{M}/gu, '') // remove diacritic marks
		// Replace spaces, punctuation and symbols with the separator
		.replace(/[\s\p{P}\p{S}]+/gu, separator)
		// Collapse multiple separators
		.replace(new RegExp(`${separator}+`, 'g'), separator)
		// Trim separators from the ends
		.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

	if (typeof maxLength === 'number' && maxLength > 0 && slug.length > maxLength) {
		slug = slug.slice(0, maxLength);
		// Trim any trailing separator produced by the slice
		slug = slug.replace(new RegExp(`${separator}+$`), '');
	}

	if (lowercase) slug = slug.toLowerCase();

	return slug;
}

export default createSlug
