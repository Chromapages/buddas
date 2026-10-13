import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatLocationHours } from './location-hours';

test('weekly hours group consecutive weekdays and use the supplied time zone name', () => {
  assert.equal(formatLocationHours([
    { dayOfWeek: ['Thursday', 'Monday', 'Wednesday', 'Tuesday'], opens: '08:00', closes: '20:30' },
    { dayOfWeek: ['Friday', 'Saturday'], opens: '08:00', closes: '21:00' },
  ], 'America/Denver'), 'Mon–Thu: 8:00 AM–8:30 PM\nFri–Sat: 8:00 AM–9:00 PM\nMountain Time');
});

test('midnight and nonconsecutive days stay readable without invented open status', () => {
  assert.equal(formatLocationHours([{ dayOfWeek: ['Monday', 'Wednesday'], opens: '00:00', closes: '24:00' }]), 'Mon, Wed: 12:00 AM–12:00 AM (next day)');
  assert.equal(formatLocationHours([]), undefined);
});
