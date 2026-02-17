import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { Award, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Achievements = () => {
  return (
    <section id="achievements" className="py-16 md:py-24 bg-cyber-black relative overflow-hidden border-t border-gray-900">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-sans uppercase tracking-tight">
            <span className="text-cyber-green">{'>>'}</span> Certified Excellence
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-xs md:text-sm">
            /var/log/achievements.log
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-black border border-gray-800 p-6 md:p-8 hover:border-cyber-cyan transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy size={60} className="text-cyber-cyan" />
              </div>
              
              <div className="w-12 h-12 border border-cyber-cyan/30 rounded flex items-center justify-center text-cyber-cyan mb-6 group-hover:bg-cyber-cyan group-hover:text-black transition-all">
                <Award size={24} />
              </div>

              <div className="text-xs font-mono text-cyber-green mb-2">{achievement.date}</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-cyber-cyan transition-colors font-mono uppercase">{achievement.title}</h3>
              <h4 className="text-xs md:text-sm font-bold text-gray-500 mb-4">{achievement.issuer}</h4>
              <p className="text-gray-400 text-sm leading-relaxed border-l border-gray-800 pl-4">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;