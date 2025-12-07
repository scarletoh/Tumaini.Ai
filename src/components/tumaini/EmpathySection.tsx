'use client';

import { motion } from 'framer-motion';

export function EmpathySection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=3880&auto=format&fit=crop)',
            filter: 'brightness(0.3) contrast(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />
        
        {/* Ambient Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-wave-ambient" />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-300 to-transparent animate-wave-ambient" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div 
          className="animate-fade-in-up"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-relaxed mb-8">
            "Your journey matters.
            <br />
            Your <span className="text-blue-300">strength</span> is real.
            <br />
            Your <span className="text-purple-300">feelings</span> are valid.
            <br />
            You are <span className="text-emerald-300">not alone</span>."
          </blockquote>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />

          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            <span className="font-medium">Tumaini AI is with you,<br />every step of the way.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
