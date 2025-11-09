// Design System Constants
export const theme = {
  // Color Palette
  colors: {
    primary: {
      rose: 'rose-500',
      amber: 'amber-500',
      gradient: 'from-rose-500 to-amber-500',
    },
    badges: {
      default: 'bg-gray-900 text-white',
      primary: 'bg-rose-500 text-white',
      secondary: 'bg-amber-500 text-white',
    },
    backgrounds: {
      light: 'bg-gradient-to-b from-slate-50 via-white to-slate-100',
      warm: 'bg-gradient-to-b from-peach-50 via-lavender-50 to-sage-50',
      soft: 'bg-gradient-to-b from-sage-50 via-peach-50 to-rose-50',
      dark: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
    },
  },
  
  // Typography
  typography: {
    heading: {
      hero: 'text-6xl md:text-8xl lg:text-9xl',
      section: 'text-4xl md:text-6xl lg:text-7xl',
      subsection: 'text-3xl md:text-4xl lg:text-5xl',
    },
    body: {
      large: 'text-xl md:text-2xl',
      medium: 'text-lg md:text-xl',
      base: 'text-base md:text-lg',
    },
    fontFamily: {
      display: "'Playfair Display', serif",
      sans: "'Inter', sans-serif",
    },
  },
  
  // Spacing
  spacing: {
    section: 'py-24 md:py-32',
    container: 'container mx-auto px-6 max-w-7xl',
    gap: {
      small: 'gap-6',
      medium: 'gap-8',
      large: 'gap-12',
    },
  },
  
  // Badge Styles
  badge: {
    base: 'inline-block px-6 py-2 rounded-full text-sm tracking-wide font-medium shadow-lg',
    withIcon: 'inline-flex items-center space-x-2 px-6 py-3 rounded-full text-sm tracking-wide font-bold shadow-xl',
  },
  
  // Card Styles
  card: {
    base: 'bg-white rounded-3xl p-8 shadow-lg',
    hover: 'hover:scale-105 hover:shadow-2xl transition-all duration-300',
  },
};

