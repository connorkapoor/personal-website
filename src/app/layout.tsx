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
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity">
                  Personal Website
                </Link>
                <div className="flex items-center space-x-8">
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
              </div>
            </div>
          </nav>
          
          <main className="max-w-4xl mx-auto px-6 py-12">
            <div className="max-w-3xl">
              {children}
            </div>
          </main>
          
          <footer className="border-t border-gray-100 mt-20">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="text-center text-sm text-gray-500">
                <p>&copy; 2024 Personal Website. Built with Next.js.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
