import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      image: 'https://randomuser.me/api/portraits/women/43.jpg',
      content: 'This platform has been a game-changer for managing my stress levels. The voice analysis is incredibly accurate and the daily check-ins help me stay mindful of my mental health.',
      rating: 5
    },
    {
      id: 2,
      name: 'David Kim',
      role: 'University Student',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'As someone who struggles with anxiety, having this tool to track my emotional state has been invaluable. The insights are spot-on and the recommendations are actually helpful.',
      rating: 5
    },
    {
      id: 3,
      name: 'Maria Garcia',
      role: 'Teacher',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      content: 'I was skeptical at first, but the accuracy of the mood tracking is impressive. It\'s like having a personal therapist in my pocket.',
      rating: 4
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Healthcare Worker',
      image: 'https://randomuser.me/api/portraits/men/54.jpg',
      content: 'The privacy-first approach gave me the confidence to be completely honest in my check-ins. The platform has helped me identify patterns in my stress levels I never noticed before.',
      rating: 5
    },
    {
      id: 5,
      name: 'Aisha Patel',
      role: 'Entrepreneur',
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      content: 'The voice analysis feature is mind-blowing. It picked up on subtle changes in my speech patterns that correlated with my anxiety episodes. Highly recommend!',
      rating: 5
    },
    {
      id: 6,
      name: 'Michael Chen',
      role: 'Graphic Designer',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      content: 'As someone who struggles with depression, having objective data about my mood patterns has been incredibly validating and helpful for my therapy sessions.',
      rating: 4
    }
  ];

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who have experienced the benefits of our platform firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-emerald-100 opacity-70" />
                <p className="text-gray-600 pl-4">{testimonial.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
            <p className="text-gray-600">Active Users</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
            <p className="text-gray-600">Accuracy Rate</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
            <p className="text-gray-600">Support Available</p>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="text-4xl font-bold text-emerald-600 mb-2">4.9/5</div>
            <p className="text-gray-600">User Rating</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
