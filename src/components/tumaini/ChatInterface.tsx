import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
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
    <motion.div 
      className="flex flex-col h-[calc(100vh-200px)] max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Chat header */}
      <motion.div 
        className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 border-b border-gray-200"
        variants={item}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Wellness Assistant</h2>
            <p className="text-sm text-muted-foreground">I'm here to support your mental wellbeing</p>
          </div>
        </div>
      </motion.div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center p-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Start a conversation</h3>
            <p className="max-w-md mb-6">I'm your AI wellness assistant. You can talk to me about how you're feeling, ask for support, or explore mental health resources.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              <button 
                onClick={() => setInput("I'm feeling anxious today")} 
                className="text-sm p-3 rounded-lg border hover:bg-accent/50 transition-colors text-left"
              >
                I'm feeling anxious today
              </button>
              <button 
                onClick={() => setInput("How can I improve my sleep?")} 
                className="text-sm p-3 rounded-lg border hover:bg-accent/50 transition-colors text-left"
              >
                How can I improve my sleep?
              </button>
              <button 
                onClick={() => setInput("I need help with stress")} 
                className="text-sm p-3 rounded-lg border hover:bg-accent/50 transition-colors text-left"
              >
                I need help with stress
              </button>
              <button 
                onClick={() => setInput("Tell me about mindfulness")} 
                className="text-sm p-3 rounded-lg border hover:bg-accent/50 transition-colors text-left"
              >
                Tell me about mindfulness
              </button>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              variants={item}
              initial="hidden"
              animate="show"
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === 'user' ? 'You' : 'Wellness Assistant'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-2 opacity-70 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))
        )}
        {isTyping && (
          <motion.div 
            className="flex items-center gap-1 p-2 w-16 bg-muted rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <motion.form 
        onSubmit={handleSendMessage} 
        className="p-4 border-t border-gray-200 bg-white"
        variants={item}
      >
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="resize-none min-h-[44px] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="self-end h-[44px] w-[44px]"
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </motion.form>
    </motion.div>
  );
}
