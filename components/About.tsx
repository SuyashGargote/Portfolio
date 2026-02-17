import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '../constants';
import { Shield, Lock, Eye } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-cyber-black relative border-t border-cyber-green/10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Visual / Stats */}
          <div className="relative">
            {/* Holographic Circle */}
            <div className="absolute inset-0 border border-cyber-green/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-dashed border-cyber-cyan/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="bg-cyber-gray/50 border border-cyber-green/30 p-6 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:bg-cyber-green/5 transition-colors group min-h-[160px]">
                <Shield className="text-cyber-green mb-4 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-lg font-mono text-white font-bold uppercase tracking-wider leading-tight mb-1">Offensive Security</div>
                <div className="text-xs text-cyber-green/70 font-mono">MINDSET</div>
              </div>
              
              <div className="bg-cyber-gray/50 border border-cyber-cyan/30 p-6 backdrop-blur-sm sm:mt-8 flex flex-col items-center justify-center text-center hover:bg-cyber-cyan/5 transition-colors group min-h-[160px]">
                <Lock className="text-cyber-cyan mb-4 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-lg font-mono text-white font-bold uppercase tracking-wider leading-tight mb-1">Attack Surface</div>
                <div className="text-xs text-cyber-cyan/70 font-mono">AWARENESS</div>
              </div>
              
              <div className="bg-cyber-gray/50 border border-cyber-red/30 p-6 backdrop-blur-sm col-span-1 sm:col-span-2 mx-auto w-full sm:w-5/6 text-center hover:bg-cyber-red/5 transition-colors group min-h-[140px] flex flex-col items-center justify-center">
                <Eye className="text-cyber-red mb-4 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-lg font-mono text-white font-bold uppercase tracking-wider leading-tight mb-1">Exploit-Driven</div>
                <div className="text-xs text-cyber-red/70 font-mono">TESTING APPROACH</div>
              </div>
            </div>
          </div>

          {/* Terminal Text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cyber-box p-1" // Outer rim
          >
            <div className="bg-black p-6 h-full relative overflow-hidden">
               {/* Terminal Header */}
               <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <div className="ml-4 font-mono text-xs text-gray-500">user@admin:~</div>
               </div>

               {/* Content */}
               <div className="font-mono text-sm md:text-base leading-relaxed text-gray-300">
                 <span className="text-cyber-green">user@admin:~$</span> cat about_me.txt
                 <br /><br />
                 <p className="whitespace-pre-line border-l-2 border-cyber-green/20 pl-4">
                   {ABOUT_TEXT}
                 </p>
                 <br />
                 <span className="text-cyber-green">user@admin:~$</span> <span className="animate-blink">_</span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;