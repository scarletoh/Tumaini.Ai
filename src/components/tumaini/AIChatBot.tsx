import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const initialBotMessages = [
  "Hello! I'm Tumaini, your mental health assistant. How can I help you today?",
  "I'm here to listen and provide support. Is there something on your mind?",
  "Would you like to talk about how you're feeling? I'm here to help."
];

const botResponses = [
  "I understand how you might be feeling. It's okay to feel this way sometimes.",
  "Have you tried any coping strategies that have worked for you in the past?",
  "I'm here to listen. Can you tell me more about what's been on your mind?",
  "It sounds like you're going through a tough time. Would you like some resources that might help?",
  "Remember to be kind to yourself. What's one small thing that might help you feel better right now?",
  "I hear you. Would you like me to suggest some breathing exercises that might help?"
];

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = initialBotMessages[Math.floor(Math.random() * initialBotMessages.length)];
      setMessages([{
        id: 'welcome',
        content: welcomeMessage,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const response = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-white rounded-xl shadow-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded-full">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h3 className="font-semibold">Tumaini AI Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={cn(
                    'flex',
                    message.isUser ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div 
                    className={cn(
                      'max-w-[80%] rounded-lg p-3 text-sm',
                      message.isUser 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    )}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 p-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || isTyping}
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
