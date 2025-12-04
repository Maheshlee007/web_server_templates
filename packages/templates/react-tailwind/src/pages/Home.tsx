export default function Home() {
  return (
    <div className="home-page min-h-full flex flex-col">
      {/* Hero Section */}
      <div className="hero-section flex-1 flex flex-col items-center justify-center space-y-8 px-6 py-12">
        <div className="text-center space-y-6 max-w-3xl">
          <div className="space-y-4">
            <h1 className="display-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Welcome to <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">MyApp</span>
            </h1>
            <p className="hero-description text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A modern, responsive Basic web application Stater Template built with React, TypeScript, and Tailwind CSS.
            </p>
            🚀 <span className="hero-description md:text-xl text-text-secondary font-medium bg-gradient-to-r from-secondary-500 to-primary-500 bg-clip-text text-transparent">
              Hi there!<strong> Happy Coding.</strong> 
            </span>💫
          </div>
          
          <div className="action-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <button className="primary-button px-8 py-3 bg-primary-600 hover:bg-primary-700 text-primary-foreground rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started
            </button>
            <button className="secondary-button px-8 py-3 bg-surface-primary hover:bg-surface-secondary text-foreground border border-border-primary rounded-xl font-semibold transition-all duration-200 hover:shadow-md">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-16">
          <div className="feature-card bg-surface-primary border border-border-primary rounded-2xl p-6 text-center space-y-3 hover:shadow-lg transition-all duration-200">
            <div className="feature-icon w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Fast Performance</h3>
            <p className="text-text-secondary">Built for speed with modern web technologies</p>
          </div>
          
          <div className="feature-card bg-surface-primary border border-border-primary rounded-2xl p-6 text-center space-y-3 hover:shadow-lg transition-all duration-200">
            <div className="feature-icon w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">User Focused</h3>
            <p className="text-text-secondary">Designed with user experience in mind</p>
          </div>
          
          <div className="feature-card bg-surface-primary border border-border-primary rounded-2xl p-6 text-center space-y-3 hover:shadow-lg transition-all duration-200">
            <div className="feature-icon w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Customizable</h3>
            <p className="text-text-secondary">Easily configurable to meet your needs</p>
          </div>
        </div>
      </div>
    </div>
  )
}