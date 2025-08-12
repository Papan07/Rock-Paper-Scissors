# Rock Paper Scissors Game

A modern, responsive Rock Paper Scissors game built with HTML, CSS, and JavaScript. Features beautiful animations, dark/light theme support, and accessibility features.

## 🎮 Game Features

- **5-Round Tournament**: Play best of 5 rounds against the computer
- **Real-time Scoring**: Track your wins, losses, and current round
- **Enhanced Animations**: Shake effects, scale reveals, confetti celebrations, and sparkle effects
- **Sound Effects**: Immersive audio feedback with Web Audio API
- **Theme Support**: Toggle between light and dark themes
- **Keyboard Support**: Use R, P, S keys for quick gameplay
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Full ARIA support, screen reader compatibility, and motion/sound preferences
- **Settings Panel**: Customize animations, sounds, and volume levels

## 🚀 How to Play

1. Choose your weapon: Rock (🪨), Paper (📄), or Scissors (✂️)
2. Watch the computer make its choice
3. See who wins the round based on classic rules:
   - Rock crushes Scissors
   - Scissors cuts Paper
   - Paper covers Rock
4. Play 5 rounds to determine the ultimate winner!
5. Click "Play Again" to start a new game

## 🎯 Game Rules

- **Rock** beats **Scissors**
- **Scissors** beats **Paper**
- **Paper** beats **Rock**
- Same choices result in a tie

## 🛠️ Technical Features

### HTML Structure
- Semantic HTML5 elements
- ARIA labels for accessibility
- Meta tags for SEO and responsive design

### CSS Styling
- CSS Custom Properties (variables) for theming
- Flexbox and Grid layouts
- Smooth animations and transitions
- Mobile-first responsive design
- Dark/light theme support

### JavaScript Functionality
- ES6+ class-based architecture
- Event-driven game logic
- Local storage for theme persistence
- Keyboard event handling
- DOM manipulation with accessibility in mind

## 🎨 Design Features

- **Modern UI**: Clean, card-based design with subtle shadows
- **Animated Background**: Floating shapes for visual interest
- **Enhanced Animations**: Shake, scale, pulse, confetti, and sparkle effects
- **Sound System**: Web Audio API with synthetic sound generation
- **Visual Feedback**: Button states, hover effects, and selection indicators
- **Typography**: Google Fonts (Poppins) for modern appearance
- **Accessibility Controls**: Settings panel with animation and sound toggles

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Desktop**: Full layout with side-by-side elements
- **Tablet**: Adjusted spacing and button sizes
- **Mobile**: Stacked layout with optimized touch targets

## ♿ Accessibility Features

- ARIA labels and descriptions
- Screen reader announcements for game state
- Keyboard navigation support
- High contrast theme option
- Semantic HTML structure

## 🚀 Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Or serve using a local server:
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 📁 Project Structure

```
rock-paper-scissors/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # Game logic and interactions
└── README.md          # Project documentation
```

## 🎮 Controls

- **Mouse**: Click on Rock, Paper, or Scissors buttons
- **Keyboard**:
  - `R` - Choose Rock
  - `P` - Choose Paper
  - `S` - Choose Scissors
- **Theme Toggle**: Click the moon/sun icon in the top-right corner
- **Settings**: Click the gear icon to access animation, sound, and volume controls

## 🌟 Advanced Features

- **Theme Persistence**: Your theme choice is saved in localStorage
- **Settings Persistence**: Animation, sound, and volume preferences are saved
- **Web Audio API**: Synthetic sound generation for consistent audio experience
- **Animation System**: Comprehensive animation framework with accessibility support
- **Confetti System**: Dynamic particle effects for celebrations
- **Error Handling**: Robust game state management
- **Performance**: Optimized CSS and JavaScript for smooth gameplay

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 Development Notes

This project was built following modern web development best practices:
- Semantic HTML for accessibility
- CSS custom properties for maintainable theming
- ES6+ JavaScript with class-based architecture
- Mobile-first responsive design approach
- Progressive enhancement principles

## 🎯 Future Enhancements

Potential improvements could include:
- Sound effects
- Multiplayer support
- Tournament mode with multiple opponents
- Statistics tracking
- Custom game rules (best of 3, 7, etc.)
- Animation preferences

---

**Enjoy playing Rock Paper Scissors!** 🎮
