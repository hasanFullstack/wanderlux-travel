import type { Airport, CabinClass, Flight } from "@/lib/types";

export const airports: Airport[] = [
  { city: "New York", code: "JFK", country: "United States" },
  { city: "Los Angeles", code: "LAX", country: "United States" },
  { city: "London", code: "LHR", country: "United Kingdom" },
  { city: "Paris", code: "CDG", country: "France" },
  { city: "Rome", code: "FCO", country: "Italy" },
  { city: "Istanbul", code: "IST", country: "Türkiye" },
  { city: "Dubai", code: "DXB", country: "United Arab Emirates" },
  { city: "Lahore", code: "LHE", country: "Pakistan" },
  { city: "Karachi", code: "KHI", country: "Pakistan" },
  { city: "Islamabad", code: "ISB", country: "Pakistan" },
  { city: "Singapore", code: "SIN", country: "Singapore" },
  { city: "Tokyo", code: "HND", country: "Japan" },
  { city: "Bali", code: "DPS", country: "Indonesia" },
];

export const cabinClasses: CabinClass[] = [
  "Economy",
  "Premium Economy",
  "Business",
  "First",
];

const airport = (code: string): Airport => {
  const match = airports.find((a) => a.code === code);
  if (!match) throw new Error(`Unknown airport code: ${code}`);
  return match;
};

type Row = [
  airline: string,
  airlineCode: string,
  number: number,
  from: string,
  to: string,
  depart: string,
  arrive: string,
  dayOffset: 0 | 1,
  durationMinutes: number,
  stopover: string | null,
  cabin: CabinClass,
  price: number,
  seatsLeft: number,
];

// Compact rows keep the mock schedule readable.
const rows: Row[] = [
  ["Aurora Airways", "AU", 101, "JFK", "LHR", "08:15", "20:05", 0, 410, null, "Economy", 620, 9],
  ["Skyward Air", "SW", 212, "JFK", "LHR", "18:40", "06:55", 1, 435, null, "Business", 2890, 4],
  ["Nordic Blue", "NB", 330, "JFK", "LHR", "21:10", "13:20", 1, 670, "Reykjavík", "Economy", 455, 12],
  ["Aurora Airways", "AU", 102, "LHR", "JFK", "11:30", "14:35", 0, 485, null, "Economy", 590, 7],
  ["Skyward Air", "SW", 411, "JFK", "CDG", "19:05", "08:30", 1, 445, null, "Premium Economy", 1180, 6],
  ["Meridian Air", "MR", 18, "LHR", "CDG", "07:45", "10:00", 0, 75, null, "Economy", 140, 22],
  ["Meridian Air", "MR", 22, "LHR", "CDG", "16:20", "18:35", 0, 75, null, "Business", 420, 5],
  ["Falcon Gulf", "FG", 1, "DXB", "LHR", "07:30", "11:45", 0, 495, null, "Economy", 540, 14],
  ["Falcon Gulf", "FG", 3, "DXB", "LHR", "14:15", "18:35", 0, 500, null, "First", 5450, 2],
  ["Falcon Gulf", "FG", 622, "LHE", "DXB", "04:10", "06:25", 0, 195, null, "Economy", 210, 18],
  ["Falcon Gulf", "FG", 624, "LHE", "DXB", "22:40", "00:55", 1, 195, null, "Business", 780, 6],
  ["Atlas Global", "AG", 760, "KHI", "DXB", "09:20", "10:45", 0, 145, null, "Economy", 165, 25],
  ["Atlas Global", "AG", 785, "KHI", "LHR", "02:30", "11:40", 0, 730, "Dubai", "Economy", 690, 8],
  ["Atlas Global", "AG", 785, "ISB", "LHR", "10:00", "15:25", 0, 565, null, "Economy", 720, 10],
  ["Skyward Air", "SW", 905, "ISB", "LHR", "03:15", "08:50", 0, 575, null, "Business", 2350, 3],
  ["Aurora Airways", "AU", 640, "LHE", "IST", "06:50", "11:05", 0, 375, null, "Economy", 330, 11],
  ["Meridian Air", "MR", 47, "IST", "FCO", "13:40", "15:10", 0, 150, null, "Economy", 185, 16],
  ["Falcon Gulf", "FG", 318, "DXB", "HND", "02:45", "17:35", 0, 590, null, "Business", 3120, 4],
  ["Falcon Gulf", "FG", 312, "DXB", "HND", "08:05", "22:45", 0, 580, null, "Economy", 860, 13],
  ["Sakura Wings", "SK", 12, "SIN", "HND", "07:55", "15:50", 0, 415, null, "Economy", 470, 15],
  ["Sakura Wings", "SK", 8, "LAX", "HND", "11:20", "15:30", 1, 670, null, "Premium Economy", 1490, 6],
  ["Pacific Crest", "PC", 33, "LAX", "HND", "23:55", "05:10", 1, 675, null, "Economy", 780, 20],
  ["Skyward Air", "SW", 318, "LHR", "SIN", "21:30", "18:05", 1, 815, null, "Business", 3680, 5],
  ["Pacific Crest", "PC", 502, "LHR", "SIN", "10:15", "09:40", 1, 865, "Dubai", "Economy", 735, 9],
  ["Pacific Crest", "PC", 214, "DXB", "DPS", "09:45", "02:10", 1, 745, "Singapore", "Economy", 640, 10],
  ["Pacific Crest", "PC", 88, "SIN", "DPS", "12:30", "15:05", 0, 155, null, "Economy", 120, 30],
  ["Aurora Airways", "AU", 770, "JFK", "DXB", "22:15", "19:40", 1, 805, null, "Economy", 910, 8],
  ["Nordic Blue", "NB", 615, "LAX", "LHR", "16:30", "11:00", 1, 630, null, "Economy", 610, 17],
];

export const flights: Flight[] = rows.map(
  (
    [airline, airlineCode, number, from, to, depart, arrive, dayOffset, duration, stopover, cabin, price, seatsLeft],
    index,
  ) => ({
    id: `fl-${index + 1}`,
    airline,
    airlineCode,
    flightNumber: `${airlineCode} ${number}`,
    from: airport(from),
    to: airport(to),
    departTime: depart,
    arriveTime: arrive,
    dayOffset,
    durationMinutes: duration,
    stops: stopover ? 1 : 0,
    stopover: stopover ?? undefined,
    cabin,
    price,
    seatsLeft,
    baggage: cabin === "Economy" ? "1 × 23 kg" : "2 × 32 kg",
    refundable: cabin !== "Economy",
  }),
);
