import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Frown, 
  Meh, 
  Laugh, 
  Angry, 
  Clock, 
  Calendar, 
  Plus, 
  BarChart2,
  Activity,
  TrendingUp,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const moodIcons = {
  'very-happy': { 
    icon: Laugh, 
    color: 'text-green-500',
    bg: 'bg-green-50',
    label: 'Very Happy'
  },
  happy: { 
    icon: Smile, 
    color: 'text-emerald-400',
    bg: 'bg-emerald-50',
    label: 'Happy'
  },
  neutral: { 
    icon: Meh, 
    color: 'text-yellow-400',
    bg: 'bg-yellow-50',
    label: 'Neutral'
  },
  sad: { 
    icon: Frown, 
    color: 'text-blue-400',
    bg: 'bg-blue-50',
    label: 'Sad'
  },
  'very-sad': { 
    icon: Angry, 
    color: 'text-red-500',
    bg: 'bg-red-50',
    label: 'Very Sad'
  },
};

type MoodEntry = {
  id: string;
  mood: keyof typeof moodIcons;
  note: string;
  timestamp: Date;
  activities: string[];
};

const activitiesList = [
  'Work', 'Exercise', 'Social', 'Family', 'Alone',
  'Resting', 'Eating', 'Shopping', 'Commuting', 'Entertainment'
];

export function MoodTracker() {
  const [currentMood, setCurrentMood] = useState<keyof typeof moodIcons | null>(null);
  const [note, setNote] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved mood history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      // Convert string dates back to Date objects
      const historyWithDates = parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setMoodHistory(historyWithDates);
    }
  }, []);

  const handleMoodSelect = (mood: keyof typeof moodIcons) => {
    setCurrentMood(mood);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = () => {
    if (!currentMood) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: currentMood,
        note,
        timestamp: new Date(),
        activities: [...selectedActivities]
      };

      const updatedHistory = [newEntry, ...moodHistory];
      setMoodHistory(updatedHistory);
      localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      
      // Reset form
      setCurrentMood(null);
      setNote('');
      setSelectedActivities([]);
      setIsSubmitting(false);
    }, 800);
  };

  const getMoodFrequency = () => {
    const frequency: Record<string, number> = {};
    moodHistory.forEach(entry => {
      frequency[entry.mood] = (frequency[entry.mood] || 0) + 1;
    });
    return frequency;
  };

  const moodFrequency = getMoodFrequency();
  const totalEntries = moodHistory.length;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Track your emotional well-being and identify patterns over time
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        <button
          className={`py-3 px-6 font-medium text-sm flex items-center gap-2 ${
            activeTab === 'log' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('log')}
        >
          <Plus className="w-4 h-4" />
          Log Mood
        </button>
        <button
          className={`py-3 px-6 font-medium text-sm flex items-center gap-2 ${
            activeTab === 'history' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('history')}
        >
          <Activity className="w-4 h-4" />
          History & Insights
        </button>
      </div>

      {activeTab === 'log' ? (
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">How are you feeling right now?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(moodIcons).map(([key, { icon: Icon, color, label }]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-4 rounded-xl w-28 transition-all ${
                    currentMood === key 
                      ? 'bg-primary/10 ring-2 ring-primary/30' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => handleMoodSelect(key as keyof typeof moodIcons)}
                >
                  <Icon className={`w-8 h-8 mb-2 ${color}`} />
                  <span className="text-sm font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {currentMood && (
            <>
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">What were you doing? (Optional)</h3>
                <div className="flex flex-wrap gap-2">
                  {activitiesList.map(activity => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      className={`px-3 py-1.5 text-sm rounded-full border ${
                        selectedActivities.includes(activity)
                          ? 'bg-primary/10 text-primary border-primary/20'
                          : 'bg-background hover:bg-accent border-border'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="note" className="block text-sm font-medium mb-2">
                  Add a note (Optional)
                </label>
                <textarea
                  id="note"
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 bg-background"
                  placeholder="What's on your mind?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-6 text-base"
              >
                {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Mood Stats */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-4">Your Mood Overview</h2>
            
            {totalEntries === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No mood entries yet. Log your first mood to see insights.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {Object.entries(moodIcons).map(([key, { icon: Icon, color, label }]) => (
                    <div key={key} className="text-center p-3 rounded-lg bg-accent/30">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="font-medium">{moodFrequency[key] || 0}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Entries</span>
                    <span className="font-medium">{totalEntries}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Streak</span>
                    <span className="font-medium">
                      {totalEntries > 0 ? '3 days' : 'Start tracking!'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Recent Entries */}
          {moodHistory.length > 0 && (
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
              <div className="space-y-4">
                {moodHistory.slice(0, 5).map(entry => {
                  const { icon: MoodIcon, color, label } = moodIcons[entry.mood];
                  return (
                    <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30">
                      <div className={`p-2 rounded-lg ${moodIcons[entry.mood].bg}`}>
                        <MoodIcon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{label}</span>
                          <span className="text-xs text-muted-foreground">
                            {entry.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        {entry.note && (
                          <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>
                        )}
                        {entry.activities.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {entry.activities.map(activity => (
                              <span 
                                key={activity}
                                className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-accent/50 text-foreground/80"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
