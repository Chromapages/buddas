// Addresses, phones and hours: https://buddashawaiian.com/ (verified 2026-10-12).
export const restaurantLocations = [
  {
    id: "pleasant-grove",
    name: "Pleasant Grove",
    address: {
      streetAddress: "205 East 700 South",
      addressLocality: "Pleasant Grove",
      addressRegion: "UT",
      postalCode: "84062",
      addressCountry: "US",
    },
    telephone: "+18017010617",
    openingHoursSpecification: [
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "20:00" },
      { dayOfWeek: ["Sunday"], opens: "08:00", closes: "14:00" },
    ],
    hoursFull: "Mon–Sat: 8am–8pm\nSun: 8am–2pm (Mountain Time)",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=205+East+700+South+Pleasant+Grove+UT+84062",
  },
  {
    id: "salt-lake-city",
    name: "Salt Lake City",
    address: {
      streetAddress: "1465 S State St #12",
      addressLocality: "Salt Lake City",
      addressRegion: "UT",
      postalCode: "84115",
      addressCountry: "US",
    },
    telephone: "+13852027184",
    openingHoursSpecification: [
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "19:40" },
      { dayOfWeek: ["Friday", "Saturday"], opens: "08:00", closes: "21:30" },
      { dayOfWeek: ["Sunday"], opens: "08:00", closes: "14:00" },
    ],
    hoursFull: "Mon–Thu: 8am–7:40pm\nFri–Sat: 8am–9:30pm\nSun: 8am–2pm (Mountain Time)",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=1465+S+State+St+%2312+Salt+Lake+City+UT+84115",
  },
];
