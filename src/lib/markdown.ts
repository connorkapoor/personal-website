import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
  github?: string;
  content: string;
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getAllBlogPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        content: matterResult.content,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      content: matterResult.content,
    };
  } catch {
    return null;
  }
}

export function getAllProjects(): Project[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(projectsDirectory)) {
    fs.mkdirSync(projectsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || slug,
        description: matterResult.data.description || '',
        technologies: matterResult.data.technologies || [],
        link: matterResult.data.link || '',
        github: matterResult.data.github || '',
        content: matterResult.content,
      };
    });

  return allProjectsData;
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || slug,
      description: matterResult.data.description || '',
      technologies: matterResult.data.technologies || [],
      link: matterResult.data.link || '',
      github: matterResult.data.github || '',
      content: matterResult.content,
    };
  } catch {
    return null;
  }
} 