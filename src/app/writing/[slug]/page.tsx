import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogPosts, markdownToHtml } from '@/lib/markdown';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <div className="max-w-4xl">
      <nav className="mb-8">
        <Link 
          href="/writing" 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Writing
        </Link>
      </nav>
      
      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            {post.date && (
              <time className="font-mono">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>
        </header>
        
        <div 
          className="prose prose-lg prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <Link 
            href="/writing" 
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
} 