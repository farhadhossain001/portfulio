# Portfolio 2 - Farhad Hossain

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Modern Design**: Clean, minimal design with dark theme (#0F172A background, #3B82F6 accent)
- **Responsive Layout**: Desktop two-column hero layout (text left, code right), mobile single-column
- **Floating Animations**: Smooth floating animation effects for navigation and elements
- **Interactive Elements**: Custom cursor, loading screen, and smooth scrolling
- **Code Window**: Portfolio.js code window design element in hero section
- **Performance Optimized**: Lightweight and fast loading

## Design System

### Colors
- Primary Background: #0F172A
- Secondary Background: #1E293B
- Accent Color: #3B82F6
- Text Primary: #FFFFFF
- Text Secondary: #CBD5E1

### Typography
- Primary Font: Space Grotesk
- Monospace Font: JetBrains Mono

## Structure

```
portfolio2/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── fonts/
│   └── fonts.css       # Custom fonts configuration
├── assets/
│   ├── favicon.svg     # Site favicon
│   └── pic.jpg         # Profile image (to be added)
└── README.md           # This file
```

## Adding Whispering Signature Font

To use the actual "Whispering Signature" font:

1. **Download the font files** (.ttf, .woff, .woff2 formats)
2. **Place them in** the `portfolio2/fonts/` folder
3. **Edit** `fonts/fonts.css` and uncomment the `@font-face` declaration
4. **Update file paths** if needed in the CSS

Currently using **Dancing Script** as a beautiful signature-style fallback font.

## Getting Started

1. Open `index.html` in a web browser
2. Add your profile image as `assets/pic.jpg`
3. Customize the content in `index.html`
4. Modify colors and styling in `css/style.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
