# Design System Documentation

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `#4436F8` - Main accent color for headlines and CTAs
- **Primary Light**: `#7C3AED` - Secondary accent for gradients
- **Background Pink**: `#FFD6E8` - Soft pastel pink background
- **Background Violet**: `#BFD4FF` - Cool violet background
- **Background Violet Light**: `#D8E3FF` - Lighter violet background

### Text Colors
- **Primary Text**: `#1A1A1A` - High-contrast headings
- **Secondary Text**: `#555555` - Body text
- **Tertiary Text**: `#666666` - Subdued content
- **Muted Text**: `#888888` - Disabled/placeholder text

## 🔤 Typography

### Font Stack
- **Primary**: Inter (400, 500, 600, 700, 800)
- **Secondary**: Poppins (300, 400, 500, 600, 700, 800)
- **Body**: DM Sans (300, 400, 500, 600, 700)

### Font Sizes
```css
.text-hero      /* 3rem - Main headlines */
.text-display   /* 2.5rem - Section headlines */
.text-h1        /* 2.25rem - Large headings */
.text-h2        /* 1.875rem - Medium headings */
.text-h3        /* 1.5rem - Small headings */
.text-h4        /* 1.25rem - Subheadings */
.text-body      /* 1rem - Body text */
.text-small     /* 0.875rem - Small text */
```

### Font Weights
- **400**: Body text
- **500**: Medium emphasis
- **600**: Headings and buttons
- **700**: Bold headlines

## 🎯 Components

### Buttons

#### Primary Button
```jsx
<button className="btn-primary">
  Get Started Free
</button>
```

#### Secondary Button
```jsx
<button className="btn-secondary">
  View Demo
</button>
```

#### Ghost Button
```jsx
<button className="btn-ghost">
  Learn More
</button>
```

### Cards

#### Standard Card
```jsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</div>
```

#### Hover Card
```jsx
<div className="card-hover">
  <h3>Interactive Card</h3>
  <p>This card has hover effects...</p>
</div>
```

### Links

#### Primary Link
```jsx
<a href="#" className="link-primary">
  Primary Link
</a>
```

#### Gradient Link
```jsx
<a href="#" className="link-gradient">
  Gradient Link
</a>
```

### Sections

#### Standard Section
```jsx
<section className="section">
  <div className="section-content">
    {/* Content */}
  </div>
</section>
```

#### Glass Section
```jsx
<section className="section bg-white/20 backdrop-blur-sm">
  <div className="section-content">
    {/* Content */}
  </div>
</section>
```

## 🎨 Utility Classes

### Gradients
```css
.bg-gradient-button    /* Button gradient */
.bg-gradient-primary   /* Primary gradient */
.bg-gradient-secondary /* Secondary gradient */
.text-gradient        /* Gradient text */
```

### Shadows
```css
.shadow-soft          /* Soft shadow */
.shadow-medium        /* Medium shadow */
.shadow-large         /* Large shadow */
.shadow-glow          /* Glow effect */
.shadow-card          /* Card shadow */
```

### Animations
```css
.animate-float        /* Floating animation */
.animate-gradient-shift /* Gradient shift */
```

### Effects
```css
.glass               /* Glass morphism */
.three-container     /* Three.js container */
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Responsive Typography
```css
/* Mobile adjustments */
@media (max-width: 768px) {
  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.875rem; }
  h3 { font-size: 1.5rem; }
}
```

## 🎭 Layout Patterns

### Hero Section
```jsx
<section className="section">
  <div className="section-content">
    <div className="text-center space-y-8">
      <h1 className="text-gradient">Main Headline</h1>
      <p className="text-xl text-text-secondary max-w-3xl mx-auto">
        Subtitle text
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-primary">Primary CTA</button>
        <button className="btn-secondary">Secondary CTA</button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid
```jsx
<div className="grid md:grid-cols-3 gap-8">
  <div className="card-hover">
    <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center mb-6">
      {/* Icon */}
    </div>
    <h3 className="text-h3 mb-4">Feature Title</h3>
    <p className="text-text-secondary">Feature description...</p>
  </div>
</div>
```

### CTA Section
```jsx
<section className="section">
  <div className="section-content">
    <div className="card text-center max-w-4xl mx-auto">
      <h2 className="text-gradient mb-6">Call to Action</h2>
      <p className="text-lg text-text-secondary mb-8">
        Supporting text...
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-primary">Primary Action</button>
        <button className="btn-ghost">Secondary Action</button>
      </div>
    </div>
  </div>
</section>
```

## 🎨 Three.js Integration

### Container Styling
```jsx
<div className="three-container h-96">
  {/* Three.js canvas goes here */}
</div>
```

### Styling Guidelines
- Use `three-container` class for Three.js components
- Maintain consistent border radius and shadows
- Apply backdrop blur for glass effect
- Use subtle borders for definition

## 🚀 Best Practices

### Spacing
- Use consistent spacing with Tailwind's spacing scale
- Prefer `py-20` for section padding
- Use `gap-8` for grid layouts
- Apply `mb-6` for component spacing

### Typography
- Use `text-gradient` for main headlines
- Apply `text-text-secondary` for body text
- Use appropriate font weights (400 for body, 600+ for headings)

### Colors
- Use primary colors sparingly for emphasis
- Apply secondary text colors for readability
- Use gradients for visual interest

### Animations
- Keep animations subtle and purposeful
- Use `framer-motion` for complex animations
- Apply `transition-all duration-300` for smooth interactions

## 🎯 Accessibility

### Focus States
- All interactive elements have visible focus states
- Use `focus:ring-4 focus:ring-primary/20` for buttons
- Apply `focus:outline-none` to remove default outlines

### Color Contrast
- Primary text meets WCAG AA standards
- Secondary text is readable on all backgrounds
- Gradient text has sufficient contrast

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order maintained
- Skip links available where needed

## 📦 Installation & Setup

### Required Dependencies
```json
{
  "framer-motion": "^11.18.2",
  "tailwindcss": "^3.4.1"
}
```

### Font Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

This design system provides a cohesive, modern, and accessible foundation for your marketplace UI with beautiful gradients, clean typography, and smooth animations. 