import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/markdown';

export default function Writing() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <div className="mb-12">
        <h1>Writing</h1>
        <p className="text-lg text-gray-600">
          Here are my thoughts, insights, and experiences shared through writing.
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-4">Check back soon for new content!</p>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-sm text-gray-600">
                <strong>For developers:</strong> To add blog posts, create markdown files in the{' '}
                <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">content/blog/</code> directory.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold group-hover:text-gray-600 transition-colors">
                    <Link href={`/writing/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  {post.date && (
                    <time className="text-sm text-gray-500 font-mono flex-shrink-0 ml-4">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </div>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                )}
                
                <Link 
                  href={`/writing/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
                >
                  Read article
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 