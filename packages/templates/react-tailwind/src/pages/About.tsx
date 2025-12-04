export default function About() {
  return (
    <div className="about-page max-w-4xl mx-auto space-y-12 px-6 py-8">
      {/* Header Section */}
      <div className="page-header text-center space-y-6">
        <h1 className="page-title text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          About <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">MyApp</span>
        </h1>
        <p className="page-subtitle text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Learn more about our mission, technology stack, and the team behind this project.
        </p>
      </div>

      {/* Content Sections */}
      <div className="content-sections space-y-12">
        {/* Mission Section */}
        <section className="content-section bg-surface-primary rounded-2xl border border-border-primary p-8 space-y-6">
          <div className="section-header space-y-3">
            <h2 className="section-title text-2xl font-bold text-foreground">Our Mission</h2>
            <div className="section-divider w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </div>
          <p className="section-content text-text-secondary leading-relaxed">
            We're dedicated to creating exceptional web experiences that combine modern design principles 
            with cutting-edge technology. Our goal is to build applications that are not only functional 
            but also delightful to use, accessible to everyone, and built to last.
          </p>
        </section>

        {/* Technology Stack */}
        <section className="content-section space-y-6">
          <div className="section-header space-y-3">
            <h2 className="section-title text-2xl font-bold text-foreground">Technology Stack</h2>
            <div className="section-divider w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </div>
          
          <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="tech-card bg-surface-primary border border-border-primary rounded-xl p-6 space-y-4 hover:shadow-md transition-all duration-200">
              <div className="tech-icon w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.498-1.31-.704-1.951.538-.124 1.084-.222 1.643-.28zm9.223.07c.548.062 1.097.162 1.63.284-.21.64-.44 1.297-.7 1.96-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.693-1.15-.053.066-.26-.06.403-.92zm2.17 4.5c1.094-.578 1.818-1.342 1.818-2.322s-.728-1.745-1.82-2.323c-.39-.207-.82-.402-1.27-.588.476-.924.876-1.878 1.188-2.847.732.064 1.434.25 2.088.539 1.94.85 3.176 2.138 3.176 3.219-.002 1.08-1.235 2.369-3.177 3.22-.654.288-1.357.474-2.09.538-.312-.97-.712-1.92-1.188-2.846.45-.184.88-.38 1.27-.587zm-1.097.43c.24-.375.48-.762.705-1.158.225-.39.435-.788.635-1.18.265.65.498 1.307.704 1.946-.538.124-1.084.22-1.643.28zm-5.54 3.117c.42-.755.823-1.558 1.202-2.4.832.065 1.697.098 2.557.098.86 0 1.725-.034 2.557-.098.379.84.782 1.644 1.202 2.4-.372.652-.748 1.29-1.135 1.906-.832.065-1.697.098-2.557.098-.86 0-1.725-.034-2.557-.098-.387-.617-.763-1.254-1.135-1.906z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">React 18</h3>
                <p className="text-sm text-text-secondary">Modern UI library with hooks</p>
              </div>
            </div>
            
            <div className="tech-card bg-surface-primary border border-border-primary rounded-xl p-6 space-y-4 hover:shadow-md transition-all duration-200">
              <div className="tech-icon w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">TypeScript</h3>
                <p className="text-sm text-text-secondary">Type-safe JavaScript</p>
              </div>
            </div>
            
            <div className="tech-card bg-surface-primary border border-border-primary rounded-xl p-6 space-y-4 hover:shadow-md transition-all duration-200">
              <div className="tech-icon w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tailwind CSS</h3>
                <p className="text-sm text-text-secondary">Utility-first CSS framework</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="content-section bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-border-primary p-8 space-y-6">
          <div className="section-header text-center space-y-3">
            <h2 className="section-title text-2xl font-bold text-foreground">Get In Touch</h2>
            <p className="section-subtitle text-text-secondary max-w-2xl mx-auto">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </div>
          
          <div className="contact-actions flex flex-col sm:flex-row gap-4 justify-center">
            <button className="contact-button px-6 py-3 bg-primary-600 hover:bg-primary-700 text-primary-foreground rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              Send Message
            </button>
            <button className="contact-button px-6 py-3 bg-surface-primary hover:bg-surface-secondary text-foreground border border-border-primary rounded-xl font-semibold transition-all duration-200 hover:shadow-md">
              View GitHub
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}