import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import { ChevronDown, ChevronRight, Hash } from 'lucide-react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);
  const [expandedSub, setExpandedSub] = useState<string | null>(SKILL_CATEGORIES[0].subcategories[0].title);

  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab) || SKILL_CATEGORIES[0];

  const toggleSub = (title: string) => {
    setExpandedSub(expandedSub === title ? null : title);
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-cyber-dark relative min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-10">
        
        {/* Header */}
        <div className="mb-8 md:mb-12 border-b border-gray-800 pb-4 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-mono uppercase">
              <span className="text-cyber-green mr-2">./</span>Technical_Arsenal
            </h2>
            <p className="text-gray-400 text-xs font-mono tracking-widest mt-1">{'>>>'} LOADOUT CONFIGURATION</p>
          </div>
          <div className="font-mono text-xs text-cyber-green bg-cyber-green/10 px-3 py-1 border border-cyber-green/30 self-center md:self-auto">
             MODE: {activeCategory.title.toUpperCase()}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-4 gap-4 mb-6 md:mb-10 no-scrollbar md:flex-wrap">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveTab(category.id);
                  setExpandedSub(category.subcategories[0].title); // Auto expand first item
                }}
                className={`flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  activeTab === category.id
                    ? 'bg-cyber-green/10 text-cyber-green border-cyber-green shadow-[0_4px_20px_rgba(0,255,65,0.1)]'
                    : 'bg-black text-gray-500 border-gray-800 hover:text-white hover:border-gray-600'
                }`}
              >
                <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Description Column */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black border border-gray-800 p-6 h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                {activeCategory.icon && React.createElement(activeCategory.icon, { size: 100, className: "text-cyber-green" })}
              </div>
              <h3 className="text-xl text-white font-bold font-mono mb-4 border-l-4 border-cyber-green pl-3">
                {activeCategory.title}
              </h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                {activeCategory.description}
              </p>
              <div className="text-xs font-mono text-cyber-cyan">
                {'>>'} Total Modules: {activeCategory.subcategories.reduce((acc, sub) => acc + sub.tools.length, 0)}<br/>
                {'>>'} Status: OPERATIONAL
              </div>
            </motion.div>
          </div>

          {/* Accordion Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 order-1 lg:order-2">
            <AnimatePresence mode='wait'>
              {activeCategory.subcategories.map((sub, index) => (
                <motion.div
                  key={sub.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border transition-colors ${
                    expandedSub === sub.title 
                    ? 'border-cyber-green/50 bg-cyber-green/5' 
                    : 'border-gray-800 bg-black hover:border-gray-600'
                  }`}
                >
                  <button
                    onClick={() => toggleSub(sub.title)}
                    className="w-full flex justify-between items-center p-4 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSub === sub.title ? (
                        <ChevronDown className="text-cyber-green" size={20} />
                      ) : (
                        <ChevronRight className="text-gray-500 group-hover:text-white" size={20} />
                      )}
                      <span className={`font-mono text-sm md:text-base font-bold uppercase ${
                        expandedSub === sub.title ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}>
                        {sub.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden md:block">
                      [{sub.tools.length} Tools]
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedSub === sub.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-dashed border-gray-800/50 grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {sub.tools.map((tool) => (
                            <div 
                              key={tool}
                              className="flex items-center gap-2 p-2 bg-black/50 border border-gray-800 hover:border-cyber-green/50 hover:bg-cyber-green/5 transition-all group/tool cursor-crosshair"
                            >
                              <Hash size={12} className="text-gray-600 group-hover/tool:text-cyber-green" />
                              <span className="text-xs font-mono text-gray-300 group-hover/tool:text-white break-all sm:break-normal">
                                {tool}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;