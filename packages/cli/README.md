# create-webstack-app

A CLI tool to quickly scaffold modern web applications with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

Create a new project with npx (no installation required):

```bash
npx create-webstack-app@latest
```

Or with npm create:

```bash
npm create webstack-app@latest
```

Or install globally:

```bash
npm install -g create-webstack-app@latest
create-webstack-app
```

## 📦 Available Templates

### 1. **React 18 + Tailwind CSS v4**
Modern React application with the latest Tailwind CSS v4, featuring:
- ✨ TypeScript support
- 🎨 Tailwind CSS v4 with theme system (6 professional themes)
- 🧩 Pre-built UI components (Buttons, Cards, Inputs, Drawer, Carousel)
- 📱 Responsive layout with AppLayout system
- 🌙 Dark mode support
- ⚡ Vite for lightning-fast development
- 📖 Comprehensive documentation

### 2. **React 18 + Tailwind CSS v3**
Stable React application with Tailwind CSS v3:
- ✨ TypeScript
- 🎨 Tailwind CSS v3
- 🧭 Basic navigation components
- 🌓 Theme toggle (Light/Dark)
- ⚡ Vite

### 3. **React 19 + TypeScript (Basic)**
Minimal React 19 setup with TypeScript:
- ⚛️ React 19 (latest)
- ✨ TypeScript
- ⚡ Vite
- 🎯 ESLint

## 📖 Usage

The CLI will guide you through an interactive setup:

1. **Select a template** - Choose from available templates
2. **Enter project name** - Name your project (or use current directory)
3. **Confirm** - If directory is not empty, confirm to proceed

```bash
# Create in a new directory
npm create webstack-app
# Follow prompts...
> Select template: react18-tailwind4
> Project name: my-awesome-app

# Create in current directory
npm create webstack-app
# Follow prompts...
> Select template: react18-tailwind4
> Project name: . (or leave blank)
```

## 🎯 After Creation

```bash
cd your-project-name
pnpm install  # or npm install / yarn install
pnpm dev      # or npm run dev / yarn dev
```

Your app will be running at `http://localhost:5173`

## 🌟 Features

- **Interactive CLI** - Beautiful colored prompts using Inquirer and Chalk
- **Smart Validation** - Project name validation for cross-platform compatibility
- **Safe Operations** - Confirms before overwriting existing directories
- **Fast Setup** - Copies templates without node_modules for quick installation
- **Multiple Templates** - Choose the stack that fits your needs

## 🛠️ Requirements

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or pnpm/yarn)

## 📝 Project Structure (react18-tailwind4)

```
your-project/
├── src/
│   ├── components/     # Reusable UI components
│   │   └── UI/        # Button, Card, Input, Drawer, etc.
│   ├── layout/        # AppLayout, TopNav, SideNav
│   ├── pages/         # Page components
│   ├── context/       # React contexts (theme)
│   ├── hooks/         # Custom hooks
│   ├── styles/        # CSS and theme files
│   │   └── themes/   # Theme definitions
│   └── utils/         # Utility functions
├── docs/              # Comprehensive documentation
└── public/            # Static assets
```

## 🎨 Themes (react18-tailwind4)

The react18-tailwind4 template includes 6 professional themes:
- **Ocean Light** - Professional blue (default)
- **Ocean Deep** - Deep blue-gray dark mode
- **Crystal Clear** - Modern light with violet branding
- **Cosmic** - Deep space with purple accents
- **Citrus White** - Pure white with orange accents
- **Midnight Pro** - Ultimate dark mode

See [THEME_CUSTOMIZATION.md](https://github.com/Maheshlee007/web_server_templates/blob/main/packages/templates/react18-tailwind4/docs/THEME_CUSTOMIZATION.md) for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new templates
- Improve documentation
- Submit pull requests

## 📄 License

MIT © [MaheshLee](https://github.com/Maheshlee007)

## 🔗 Links

- [GitHub Repository](https://github.com/Maheshlee007/web_server_templates)
- [Report Issues](https://github.com/Maheshlee007/web_server_templates/issues)
- [Documentation react18+tail4](https://github.com/Maheshlee007/web_server_templates/tree/main/packages/templates/react18-tailwind4/docs)

## 💡 Tips

- Use `pnpm` for faster installs and better disk space usage
- Check the template's README for specific setup instructions
- Explore the docs folder for detailed guides and examples
- Start with react18-tailwind4 for a full-featured setup

---

Made with 🔥 by [MaheshLee](https://github.com/Maheshlee007)
