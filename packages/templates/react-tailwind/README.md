# 

A modern React application built with Vite, TypeScript, TailwindCSS, and shadcn/ui.

## Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **TailwindCSS** - Utility-first CSS framework

- 🧩 **shadcn/ui** - Beautiful, accessible component library

- 🚀 **React Router** - Declarative routing for React
{
- 🌙 **Dark Mode** - Theme switching with system preference detection

- 📱 **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar, Layout)

│   └── ui/             # shadcn/ui components

├── pages/              # Page components
├── lib/                # Utility functions
└── main.tsx            # Application entry point
```

## Development

The development server runs on `http://localhost:3000` with hot module replacement enabled.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Customization


### Adding shadcn/ui Components

This template includes a basic set of shadcn/ui components. To add more:

1. Visit [shadcn/ui components](https://ui.shadcn.com/docs/components)
2. Copy the component code to `src/components/ui/`
3. Update imports as needed

### Theme Customization

Edit `tailwind.config.js` to customize the design system:

- Colors: Update the color palette in the `theme.extend.colors` section
- Spacing: Modify spacing values
- Typography: Customize font families and sizes


{
### Dark Mode

Dark mode is handled by `next-themes`. The theme toggle is available in the navigation.

- System theme detection
- Manual theme switching
- Persistent theme preference


## Deployment

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Deploy to Netlify

1. Run `npm run build`
2. Upload the `dist/` folder to [Netlify](https://netlify.com)

## License

MIT