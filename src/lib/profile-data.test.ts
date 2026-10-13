import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateLandingPage } from '../../sanity/lib/queries';
import { getBlurDataURL, validateImageUrl } from './image-utils';
import { safeHref, safeWebUrl } from './url-utils';

test('destinations preserve restaurant tasks and reject unsafe or placeholder links', () => {
  for (const url of ['https://buddashawaiian.com/menu', '/buddas', '#locations', 'tel:+18017857777', 'mailto:hello@buddashawaiian.com']) {
    assert.equal(safeHref(url), url);
  }
  for (const url of ['#', '//evil.test', '/\\evil.test', '/%5cevil.test', 'javascript:alert(1)', 'data:text/html,x', 'https://user:pass@buddashawaiian.com', 'https://example.com', 'mailto:hello@buddashawaiian.com%0d%0abcc:evil@test.com']) {
    assert.equal(safeHref(url), undefined);
  }
  assert.equal(safeWebUrl('tel:+18017857777'), undefined);
});

test('images use exact HTTPS hosts or local paths and blur placeholders need no Buffer', () => {
  assert.equal(validateImageUrl('https://cdn.sanity.io/images/a/b/c.png'), 'https://cdn.sanity.io/images/a/b/c.png');
  assert.equal(validateImageUrl('/logo.svg'), '/logo.svg');
  assert.equal(validateImageUrl('https://evilcdn.sanity.io/image.png'), undefined);
  assert.equal(validateImageUrl('http://images.unsplash.com/image.png'), undefined);
  assert.ok(getBlurDataURL().startsWith('data:image/svg+xml,'));
});

test('profile normalization preserves empty sections and never invents optional content', () => {
  const page = validateLandingPage({ brand: { name: 'Bakery' }, slug: { current: 'bakery' }, mainLinks: { menuUrl: '/menu' }, promos: [], linkList: [], locations: [], storySection: null, testimonials: [] });
  assert.ok(page);
  assert.equal(page.canonicalPath, '/p/bakery');
  assert.deepEqual(page.primaryAction, { label: 'View menu', url: '/menu' });
  assert.deepEqual(page.promos, []);
  assert.deepEqual(page.locations, []);
  assert.equal(page.storySection, undefined);
  assert.deepEqual(page.testimonials, []);
  assert.equal(validateLandingPage({ brand: { name: 'Bakery' }, enabled: false }, 'bakery'), null);
});

test('nested invalid content is safely omitted and disabled items stay hidden', () => {
  const page = validateLandingPage({
    slug: 'bakery', brand: { name: 'Bakery', logo: { asset: { _ref: 'bad' } } },
    primaryAction: { enabled: false, label: 'Order', url: '/order' }, mainLinks: { orderUrl: '/order' },
    promos: [null, { title: 'Hidden', enabled: false }, { _key: 'special', title: 'Special', image: { asset: { _ref: 'bad' } }, url: 'javascript:x' }],
    linkList: [null, { label: 'Unsafe', url: 'javascript:x' }, { _key: 'menu', label: 'Menu', url: '/menu' }],
    testimonials: [{ name: 'Sample', quote: 'Nice!' }, { _key: 'review', name: 'Guest', quote: 'Nice!', sourceUrl: 'https://buddashawaiian.com/reviews' }],
  });
  assert.ok(page);
  assert.equal(page.primaryAction, null);
  assert.equal(page.brand.logoUrl, undefined);
  assert.equal(page.promos.length, 1);
  assert.equal(page.promos[0].url, undefined);
  assert.equal(page.promos[0].imageUrl, undefined);
  assert.equal(page.linkList.length, 1);
  assert.equal(page.testimonials.length, 1);
});

test('invalid configured primary actions suppress automatic ordering fallback', () => {
  const page = validateLandingPage({ slug: 'bakery', brand: { name: 'Bakery' }, mainLinks: { orderUrl: '/order' }, primaryAction: { label: 'Unsafe', url: 'javascript:alert(1)' } });
  assert.ok(page);
  assert.equal(page.primaryAction, null);
});

test('location IDs are unique usable fragments even for invalid imported IDs', () => {
  const address = { streetAddress: '123 Main St', addressLocality: 'Provo', addressRegion: 'UT', postalCode: '84601', addressCountry: 'US' };
  const page = validateLandingPage({ slug: 'bakery', brand: { name: 'Bakery' }, locations: [
    { id: 'Main store', _key: 'stable', name: 'First', address },
    { id: 'stable', _key: 'second', name: 'Second', address },
    { id: '<script>', _key: 'bad key', name: 'Third', address },
  ] });
  assert.ok(page);
  assert.deepEqual(page.locations.map(branch => branch.id), ['stable', 'second', 'location-2']);
  for (const branch of page.locations) assert.equal(safeHref(`#${branch.id}`), `#${branch.id}`);
});

test('formatted phone numbers become callable and section IDs remain reserved', () => {
  const address = { streetAddress: '123 Main St', addressLocality: 'Provo', addressRegion: 'UT', postalCode: '84601', addressCountry: 'US' };
  const reserved = ['locations', 'location-cards', 'main-content', 'locations-heading', 'promotions', 'promotions-heading', 'qr-heading', 'qr-description'];
  const page = validateLandingPage({ slug: 'bakery', brand: { name: 'Bakery' }, locations: reserved.map((id, index) => ({ id, name: `Branch ${index}`, address, telephone: '+1 (801) 555-1234' })) });
  assert.ok(page);
  for (const branch of page.locations) {
    assert.equal(branch.telephone, '+18015551234');
    assert.equal(safeHref(`tel:${branch.telephone}`), 'tel:+18015551234');
    assert.ok(!reserved.includes(branch.id));
  }
  assert.equal(new Set(page.locations.map(branch => branch.id)).size, reserved.length);
});

test('each location retains its own identity, address, hours and destination', () => {
  const address = { streetAddress: '123 Main St', addressLocality: 'Provo', addressRegion: 'UT', postalCode: '84601', addressCountry: 'US' };
  const location = { _key: 'first', name: 'First', address, timezone: 'America/Denver', orderUrl: '/order/first', openingHoursSpecification: [{ dayOfWeek: ['Monday'], opens: '08:00', closes: '17:00' }] };
  for (const locations of [[location], [location, { ...location, _key: 'second', name: 'Second', orderUrl: '/order/second' }]]) {
    const page = validateLandingPage({ slug: 'bakery', brand: { name: 'Bakery' }, locations });
    assert.ok(page);
    assert.equal(page.locations.length, locations.length);
    assert.equal(page.locations[0].id, 'first');
    assert.equal(page.locations[0].orderUrl, '/order/first');
    assert.deepEqual(page.locations[0].openingHoursSpecification, location.openingHoursSpecification);
    if (locations.length === 2) assert.equal(page.locations[1].orderUrl, '/order/second');
  }
});

test('structured weekly hours override conflicting display text and numeric CMS keys stay stable', () => {
  const address = { streetAddress: '123 Main St', addressLocality: 'Provo', addressRegion: 'UT', postalCode: '84601', addressCountry: 'US' };
  const weekly = [{ dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' }];
  const page = validateLandingPage({ slug: 'bakery', brand: { name: 'Bakery' }, locations: [
    { _key: '123abc', name: 'First', address, timezone: 'America/Denver', hoursFull: 'Open every day until midnight', openingHoursSpecification: weekly },
    { _key: '456def', name: 'Second', address, hoursFull: 'Call for current hours', openingHoursSpecification: [] },
  ] });
  assert.ok(page);
  assert.equal(page.locations[0].id, 'location-123abc');
  assert.equal(page.locations[0].hoursFull, 'Mon–Sat: 8:00 AM–8:00 PM\nMountain Time');
  assert.deepEqual(page.locations[0].openingHoursSpecification, weekly);
  assert.equal(page.locations[1].hoursFull, 'Call for current hours');
});
