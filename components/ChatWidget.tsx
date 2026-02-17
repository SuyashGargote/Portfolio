import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Loader } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "System initialized. I am CyberBot. Query database for skills, projects, or status.",
      timestamp: new Date()
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const responseText = await generateChatResponse(history, userMsg.content);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-4 border border-cyber-green bg-black text-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all duration-300 hover:bg-cyber-green hover:text-black ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-96 bg-black border border-cyber-green shadow-[0_0_20px_rgba(0,255,65,0.2)] flex flex-col"
            style={{ maxHeight: '600px', height: '80vh', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {/* Header */}
            <div className="bg-cyber-green/10 p-3 flex justify-between items-center border-b border-cyber-green">
              <div className="flex items-center gap-2">
                <Terminal className="text-cyber-green" size={16} />
                <span className="text-cyber-green text-xs font-bold uppercase">CyberBot_v2.5.exe</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cyber-green hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-black font-mono text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-2 ${
                      msg.role === 'user'
                        ? 'text-cyber-cyan border-b border-cyber-cyan text-right'
                        : 'text-cyber-green'
                    }`}
                  >
                    <span className="opacity-50 mr-2">[{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                    {msg.role === 'assistant' && <span className="font-bold mr-1">BOT:</span>}
                    {msg.role === 'user' && <span className="font-bold mr-1">USR:</span>}
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start text-cyber-green p-2">
                  <span className="animate-pulse">{'>>>'} PROCESSING...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-2 bg-black border-t border-cyber-green flex gap-2">
              <span className="text-cyber-green py-2 pl-2">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-white text-xs p-2 focus:outline-none font-mono"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 text-cyber-green hover:text-white transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;