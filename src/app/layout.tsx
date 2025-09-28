import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <div className="min-h-screen bg-white text-black">
          <nav className="border-b border-gray-200 py-4">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex space-x-8">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/work" className="hover:underline">
                  Work
                </Link>
                <Link href="/writing" className="hover:underline">
                  Writing
                </Link>
                <Link href="/projects" className="hover:underline">
                  Projects
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
