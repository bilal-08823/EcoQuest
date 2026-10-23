import { useMemo } from 'react';
import {
  GlassWater,
  Recycle,
  Zap,
  Leaf,
  Info,
  TrendingUp,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../AppContext';
import { CAMPUS_STATS, CATEGORY_COLORS, CATEGORY_LABELS, CHALLENGES } from '../data';
import { StatCard } from '../components/StatCard';
import earthHandImg from '../assets/earth-hand.jpg';

const WEEKLY_CAMPUS_DATA = [
  { day: 'Mon', actions: 245, energy: 110, bottles: 310 },
  { day: 'Tue', actions: 290, energy: 135, bottles: 380 },
  { day: 'Wed', actions: 340, energy: 160, bottles: 420 },
  { day: 'Thu', actions: 310, energy: 145, bottles: 390 },
  { day: 'Fri', actions: 385, energy: 175, bottles: 490 },
  { day: 'Sat', actions: 190, energy: 80, bottles: 260 },
  { day: 'Sun', actions: 160, energy: 60, bottles: 230 },
];

export function Impact() {
  const { state } = useApp();

  // Combine user actions with campus demo metrics
  const userActionsCount = state.completedChallenges.length;
  const userPoints = state.totalPoints;

  const totalCampusActions = CAMPUS_STATS.sustainableActions + userActionsCount;
  const totalBottles = CAMPUS_STATS.reusableBottles + Math.floor(userActionsCount * 1.5);
  const totalRecycled = CAMPUS_STATS.recyclableMaterial + Math.floor(userActionsCount * 0.8);
  const totalEnergy = CAMPUS_STATS.energyConserved + Math.floor(userActionsCount * 0.5);

  const campusGoal = 5000;
  const campusGoalProgress = Math.min(100, Math.round((totalCampusActions / campusGoal) * 100));

  // Category breakdown calculation
  const categoryBreakdown = useMemo(() => {
    const counts: Record<string, number> = {
      recycling: 680,
      energy: 390,
      water: 440,
      transport: 280,
      reusable: 510,
    };
    // add user completions accurately by category
    state.completedChallenges.forEach((completedItem) => {
      const challengeDef = CHALLENGES.find((ch) => ch.id === completedItem.challengeId);
      const cat = challengeDef?.category || 'reusable';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const sum = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts).map(([cat, count]) => ({
      category: cat,
      label: CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat,
      count,
      percentage: Math.round((count / sum) * 100),
      color: CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] || '#10B981',
    }));
  }, [state.completedChallenges]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest dark:text-emerald-400 tracking-tight">
          Campus Sustainability Impact
        </h1>
        <p className="text-sm text-muted dark:text-gray-400 mt-1">
          See the collective transformation our student community is achieving together.
        </p>
      </div>

      {/* Illustrative Demo Banner */}
      <div className="flex items-start gap-3 p-4 bg-sage/60 dark:bg-gray-800 rounded-2xl border border-emerald/20 text-xs text-charcoal dark:text-gray-300">
        <Info className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
        <div>
          <strong className="text-forest dark:text-emerald-400">Illustrative Demo Data:</strong> Campus-wide aggregate metrics shown below are realistic simulated statistics for this competition showcase. Personal metrics in the "Your Contribution" section reflect your live app activity.
        </div>
      </div>

      {/* Campus Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Bottles Kept Off Landfill"
          value={totalBottles.toLocaleString()}
          icon={<GlassWater className="w-6 h-6" />}
          color="#3B82F6"
          trend="+18% this month"
          animate
        />
        <StatCard
          title="Material Recycled (kg)"
          value={`${totalRecycled.toLocaleString()} kg`}
          icon={<Recycle className="w-6 h-6" />}
          color="#10B981"
          trend="+240 kg vs last week"
          animate
        />
        <StatCard
          title="Energy Conserved (kWh)"
          value={`${totalEnergy.toLocaleString()} kWh`}
          icon={<Zap className="w-6 h-6" />}
          color="#FBBF24"
          trend="Equiv. to 42 lab days"
          animate
        />
        <StatCard
          title="Total Eco Actions"
          value={totalCampusActions.toLocaleString()}
          icon={<Leaf className="w-6 h-6" />}
          color="#14532D"
          trend="1,240 active students"
          animate
        />
      </div>

      {/* Campus Goal Progress with Earth Visual */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-emerald/30 group">
            <img
              src={earthHandImg}
              alt="Our Shared Campus Earth"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex-1 w-full space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-charcoal dark:text-gray-100">
                  Semester Campus Goal: 5,000 Sustainable Actions
                </h3>
                <p className="text-xs text-muted dark:text-gray-400 mt-0.5">
                  Together we have achieved <strong className="text-emerald">{totalCampusActions.toLocaleString()}</strong> actions ({campusGoalProgress}% of our goal)
                </p>
              </div>
              <div className="text-right self-start sm:self-auto">
                <span className="text-2xl font-extrabold text-emerald">
                  {campusGoalProgress}%
                </span>
              </div>
            </div>

            <div className="h-4 w-full bg-sage dark:bg-gray-700 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-emerald rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${campusGoalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Weekly Activity Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-charcoal dark:text-gray-100">
                Weekly Campus Green Activity
              </h3>
              <p className="text-xs text-muted dark:text-gray-400">
                Logged sustainable actions by day of week
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald">
              <TrendingUp className="w-4 h-4" />
              <span>Campus Peak on Friday</span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_CAMPUS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(16, 185, 129, 0.08)' }}
                  contentStyle={{
                    backgroundColor: '#14532D',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="actions" fill="#10B981" radius={[8, 8, 0, 0]} name="Actions Logged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown (1 col) */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-charcoal dark:text-gray-100">
              Actions by Category
            </h3>
            <p className="text-xs text-muted dark:text-gray-400">
              Distribution of student initiatives
            </p>
          </div>

          <div className="space-y-3.5 pt-1">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-charcoal dark:text-gray-200">{item.label}</span>
                  <span className="text-muted dark:text-gray-400">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Contribution Section */}
      <div className="bg-gradient-to-br from-mint/40 via-white to-sage/40 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-6 sm:p-8 border border-emerald/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal dark:text-gray-100">
                Your Personal Contribution
              </h3>
              <p className="text-xs text-muted dark:text-gray-400">
                Calculated live from your {state.profile.name} account
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-700 text-xs font-bold text-emerald shadow-xs self-start sm:self-auto">
            <Users className="w-3.5 h-3.5" />
            <span>Campus Member #{state.profile.avatar}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-750 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-xs text-muted dark:text-gray-400 font-medium">Your EcoPoints</span>
            <p className="text-2xl font-extrabold text-emerald mt-1">
              {userPoints} pts
            </p>
            <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5">
              Ranked in top 10% active students
            </p>
          </div>
          <div className="bg-white dark:bg-gray-750 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-xs text-muted dark:text-gray-400 font-medium">Your Completed Actions</span>
            <p className="text-2xl font-extrabold text-forest dark:text-emerald-400 mt-1">
              {userActionsCount} actions
            </p>
            <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5">
              Directly tracked and verified
            </p>
          </div>
          <div className="bg-white dark:bg-gray-750 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <span className="text-xs text-muted dark:text-gray-400 font-medium">Estimated Bottles Diverted</span>
            <p className="text-2xl font-extrabold text-blue-500 mt-1">
              ~{Math.max(1, Math.floor(userActionsCount * 1.5))} bottles
            </p>
            <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5">
              Based on standard 1.5 refills/action
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Impact;
