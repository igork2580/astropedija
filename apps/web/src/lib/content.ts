import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "..", "..", "content");

export interface ContentMeta {
  title: string;
  description: string;
  image?: string;
  [key: string]: unknown;
}

export interface ContentItem {
  slug: string;
  frontmatter: ContentMeta;
  content: string;
}

export function getContentDir(category: string): string {
  return path.join(CONTENT_DIR, category);
}

export function getContentBySlug(
  category: string,
  slug: string,
): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ContentMeta,
    content,
  };
}

export function getAllContent(category: string): ContentItem[] {
  const dir = getContentDir(category);
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as ContentMeta,
      content,
    };
  });
}

export function getAllSlugs(category: string): string[] {
  const dir = getContentDir(category);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
