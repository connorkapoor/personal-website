export default function Work() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div className="section-header">
        <h1 className="section-title">Work & Experience</h1>
        <p className="section-subtitle">
          Building innovative solutions at the intersection of hardware and software engineering.
        </p>
      </div>

      <div className="space-y-16">
        {/* Current Focus */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Current Focus</h2>
          <div className="card">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">Founder & Lead Engineer</h3>
                  <span className="text-sm text-slate-500">2024 - Present</span>
                </div>
                <p className="text-lg text-green-600 font-medium mb-4">KLMaestro Project</p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Leading the development of the world&apos;s first open-source kitchen prep machine. 
                  Responsible for mechanical design, electronics architecture, software development, 
                  and community building around sustainable appliance technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Hardware Design</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Mechanical Engineering</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Electronics</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Open Source</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Community Building</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Skills & Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Engineering */}
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Engineering</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Mechanical Design & CAD</li>
                <li>• Electronics & PCB Design</li>
                <li>• Systems Architecture</li>
                <li>• Prototyping & Testing</li>
                <li>• Manufacturing Processes</li>
              </ul>
            </div>

            {/* Software Development */}
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Software Development</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Embedded Systems (C/C++)</li>
                <li>• Web Development (JS/TS)</li>
                <li>• Python & Automation</li>
                <li>• Firmware Development</li>
                <li>• API Design & Integration</li>
              </ul>
            </div>

            {/* Design & UX */}
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Design & UX</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Product Design</li>
                <li>• User Experience Design</li>
                <li>• Interface Design</li>
                <li>• Design for Manufacturing</li>
                <li>• Sustainable Design</li>
              </ul>
            </div>

            {/* Tools & Technologies */}
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Tools & Technologies</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• SolidWorks, Fusion 360</li>
                <li>• KiCad, Altium Designer</li>
                <li>• 3D Printing & CNC</li>
                <li>• Git, Docker, CI/CD</li>
                <li>• Arduino, Raspberry Pi</li>
              </ul>
            </div>

            {/* Project Management */}
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Project Management</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Agile Methodologies</li>
                <li>• Product Development</li>
                <li>• Team Leadership</li>
                <li>• Risk Assessment</li>
                <li>• Quality Assurance</li>
              </ul>
            </div>

            {/* Community & Open Source */}
            <div className="card">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Community & Open Source</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li>• Open Source Development</li>
                <li>• Community Building</li>
                <li>• Technical Writing</li>
                <li>• Public Speaking</li>
                <li>• Mentoring & Teaching</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Approach & Philosophy */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">My Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Engineering Philosophy</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                I believe in building products that solve real problems while being sustainable, 
                repairable, and accessible. Every design decision is made with the end user and 
                environmental impact in mind.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Design for longevity and repairability
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Prioritize user needs and experience
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Embrace transparency and open collaboration
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Collaboration Style</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                I thrive in collaborative environments where diverse perspectives come together 
                to solve complex challenges. I believe the best solutions emerge from inclusive, 
                iterative processes.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Clear communication and documentation
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Rapid prototyping and iteration
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Data-driven decision making
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-slate-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in collaborating on projects that push the boundaries of 
            sustainable technology and open-source innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start a Conversation
            </a>
            <a 
              href="https://github.com/connorkapoor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 