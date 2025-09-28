import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';

export default function Projects() {
  const projects = getAllProjects();

  return (
    <div>
      <h1>Projects</h1>
      <p>
        Here are some of the projects I&apos;ve worked on. Each represents a learning experience and a step in my journey.
      </p>
      
      {projects.length === 0 ? (
        <div className="mt-8">
          <p>No projects yet. Check back soon!</p>
          <p className="text-sm text-gray-600 mt-4">
            To add projects, create markdown files in the <code>content/projects/</code> directory.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {projects.map((project) => (
            <article key={project.slug} className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h2>
              
              {project.description && (
                <p className="text-gray-700 mb-3">{project.description}</p>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-3">
                  <span className="text-sm font-medium">Technologies: </span>
                  <span className="text-sm text-gray-600">
                    {project.technologies.join(', ')}
                  </span>
                </div>
              )}
              
              <div className="flex space-x-4 text-sm">
                <Link 
                  href={`/projects/${project.slug}`}
                  className="hover:underline"
                >
                  Read more →
                </Link>
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Live Demo ↗
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 