import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-3xl">
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Welcome
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          This is my personal website. Here you can learn more about me, my work, 
          read my writing, explore my projects, and get in touch.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Navigate using the menu above to explore different sections of the site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group">
          <div className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
            <div className="mb-4">
              <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
              <Link href="/about">About Me</Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn about my background, interests, and what drives me professionally and personally.
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
            >
              Read more
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="group">
          <div className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
            <div className="mb-4">
              <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
              <Link href="/work">My Work</Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover my professional experience, current role, and the skills I bring to projects.
            </p>
            <Link 
              href="/work"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
            >
              View experience
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="group">
          <div className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
            <div className="mb-4">
              <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
              <Link href="/writing">Writing</Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Read my thoughts, insights, and experiences shared through blog posts and articles.
            </p>
            <Link 
              href="/writing"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
            >
              Read posts
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="group">
          <div className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
            <div className="mb-4">
              <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
              <Link href="/projects">Projects</Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore the projects I&apos;ve worked on, each representing a learning experience and growth.
            </p>
            <Link 
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
            >
              View projects
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p className="text-gray-600 mb-6">
            Have a question or want to work together? I&apos;d love to hear from you.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
          >
            Contact Me
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
