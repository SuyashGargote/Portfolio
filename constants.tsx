import { Project, SkillCategory, Achievement, Activity } from './types';
import { 
  Shield, Terminal, Code, Database, Globe, 
  Cpu, Lock, Server, Eye, Zap, Search, Wifi, Layout, Brain
} from 'lucide-react';

export const SOCIAL_LINKS = {
  github: "https://github.com/SuyashGargote",
  linkedin: "https://www.linkedin.com/in/suyash-gargote-a1585b251/",
  twitter: "https://x.com/GargoteSuyash",
  email: "https://mail.google.com/mail/u/0/?fs=1&to=suyashgargote026@gmail.com&tf=cm"
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'hacking',
    title: 'Hacking & Offensive Sec',
    icon: Terminal,
    description: "Advanced red-team methodologies for identifying and exploiting system vulnerabilities.",
    subcategories: [
      {
        title: 'Reconnaissance',
        tools: ['Nmap', 'OSINT Framework', 'Shodan', 'Maltego', 'Amass', 'Recon-ng', 'Google Dorks']
      },
      {
        title: 'Web Exploitation',
        tools: ['Burp Suite Professional', 'OWASP ZAP', 'SQLMap', 'Nikto', 'Wpscan', 'DirBuster', 'FFuF']
      },
      {
        title: 'Exploitation',
        tools: ['Metasploit Framework', 'Hydra', 'John the Ripper', 'Hashcat', 'Reverse Shells', 'Buffer Overflows']
      },
      {
        title: 'Wireless & Network',
        tools: ['Aircrack-ng', 'Kismet', 'Wireshark', 'Bettercap', 'Responder']
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: Code,
    description: "Full-stack engineering with a focus on secure architecture and performance.",
    subcategories: [
      {
        title: 'Frontend',
        tools: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js']
      },
      {
        title: 'Backend',
        tools: ['Node.js', 'Express', 'Python (FastAPI)', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
      },
      {
        title: 'DevOps & Cloud',
        tools: ['Docker', 'Kubernetes', 'AWS (EC2, S3)', 'Vercel', 'CI/CD Pipelines', 'Linux Administration']
      }
    ]
  },
  {
    id: 'cyber-def',
    title: 'Cyber Defense',
    icon: Shield,
    description: "Blue-team operations, incident response, and forensic analysis.",
    subcategories: [
      {
        title: 'Network Defense',
        tools: ['Snort', 'Suricata', 'PfSense', 'Firewall Configuration', 'VPN Setup', 'Honeypots']
      },
      {
        title: 'Forensics',
        tools: ['Autopsy', 'Volatility', 'FTK Imager', 'Digital Evidence Handling', 'Memory Analysis']
      },
      {
        title: 'Security Operations',
        tools: ['Splunk', 'ELK Stack', 'Wazuh', 'SIEM Management', 'Incident Response']
      }
    ]
  },
  {
  id: 'machine-learning',
  title: 'Machine Learning & Deep Learning',
  icon: Brain,
  description: "Applied deep learning, computer vision, and physics-guided AI systems.",
  subcategories: [
    {
      title: 'Artificial Intelligence',
      tools: ['Generative AI','Large Language Models (LLMs)','Prompt Engineering','Retrieval-Augmented Generation (RAG)','AI Agents','Vector Databases']
    },
    {
      title: 'Machine Learning',
      tools: ['Python','Scikit-learn','NumPy','Pandas','Model Evaluation']
    },
    {
      title: 'Deep Learning',
      tools: ['PyTorch','TorchVision','Convolutional Neural Networks (CNN)','ResNet','Autoencoders','Attention Mechanisms','CUDA','Mixed Precision Training']
    }
  ]
}

];

export const PROJECTS: Project[] = [
    {
    id: 1,
    title: "AI-Hunter",
    description: "Built an autonomous AI-driven web vulnerability scanner using behavior-based analysis and adaptive payload mutation to detect XSS and SQL injection. Implemented intelligent crawling, confirmation logic, and confidence-scored reporting for real-world bug bounty testing.",
    tags: ["TensorFlow", "NLP", "Python"],
    image: "assets/ai-hunter.png",
    category: "Security",
    githubUrl: "https://github.com/SuyashGargote/ai-vulnerability-hunter"
  },
  {
    id: 3,
    title: "Sacch.AI",
    description: "An intelligent tool that detects fake news, deepfakes, scam emails, malicious files and harmful links with AI-driven security insights to protect users online.",
    tags: ["React", "Gemini API", "VirusTotal API", "Vite"],
    image: "/assets/Sacchai.png",
    category: "Web",
    githubUrl: "https://github.com/SuyashGargote/Sacch.ai",
    liveUrl: "https://sacch-ai.vercel.app/"
  },
  {
    id: 2,
    title: "ThermoFusion-SR",
    description: "Low-resolution thermal imagery from satellites/UAVs lacks detail and accuracy. The model integrates Deep Learning with Physics-Aware Constraints through a dual-branch CNN architecture.",
    tags: ["torch", "torchvision", "numpy", "streamlit","Pillow","scikit","matplotlib","opencv"],
    image: "/assets/TIR.png",
    category: "ML",
    githubUrl: "https://github.com/SuyashGargote/TIR_SIH_ISRO_DATASET",
    liveUrl: ""
  },

  {
    id: 4,
    title: "Cyber Climb",
    description: "Personal Blogging Website where i post all my blogs bug bounty reports and other cybersecurity related content.",
    tags: ["typescript", "Next.js", "Tailwind CSS", "Supabase"],
    image: "assets/cyber-climb.png",
    category: "Web",
    liveUrl:"https://the-cyber-climb.vercel.app/"
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "GDG PCE Technical Member",
    date: "2025 - PRESENT",
    description: "Member of GDG PCE Technical Committee.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "COMMUNITY"
  },
    {
    id: 2,
    title: "Speaker at Ethical Hacking Workshop",
    date: "FEB 2026",
    description: "Speaker at Ethical Hacking Workshop at Pillai College of Engineering in collaboration with GDG-PCE and Algeria 2026.",
    image: "assets/workshop.jpeg",
    category: "SPEAKING"
  },
  {
    id: 3,
    title: "College Ambasador at TechFest IIT Bombay",
    date: "JAN 2024",
    description: "College Ambasador at TechFest IIT Bombay.",
    image: "assets/techfest.png",
    category: "COMMUNITY"
  }

];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "CEH (Preparing)",
    date: "2026",
    description: "Certified Ethical Hacker - The gold standard in penetration testing certification.",
    issuer: "EC-Council"
  },
  {
    id: 2,
    title: "Code Clash Winner",
    date: "2025",
    description: "Secured 1st place in CSI-PCE Competetive Coding Competition.",
    issuer: "CSI-PCE"
  },
  {
    id: 3,
    title: "Vibe Coding Winner",
    date: "2025",
    description: "Secured 1st place in Vibe Coding Competition.",
    issuer: "CSI-PCE"
  },
  {
    id: 4,
    title: "Code CLash Winner",
    date: "2025",
    description: "Secured 3rd place in state level Competetive Coding Competition.",
    issuer: "CESA-BVCOE"
  }
];

export const ABOUT_TEXT = `I am a cybersecurity focused engineer with a deep interest in offensive security, penetration testing, and adversary simulation. I am driven by curiosity about how real world attacks unfold and how systems fail under active threat conditions.

My work centers on understanding the full attack lifecycle from reconnaissance and initial access to privilege escalation and post exploitation and using that knowledge to assess and strengthen system defenses. I actively practice ethical hacking, vulnerability assessment, and security automation, backed by a strong foundation in networking, Linux, and web application security.

Beyond traditional penetration testing, I explore the intersection of machine learning and cybersecurity. My interests include anomaly detection, adversarial machine learning, AI assisted reconnaissance, and automated attack analysis, allowing me to evaluate security from both an attacker’s and defender’s mindset.

I enjoy building hands on projects that simulate real attack scenarios, experiment with emerging security techniques, and translate theory into practical tooling. I am continuously refining my skills through labs, research, and self driven experimentation.

I am seeking cybersecurity and red team internships where I can contribute to real world security assessments, learn from experienced professionals, and grow into a disciplined offensive security practitioner.
`;