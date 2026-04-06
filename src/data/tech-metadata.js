/**
 * @file tech-metadata.js
 * @description Centralized dictionary for technology branding (logos and base colors).
 * Used to automate icons and styles across the projects and skills sections.
 */

export const techMetadata = {
  // Frameworks & Libraries
  'React': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  'React Native': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB'
  },
  'Tailwind CSS': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4'
  },
  'Vite': {
    logo: 'https://vitejs.dev/logo.svg',
    color: '#646CFF'
  },
  'Next.js': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#ffffff'
  },
  'React Router': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', // using react logo as fallback
    color: '#CA4245'
  },
  'CSS Modules': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    color: '#1572B6'
  },
  'EmailJS': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', // fallback
    color: '#F2A93A'
  },

  // Base Technologies
  'JavaScript': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E'
  },
  'Chatbot': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg', // using a generic tech logo as fallback for Chatbot
    color: '#00AEEF'
  },
  'TypeScript': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6'
  },
  'HTML5': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    color: '#E34F26'
  },
  'CSS3': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    color: '#1572B6'
  },
  'Python': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB'
  },

  // Tools & Platforms
  'Git': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032'
  },
  'GitHub': {
    logo: 'https://cdn.simpleicons.org/github/white',
    color: '#ffffff'
  },
  'VS Code': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    color: '#007ACC'
  },
  'Firebase': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    color: '#FFCA28'
  },
  'PHP': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    color: '#777BB4'
  },
  'MySQL': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    color: '#4479A1'
  },
  // Case-sensitive aliases
  'Javascript': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E'
  },

  'Node.js': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933'
  },
  'Talento Tech': {
    logo: 'https://cdn.brandfetch.io/id_7R0Uf2K/theme/dark/logo.svg?c=1bfd9AC9590740995181b', // Logo representativo o fallback
    color: '#00AEEF'
  },
  // AI & SPECIAL
  'Claude': {
    logo: '/icons/claude.svg', // local
    color: '#D97757'
  },
  'Gemini': {
    logo: 'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png',
    color: '#8E75B2'
  },
  'Antigravity': {
    logo: '/icons/antigravity.svg', // local
    color: '#886CF5'
  },

  // Default fallback
  'default': {
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    color: '#c8922a'
  }
};

/**
 * Helper to get tech metadata by name with fallback
 */
export const getTech = (name) => {
  return techMetadata[name] || { name, ...techMetadata['default'] };
};
