# Buddas Hawaiian UI Design System

> **Identity System:** Modern Aloha | **Version:** 1.0 | **Status:** Active

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Brand Foundation](#2-brand-foundation)
3. [Design Tokens](#3-design-tokens)
4. [Layout & Grid](#4-layout--grid)
5. [Components](#5-components)
6. [Patterns & Templates](#6-patterns--templates)
7. [Guidelines & Best Practices](#7-guidelines--best-practices)
8. [Implementation](#8-implementation)

---

## 1. Introduction

### 1.1 About Buddas Hawaiian

**Mission:** *To Bring Aloha to the Table.*

We exist to share the specific warmth of island-inspired comfort food—fast, consistent, and family-friendly. We believe that convenience shouldn't feel cold, and speed shouldn't cost you your wallet.

**Positioning:** *Premium-Casual*
- Faster than sit-down restaurants (tech-enabled ordering)
- Higher quality than drive-thrus (fresh ingredients, real cooking)
- More soul than corporate chains (warmth, community, flavor)

### 1.2 Design System Purpose

This design system is the **single source of truth** for all Buddas Hawaiian digital products:

| Scope | Coverage |
|-------|----------|
| Website | buddashawaiian.com |
| Web Apps | Ordering system, catering portal |
| Email | Marketing templates |
| Digital Marketing | Social graphics, ads |

### 1.3 How to Use This System

**For Developers:**
- Use Tailwind utility classes matching design tokens
- Implement components using provided code examples
- Test for WCAG AA accessibility (4.5:1 text contrast)
- Ensure responsive behavior across all breakpoints

**For Designers:**
- Reference design tokens before creating new designs
- Use defined components and patterns
- Follow accessibility guidelines
- Maintain brand voice in all copy

---

## 2. Brand Foundation

### 2.1 Brand Personality

| Trait | Expression |
|-------|------------|
| **Warm & Welcoming** | Like being invited into a family home |
| **Authentic & Genuine** | No pretense, honest and real |
| **Culturally Rooted** | Proud Hawaiian heritage |
| **Modern & Efficient** | High-tech ordering, high-touch service |

### 2.2 Target Audiences

```
┌─────────────────────────────────────────────────────────────┐
│  PRIMARY AUDIENCES                                           │
├─────────────────────────────────────────────────────────────┤
│  1. BUSY FAMILIES                                           │
│     "Real dinner on a Tuesday night without cooking"        │
│     → Design: Family-friendly, value-focused                │
├─────────────────────────────────────────────────────────────┤
│  2. WORKING PROS                                            │
│     "Lunch that is filling, fast, and high-quality"         │
│     → Design: Speed, efficiency, mobile-first              │
├─────────────────────────────────────────────────────────────┤
│  3. THE "HOMESICK" LOCAL                                    │
│     "Craving the specific taste of home"                    │
│     → Design: Authenticity, nostalgia, tradition           │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Voice & Tone

**Voice:** Warm, Honest, and Efficient. We speak like a friendly local, not a corporate bot.

| Scenario | ❌ Too Corporate | ❌ Too Cliché | ✅ Buddas Voice |
|----------|-----------------|---------------|-----------------|
| **Menu Description** | "Grilled chicken with teriyaki sauce and rice." | "The most amazing chicken that will make you hula!" | "Char-grilled chicken glazed in house teri sauce. Served over steaming jasmine rice." |
| **Promo** | "Buy one get one free today only." | "Aloha friends! Get your tiki on!" | "Two hands, two Musubis. BOGO free all day today." |
| **Error** | "System Error 503." | "Uh oh, the volcano erupted!" | "Whoops. Our system went surfing. Let's try that again." |

---

## 3. Design Tokens

### 3.1 Color System

#### Primary Colors (Brand Anchors)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-buddas-teal` | `#54BFA5` | Primary buttons, icons, key highlights |
| `--color-buddas-teal-dark` | `#1C5F56` | Text on teal, footer backgrounds |
| `--color-buddas-teal-light` | `#7ACDB9` | Hover states, light accents |
| `--color-buddas-teal-pale` | `#E0F2EF` | Background tints |
| `--color-buddas-gold` | `#E9C559` | Price badges, add-to-cart, stars |
| `--color-buddas-gold-dark` | `#B38F24` | Text on gold backgrounds |

#### Neutrals & Canvas

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-buddas-cream` | `#FFF8E8` | Main page backgrounds ("Rice Paper" canvas) |
| `--color-buddas-brown` | `#5A3A1F` | **Primary text color** (never use #000000) |
| `--color-buddas-brown-dark` | `#3B2314` | Deepest brown for emphasis |
| `--color-buddas-white` | `#FFFFFF` | Cards, input fields |

#### Utility Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-buddas-orange` | `#D36200` | Urgency ("Only 2 left"), errors, limited time |

#### Semantic Token Mapping

```css
/* Reference → Semantic → Component */
--color-primary: var(--color-buddas-teal);
--color-primary-dark: var(--color-buddas-teal-dark);
--color-accent: var(--color-buddas-gold);
--color-background: var(--color-buddas-cream);
--color-text: var(--color-buddas-brown);
--color-error: var(--color-buddas-orange);
```

#### Tailwind Classes

| Purpose | Class |
|---------|-------|
| Primary Background | `bg-buddas-teal` |
| Primary Text | `text-buddas-brown` |
| Accent/Gold | `bg-buddas-gold`, `text-buddas-gold` |
| Page Background | `bg-buddas-cream` |
| Card Surface | `bg-white` |

---

### 3.2 Typography System

#### Font Families

| Role | Font | Weights | Technical Note |
|------|------|---------|----------------|
| **Headlines, Prices, Navigation** | Poppins | SemiBold (600), Medium (500) | Load only these 2 weights |
| **Body, Buttons, Descriptions** | DM Sans | Regular (400), Medium (500) | Load only these 2 weights |

> ⚠️ **CAUTION:** Do not use Bold (700) for Poppins headlines—it becomes too blocky and aggressive.

#### Type Scale

| Element | Font | Weight | Case | Tracking |
|---------|------|--------|------|----------|
| **H1 / Hero Headlines** | Poppins | SemiBold (600) | Title Case | -0.02em (Tight) |
| **H2 / Section Headers** | Poppins | SemiBold (600) | Title Case | -0.01em |
| **H3 / Prices** | Poppins | Medium (500) | — | 0 |
| **Body Copy** | DM Sans | Regular (400) | Sentence case | 0 |
| **Buttons / UI Labels** | DM Sans | Medium (500) | Title Case | 0 |
| **Captions / Mods** | DM Sans | Regular (400) | Sentence case | 0 |

#### Tailwind Classes

```html
<!-- H1 Hero -->
<h1 class="font-poppins font-semibold text-5xl md:text-7xl tracking-headline">

<!-- H2 Section -->
<h2 class="font-poppins font-semibold text-3xl md:text-4xl tracking-[-0.01em]">

<!-- Body -->
<p class="font-dm-sans text-base leading-relaxed">

<!-- Button -->
<button class="font-dm-sans font-medium text-sm uppercase tracking-wide">
```

---

### 3.3 Spacing System

Based on 4px grid with 8px base unit.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps (icon + text) |
| `--space-2` | 8px | Small margins |
| `--space-3` | 12px | Component internal padding |
| `--space-4` | 16px | Standard padding |
| `--space-6` | 24px | Section gaps |
| `--space-8` | 32px | Large spacing |
| `--space-12` | 48px | Section padding |
| `--space-16` | 64px | Major section breaks |
| `--space-24` | 96px | Hero sections |

---

### 3.4 Shadows & Elevation

Based on Material Design 3 principles with 6 elevation levels.

| Level | Token | CSS Value | Usage |
|-------|-------|-----------|-------|
| **0** | `shadow-none` | none | Flat elements |
| **1** | `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards (resting) |
| **2** | `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards (hover), dropdowns |
| **3** | `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, drawers |
| **4** | `shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero cards, important CTAs |
| **5** | `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Floating elements |

---

### 3.5 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Buttons, inputs |
| `--radius-md` | 8px | Cards, containers |
| `--radius-lg` | 12px | Menu cards, images |
| `--radius-xl` | 16px | Large containers |
| `--radius-full` | 9999px | Pills, avatars, badges |

---

### 3.6 Breakpoints

| Breakpoint | Value | Device Target |
|------------|-------|---------------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

### 3.7 Motion & Transitions

**Easing:** All motion uses "Aloha Motion" curve—like a wave settling.

```css
--ease-aloha: cubic-bezier(0.25, 0.1, 0.25, 1);
```

| Context | Duration | Easing |
|---------|----------|--------|
| **UI Interactions** | 200-300ms | `ease-aloha` |
| **Page Transitions** | 300-500ms | `ease-aloha` |
| **Menu Board Loops** | 5-8s | `ease-in-out` |

**Physics Rules:**
- Food does not bounce like rubber—it lands with weight
- Liquids/steam move slowly and organically
- No frantic cuts or jarring transitions

---

### 3.8 Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default content |
| `z-raised` | 10 | Cards, buttons |
| `z-dropdown` | 20 | Dropdowns, tooltips |
| `z-sticky` | 30 | Sticky headers |
| `z-fixed` | 40 | Fixed elements |
| `z-modal` | 50 | Modals, dialogs |
| `z-toast` | 60 | Toast notifications |
| `z-max` | 9999 | Critical overlays |

---

## 4. Layout & Grid

### 4.1 Container System

| Breakpoint | Max Width | Padding |
|------------|-----------|---------| 
| Default | 100% | 24px (px-6) |
| `md` | 768px | 40px (px-10) |
| `lg` | 1024px | 48px (px-12) |
| `xl` | 1280px | 48px (xl:px-12) |
| `2xl` | 1600px | 64px (2xl:px-16) |

```html
<div class="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 2xl:px-16">
```

### 4.2 Grid System

```html
<!-- Standard 3-Column Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

<!-- Menu Cards (Up to 5 columns) -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

<!-- Hero Split (50/50) -->
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">...</div>
  <div class="w-full md:w-1/2">...</div>
</div>
```

---

## 5. Components

### 5.1 Button Hierarchy

#### Primary Button (Conversion)
**Usage:** "Order Now", "Checkout", "Add to Cart"

```html
<button class="
  bg-buddas-teal 
  text-white 
  font-dm-sans font-medium 
  px-6 py-3 
  rounded-lg 
  hover:bg-buddas-teal-dark 
  transition-all duration-300 
  ease-[cubic-bezier(0.25,0.1,0.25,1)]
  shadow-md hover:shadow-lg
  hover:-translate-y-[2px] active:translate-y-0
">
  Order Now
</button>
```

#### Secondary Button (Navigation)
**Usage:** "View Menu", "Edit Item", "Learn More"

```html
<button class="
  bg-transparent 
  border-2 border-buddas-teal 
  text-buddas-teal 
  font-dm-sans font-medium 
  px-6 py-3 
  rounded-lg 
  hover:bg-buddas-teal hover:text-white 
  transition-all duration-300
">
  View Menu
</button>
```

#### Accent Button (Add-ons)
**Usage:** "Add +$1.99", "Upgrade"

```html
<button class="
  bg-buddas-gold 
  text-buddas-brown 
  font-dm-sans font-bold 
  px-4 py-2 
  rounded-lg
  hover:bg-buddas-gold-dark hover:text-white
  transition-colors duration-200
">
  Add +$1.99
</button>
```

---

### 5.2 Menu Card

**Image:** Top (mobile) or left (desktop), 1:1 or 4:3 aspect ratio, 12px radius

```jsx
<div class="
  bg-white rounded-xl p-4 
  shadow-sm hover:shadow-lg 
  border border-buddas-brown/5 
  hover:border-buddas-teal/20
  transition-all duration-300 
  hover:-translate-y-1
  cursor-pointer
">
  <!-- Image -->
  <div class="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-buddas-cream">
    {imageUrl ? (
      <Image src={imageUrl} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-buddas-brown/20">
        <span>No Image</span>
      </div>
    )}
    
    <!-- Badge (Optional) -->
    <span class="absolute top-3 left-3 bg-buddas-gold text-buddas-brown text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-sm">
      <Flame class="w-3 h-3" /> Popular
    </span>
  </div>
  
  <!-- Content -->
  <h3 class="text-lg font-poppins font-semibold text-buddas-brown leading-tight">{name}</h3>
  <p class="text-sm text-buddas-brown/70 font-dm-sans line-clamp-2 mb-4">{description}</p>
  
  <!-- Price Footer -->
  <div class="flex items-center justify-between pt-3 border-t border-dashed border-buddas-brown/10">
    <span class="text-xl font-poppins font-medium text-buddas-gold">${price}</span>
    <span class="text-xs text-buddas-teal font-dm-sans font-bold uppercase tracking-wide">
      View Details →
    </span>
  </div>
</div>
```

---

### 5.3 Form Inputs

```html
<!-- Text Input -->
<input 
  type="text"
  class="
    w-full px-4 py-3 
    bg-white 
    border border-buddas-brown/10 
    rounded-lg 
    font-dm-sans text-buddas-brown
    placeholder:text-buddas-brown/40
    focus:outline-none focus:ring-2 focus:ring-buddas-teal focus:border-transparent
    transition-all duration-200
  "
  placeholder="Enter your name"
/>

<!-- Select -->
<select class="
  w-full px-4 py-3 
  bg-white 
  border border-buddas-brown/10 
  rounded-lg 
  font-dm-sans text-buddas-brown
  focus:outline-none focus:ring-2 focus:ring-buddas-teal
  appearance-none
">
  <option>Select an option</option>
</select>
```

---

### 5.4 Badges & Tags

```html
<!-- Popular Badge -->
<span class="bg-buddas-gold text-buddas-brown text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-sm">
  <Flame class="w-3 h-3 fill-buddas-teal" /> Popular
</span>

<!-- New Badge -->
<span class="bg-buddas-gold text-buddas-brown text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
  New
</span>

<!-- Vegetarian Badge -->
<span class="bg-buddas-teal/10 text-buddas-teal text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-buddas-teal/30">
  <Leaf class="w-3 h-3" /> Veggie
</span>
```

---

### 5.5 Alerts & Feedback

```html
<!-- Success Toast -->
<div class="bg-buddas-teal text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
  <Check class="w-5 h-5" />
  <span class="font-dm-sans">Order placed successfully!</span>
</div>

<!-- Error Alert -->
<div class="bg-buddas-orange/10 border border-buddas-orange/30 text-buddas-orange px-6 py-4 rounded-lg flex items-center gap-3">
  <AlertTriangle class="w-5 h-5" />
  <span class="font-dm-sans">Please fill out all required fields.</span>
</div>
```

---

## 6. Patterns & Templates

### 6.1 Hero Pattern

```html
<section class="relative min-h-[70vh] flex items-center overflow-hidden bg-buddas-brown">
  <!-- Background Image -->
  <div class="absolute inset-0 z-0 opacity-40">
    <Image src={heroImage} alt="" fill class="object-cover" priority />
  </div>
  
  <!-- Content -->
  <div class="max-w-[1280px] mx-auto px-6 relative z-10 text-center">
    <span class="inline-block py-1.5 px-4 rounded-full bg-buddas-gold text-buddas-brown text-xs font-bold uppercase tracking-wider mb-4">
      {badge}
    </span>
    <h1 class="text-5xl md:text-7xl font-poppins font-semibold text-buddas-cream tracking-tight leading-tight mb-4">
      {title}
    </h1>
    <p class="text-xl text-buddas-cream/80 max-w-2xl mx-auto font-dm-sans mb-8">
      {subtitle}
    </p>
    <Button>Order Now</Button>
  </div>
</section>
```

### 6.2 Section Pattern

```html
<section class="py-16 md:py-24 bg-buddas-cream">
  <div class="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12">
    <!-- Section Header -->
    <div class="flex items-center gap-3 mb-10">
      <div class="bg-buddas-gold/10 p-3 rounded-xl border border-buddas-gold/20 text-buddas-brown">
        <Icon class="w-6 h-6" />
      </div>
      <div>
        <h2 class="text-3xl md:text-4xl font-poppins font-semibold text-buddas-brown tracking-tight">
          {title}
        </h2>
        <p class="text-buddas-brown/60 font-dm-sans mt-1">{subtitle}</p>
      </div>
    </div>
    
    <!-- Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {children}
    </div>
  </div>
</section>
```

---

## 7. Guidelines & Best Practices

### 7.1 Accessibility (WCAG 2.2 AA)

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| **Text Contrast** | 4.5:1 minimum | Use `text-buddas-brown` on light backgrounds |
| **Large Text Contrast** | 3:1 minimum | Use `text-buddas-brown/80` minimum opacity |
| **UI Components** | 3:1 minimum | All buttons, inputs have sufficient contrast |
| **Focus Indicators** | 3:1 + 2px | Use `focus:ring-2 focus:ring-buddas-teal` |
| **Touch Targets** | 44px minimum | All buttons/links minimum 44x44px on mobile |

**Accessible Mode Override:**
```css
:root.accessible-mode {
  --color-buddas-brown: #000000;
  --color-buddas-cream: #FFFFFF;
  --color-buddas-teal: #004d40;
  --color-buddas-gold: #B49124;
}
```

### 7.2 Photography Guidelines

| Aspect | Requirement |
|--------|-------------|
| **Lighting** | Golden hour feel (4 PM sun), warm and directional |
| **Tone** | No blue tones—rice should look creamy/warm |
| **Cropping** | Tight "generosity" crop—food bursting from frame |
| **Imperfection** | "Perfectly imperfect"—sauce drips, stray green onions OK |
| **Angles** | 45° (diner's eye) for plates; top-down for spreads |
| **Human Element** | Include hands holding food where possible |

### 7.3 Icon Guidelines

| Property | Specification |
|----------|---------------|
| **Style** | Monoline, rounded caps |
| **Weight** | Match font weight (Medium/SemiBold) |
| **Primary Color** | Base Teal (`#54BFA5`) |
| **Accent Color** | Gold (`#E9C559`) for stars/highlights |
| **Format** | SVG strokes only (no filled icons unless active) |

### 7.4 Do's and Don'ts

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use `text-buddas-brown` for all text | Use `#000000` black anywhere |
| Use `bg-buddas-cream` for page backgrounds | Use stark white page backgrounds |
| Use Poppins SemiBold (600) for headlines | Use Poppins Bold (700)—too aggressive |
| Use warm, golden-hour photography | Use cold, blue-toned photography |
| Keep motion smooth (Aloha ease) | Use jarring, robotic animations |
| Show "perfectly imperfect" food | Use museum-piece food styling |

---

## 8. Implementation

### 8.1 CSS Variables (globals.css)

```css
@theme inline {
  /* Primary Teals */
  --color-buddas-teal: #54BFA5;
  --color-buddas-teal-dark: #1C5F56;
  --color-buddas-teal-light: #7ACDB9;
  --color-buddas-teal-pale: #E0F2EF;

  /* Island Golds */
  --color-buddas-gold: #E9C559;
  --color-buddas-gold-dark: #B38F24;

  /* Neutrals */
  --color-buddas-brown: #5A3A1F;
  --color-buddas-brown-dark: #3B2314;
  --color-buddas-cream: #FFF8E8;
  --color-buddas-white: #FFFFFF;

  /* Utility */
  --color-buddas-orange: #D36200;

  /* Motion */
  --ease-aloha: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* Typography */
  --font-poppins: var(--font-poppins);
  --font-dm-sans: var(--font-dm-sans);
}
```

### 8.2 Tailwind Utility Classes

```html
<!-- Typography -->
font-poppins font-semibold tracking-headline
font-dm-sans font-medium

<!-- Colors -->
bg-buddas-teal text-buddas-brown bg-buddas-cream bg-buddas-gold

<!-- Motion -->
transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]

<!-- Shadows -->
shadow-sm hover:shadow-lg

<!-- Layout -->
max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px]
px-6 md:px-10 xl:px-12 2xl:px-16
```

### 8.3 Font Loading (layout.tsx)

```tsx
import { Poppins, DM_Sans } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'], // Medium + SemiBold only
  variable: '--font-poppins',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'], // Regular + Medium only
  variable: '--font-dm-sans',
});

// Apply to body
<body className={`${poppins.variable} ${dmSans.variable}`}>
```

### 8.4 Performance Specs

| Asset | Max Size | Format |
|-------|----------|--------|
| Hero Images | 150KB | WebP |
| Thumbnails | 30KB | WebP |
| Icons | Minimal | SVG |
| Fonts | 4 files total | WOFF2 |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  BUDDAS DESIGN SYSTEM - QUICK REFERENCE                     │
├─────────────────────────────────────────────────────────────┤
│  COLORS                                                     │
│  Primary:   #54BFA5 (Teal)    Accent: #E9C559 (Gold)       │
│  Text:      #5A3A1F (Brown)   Background: #FFF8E8 (Cream)   │
│  Error:     #D36200 (Orange)                                │
├─────────────────────────────────────────────────────────────┤
│  TYPOGRAPHY                                                 │
│  Headlines:  Poppins SemiBold (600), tracking -0.02em       │
│  Body/UI:    DM Sans Regular (400) / Medium (500)           │
├─────────────────────────────────────────────────────────────┤
│  BUTTONS                                                    │
│  Primary:    bg-buddas-teal text-white rounded-lg           │
│  Secondary:  border-2 border-buddas-teal text-buddas-teal   │
│  Accent:     bg-buddas-gold text-buddas-brown               │
├─────────────────────────────────────────────────────────────┤
│  MOTION                                                     │
│  Easing:     cubic-bezier(0.25, 0.1, 0.25, 1)              │
│  Duration:   UI: 200-300ms | Transitions: 300-500ms        │
├─────────────────────────────────────────────────────────────┤
│  ACCESSIBILITY                                              │
│  Text Contrast: 4.5:1 min | UI Contrast: 3:1 min           │
│  Touch Targets: 44px min | Focus: ring-2 ring-buddas-teal  │
└─────────────────────────────────────────────────────────────┘
```

---

*Design System Version 1.0 — Based on Buddas Hawaiian Brand Guidelines 2.9*
