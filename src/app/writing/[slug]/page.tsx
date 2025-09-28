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
    <div>
      <Link href="/writing" className="inline-block mb-6 text-sm hover:underline">
        ← Back to Writing
      </Link>
      
      <article>
        <header className="mb-8">
          <h1>{post.title}</h1>
          {post.date && (
            <p className="text-sm text-gray-600">{post.date}</p>
          )}
        </header>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  );
} 