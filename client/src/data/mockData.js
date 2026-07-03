// mockData.js - Realistic dummy data for EcoSort AI v2 Dashboard

export const dashboardStats = {
  wasteScanned: 142,
  itemsRecycled: 86,
  ecoPoints: 1280,
  co2Saved: 24, // in kg
};

export const ecoScore = {
  currentLevel: 'Green Starter',
  nextLevel: 'Eco Warrior',
  points: 1280,
  progress: 62, // percentage
};

export const wasteClassifications = [
  { id: 'wet', name: 'Wet Waste', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { id: 'dry', name: 'Dry Waste', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { id: 'recyclable', name: 'Recyclable', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'hazardous', name: 'Hazardous', color: 'text-red-400', bg: 'bg-red-500/20' },
];

export const recentActivity = [
  { id: 1, type: 'recyclable', item: 'Plastic Water Bottle', tag: 'Safe', time: '10 mins ago', user: 'ABHII' },
  { id: 2, type: 'organic', item: 'Banana Peel', tag: 'Organic', time: '25 mins ago', user: 'Meera' },
  { id: 3, type: 'hazardous', item: 'Used AA Battery', tag: 'Danger', time: '1 hour ago', user: 'System' },
  { id: 4, type: 'recyclable', item: 'Cardboard Box', tag: 'Safe', time: '2 hours ago', user: 'ABHII' },
];

// Weekly Analytics Data for Recharts
export const wasteTrendData = [
  { name: 'Mon', recyclable: 45, organic: 24, hazardous: 2 },
  { name: 'Tue', recyclable: 30, organic: 13, hazardous: 1 },
  { name: 'Wed', recyclable: 20, organic: 38, hazardous: 3 },
  { name: 'Thu', recyclable: 27, organic: 39, hazardous: 4 },
  { name: 'Fri', recyclable: 18, organic: 48, hazardous: 1 },
  { name: 'Sat', recyclable: 23, organic: 38, hazardous: 1 },
  { name: 'Sun', recyclable: 34, organic: 43, hazardous: 0 },
];
