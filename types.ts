import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category: 'Security' | 'Web' | 'ML';
}

export interface Activity {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

export interface SkillSubCategory {
  title: string;
  tools: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  description: string;
  subcategories: SkillSubCategory[];
}

export interface Achievement {
  id: number;
  title: string;
  date: string;
  description: string;
  issuer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}