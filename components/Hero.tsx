import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';

const DecryptText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 2;
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-cyber-black">
      {/* 3D Background */}
      <ThreeCanvas />

      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-[1]"></div>

      {/* Main Frame Container - Adjusted to allow interaction and scrolling if needed */}
      <div className="absolute inset-2 sm:inset-4 md:inset-12 z-10 flex flex-col justify-center items-center">
        
        {/* The Big Blue Frame - Added scroll handling for landscape/small screens */}
        <div className="relative w-full h-full border-2 border-blue-500/30 flex flex-col items-center overflow-y-auto overflow-x-hidden scrollbar-hide pointer-events-auto bg-cyber-black/10">
            
            {/* Top Status Label - Fixed to frame */}
            <div className="sticky top-0 z-20 mt-[-12px] bg-cyber-black px-4 md:px-6 flex items-center gap-3 whitespace-nowrap border border-blue-500/30 rounded-full py-1 mb-4 md:mb-0 md:absolute md:top-[-12px] md:border-none md:rounded-none md:py-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-gray-400 font-mono text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase">
                System Online
              </span>
            </div>

            {/* Content Wrapper for Vertical Centering */}
            <div className="flex-grow w-full flex flex-col justify-center items-center py-8 px-4 sm:px-6 md:px-12">

              {/* Main Content Area */}
              <div className="flex flex-col items-center justify-center w-full max-w-5xl space-y-6 md:space-y-8">
                
                {/* Giant Typography */}
                <div className="text-center relative w-full">
                  <h1 className="font-sans font-bold leading-none tracking-tighter flex flex-col items-center">
                    <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-cyber-green drop-shadow-[0_0_20px_rgba(0,255,65,0.6)] mb-2 md:mb-4 break-all sm:break-normal">
                      <DecryptText text="SECURITY_ENGINEER" />
                    </div>
                    <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white drop-shadow-md tracking-widest mt-1 text-center">
                      & FULL STACK DEVELOPER
                    </div>
                  </h1>
                </div>

                {/* Terminal Block */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-2xl mt-4 md:mt-8"
                >
                  <div className="border-l-4 border-cyber-cyan pl-4 md:pl-6 py-2 md:py-4 bg-black/40 backdrop-blur-sm mx-2 md:mx-0">
                    <div className="font-mono text-xs sm:text-sm md:text-lg leading-relaxed text-gray-300 space-y-2">
                      <div>
                        <span className="text-gray-500">$</span> <span className="text-cyber-green">cat</span> profile_summary.txt
                      </div>
                      <div className="text-gray-400 pl-2 md:pl-4 border-l border-gray-700">
                        {'>>'} Identity: <span className="text-white">Suyash Gargote</span><br/>
                        {'>>'} Specialization: <span className="text-cyber-cyan">Offensive Security & React.js</span><br/>
                        {'>>'} Current_State: <span className="text-cyber-green animate-pulse">Open_to_Opportunities</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Buttons - Now in normal flow to prevent overlap */}
              <div className="w-full flex flex-col md:flex-row gap-3 md:gap-6 justify-center items-center mt-8 md:mt-12">
                <a 
                  href="#projects" 
                  className="group w-full md:w-64 h-12 md:h-14 flex items-center justify-center bg-cyber-green/5 border border-cyber-green text-cyber-green font-mono text-sm md:text-base uppercase tracking-widest font-bold hover:bg-cyber-green hover:text-black transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]"
                >
                  View Projects
                </a>
                
                <a 
                  href="#contact"
                  className="w-full md:w-64 h-12 md:h-14 flex items-center justify-center bg-transparent border border-gray-700 text-gray-300 font-mono text-sm md:text-base uppercase tracking-widest hover:border-cyber-cyan hover:text-cyber-cyan transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                >
                  Contact Me
                </a>
              </div>

            </div>

        </div>

        {/* Decorative HUD Elements outside/on the frame - Hidden on small screens to save space */}
        <div className="absolute bottom-0 left-0 p-4 text-[10px] font-mono text-cyber-green/60 hidden lg:block pointer-events-none">
            <div>COORDS: 34.0522° N, 118.2437° W</div>
            <div>ENCRYPTION: AES-256-GCM</div>
        </div>
      </div>
      
      {/* Hide default scrollbar for the frame but keep functionality */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Hero;