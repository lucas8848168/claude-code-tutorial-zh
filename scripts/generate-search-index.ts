import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchDocument {
  id: string;
  title: string;
  content: string;
  chapterId: string;
  tags: string[];
  level: string;
}

/**
 * 递归扫描目录获取所有 MDX 文件
 */
function getAllMDXFiles(dir: string, baseDir: string = ''): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMDXFiles(fullPath, relativePath));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * 提取文本内容摘要（前 200 字）
 */
function extractExcerpt(content: string, maxLength: number = 200): string {
  // 移除 Markdown 语法
  const cleaned = content
    .replace(/#+\s/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();

  return cleaned.substring(0, maxLength) + (cleaned.length > maxLength ? '...' : '');
}

/**
 * 生成搜索索引
 */
function generateSearchIndex(): void {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const outputDir = path.join(process.cwd(), 'public');
  const outputFile = path.join(outputDir, 'search-index.json');

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const mdxFiles = getAllMDXFiles(contentDir);
  const documents: SearchDocument[] = [];

  for (const file of mdxFiles) {
    const fullPath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    // 使用 gray-matter 解析 frontmatter
    const { data, content } = matter(fileContent);

    // 提取章节 ID（从目录名称）
    const chapterId = file.split('/')[0];

    // 生成文档 ID
    const docId = file.replace(/\.mdx$/, '').replace(/\//g, '-');

    const document: SearchDocument = {
      id: docId,
      title: data.title || 'Untitled',
      content: content.substring(0, 5000), // 限制内容长度
      chapterId,
      tags: Array.isArray(data.tags) ? data.tags : [],
      level: data.level || 'beginner',
    };

    documents.push(document);
  }

  // 写入索引文件
  fs.writeFileSync(outputFile, JSON.stringify(documents, null, 2));
  console.log(`✓ 搜索索引已生成: ${outputFile}`);
  console.log(`✓ 共索引 ${documents.length} 个文档`);
}

// 执行生成
generateSearchIndex();
