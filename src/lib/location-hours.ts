import type { LocationData } from './profile-types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CLOCK = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true });

function displayTime(value: string): string {
  const [hour, minute] = value.split(':').map(Number);
  const time = CLOCK.format(new Date(Date.UTC(2000, 0, 1, hour, minute))).replace(/\s+/g, ' ');
  return value === '24:00' ? `${time} (next day)` : time;
}

export function formatLocationHours(hours: LocationData['openingHoursSpecification'], timezone?: string): string | undefined {
  if (!hours.length) return undefined;
  const rows = hours.map(row => {
    const groups: number[][] = [];
    DAYS.forEach((day, index) => {
      if (!row.dayOfWeek.includes(day)) return;
      const previous = groups[groups.length - 1];
      if (previous && previous[previous.length - 1] === index - 1) previous.push(index);
      else groups.push([index]);
    });
    const days = groups.map(group => {
      const first = DAYS[group[0]].slice(0, 3);
      return group.length > 1 ? `${first}–${DAYS[group[group.length - 1]].slice(0, 3)}` : first;
    }).join(', ');
    return `${days}: ${displayTime(row.opens)}–${displayTime(row.closes)}`;
  });
  if (timezone) {
    const name = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'longGeneric' })
      .formatToParts(new Date(Date.UTC(2000, 0, 1))).find(part => part.type === 'timeZoneName')?.value;
    if (name) rows.push(name);
  }
  return rows.join('\n');
}
