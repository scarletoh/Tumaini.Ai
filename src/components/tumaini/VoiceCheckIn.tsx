import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceRecorder } from './VoiceRecorder';
import { VoiceAnalysisResults } from './VoiceAnalysisResults';
import { VoiceAnalysis } from '@/types/mental-health';
import { 
  History, 
  ChevronRight, 
  ArrowLeft, 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Zap, 
  Turtle, 
  Activity, 
  Sparkles, 
  Sun 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VoiceCheckInProps {
  previousAnalysis: VoiceAnalysis[];
  onAnalysisComplete: (analysis: VoiceAnalysis) => void;
}

interface VoiceAnalysisResultsProps {
  analysis: VoiceAnalysis;
  onNewRecording?: () => void;
}

export function VoiceCheckIn({ previousAnalysis, onAnalysisComplete }: VoiceCheckInProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<VoiceAnalysis | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('checkin');
  const [progress, setProgress] = useState(0);

  // Simulate analysis with more realistic data
  const simulateAnalysis = async (audioBlob: Blob): Promise<VoiceAnalysis> => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    // Generate mock analysis with more realistic data
    const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
    const sentimentWeights = [0.4, 0.3, 0.3]; // 40% positive, 30% neutral, 30% negative
    const randomValue = Math.random();
    let sentimentIndex = 0;
    let cumulativeWeight = 0;
    
    for (let i = 0; i < sentimentWeights.length; i++) {
      cumulativeWeight += sentimentWeights[i];
      if (randomValue <= cumulativeWeight) {
        sentimentIndex = i;
        break;
      }
    }
    
    const sentiment = sentiments[sentimentIndex];
    const baseScores = { positive: 0.7, neutral: 0.5, negative: 0.3 };
    const sentimentScore = baseScores[sentiment] + (Math.random() * 0.2 - 0.1);
    
    // Generate realistic transcription based on sentiment
    const transcriptions = {
      positive: [
        "I've been feeling really great lately. I've been productive at work and spending quality time with friends and family.",
        "Today was amazing! I had a wonderful morning walk and aced my presentation at work. Feeling very accomplished.",
        "I'm in a really good place right now. My energy levels are up, and I'm excited about my upcoming projects."
      ],
      neutral: [
        "It's been a pretty standard day. Nothing too exciting happened, but nothing bad either. Just going with the flow.",
        "I'm feeling okay, I guess. Work was work, and I'm just taking things one day at a time.",
        "Not much to report today. Just another day of the usual routine."
      ],
      negative: [
        "I've been feeling pretty down lately. It's been hard to find motivation, and I've been sleeping poorly.",
        "Today was tough. I had a disagreement with a colleague and it's been weighing on my mind all day.",
        "I'm feeling really overwhelmed with everything going on. It's hard to keep up with all my responsibilities."
      ]
    };
    
    const randomTranscription = transcriptions[sentiment][Math.floor(Math.random() * transcriptions[sentiment].length)];
    
    return {
      date: new Date().toISOString(),
      speechRate: sentiment === 'positive' 
        ? 150 + Math.floor(Math.random() * 30)
        : sentiment === 'negative' 
          ? 100 + Math.floor(Math.random() * 30) 
          : 120 + Math.floor(Math.random() * 30),
      pauseFrequency: sentiment === 'positive' ? 4 + Math.floor(Math.random() * 5) : 
                     sentiment === 'negative' ? 10 + Math.floor(Math.random() * 10) : 
                     7 + Math.floor(Math.random() * 6),
      sentiment,
      sentimentScore,
      transcription: randomTranscription,
    };
  };

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    try {
      const analysis = await simulateAnalysis(audioBlob);
      setCurrentResult(analysis);
      onAnalysisComplete(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetRecording = () => {
    setCurrentResult(null);
  };

  // Analyze sentiment trends over time
  const analyzeTrends = () => {
    if (previousAnalysis.length < 2) return null;
    
    const lastAnalysis = previousAnalysis[0];
    const secondLastAnalysis = previousAnalysis[1];
    
    const sentimentChange = lastAnalysis.sentimentScore - secondLastAnalysis.sentimentScore;
    const isImproving = sentimentChange > 0;
    const isDeclining = sentimentChange < 0;
    const isStable = !isImproving && !isDeclining;
    
    const speechRateChange = lastAnalysis.speechRate - secondLastAnalysis.speechRate;
    const isSpeakingFaster = speechRateChange > 10;
    const isSpeakingSlower = speechRateChange < -10;
    
    return {
      sentiment: {
        change: sentimentChange,
        isImproving,
        isDeclining,
        isStable,
        percentage: Math.abs(Math.round(sentimentChange * 100)),
      },
      speechRate: {
        change: speechRateChange,
        isFaster: isSpeakingFaster,
        isSlower: isSpeakingSlower,
        isStable: !isSpeakingFaster && !isSpeakingSlower,
      },
    };
  };
  
  const trends = analyzeTrends();
  const hasHistory = previousAnalysis.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      {/* Header with Navigation */}
      <motion.div 
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentResult && (
          <Button 
            variant="ghost" 
            onClick={resetRecording}
            className="self-start mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        )}
        
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
            {currentResult ? 'Your Wellbeing Analysis' : 'Daily Voice Check-In'}
          </h2>
          <p className="text-muted-foreground">
            {currentResult 
              ? 'Here\'s what we found from your voice patterns.'
              : 'Share how you\'re feeling today. Your voice patterns help us understand your wellbeing.'}
          </p>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Analyzing your voice patterns...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>
      )}

      {/* Main Content */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        {!currentResult ? (
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-cyan-500/5 border-b">
              <CardTitle className="text-xl">Record Your Check-In</CardTitle>
              <CardDescription>
                Speak naturally for 30-60 seconds about how you're feeling today.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <VoiceRecorder
                onRecordingComplete={handleRecordingComplete}
                isAnalyzing={isAnalyzing}
              />
            </CardContent>
          </Card>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VoiceAnalysisResults 
                analysis={currentResult} 
                onNewRecording={resetRecording} 
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* History & Trends Section */}
        {hasHistory && (
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" /> History
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="w-4 h-4 mr-2" /> Trends
            </TabsTrigger>
          </TabsList>
        )}

        {hasHistory && (
          <TabsContent value="history" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <History className="w-5 h-5" /> Recent Check-Ins
            </h3>
            <div className="space-y-3">
              {previousAnalysis.slice(0, 5).map((analysis, index) => {
                const date = new Date(analysis.date);
                const isToday = new Date().toDateString() === date.toDateString();
                const isYesterday = new Date(Date.now() - 86400000).toDateString() === date.toDateString();
                
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {isToday ? 'Today' : isYesterday ? 'Yesterday' : date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              analysis.sentiment === 'positive' ? 'bg-risk-low' : 
                              analysis.sentiment === 'negative' ? 'bg-risk-high' : 'bg-risk-medium'
                            }`} />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {analysis.speechRate} WPM • {analysis.pauseFrequency} pauses/min • {analysis.sentiment}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          analysis.sentiment === 'positive'
                            ? 'bg-risk-low/10 text-risk-low'
                            : analysis.sentiment === 'negative'
                            ? 'bg-risk-high/10 text-risk-high'
                            : 'bg-risk-medium/10 text-risk-medium'
                        }`}>
                          {Math.round(analysis.sentimentScore * 100)}%
                        </div>
                      </div>
                      {analysis.transcription && (
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                          "{analysis.transcription}"
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        )}

        {hasHistory && trends && (
          <TabsContent value="trends" className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Your Wellbeing Trends
            </h3>
            
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Sentiment Trend</CardTitle>
                <CardDescription>
                  {trends.sentiment.isImproving ? (
                    <span className="text-risk-low flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {trends.sentiment.percentage}% improvement from last check-in
                    </span>
                  ) : trends.sentiment.isDeclining ? (
                    <span className="text-risk-high flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      {trends.sentiment.percentage}% decline from last check-in
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 opacity-50" />
                      Your sentiment is stable
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  {/* Placeholder for chart */}
                  <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground text-sm">Sentiment trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Speech Patterns</CardTitle>
                <CardDescription>
                  {trends.speechRate.isFaster ? (
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      You're speaking faster than your average
                    </span>
                  ) : trends.speechRate.isSlower ? (
                    <span className="flex items-center gap-1">
                      <Turtle className="w-4 h-4 text-blue-500" />
                      You're speaking slower than your average
                    </span>
                  ) : (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      Your speech rate is consistent with your average
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Speech Rate</span>
                      <span className="font-medium">{previousAnalysis[0].speechRate} WPM</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          previousAnalysis[0].speechRate > 150 ? 'bg-risk-low' : 
                          previousAnalysis[0].speechRate < 100 ? 'bg-risk-high' : 'bg-primary'
                        }`} 
                        style={{ width: `${Math.min(100, (previousAnalysis[0].speechRate / 200) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Pause Frequency</span>
                      <span className="font-medium">{previousAnalysis[0].pauseFrequency} pauses/min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          previousAnalysis[0].pauseFrequency > 12 ? 'bg-risk-high' : 
                          previousAnalysis[0].pauseFrequency < 5 ? 'bg-risk-low' : 'bg-primary'
                        }`} 
                        style={{ width: `${Math.min(100, (previousAnalysis[0].pauseFrequency / 20) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Few</span>
                      <span>Many</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-full mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Consistent Check-ins</p>
                      <p className="text-sm text-muted-foreground">You've completed 3 check-ins this week. Keep it up!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-amber-100 rounded-full mt-0.5">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Sleep Quality</p>
                      <p className="text-sm text-muted-foreground">Your speech patterns suggest you might be tired. Consider getting more rest.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-purple-100 rounded-full mt-0.5">
                      <Activity className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">Mindfulness Exercise</p>
                      <p className="text-sm text-muted-foreground">Try a 5-minute breathing exercise to reduce stress.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-green-100 rounded-full mt-0.5">
                      <Sun className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Morning Routine</p>
                      <p className="text-sm text-muted-foreground">Starting your day with sunlight can improve your mood.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
