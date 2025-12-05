import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  MessageSquare, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  Mic, 
  Paperclip, 
  Smile, 
  ChevronDown,
  CheckCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

const quickReplies = [
  'How are you feeling today?',
  'I need help with stress',
  'Suggest a mindfulness exercise',
  'I need someone to talk to'
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: "Hello! I'm your wellness assistant. I'm here to support your mental health journey. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      status: 'sent'
    }
  ]);
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const handleSendMessage = async (e?: React.FormEvent, messageContent: string = input) => {
    e?.preventDefault();
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowQuickReplies(false);
    setIsLoading(true);
    
    // Update message status to sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );
    }, 300);

    try {
      // Simulate API call with typing indicator
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(true);
      
      // Simulate typing time based on response length
      const botResponse = getBotResponse(messageContent);
      const typingTime = Math.min(Math.max(botResponse.length * 20, 800), 2000);
      await new Promise(resolve => setTimeout(resolve, typingTime));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'error' as const }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
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

  // Handle quick reply click
  const handleQuickReply = (reply: string) => {
    handleSendMessage(undefined, reply);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Animation variants with proper typing for Framer Motion
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as any, // Using cubic-bezier values for easeOut
      }
    },
    exit: { opacity: 0, y: -10 }
  } as const;

  const typingIndicatorVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as any, // Using cubic-bezier values for easeOut
      }
    },
    exit: { opacity: 0, y: -10 }
  } as const;

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div>
                <h2 className="text-lg font-semibold">Wellness Assistant</h2>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isTyping ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                  <p className="text-xs font-medium text-white/80">
                    {isTyping ? 'Typing...' : 'Online'}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10">
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950/50">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                className={`relative max-w-[85%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                <div className="flex items-center justify-end gap-1.5 mt-1.5">
                  <span className={`text-xs opacity-60 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === 'user' && (
                    <span className="text-xs">
                      {message.status === 'sending' ? (
                        <Clock className="w-3 h-3 text-white/60" />
                      ) : message.status === 'error' ? (
                        <span className="text-red-300">!</span>
                      ) : (
                        <CheckCheck className="w-3 h-3 text-white/60" />
                      )}
                    </span>
                  )}
                </div>
                
                {/* Message tail */}
                {message.sender === 'user' ? (
                  <div className="absolute -right-1.5 bottom-0 w-3 h-3 bg-emerald-500 dark:bg-emerald-600 rotate-45 transform origin-bottom-right"></div>
                ) : (
                  <div className="absolute -left-1.5 bottom-0 w-3 h-3 bg-white dark:bg-gray-800 border-l border-b border-gray-100 dark:border-gray-700 rotate-45 transform origin-bottom-left"></div>
                )}
              </motion.div>
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-2xl w-28 ml-2 shadow-sm border border-gray-100 dark:border-gray-700"
                variants={typingIndicatorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">typing</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Quick replies */}
          {showQuickReplies && messages.length <= 1 && (
            <motion.div 
              className="flex flex-wrap gap-2 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {quickReplies.map((reply, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {reply}
                </motion.button>
              ))}
            </motion.div>
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="min-h-[44px] max-h-32 resize-none pr-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-0 transition-all duration-200 rounded-2xl"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-1"
            >
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className={`h-11 w-11 rounded-full shadow-md ${
                  input.trim() 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>
          
          {/* Voice input button for mobile */}
          <button
            type="button"
            className="md:hidden absolute left-3 bottom-3 p-1.5 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 rounded-full"
          >
            <Mic className="w-5 h-5" />
          </button>
        </form>
        
        {/* Footer note */}
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
          Your conversations are private and secure
        </p>
      </div>
    </div>
  );
}
