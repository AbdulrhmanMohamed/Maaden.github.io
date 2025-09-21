# Construction Background Pattern Options

## Current: Steel Beam Grid Pattern
- **Pattern**: I-beams with cross-bracing
- **Style**: Industrial construction framework
- **Colors**: Gold (#D4AF37) with low opacity
- **Size**: 160px x 160px

## Alternative Pattern 1: Construction Blueprint Grid
```svg
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="blueprint-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
      <!-- Blueprint grid lines -->
      <path d="M0,0 L120,0 M0,20 L120,20 M0,40 L120,40 M0,60 L120,60 M0,80 L120,80 M0,100 L120,100 M0,120 L120,120" 
            stroke="#D4AF37" stroke-width="1" stroke-opacity="0.2"/>
      <path d="M0,0 L0,120 M20,0 L20,120 M40,0 L40,120 M60,0 L60,120 M80,0 L80,120 M100,0 L100,120 M120,0 L120,120" 
            stroke="#D4AF37" stroke-width="1" stroke-opacity="0.2"/>
      <!-- Construction symbols -->
      <circle cx="30" cy="30" r="3" fill="#D4AF37" fill-opacity="0.3"/>
      <circle cx="90" cy="30" r="3" fill="#D4AF37" fill-opacity="0.3"/>
      <circle cx="30" cy="90" r="3" fill="#D4AF37" fill-opacity="0.3"/>
      <circle cx="90" cy="90" r="3" fill="#D4AF37" fill-opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="120" height="120" fill="url(#blueprint-grid)"/>
</svg>
```

## Alternative Pattern 2: Brick/Block Pattern
```svg
<svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="brick-pattern" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
      <!-- Brick rows -->
      <rect x="0" y="0" width="80" height="20" fill="#D4AF37" fill-opacity="0.1"/>
      <rect x="0" y="20" width="40" height="20" fill="#D4AF37" fill-opacity="0.1"/>
      <rect x="40" y="20" width="40" height="20" fill="#D4AF37" fill-opacity="0.1"/>
      <!-- Brick outlines -->
      <rect x="0" y="0" width="80" height="20" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-opacity="0.2"/>
      <rect x="0" y="20" width="40" height="20" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-opacity="0.2"/>
      <rect x="40" y="20" width="40" height="20" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>
  </defs>
  <rect width="80" height="40" fill="url(#brick-pattern)"/>
</svg>
```

## Alternative Pattern 3: Construction Tools Pattern
```svg
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="tools-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <!-- Hammer -->
      <rect x="20" y="20" width="4" height="20" fill="#D4AF37" fill-opacity="0.3"/>
      <rect x="18" y="18" width="8" height="4" fill="#D4AF37" fill-opacity="0.3"/>
      <!-- Wrench -->
      <path d="M60,20 L70,20 L72,22 L72,28 L70,30 L60,30 L58,28 L58,22 Z" fill="#D4AF37" fill-opacity="0.3"/>
      <!-- Screwdriver -->
      <rect x="20" y="60" width="2" height="15" fill="#D4AF37" fill-opacity="0.3"/>
      <rect x="18" y="58" width="6" height="4" fill="#D4AF37" fill-opacity="0.3"/>
      <!-- Level -->
      <rect x="60" y="60" width="20" height="3" fill="#D4AF37" fill-opacity="0.3"/>
      <circle cx="65" cy="61.5" r="1" fill="#D4AF37" fill-opacity="0.5"/>
      <circle cx="75" cy="61.5" r="1" fill="#D4AF37" fill-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="100" height="100" fill="url(#tools-pattern)"/>
</svg>
```

## Alternative Pattern 4: Building Profile Silhouette
```svg
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="building-profile" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
      <!-- Building silhouettes -->
      <rect x="10" y="40" width="20" height="80" fill="#D4AF37" fill-opacity="0.1"/>
      <rect x="35" y="20" width="25" height="100" fill="#D4AF37" fill-opacity="0.1"/>
      <rect x="65" y="60" width="20" height="60" fill="#D4AF37" fill-opacity="0.1"/>
      <rect x="90" y="30" width="25" height="90" fill="#D4AF37" fill-opacity="0.1"/>
      <!-- Windows -->
      <rect x="12" y="50" width="4" height="6" fill="#D4AF37" fill-opacity="0.2"/>
      <rect x="18" y="50" width="4" height="6" fill="#D4AF37" fill-opacity="0.2"/>
      <rect x="12" y="70" width="4" height="6" fill="#D4AF37" fill-opacity="0.2"/>
      <rect x="18" y="70" width="4" height="6" fill="#D4AF37" fill-opacity="0.2"/>
    </pattern>
  </defs>
  <rect width="120" height="120" fill="url(#building-profile)"/>
</svg>
```



