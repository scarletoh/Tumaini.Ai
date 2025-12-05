import { ChatInterface } from '@/components/tumaini/ChatInterface';
import { motion } from 'framer-motion';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01" />
              <path d="M12 10h.01" />
              <path d="M16 10h.01" />
            </svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Wellness Chat
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered mental health companion is here to listen and support you
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <ChatInterface />
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p>For immediate help, please contact a mental health professional or emergency services.</p>
        </motion.div>
      </div>
    </div>
  );
}
