export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          About My App
        </h1>
        <p className="text-xl text-gray-600">
          Learn more about this application and its features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h3>
          <p className="text-gray-600 mb-4">A comprehensive template for modern web applications</p>
          <p className="text-sm text-gray-500">
            This template provides a solid foundation for building modern web applications with React,
            TypeScript, and TailwindCSS. It includes best practices for code organization,
            styling, and development workflow.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
          <p className="text-gray-600 mb-4">Everything you need to get started quickly</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>• React 18 with TypeScript</li>
            <li>• Vite for fast development</li>
            <li>• TailwindCSS for styling</li>
            <li>• React Router for navigation</li>
            <li>• ESLint and Prettier setup</li>
          </ul>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <p className="text-gray-600 mb-6">
          To start developing with this template, run the following commands:
        </p>
        
        <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm mb-6">
          <pre className="text-gray-800">
{`# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Development</h3>
        <p className="text-gray-600">
          The development server runs on <code className="bg-gray-100 px-1 rounded">http://localhost:5173</code> with hot module replacement
          enabled. Any changes you make to the code will be reflected immediately in the browser.
        </p>
      </div>
    </div>
  )
}