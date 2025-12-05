import { useState } from 'react';
import { motion } from 'framer-motion';
import { VoiceRecorder } from './VoiceRecorder';
import { VoiceAnalysisResults } from './VoiceAnalysisResults';
import { VoiceAnalysis } from '@/types/mental-health';
import { History, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceCheckInProps {
  previousAnalysis: VoiceAnalysis[];
  onAnalysisComplete: (analysis: VoiceAnalysis) => void;
}

export function VoiceCheckIn({ previousAnalysis, onAnalysisComplete }: VoiceCheckInProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<VoiceAnalysis | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const simulateAnalysis = async (audioBlob: Blob): Promise<VoiceAnalysis> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock analysis
    const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
    const randomSentiment = sentiments[Math.floor(Math.random() * 3)];
    const sentimentScores = { positive: 0.75, neutral: 0.5, negative: 0.25 };

    return {
      date: new Date().toISOString(),
      speechRate: 120 + Math.floor(Math.random() * 40),
      pauseFrequency: 5 + Math.floor(Math.random() * 15),
      sentiment: randomSentiment,
      sentimentScore: sentimentScores[randomSentiment] + (Math.random() * 0.2 - 0.1),
      transcription: "Today I'm feeling okay. I had a productive morning and managed to complete most of my tasks. Looking forward to the rest of the day.",
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

  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-16">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Daily Voice Check-In
        </h2>
        <p className="text-lg text-muted-foreground">
          Share how you're feeling today. Your voice patterns help us understand your wellbeing.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="bg-card rounded-2xl border border-border p-6">
        {!currentResult ? (
          <VoiceRecorder
            onRecordingComplete={handleRecordingComplete}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <div className="space-y-6">
            <VoiceAnalysisResults analysis={currentResult} />
            <div className="flex justify-center">
              <Button onClick={resetRecording} variant="outline">
                Record Another Check-In
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      <div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <History className="w-4 h-4" />
          Previous Check-Ins
          <ChevronRight className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-90' : ''}`} />
        </button>

        {showHistory && (
          <div className="mt-4 space-y-3">
            {previousAnalysis.slice(0, 5).map((analysis, index) => (
              <div
                key={index}
                className="p-4 bg-muted/50 rounded-xl border border-border flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(analysis.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analysis.speechRate} WPM • {analysis.sentiment} sentiment
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  analysis.sentiment === 'positive'
                    ? 'bg-risk-low/10 text-risk-low'
                    : analysis.sentiment === 'negative'
                    ? 'bg-risk-high/10 text-risk-high'
                    : 'bg-risk-medium/10 text-risk-medium'
                }`}>
                  {Math.round(analysis.sentimentScore * 100)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
