# Personal Website

A simple, text-focused personal website built with Next.js and a markdown-based CMS system.

## Features

- **Clean Design**: Minimal white background with black text
- **Markdown CMS**: Easy content management using markdown files
- **Static Generation**: All pages are statically generated for fast loading
- **Responsive**: Works well on all device sizes
- **Zero Configuration**: Ready to deploy on Vercel

## Pages

- **Home**: Welcome page with site overview
- **About**: Personal information and background
- **Work**: Professional experience and skills
- **Writing**: Blog posts from markdown files
- **Projects**: Project showcases from markdown files
- **Contact**: Simple contact form

## Content Management

### Adding Blog Posts

Create markdown files in the `content/blog/` directory with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
---

# Your Post Content

Write your blog post content here using markdown.
```

### Adding Projects

Create markdown files in the `content/projects/` directory with the following frontmatter:

```markdown
---
title: "Project Name"
description: "Brief project description"
technologies: ["Next.js", "TypeScript", "Tailwind CSS"]
link: "https://your-project-link.com"
github: "https://github.com/yourusername/project"
---

# Project Details

Detailed project description and documentation.
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This website is designed to be deployed on Vercel with zero configuration:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Gray Matter** for parsing markdown frontmatter
- **Remark** for converting markdown to HTML

## Repository

https://github.com/connorkapoor/personal-website
