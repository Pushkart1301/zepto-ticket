/**
 * Zepto Ops Design System
 * Sober, editorial, restrained aesthetic
 */

export const colors = {
  // Background & Surface
  background: '#F7F6F3',        // Warm off-white
  surface: '#FDFCFA',           // Card surface, slightly offset
  surfaceHover: '#F2F1ED',      // Subtle hover state
  
  // Text
  textPrimary: 'rgba(20, 21, 26, 0.90)',    // Near-black at 90%
  textSecondary: 'rgba(20, 21, 26, 0.55)',  // 55% opacity
  textTertiary: 'rgba(20, 21, 26, 0.38)',   // Disabled/placeholder
  
  // Borders
  border: 'rgba(20, 21, 26, 0.08)',         // Low-contrast hairline
  borderHover: 'rgba(20, 21, 26, 0.12)',
  
  // Accent (used sparingly)
  accent: '#5B6EF5',                         // Muted slate blue
  accentSubtle: 'rgba(91, 110, 245, 0.08)', // Subtle background
  accentHover: '#4A5FE0',
  
  // Status (small icon + subdued color, not bright fills)
  success: '#4A7862',           // Muted sage
  successSubtle: 'rgba(74, 120, 98, 0.10)',
  
  attention: '#A6763B',         // Muted ochre
  attentionSubtle: 'rgba(166, 118, 59, 0.10)',
  
  blocked: '#A14D42',           // Muted brick
  blockedSubtle: 'rgba(161, 77, 66, 0.10)',
  
  neutral: 'rgba(20, 21, 26, 0.55)',
  neutralSubtle: 'rgba(20, 21, 26, 0.05)',
} as const;

export const typography = {
  // Font families
  fontSans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  fontMono: '"IBM Plex Mono", "SF Mono", Monaco, Consolas, monospace',
  
  // Font sizes (modest scale)
  fontSize: {
    xs: '0.6875rem',    // 11px - captions, labels
    sm: '0.8125rem',    // 13px - secondary text
    base: '0.9375rem',  // 15px - body text
    md: '1.0625rem',    // 17px - emphasis
    lg: '1.25rem',      // 20px - section titles
    xl: '1.5rem',       // 24px - page titles (max)
  },
  
  // Line heights (tight)
  lineHeight: {
    tight: 1.3,
    base: 1.45,
    relaxed: 1.6,
  },
  
  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.011em',
    normal: '0',
    wide: '0.01em',
  },
} as const;

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
} as const;

export const borders = {
  width: '1px',           // Hairline
  radius: {
    sm: '4px',
    md: '6px',
    none: '0',
  },
} as const;

export const shadows = {
  // Faint 1px separation only
  subtle: '0 1px 2px rgba(20, 21, 26, 0.04)',
  card: '0 1px 3px rgba(20, 21, 26, 0.06)',
} as const;

export const transitions = {
  fast: '120ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '180ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
