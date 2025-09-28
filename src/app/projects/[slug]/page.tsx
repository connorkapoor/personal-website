import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getAllProjects, markdownToHtml } from '@/lib/markdown';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const contentHtml = await markdownToHtml(project.content);

  return (
    <div>
      <Link href="/projects" className="inline-block mb-6 text-sm hover:underline">
        ← Back to Projects
      </Link>
      
      <article>
        <header className="mb-8">
          <h1>{project.title}</h1>
          {project.description && (
            <p className="text-lg text-gray-700 mb-4">{project.description}</p>
          )}
          
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4">
              <span className="font-medium">Technologies: </span>
              <span className="text-gray-600">
                {project.technologies.join(', ')}
              </span>
            </div>
          )}
          
          {(project.link || project.github) && (
            <div className="flex space-x-4 mb-6">
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Live Demo ↗
                </a>
              )}
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  GitHub ↗
                </a>
              )}
            </div>
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