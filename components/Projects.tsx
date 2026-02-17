import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, Database, FolderLock } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState<'All' | 'Security' | 'Web' | 'ML'>('All');
  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24 bg-cyber-black">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans uppercase">Mission Log</h2>
            <div className="h-1 w-20 bg-cyber-green mt-2 mx-auto md:mx-0"></div>
          </div>
          
          <div className="flex gap-2 p-1 bg-gray-900 border border-gray-800 rounded-sm overflow-x-auto max-w-full">
            {['All', 'Security', 'Web', 'ML'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-2 font-mono text-xs uppercase transition-all whitespace-nowrap ${
                  filter === cat 
                  ? 'bg-cyber-green text-black font-bold' 
                  : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={project.id}
                className="bg-black border border-gray-800 hover:border-cyber-green transition-colors group relative overflow-hidden flex flex-col sm:flex-row lg:flex-col xl:flex-row"
              >
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-green"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-green"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-green"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-green"></div>

                {/* Image Side */}
                <div className="w-full sm:w-2/5 lg:w-full xl:w-2/5 relative h-48 sm:h-auto lg:h-48 xl:h-auto overflow-hidden border-b sm:border-b-0 sm:border-r lg:border-b xl:border-b-0 xl:border-r border-gray-800">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-cyber-green/10 mix-blend-overlay"></div>
                  
                  {/* Category Label */}
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 border border-gray-700">
                     <span className={`text-[10px] font-mono font-bold uppercase ${
                        project.category === 'Security' ? 'text-cyber-red' : 'text-cyber-cyan'
                     }`}>
                       CONFIDENTIAL // {project.category}
                     </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full sm:w-3/5 lg:w-full xl:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-cyber-green transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed border-l-2 border-gray-800 pl-3 line-clamp-3 hover:line-clamp-none transition-all">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-cyber-green border border-cyber-green/30 px-2 py-1">
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-gray-900">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
                        <FolderLock size={14} /> VIEW_SOURCE
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono text-cyber-cyan hover:text-white transition-colors">
                        <ExternalLink size={14} /> DEPLOY_LINK
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;