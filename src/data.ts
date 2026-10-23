import type { Challenge, Badge, Level, LeaderboardEntry, Category } from './types';

export const CHALLENGES: Challenge[] = [
  {
    id: 'carry-bottle',
    title: 'Carry a Reusable Bottle',
    description: 'Ditch single-use plastic bottles and carry your own reusable water bottle throughout the day. Every refill keeps one more plastic bottle out of landfills.',
    points: 20,
    category: 'recycling',
    difficulty: 'Easy',
    icon: 'GlassWater',
  },
  {
    id: 'recycle-paper',
    title: 'Recycle Paper or Plastic',
    description: 'Sort your waste and place paper, cardboard, or recyclable plastics into the correct recycling bins on campus. Proper sorting ensures materials actually get recycled.',
    points: 25,
    category: 'recycling',
    difficulty: 'Medium',
    icon: 'Recycle',
  },
  {
    id: 'switch-lights',
    title: 'Switch Off Unused Lights',
    description: 'Turn off lights when leaving a room, classroom, or study area. This simple habit can reduce campus energy consumption by up to 15%.',
    points: 10,
    category: 'energy',
    difficulty: 'Easy',
    icon: 'Lightbulb',
  },
  {
    id: 'walk-cycle',
    title: 'Walk or Cycle on Campus',
    description: 'Choose walking or cycling over motorized transport for your campus commute. Reduce your carbon footprint while staying fit and healthy.',
    points: 20,
    category: 'transport',
    difficulty: 'Medium',
    icon: 'Bike',
  },
  {
    id: 'reusable-lunch',
    title: 'Bring Reusable Lunch Container',
    description: 'Pack your lunch in a reusable container instead of buying food in disposable packaging. Save money and reduce waste at the same time.',
    points: 15,
    category: 'reusable',
    difficulty: 'Easy',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'avoid-plastic',
    title: 'Avoid Single-Use Plastic',
    description: 'Go an entire day without using single-use plastics — no straws, cups, bags, or cutlery. Challenge yourself to find sustainable alternatives.',
    points: 20,
    category: 'reusable',
    difficulty: 'Medium',
    icon: 'ShoppingBag',
  },
  {
    id: 'refill-station',
    title: 'Use a Refill Station',
    description: 'Refill your water bottle at a campus refill station instead of buying a new one. Help reduce plastic waste and track the bottles you save.',
    points: 15,
    category: 'water',
    difficulty: 'Easy',
    icon: 'Droplets',
  },
  {
    id: 'save-water',
    title: 'Save Water While Washing',
    description: 'Turn off the tap while soaping your hands or brushing your teeth. Small changes in water usage add up to thousands of liters saved each year.',
    points: 10,
    category: 'water',
    difficulty: 'Easy',
    icon: 'Droplet',
  },
  {
    id: 'reusable-bag',
    title: 'Bring a Reusable Shopping Bag',
    description: 'Carry a reusable tote bag for shopping instead of accepting plastic bags. One reusable bag replaces hundreds of single-use bags over its lifetime.',
    points: 15,
    category: 'reusable',
    difficulty: 'Easy',
    icon: 'ShoppingBag',
  },
  {
    id: 'pickup-litter',
    title: 'Pick Up & Dispose Litter',
    description: 'Spot litter on campus? Pick it up and dispose of it properly. Lead by example and inspire others to keep our shared spaces clean and green.',
    points: 25,
    category: 'recycling',
    difficulty: 'Hard',
    icon: 'Trash2',
  },
];

export const LEVELS: Level[] = [
  { name: 'Eco Rookie', minPoints: 0, maxPoints: 99 },
  { name: 'Green Explorer', minPoints: 100, maxPoints: 249 },
  { name: 'Planet Protector', minPoints: 250, maxPoints: 499 },
  { name: 'Eco Champion', minPoints: 500, maxPoints: 999 },
  { name: 'Campus Guardian', minPoints: 1000, maxPoints: Infinity },
];

export const BADGES: Badge[] = [
  {
    id: 'first-step',
    name: 'First Green Step',
    description: 'Complete your first sustainability challenge and begin your eco journey.',
    icon: 'Sprout',
    condition: 'Complete your first challenge',
    unlocked: false,
  },
  {
    id: 'recycling-hero',
    name: 'Recycling Hero',
    description: 'You\'ve shown true dedication to reducing waste through recycling.',
    icon: 'Recycle',
    condition: 'Complete 5 recycling challenges',
    unlocked: false,
  },
  {
    id: 'water-saver',
    name: 'Water Saver',
    description: 'Your water conservation efforts are making a real difference.',
    icon: 'Droplets',
    condition: 'Complete 5 water challenges',
    unlocked: false,
  },
  {
    id: 'energy-guardian',
    name: 'Energy Guardian',
    description: 'You\'re leading the charge in campus energy conservation.',
    icon: 'Zap',
    condition: 'Complete 5 energy challenges',
    unlocked: false,
  },
  {
    id: 'three-day-streak',
    name: 'Three-Day Streak',
    description: 'Consistency is key! You\'ve completed challenges on 3 consecutive days.',
    icon: 'Flame',
    condition: 'Complete challenges on 3 consecutive days',
    unlocked: false,
  },
  {
    id: 'eco-champion',
    name: 'Eco Champion',
    description: 'With 500 points earned, you\'ve proven yourself as a true eco champion.',
    icon: 'Award',
    condition: 'Reach 500 points',
    unlocked: false,
  },
  {
    id: 'campus-guardian',
    name: 'Campus Guardian',
    description: 'The ultimate sustainability milestone — 1,000 points and counting!',
    icon: 'Shield',
    condition: 'Reach 1,000 points',
    unlocked: false,
  },
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { id: '1', name: 'Aarav Sharma', avatar: 'AS', points: 1250, level: 'Campus Guardian' },
  { id: '2', name: 'Priya Patel', avatar: 'PP', points: 980, level: 'Eco Champion' },
  { id: '3', name: 'Rohan Mehta', avatar: 'RM', points: 745, level: 'Eco Champion' },
  { id: '4', name: 'Ananya Gupta', avatar: 'AG', points: 620, level: 'Eco Champion' },
  { id: '5', name: 'Vikram Singh', avatar: 'VS', points: 510, level: 'Eco Champion' },
  { id: '6', name: 'Sneha Reddy', avatar: 'SR', points: 430, level: 'Planet Protector' },
  { id: '7', name: 'Arjun Nair', avatar: 'AN', points: 310, level: 'Planet Protector' },
  { id: '8', name: 'Kavya Iyer', avatar: 'KI', points: 225, level: 'Green Explorer' },
  { id: '9', name: 'Devansh Joshi', avatar: 'DJ', points: 140, level: 'Green Explorer' },
  { id: '10', name: 'Meera Kulkarni', avatar: 'MK', points: 85, level: 'Eco Rookie' },
];

export const CAMPUS_STATS = {
  reusableBottles: 2480,
  recyclableMaterial: 1360,
  energyConserved: 845,
  sustainableActions: 1920,
};

export const CATEGORY_LABELS: Record<Category, string> = {
  recycling: 'Recycling',
  energy: 'Energy',
  water: 'Water',
  transport: 'Transport',
  reusable: 'Reusable',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  recycling: '#10B981',
  energy: '#FBBF24',
  water: '#3B82F6',
  transport: '#8B5CF6',
  reusable: '#FB7185',
};
