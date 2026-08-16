import React from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  Building, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 text-black text-xs font-black uppercase tracking-wider mb-3 border border-yellow-400/50">
            <Quote className="w-3.5 h-3.5 text-yellow-600" />
            <span>Member Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-heading">
            Trusted by Civil Servants & Businesses Across Nigeria
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600">
            Hear from genuine members who have accessed capital, expanded projects, and met urgent obligations with SilverKuun Loans.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-black hover:bg-white transition-all duration-200"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Facility Category Badge */}
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-black bg-yellow-400/20 text-black mb-4 border border-yellow-400/40">
                  {testimonial.loanType}
                </span>

                {/* Quote Content */}
                <p className="text-sm text-zinc-800 leading-relaxed italic mb-6">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-zinc-200 flex items-center gap-3.5">
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-black text-black font-heading">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-zinc-600 font-medium">
                    {testimonial.role}
                  </p>
                  <p className="text-[11px] text-zinc-900 flex items-center gap-1 mt-0.5 font-bold">
                    <MapPin className="w-3 h-3 text-yellow-600" />
                    <span>{testimonial.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
