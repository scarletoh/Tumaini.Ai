import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, User, Bot, MessageSquare, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm your wellness assistant. How can I help you today?";
    } else if (input.includes('how are you')) {
      return "I'm here to support you. How can I assist with your mental wellbeing today?";
    } else if (input.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to talk about?";
    } else if (input.includes('help') || input.includes('support')) {
      return "I can help you with stress management, mindfulness exercises, or just listen if you need someone to talk to. What's on your mind?";
    } else if (input.includes('anxious') || input.includes('stress') || input.includes('overwhelmed')) {
      return "I'm sorry to hear you're feeling this way. Try taking a few deep breaths with me. Breathe in for 4 seconds, hold for 4 seconds, and exhale for 6 seconds. Would you like to try a guided breathing exercise?";
    } else if (input.includes('sad') || input.includes('depressed') || input.includes('down')) {
      return "I'm here for you. It's okay to feel this way. Would you like to talk about what's been on your mind? Sometimes sharing can help lighten the load.";
    } else if (input.includes('happy') || input.includes('good') || input.includes('great')) {
      return "I'm so glad to hear you're feeling good! Would you like to share what's making you feel this way? Celebrating positive moments is important too!";
    } else {
      return "I'm here to support you. Could you tell me more about how you're feeling? I'm listening.";
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Tumaini AI Assistant
            </h2>
            <p className="text-xs opacity-80">
              {isTyping ? 'Typing...' : 'How can I help you today?'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground"
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2 text-foreground">Welcome to Tumaini AI</h3>
            <p className="text-sm max-w-md mb-6">I'm here to support your mental wellness journey. You can ask me about:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md">
              {[
                'How to manage stress?',
                'Tips for better sleep',
                'Coping with anxiety',
                'Mindfulness exercises'
              ].map((suggestion, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInput(suggestion.replace('?', ''))}
                  className="text-sm p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={cn(
                    'max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 relative group',
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground rounded-bl-none'
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                      message.sender === 'user' 
                        ? 'bg-white/20' 
                        : 'bg-primary/10 text-primary'
                    )}>
                      {message.sender === 'user' ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className={cn(
                        'text-xs mt-1 opacity-70 text-right',
                        message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      )}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 px-4 py-2"
              >
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Tumaini AI..."
            className="min-h-[48px] max-h-40 resize-none border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus-visible:ring-1 focus-visible:ring-primary/50 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 transition-all"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Tumaini AI may produce inaccurate information. For emergencies, please contact local services.
        </p>
      </form>
    </div>
  );
}
