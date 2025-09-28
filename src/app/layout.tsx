import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Personal Website",
  description: "A simple personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="gradient-bg min-h-screen">
          {/* Navigation */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link 
                  href="/" 
                  className="text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors duration-200"
                >
                  Personal Website
                </Link>
                
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/about" className="nav-link">
                    About
                  </Link>
                  <Link href="/work" className="nav-link">
                    Work
                  </Link>
                  <Link href="/writing" className="nav-link">
                    Writing
                  </Link>
                  <Link href="/projects" className="nav-link">
                    Projects
                  </Link>
                  <Link href="/contact" className="nav-link">
                    Contact
                  </Link>
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    About
                  </Link>
                  <Link href="/work" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Work
                  </Link>
                  <Link href="/writing" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Writing
                  </Link>
                  <Link href="/projects" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Projects
                  </Link>
                  <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Contact
                  </Link>
                </div>
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-sm text-slate-500">
                    &copy; 2024 Personal Website. Built with Next.js and Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
