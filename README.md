# 🦉 Night OwL Portfolio

A personal portfolio website with a Night Owl theme, built with React, TypeScript, and Tailwind CSS.

![Night Owl Developer](https://img.shields.io/badge/Night%20Owl-Developer-7e57c2)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7-646cff)

## ✨ Features

- 🌙 **Night Owl Theme** - Dark color palette inspired by the Night Owl VS Code theme
- ☕ **Coffee & Code Aesthetic** - Animated coffee cups and owl mascot
- ⭐ **Animated Stars** - Twinkling star background effect
- 🎭 **Scroll Animations** - Smooth reveal animations using Framer Motion
- 📱 **Responsive Design** - Works on all screen sizes
- 🎨 **Custom Tailwind Colors** - Night owl inspired color scheme

## 🛠️ Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite with Rolldown
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Custom SVG components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/nowl-it/nowl-portfolio.git

# Navigate to project directory
cd nowl-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the portfolio.

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx       # Navigation with mobile menu
│   ├── Hero.tsx         # Hero section with intro
│   ├── About.tsx        # About section with terminal
│   ├── Skills.tsx       # Skills display with tags
│   ├── Projects.tsx     # Project showcase
│   ├── Contact.tsx      # Contact form & social links
│   ├── Footer.tsx       # Footer section
│   ├── Stars.tsx        # Animated star background
│   ├── CoffeeCup.tsx    # Animated coffee cup
│   ├── OwlIcon.tsx      # SVG owl mascot
│   └── ScrollReveal.tsx # Scroll animation components
├── App.tsx              # Main app component
├── App.css              # App styles
├── index.css            # Tailwind & custom theme
└── main.tsx             # Entry point
```

## 🎨 Color Palette

| Color        | Hex       | Usage                |
| ------------ | --------- | -------------------- |
| Night 900    | `#011627` | Primary background   |
| Night 800    | `#0d293d` | Secondary background |
| Owl Cyan     | `#7fdbca` | Primary accent       |
| Owl Purple   | `#c792ea` | Secondary accent     |
| Owl Amber    | `#ecc48d` | Highlights           |
| Coffee Light | `#d4a574` | Coffee elements      |

## 📝 Customization

### Update Personal Info

1. Edit `Hero.tsx` for main introduction
2. Update `About.tsx` for your background
3. Modify `Skills.tsx` to list your skills
4. Add your projects in `Projects.tsx`
5. Update social links in `Contact.tsx`

### Add Your CV

Place your CV file as `public/cv.pdf` to enable the download button.

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Night OwL Developer**

- GitHub: [@nowl-it](https://github.com/nowl-it)

---

Made with 🦉 & ☕ during late night coding sessions
