import { Card } from '@/components/UI/Card';
import { Link } from 'react-router-dom';
import { Zap, Layout, Palette, Code2, Layers, Sparkles, Package, Github } from 'lucide-react';

/**
 * Home - Welcome/Intro Page
 * 
 * Casual developer-friendly introduction to the template
 */
export function Home() {
  return (
    <div className="container mx-auto p-6 space-y-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center">
          <div className="p-4 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/10">
            <Sparkles className="w-16 h-16 text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-(--color-text) tracking-tight">
          React 18 + Tailwind CSS v4
        </h1>
        
        <p className="text-xl text-(--color-text-secondary) max-w-2xl mx-auto leading-relaxed">
          Hey developer! 👋 This is a modern, production-ready starter template. 
          Everything's set up so you can jump straight into building awesome stuff.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            to="/components"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Code2 className="w-5 h-5" />
            Explore Components
          </Link>
          <a 
            href="https://github.com/Maheshlee007/web_server_templates"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-(--color-bg-secondary) hover:bg-(--color-bg-tertiary) text-(--color-text) rounded-lg font-medium transition-colors flex items-center gap-2 border border-(--color-border)"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
      </div>

      {/* What's Inside */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-(--color-text) text-center">
          What's Inside? 🎁
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Layout className="w-6 h-6 text-blue-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-(--color-text)">Flexible Layouts</h3>
                <p className="text-sm text-(--color-text-secondary)">
                  3 layout variants: top-only, sidebar-hidden, sidebar-persistent. 
                  Switch with a single prop!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Palette className="w-6 h-6 text-purple-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-(--color-text)">6 Built-in Themes</h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Midnight, Ocean, Forest, Sunset, Lavender, Crimson. 
                  Light & dark mode for each. That's 12 themes total!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-(--color-text)">Tailwind CSS v4</h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Lightning fast with CSS variables, no more dark: prefix hell. 
                  Modern and clean!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Layers className="w-6 h-6 text-orange-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-(--color-text)">Pro Components</h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Carousel with 5 variants, Drawer with 4 directions, 
                  Cards, Buttons, Inputs - all production-ready.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-500/10 rounded-lg">
                <Code2 className="w-6 h-6 text-pink-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-(--color-text)">TypeScript Ready</h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Full type safety, proper interfaces, autocomplete everywhere. 
                  Your IDE will love it!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-500/10 rounded-lg">
                <Package className="w-6 h-6 text-teal-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-(--color-text)">Zero Config</h3>
                <p className="text-sm text-(--color-text-secondary)">
                  Everything's wired up: React Router, Vite, pnpm workspace. 
                  Just clone and code!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Start */}
      <Card className="p-8 bg-linear-to-br from-blue-500/5 to-purple-500/5 border-2 border-(--color-border)">
        <h2 className="text-2xl font-bold text-(--color-text) mb-6">
          Quick Start 🚀
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-(--color-text) mb-1">Clone the repo</h3>
              <code className="block p-3 bg-(--color-bg-secondary) rounded text-sm font-mono border border-(--color-border)">
                git clone https://github.com/Maheshlee007/web_server_templates.git
              </code>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-(--color-text) mb-1">Install dependencies</h3>
              <code className="block p-3 bg-(--color-bg-secondary) rounded text-sm font-mono border border-(--color-border)">
                cd web_server_templates && pnpm install
              </code>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-(--color-text) mb-1">Start dev server</h3>
              <code className="block p-3 bg-(--color-bg-secondary) rounded text-sm font-mono border border-(--color-border)">
                pnpm dev:tail4
              </code>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-(--color-text) mb-1">You're ready!</h3>
              <p className="text-(--color-text-secondary)">
                Open <code className="px-2 py-1 bg-(--color-bg-secondary) rounded text-sm">http://localhost:5173</code> and start building
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Why This Template */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-(--color-text) text-center">
          Why Use This? 🤔
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-(--color-text) mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Fast Setup
            </h3>
            <ul className="space-y-2 text-(--color-text-secondary)">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No wasting time on boilerplate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Layout system already working</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Theme switching out of the box</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Components ready to copy-paste</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-(--color-text) mb-4 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              Production Quality
            </h3>
            <ul className="space-y-2 text-(--color-text-secondary)">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Accessibility baked in (ARIA labels, keyboard nav)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Responsive design (mobile-first)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Performance optimized (60fps animations)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Clean, maintainable code</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      <Card className="p-8 text-center bg-linear-to-br from-purple-500/5 to-pink-500/5 border-2 border-(--color-border)">
        <h2 className="text-2xl font-bold text-(--color-text) mb-4">
          Ready to Build Something Awesome? 🎯
        </h2>
        <p className="text-(--color-text-secondary) mb-6 max-w-2xl mx-auto">
          Check out the components, pick your layout, choose a theme, and start shipping features. 
          It's that simple!
        </p>
        <Link 
          to="/components"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
        >
          <Code2 className="w-5 h-5" />
          Explore Components
        </Link>
      </Card>

      {/* Footer Note */}
      <div className="text-center text-sm text-(--color-text-secondary) py-8 border-t border-(--color-border)">
        <p>
          Built with ❤️ by developers, for developers. 
          Questions? Open an issue on <a href="https://github.com/Maheshlee007/web_server_templates" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
        </p>
      </div>
    </div>
  );
}
