import { describe, it, expect } from 'vitest';
import { isPublished, isSourcingValid, sortByDateDesc, isSensitive } from './content';
import type { CollectionEntry } from 'astro:content';

function makeEntry(overrides: Partial<CollectionEntry<'posts'>['data']> & { slug?: string }) {
  const { slug = 'test-slug', ...data } = overrides;
  return {
    slug,
    data: {
      title: 'خبر تجريبي',
      publishDate: new Date('2026-01-01'),
      type: 'خبر' as const,
      sensitivity: 'عادي' as const,
      sources: ['مصدر واحد'],
      unverifiedSingleSource: false,
      reviewedBy: '',
      aiGenerated: false,
      excerpt: 'ملخص',
      ...data,
    },
  } as unknown as CollectionEntry<'posts'>;
}

describe('isSourcingValid — القاعدة الأصرم بالبرنامج', () => {
  it('يرفض مصدر واحد بلا وسم صريح', () => {
    expect(isSourcingValid(makeEntry({ sources: ['مصدر واحد'], unverifiedSingleSource: false }))).toBe(false);
  });

  it('يقبل مصدر واحد مع وسم صريح unverifiedSingleSource', () => {
    expect(isSourcingValid(makeEntry({ sources: ['مصدر واحد'], unverifiedSingleSource: true }))).toBe(true);
  });

  it('يقبل مصدرين فأكثر دون الحاجة للوسم', () => {
    expect(isSourcingValid(makeEntry({ sources: ['مصدر أول', 'مصدر ثانٍ'], unverifiedSingleSource: false }))).toBe(true);
  });
});

describe('isPublished', () => {
  it('يرفض بلا مراجع بشري', () => {
    expect(isPublished(makeEntry({ reviewedBy: '' }))).toBe(false);
  });
});

describe('isSensitive', () => {
  it('يحدد المحتوى الحساس بدقة', () => {
    expect(isSensitive(makeEntry({ sensitivity: 'حساس_قيد_المراجعة' }))).toBe(true);
    expect(isSensitive(makeEntry({ sensitivity: 'عادي' }))).toBe(false);
  });
});

describe('sortByDateDesc', () => {
  it('الأحدث أولًا', () => {
    const old = makeEntry({ slug: 'old', publishDate: new Date('2025-01-01') });
    const recent = makeEntry({ slug: 'recent', publishDate: new Date('2026-06-01') });
    expect(sortByDateDesc([old, recent])[0].slug).toBe('recent');
  });
});
