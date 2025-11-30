export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to My App
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A modern React application built with Vite, TypeScript, and TailwindCSS.
          Clean, fast, and responsive design.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          <button className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Fast Development</h3>
          <p className="text-gray-600 mb-4">Built with Vite for lightning-fast HMR and optimized builds</p>
          <p className="text-sm text-gray-500">
            Experience instant server start and blazing fast hot module replacement during development.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Beautiful UI</h3>
          <p className="text-gray-600 mb-4">TailwindCSS for rapid, responsive styling</p>
          <p className="text-sm text-gray-500">
            Utility-first CSS framework for building custom designs without leaving your HTML.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📱 Responsive</h3>
          <p className="text-gray-600 mb-4">Mobile-first design that works on all devices</p>
          <p className="text-sm text-gray-500">
            Fully responsive layout that adapts beautifully to any screen size.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Built With Modern Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['React 18', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router'].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}