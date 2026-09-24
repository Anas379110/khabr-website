import type { CollectionEntry } from 'astro:content';

export function isPublished(entry: CollectionEntry<'posts'>): boolean {
  return entry.data.reviewedBy.trim() !== '';
}

/**
 * قاعدة صارمة من SRS.md (NFR/Error Flow):
 * خبر سياسي بمصدر واحد يجب أن يحمل unverifiedSingleSource=true صراحة،
 * وإلا فهو غير صالح للنشر (يجب أن يحمل مصدرين أو يُوسَم بوضوح — لا حالة وسطى مخفية).
 */
export function isSourcingValid(entry: CollectionEntry<'posts'>): boolean {
  const hasMultipleSources = entry.data.sources.length >= 2;
  return hasMultipleSources || entry.data.unverifiedSingleSource === true;
}

export function sortByDateDesc(entries: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  return [...entries].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function isSensitive(entry: CollectionEntry<'posts'>): boolean {
  return entry.data.sensitivity === 'حساس_قيد_المراجعة';
}
