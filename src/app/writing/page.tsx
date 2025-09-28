import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/markdown';

export default function Writing() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <h1>Writing</h1>
      <p>
        Here are my thoughts, insights, and experiences shared through writing.
      </p>
      
      {posts.length === 0 ? (
        <div className="mt-8">
          <p>No blog posts yet. Check back soon!</p>
          <p className="text-sm text-gray-600 mt-4">
            To add blog posts, create markdown files in the <code>content/blog/</code> directory.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/writing/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.date && (
                <p className="text-sm text-gray-600 mb-2">{post.date}</p>
              )}
              {post.excerpt && (
                <p className="text-gray-700">{post.excerpt}</p>
              )}
              <Link 
                href={`/writing/${post.slug}`}
                className="inline-block mt-2 text-sm hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 