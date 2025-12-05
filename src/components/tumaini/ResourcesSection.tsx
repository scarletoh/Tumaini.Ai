import { CrisisResourceCard } from './CrisisResourceCard';
import { crisisResources } from '@/data/mock-data';
import { Phone, Shield, FileText, Settings, Heart, Stethoscope, MessageCircle, Users, Globe, Activity, GraduationCap, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const categoryIcons = {
  emergency: <Heart className="w-5 h-5 text-red-500" />,
  healthcare: <Stethoscope className="w-5 h-5 text-blue-500" />,
  counseling: <MessageCircle className="w-5 h-5 text-purple-500" />,
  support: <Users className="w-5 h-5 text-green-500" />,
  online: <Globe className="w-5 h-5 text-cyan-500" />,
  addiction: <Activity className="w-5 h-5 text-orange-500" />,
  youth: <GraduationCap className="w-5 h-5 text-pink-500" />
};

const categoryTitles = {
  emergency: 'Emergency Services',
  healthcare: 'Hospitals & Clinics',
  counseling: 'Counseling & Therapy',
  support: 'Support Groups',
  online: 'Online Resources',
  addiction: 'Substance Abuse Support',
  youth: 'Youth & Student Support'
};

export function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Group resources by category
  const resourcesByCategory = crisisResources.reduce((acc, resource) => {
    if (!acc[resource.category || 'other']) {
      acc[resource.category || 'other'] = [];
    }
    acc[resource.category || 'other'].push(resource);
    return acc;
  }, {} as Record<string, typeof crisisResources>);
  
  // Get all unique categories
  const categories = ['all', ...Object.keys(resourcesByCategory)];
  
  // Filter resources based on active category
  const filteredResources = activeCategory === 'all' 
    ? crisisResources 
    : resourcesByCategory[activeCategory] || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 pt-24 pb-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-foreground">Mental Health Resources</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Find the support you need with our comprehensive directory of mental health services
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="p-3 bg-red-100 rounded-xl">
            <Phone className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground">Need immediate help?</h3>
            <p className="text-muted-foreground mt-1">
              If you're in crisis or having thoughts of self-harm, please reach out to these emergency services immediately.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button variant="destructive" size="lg" className="gap-2" asChild>
              <a href="tel:1199">
                <Phone className="w-4 h-4" />
                Kenya Red Cross: 1199
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="tel:722178177">
                <Phone className="w-4 h-4" />
                Befrienders Kenya
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground'
              }`}
            >
              {category === 'all' ? 'All Resources' : categoryTitles[category as keyof typeof categoryTitles] || category}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div 
            key={`${resource.name}-${resource.phone}`} 
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {resource.category && categoryIcons[resource.category] || (
                      <Heart className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground">{resource.name}</h3>
                </div>
                {resource.isEmergency && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Emergency
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
              
              <div className="space-y-3 mt-4">
                {resource.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <a 
                      href={`tel:${resource.phone.replace(/\D/g, '')}`} 
                      className="text-sm text-foreground hover:underline"
                    >
                      {resource.phone}
                    </a>
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{resource.available || 'Hours vary'}</span>
                </div>
                
                {resource.website && (
                  <div className="pt-2 border-t border-border">
                    <a 
                      href={resource.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {(resource.isEmergency || resource.phone) && (
              <div className="bg-muted/50 px-6 py-3 border-t border-border">
                <a 
                  href={`tel:${(resource.phone || '').replace(/\D/g, '')}`} 
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {resource.isEmergency ? 'Call Now' : 'Call for Help'}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Additional Help Section */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-foreground mb-4">Can't find what you're looking for?</h3>
        <p className="text-muted-foreground mb-4">
          If you need help finding specific mental health resources or have questions about available services, 
          our support team is here to assist you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat with Support
          </Button>
          <Button variant="ghost" className="gap-2">
            <Mail className="w-4 h-4" />
            Email Us
          </Button>
        </div>
      </div>
    </div>
  );
}
