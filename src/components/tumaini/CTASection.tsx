import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-0.5 shadow-2xl max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl" />
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[15px] p-10 md:p-16 text-center">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Begin Your Journey to Better Mental Health</h3>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join our community of individuals who prioritize mental wellness and experience the difference of personalized, AI-powered support.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 px-10 py-6 text-lg font-medium rounded-xl transition-all duration-300"
                >
                  Schedule a Demo
                </Button>
              </div>
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
