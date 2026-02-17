import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div className="font-mono mb-4 md:mb-0">
          © {new Date().getFullYear()} Suyash Gargote. All systems operational.
        </div>
        <div className="flex gap-6 font-mono">
          <a href="#" className="hover:text-cyber-green transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyber-green transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;