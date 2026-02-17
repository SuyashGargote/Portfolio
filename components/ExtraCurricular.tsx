import React from 'react';
import { motion } from 'framer-motion';
import { ACTIVITIES } from '../constants';
import { Calendar } from 'lucide-react';

const ExtraCurricular = () => {
  return (
    <section id="extra" className="py-16 md:py-24 bg-cyber-black relative border-t border-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-sans uppercase tracking-tight">
            <span className="text-cyber-green text-sm block mb-2 font-mono">{'>>>'} SECONDARY_OBJECTIVES</span>
            Extra Curricular
          </h2>
          <div className="h-1 w-20 bg-cyber-green mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-900/30 border border-gray-800 hover:border-cyber-green transition-all duration-300 flex flex-col h-full overflow-hidden relative"
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative border-b border-gray-800 group-hover:border-cyber-green/50 transition-colors">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-black/80 backdrop-blur border-b border-l border-cyber-green/50 px-3 py-1">
                  <span className="text-[10px] font-mono text-cyber-green uppercase tracking-wider">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-cyber-cyan text-xs font-mono mb-3 opacity-80">
                  <Calendar size={12} />
                  <span>{activity.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-green transition-colors font-sans uppercase">
                  {activity.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed font-mono mb-4 flex-1">
                  {activity.description}
                </p>

                {/* Decorative Tech Elements */}
                <div className="border-t border-dashed border-gray-800 pt-4 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-1">
                     <div className="w-1 h-1 bg-cyber-green rounded-full animate-pulse"></div>
                     <div className="w-1 h-1 bg-cyber-green rounded-full animate-pulse delay-75"></div>
                     <div className="w-1 h-1 bg-cyber-green rounded-full animate-pulse delay-150"></div>
                   </div>
                   <div className="text-[10px] font-mono text-gray-500">ID_REF: 00{activity.id}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExtraCurricular;