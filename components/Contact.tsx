import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Send, Terminal, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const transmissionLogs = [
    "Establishing secure tunnel...",
    "Encrypting payload with AES-256...",
    "Routing through distributed nodes...",
    "Bypassing firewall constraints...",
    "Handshake confirmed with destination.",
    "Data packet transmitted successfully.",
    "Connection terminated."
  ];

  // This effect handles the log animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'transmitting') {
      interval = setInterval(() => {
        if (currentLogIndex < transmissionLogs.length) {
          setLogs(prev => [...prev, transmissionLogs[currentLogIndex]]);
          setCurrentLogIndex(prev => prev + 1);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [status, currentLogIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('transmitting');
    setLogs(["INITIALIZING_TRANSMISSION..."]);
    setCurrentLogIndex(0);

    try {
      // Real API call to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Mission Brief from ${formData.name}`,
          from_name: "CipherFolio Portfolio",
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Wait for logs to finish or fast-forward them
        setTimeout(() => setStatus('success'), 4000);
      } else {
        throw new Error(result.message || "Transmission failed");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setLogs(prev => [...prev, "ERROR: SECURE_CONNECTION_FAILED", "RETRYING_UNAVAILABLE"]);
      setTimeout(() => setStatus('error'), 2000);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setLogs([]);
    setCurrentLogIndex(0);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-cyber-black relative border-t border-cyber-green/20">
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <div className="bg-cyber-gray border border-gray-800 overflow-hidden flex flex-col md:flex-row shadow-[0_0_20px_rgba(0,255,65,0.05)]">
          
          {/* Info Side */}
          <div className="w-full md:w-1/2 p-6 md:p-10 bg-black relative border-b md:border-b-0 md:border-r border-gray-800">
            <div className="flex items-center gap-2 mb-6 md:mb-8 text-cyber-green font-mono text-xs">
              <Terminal size={14} />
              <span>SECURE_CONNECTION_ESTABLISHED</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 font-sans uppercase">
              Initialize <span className="text-cyber-green">Handshake</span>
            </h2>
            <p className="text-gray-400 mb-8 md:mb-10 leading-relaxed font-mono text-sm">
              Ready to deploy. Whether you need a security audit, a full-stack application, or AI integration, transmit your mission brief securely below.
            </p>

            <div className="space-y-6 font-mono text-sm">
              <a href={SOCIAL_LINKS.email} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-cyber-green transition-colors group break-all">
                <div className="w-10 h-10 border border-gray-700 flex items-center justify-center group-hover:border-cyber-green transition-colors flex-shrink-0">
                  <Mail size={18} />
                </div>
                <span>suyashgargote026@gmail.com</span>
              </a>
              <div className="flex gap-4 mt-8">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                  <Github size={18} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Matrix-like decorative elements */}
            <div className="absolute bottom-4 left-4 opacity-5 pointer-events-none font-mono text-[10px] text-cyber-green space-y-1">
              <div>IP_LOG: 192.168.1.104</div>
              <div>PORT: 443 [OPEN]</div>
              <div>SSL: ACTIVE</div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full md:w-1/2 p-6 md:p-10 bg-cyber-gray relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-cyber-green font-mono uppercase">{'>>>'} Identity</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="NAME" 
                      className="w-full bg-black border border-gray-700 p-3 text-white focus:outline-none focus:border-cyber-green transition-colors placeholder:text-gray-700 font-mono text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-cyber-green font-mono uppercase">{'>>>'} Return Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="EMAIL" 
                      className="w-full bg-black border border-gray-700 p-3 text-white focus:outline-none focus:border-cyber-green transition-colors placeholder:text-gray-700 font-mono text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-cyber-green font-mono uppercase">{'>>>'} Payload</label>
                    <textarea 
                      name="message"
                      required
                      rows={4} 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="MESSAGE..." 
                      className="w-full bg-black border border-gray-700 p-3 text-white focus:outline-none focus:border-cyber-green transition-colors placeholder:text-gray-700 font-mono text-sm"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-4 bg-cyber-green/10 border border-cyber-green text-cyber-green font-bold hover:bg-cyber-green hover:text-black transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-widest group"
                  >
                    Transmit Data <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.form>
              )}

              {status === 'transmitting' && (
                <motion.div 
                  key="transmitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col pt-4"
                >
                  <div className="flex items-center gap-3 mb-6 text-cyber-green">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="font-mono text-sm font-bold animate-pulse">TRANSMITTING...</span>
                  </div>
                  <div className="flex-1 bg-black/50 border border-gray-800 p-4 font-mono text-xs text-cyber-green/70 space-y-2 overflow-hidden shadow-inner">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="opacity-40">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                        <span className={i === logs.length - 1 ? "text-cyber-green" : ""}>
                          {i === logs.length - 1 ? "> " : ""}{log}
                        </span>
                      </div>
                    ))}
                    <div className="w-2 h-4 bg-cyber-green animate-pulse inline-block align-middle ml-1" />
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 border-2 border-cyber-green rounded-full flex items-center justify-center text-cyber-green shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-mono uppercase">Transmission Complete</h3>
                    <p className="text-gray-400 font-mono text-sm">Payload received by suyashgargote026@gmail.com. Handshake finalized.</p>
                  </div>
                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 bg-white/5 border border-white/20 text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors"
                  >
                    Send New Message
                  </button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 border-2 border-cyber-red rounded-full flex items-center justify-center text-cyber-red shadow-[0_0_30px_rgba(255,0,60,0.2)]">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white font-mono uppercase">Transmission Failed</h3>
                    <p className="text-gray-400 font-mono text-sm">Protocol interference detected. Secure connection interrupted.</p>
                  </div>
                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 bg-cyber-red/10 border border-cyber-red text-cyber-red font-mono text-xs uppercase hover:bg-cyber-red hover:text-black transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;