import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Clock, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh,
  Zap,
  Moon,
  Sun,
  HeartPulse,
  Activity as ActivityIcon,
  Clock3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VoiceAnalysis } from '@/types/mental-health';

interface InsightsPageProps {
  analysisHistory: VoiceAnalysis[];
  onBack?: () => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function Insights({ analysisHistory, onBack }: InsightsPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  
  // Process data for charts and metrics
  const processData = () => {
    const now = new Date();
    let filteredData = [...analysisHistory];
    
    // Filter by time range
    if (timeRange === 'week') {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredData = filteredData.filter(item => new Date(item.date) >= oneWeekAgo);
    } else if (timeRange === 'month') {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredData = filteredData.filter(item => new Date(item.date) >= oneMonthAgo);
    }
    
    // Sort by date
    filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate metrics
    const sentimentScores = filteredData.map(item => item.sentimentScore);
    const averageSentiment = sentimentScores.length > 0 
      ? sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length 
      : 0;
    
    const sentimentTrend = filteredData.length >= 2 
      ? filteredData[filteredData.length - 1].sentimentScore - filteredData[0].sentimentScore
      : 0;
    
    const speechRates = filteredData.map(item => item.speechRate);
    const averageSpeechRate = speechRates.length > 0 
      ? Math.round(speechRates.reduce((a, b) => a + b, 0) / speechRates.length)
      : 0;
    
    // Group by day for the chart
    const dailyAverages = groupDataByDay(filteredData);
    
    // Get latest analysis
    const latestAnalysis = filteredData.length > 0 
      ? filteredData[filteredData.length - 1] 
      : null;
    
    // Calculate sleep quality based on speech patterns
    const sleepQuality = calculateSleepQuality(filteredData);
    
    return {
      averageSentiment,
      sentimentTrend,
      averageSpeechRate,
      dailyAverages,
      latestAnalysis,
      totalCheckIns: filteredData.length,
      sleepQuality,
      moodStability: calculateMoodStability(filteredData)
    };
  };
  
  const groupDataByDay = (data: VoiceAnalysis[]) => {
    const grouped: Record<string, {sum: number, count: number}> = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = { sum: 0, count: 0 };
      }
      
      grouped[dayKey].sum += item.sentimentScore;
      grouped[dayKey].count++;
    });
    
    return Object.entries(grouped).map(([date, {sum, count}]) => ({
      date,
      average: sum / count,
      formattedDate: formatDateString(date)
    }));
  };
  
  const formatDateString = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return `${weekDays[date.getDay()]}, ${months[month - 1]} ${day}`;
  };
  
  const calculateSleepQuality = (data: VoiceAnalysis[]) => {
    if (data.length === 0) return null;
    
    // Simple heuristic: lower speech rate and more pauses might indicate tiredness
    const latest = data[data.length - 1];
    let score = 5; // neutral
    
    if (latest.speechRate < 100) score -= 1;
    if (latest.speechRate < 90) score -= 1;
    if (latest.pauseFrequency > 10) score -= 1;
    if (latest.pauseFrequency > 15) score -= 1;
    
    return Math.max(1, Math.min(10, score * 2)); // Convert to 1-10 scale
  };
  
  const calculateMoodStability = (data: VoiceAnalysis[]) => {
    if (data.length < 2) return 0;
    
    let totalChange = 0;
    for (let i = 1; i < data.length; i++) {
      totalChange += Math.abs(data[i].sentimentScore - data[i-1].sentimentScore);
    }
    
    const averageChange = totalChange / (data.length - 1);
    // Convert to 1-10 scale where 10 is most stable
    return Math.round((1 - Math.min(averageChange, 0.5) * 2) * 10);
  };
  
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-risk-low" />;
      case 'negative': return <Frown className="w-5 h-5 text-risk-high" />;
      default: return <Meh className="w-5 h-5 text-risk-medium" />;
    }
  };
  
  const getSentimentLabel = (score: number) => {
    if (score > 0.6) return 'Positive';
    if (score < 0.4) return 'Negative';
    return 'Neutral';
  };
  
  const { 
    averageSentiment, 
    sentimentTrend, 
    averageSpeechRate, 
    dailyAverages, 
    latestAnalysis,
    totalCheckIns,
    sleepQuality,
    moodStability
  } = processData();
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
            Your Wellbeing Insights
          </h1>
          <p className="text-muted-foreground">
            Track your mental health trends and patterns over time
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            This Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            This Month
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {getSentimentLabel(averageSentiment)}
              </div>
              <div className={cn(
                'p-2 rounded-lg',
                averageSentiment > 0.6 ? 'bg-risk-low/10 text-risk-low' :
                averageSentiment < 0.4 ? 'bg-risk-high/10 text-risk-high' :
                'bg-risk-medium/10 text-risk-medium'
              )}>
                {getSentimentIcon(averageSentiment > 0.6 ? 'positive' : averageSentiment < 0.4 ? 'negative' : 'neutral')}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground flex items-center">
              {sentimentTrend > 0 ? (
                <TrendingUp className="w-4 h-4 text-risk-low mr-1" />
              ) : sentimentTrend < 0 ? (
                <TrendingDown className="w-4 h-4 text-risk-high mr-1" />
              ) : (
                <Activity className="w-4 h-4 text-muted-foreground mr-1" />
              )}
              {Math.abs(sentimentTrend * 100).toFixed(1)}% from {timeRange} start
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCheckIns}</div>
            <div className="mt-2 text-sm text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {timeRange === 'week' ? 'This week' : 'This month'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sleep Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{sleepQuality}/10</div>
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                {sleepQuality && sleepQuality > 7 ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {sleepQuality && sleepQuality > 7 ? 'Good' : 'Could be better'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mood Stability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{moodStability}/10</div>
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <ActivityIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {moodStability > 7 ? 'Very stable' : moodStability > 4 ? 'Moderate' : 'Variable'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Mood Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Mood Over Time</CardTitle>
                <CardDescription>Your daily average sentiment score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-2 pt-4">
                  {dailyAverages.length > 0 ? (
                    dailyAverages.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-cyan-500 rounded-t-sm"
                          style={{
                            height: `${day.average * 100}%`,
                            minHeight: '4px',
                          }}
                        />
                        <div className="text-xs text-muted-foreground mt-2">
                          {day.formattedDate.split(',')[0]}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No data available for the selected time range
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Latest Check-in */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Check-in</CardTitle>
                  <CardDescription>
                    {latestAnalysis ? (
                      new Date(latestAnalysis.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })
                    ) : 'No data available'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {latestAnalysis ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted">
                          {getSentimentIcon(latestAnalysis.sentiment)}
                        </div>
                        <div>
                          <p className="font-medium">Mood</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {latestAnalysis.sentiment} ({Math.round(latestAnalysis.sentimentScore * 100)}%)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted">
                          <Zap className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Energy Level</p>
                          <p className="text-sm text-muted-foreground">
                            {latestAnalysis.speechRate > 140 ? 'High' : 
                             latestAnalysis.speechRate > 110 ? 'Moderate' : 'Low'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-1">Your Notes</p>
                        <div className="p-3 bg-muted/30 rounded-lg text-sm">
                          "{latestAnalysis.transcription || 'No transcription available'}"
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Complete a voice check-in to see your data here.</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Clock3 className="w-4 h-4" />
                    Schedule Next Check-in
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    Mental Health Resources
                  </Button>
                  {onBack && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 mt-2"
                      onClick={onBack}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      Back to Dashboard
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Insights & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Consistent Check-ins</h4>
                    <p className="text-sm text-muted-foreground">
                      You've completed {totalCheckIns} check-ins this {timeRange}. 
                      {totalCheckIns >= (timeRange === 'week' ? 3 : 10) 
                        ? 'Great job maintaining consistency!' 
                        : 'Try to check in more regularly for better insights.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mt-0.5">
                    <ActivityIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Activity Level</h4>
                    <p className="text-sm text-muted-foreground">
                      Your average speech rate is {averageSpeechRate} WPM, which suggests a 
                      {averageSpeechRate > 140 ? ' high' : averageSpeechRate > 110 ? ' moderate' : ' low'} energy level.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Watch For</h4>
                    <p className="text-sm text-muted-foreground">
                      {sentimentTrend < -0.1 
                        ? 'Your mood has been trending downward. Consider reaching out for support.'
                        : 'Your mood has been stable. Keep up with your self-care routines.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Daily Reflection</h4>
                    <p className="text-sm text-muted-foreground">
                      Take a moment each day to reflect on what you're grateful for. 
                      This simple practice can improve your overall wellbeing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Trends</CardTitle>
              <CardDescription>Coming soon: More detailed analytics and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">More detailed analytics coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
