import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: '// HOME', href: '#home' },
    { name: '// SKILLS', href: '#skills' },
    { name: '// OPS', href: '#projects' },
    { name: '// EXTRA', href: '#extra' },
    { name: '// INTEL', href: '#achievements' },
    { name: '// CONTACT', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        // Offset for fixed header (h-16 is 64px, adding 16px for breathing room = 80px)
        const headerOffset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-cyber-green/20 bg-cyber-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Logo Area */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={(e) => handleScroll(e, '#home')}
        >
          <Terminal className="text-cyber-green animate-pulse" size={20} />
          <div className="font-mono text-sm tracking-widest text-white">
            ROOT<span className="text-cyber-green">@SUYASH</span>:~#
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleScroll(e, link.href)}
              className="text-xs font-mono text-gray-500 hover:text-cyber-green hover:shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-all uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-cyber-green" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-cyber-gray border-b border-cyber-green/30 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block p-4 text-xs font-mono text-gray-400 hover:text-cyber-green hover:bg-black/50 border-l-2 border-transparent hover:border-cyber-green transition-all"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;