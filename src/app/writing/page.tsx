import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/markdown';

export default function Writing() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">Writing</h1>
        <p className="section-subtitle">
          Here are my thoughts, insights, and experiences shared through writing.
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">No posts yet</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Check back soon for new content and insights!
            </p>
            <div className="bg-slate-50 rounded-xl p-6 text-left border border-slate-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900 mb-1">For developers</p>
                  <p className="text-sm text-slate-600">
                    To add blog posts, create markdown files in the{' '}
                    <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">
                      content/blog/
                    </code>{' '}
                    directory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="card hover:scale-[1.02]">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      <Link href={`/writing/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    {post.date && (
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time className="font-mono">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    )}
                  </div>
                </div>
                
                {post.excerpt && (
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/writing/${post.slug}`}
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 group"
                  >
                    Read article
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  <div className="flex items-center text-sm text-slate-400">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      
      {posts.length > 0 && (
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Stay Updated
            </h3>
            <p className="text-slate-600 mb-4">
              Get notified when I publish new articles and insights.
            </p>
            <Link href="/contact" className="btn-primary">
              Get In Touch
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 