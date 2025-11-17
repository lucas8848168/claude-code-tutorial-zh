import matter from 'gray-matter';
import { getChapterById, getChapterBySlug } from '../config/chapters';
import type { Chapter } from '../types/content';

/**
 * MDX 文件的 frontmatter 接口
 */
export interface MDXFrontmatter {
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedMinutes: number;
  order?: number;
  tags: string[];
  lastUpdated: string;
}

/**
 * MDX 加载结果接口
 */
export interface MDXLoadResult {
  /** MDX 组件 */
  default: React.ComponentType;
  /** Frontmatter 数据 */
  frontmatter: MDXFrontmatter;
  /** 原始内容（不含 frontmatter） */
  content: string;
}

/**
 * MDX 加载状态
 */
export type MDXLoadState = 
  | { status: 'idle' }
  | { status: 'loading'; chapterId: string }
  | { status: 'success'; chapterId: string; data: MDXLoadResult }
  | { status: 'error'; chapterId: string; error: MDXLoadError };

/**
 * MDX 加载错误类型
 */
export const MDXErrorType = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID_CHAPTER: 'INVALID_CHAPTER',
  LOAD_FAILED: 'LOAD_FAILED',
  PARSE_FAILED: 'PARSE_FAILED',
} as const;

export type MDXErrorType = typeof MDXErrorType[keyof typeof MDXErrorType];

/**
 * MDX 加载错误类
 */
export class MDXLoadError extends Error {
  chapterId: string;
  errorType: MDXErrorType;
  cause?: unknown;

  constructor(
    message: string,
    chapterId: string,
    errorType: MDXErrorType,
    cause?: unknown
  ) {
    super(message);
    this.name = 'MDXLoadError';
    this.chapterId = chapterId;
    this.errorType = errorType;
    this.cause = cause;
  }

  /**
   * 判断是否为 404 错误
   */
  is404(): boolean {
    return this.errorType === MDXErrorType.NOT_FOUND || 
           this.errorType === MDXErrorType.INVALID_CHAPTER;
  }
}

/**
 * 根据章节 ID 获取 MDX 文件路径
 * 
 * @param chapterId - 章节 ID（例如：'01-01-introduction'）
 * @returns MDX 文件路径
 * @throws {MDXLoadError} 当章节不存在时
 */
export function getMDXFilePath(chapterId: string): string {
  console.log('getMDXFilePath called with:', chapterId);
  
  const chapter = getChapterById(chapterId);
  console.log('Found chapter:', chapter?.id, chapter?.title);
  
  if (!chapter) {
    throw new MDXLoadError(
      `章节不存在: ${chapterId}`,
      chapterId,
      MDXErrorType.INVALID_CHAPTER
    );
  }

  // 确定父目录和文件名
  let parentDir: string;
  let fileName: string;
  
  if (chapter.parentId) {
    // 子章节：使用父章节的 ID 作为目录，slug 作为文件名
    parentDir = chapter.parentId;
    fileName = `${chapter.slug}.mdx`;
  } else {
    // 父章节：使用自己的 ID 作为目录
    parentDir = chapter.id;
    // 如果有子章节，使用 index.mdx；否则使用 slug.mdx
    fileName = chapter.children && chapter.children.length > 0 
      ? 'index.mdx' 
      : `${chapter.slug}.mdx`;
  }

  const filePath = `/src/content/${parentDir}/${fileName}`;
  console.log('Generated file path:', filePath);
  
  return filePath;
}

/**
 * 根据章节 slug 路径获取章节 ID
 * 支持两种格式：
 * 1. 单层：'getting-started' -> '01-getting-started'
 * 2. 两层：'getting-started/introduction' -> '01-01-introduction'
 * 
 * @param slugPath - slug 路径（例如：'getting-started' 或 'getting-started/introduction'）
 * @returns 章节 ID 或 undefined
 */
export function getChapterIdFromSlugPath(slugPath: string): string | undefined {
  const slugParts = slugPath.split('/').filter(Boolean);
  
  if (slugParts.length === 0) {
    return undefined;
  }

  if (slugParts.length === 1) {
    // 单层 slug：查找父章节
    const chapter = getChapterBySlug(slugParts[0]);
    return chapter?.id;
  }

  if (slugParts.length === 2) {
    // 两层 slug：先找父章节，再找子章节
    const [parentSlug, childSlug] = slugParts;
    const parentChapter = getChapterBySlug(parentSlug);
    
    if (!parentChapter || !parentChapter.children) {
      return undefined;
    }

    const childChapter = parentChapter.children.find(
      child => child.slug === childSlug
    );
    
    return childChapter?.id;
  }

  // 不支持超过两层的路径
  return undefined;
}

/**
 * 获取所有 MDX 模块的映射
 * 使用 Vite 的 import.meta.glob 预加载所有 MDX 文件
 */
const mdxModules = import.meta.glob<MDXLoadResult>('/src/content/**/*.mdx');

/**
 * 动态导入 MDX 文件
 * 
 * @param chapterId - 章节 ID
 * @returns Promise<MDXLoadResult>
 * @throws {MDXLoadError} 当文件不存在或加载失败时
 */
export async function loadMDXContent(chapterId: string): Promise<MDXLoadResult> {
  try {
    // 获取文件路径
    const filePath = getMDXFilePath(chapterId);
    
    // 查找对应的模块加载器
    const moduleLoader = mdxModules[filePath];
    
    if (!moduleLoader) {
      throw new MDXLoadError(
        `MDX 文件不存在: ${filePath}`,
        chapterId,
        MDXErrorType.NOT_FOUND
      );
    }

    // 加载模块
    const module = await moduleLoader();
    
    if (!module || !module.default) {
      throw new MDXLoadError(
        `MDX 文件加载失败，模块内容无效: ${filePath}`,
        chapterId,
        MDXErrorType.LOAD_FAILED
      );
    }

    return module;
  } catch (error) {
    if (error instanceof MDXLoadError) {
      throw error;
    }
    
    throw new MDXLoadError(
      `加载 MDX 内容时发生错误: ${error instanceof Error ? error.message : String(error)}`,
      chapterId,
      MDXErrorType.LOAD_FAILED,
      error
    );
  }
}

/**
 * 安全加载 MDX 内容（不抛出异常）
 * 
 * @param chapterId - 章节 ID
 * @returns Promise<MDXLoadState>
 */
export async function loadMDXContentSafe(chapterId: string): Promise<MDXLoadState> {
  try {
    const data = await loadMDXContent(chapterId);
    return {
      status: 'success',
      chapterId,
      data,
    };
  } catch (error) {
    if (error instanceof MDXLoadError) {
      return {
        status: 'error',
        chapterId,
        error,
      };
    }
    
    return {
      status: 'error',
      chapterId,
      error: new MDXLoadError(
        `未知错误: ${error instanceof Error ? error.message : String(error)}`,
        chapterId,
        MDXErrorType.LOAD_FAILED,
        error
      ),
    };
  }
}

/**
 * 解析 MDX 文件的 frontmatter
 * 
 * @param rawContent - MDX 文件的原始内容
 * @returns 解析后的 frontmatter 和内容
 */
export function parseMDXFrontmatter(rawContent: string): {
  frontmatter: MDXFrontmatter;
  content: string;
} {
  try {
    const { data, content } = matter(rawContent);
    
    // 验证必需字段
    if (!data.title || !data.description || !data.level) {
      throw new Error('Frontmatter 缺少必需字段 (title, description, level)');
    }

    const frontmatter: MDXFrontmatter = {
      title: data.title,
      description: data.description,
      level: data.level,
      estimatedMinutes: data.estimatedMinutes || 10,
      order: data.order,
      tags: Array.isArray(data.tags) ? data.tags : [],
      lastUpdated: data.lastUpdated || new Date().toISOString(),
    };

    return { frontmatter, content };
  } catch (error) {
    throw new Error(
      `解析 frontmatter 失败: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * 检查 MDX 文件是否存在
 * 
 * @param chapterId - 章节 ID
 * @returns 文件是否存在
 */
export function mdxFileExists(chapterId: string): boolean {
  try {
    const filePath = getMDXFilePath(chapterId);
    return filePath in mdxModules;
  } catch {
    return false;
  }
}

/**
 * 获取所有可用的 MDX 文件路径
 * 
 * @returns MDX 文件路径数组
 */
export function getAvailableMDXFiles(): string[] {
  return Object.keys(mdxModules);
}

/**
 * 验证章节是否存在
 * 
 * @param chapterId - 章节 ID
 * @returns 是否存在
 */
export function chapterExists(chapterId: string): boolean {
  return getChapterById(chapterId) !== undefined;
}

/**
 * 获取章节的完整信息（包括 MDX 内容）
 * 
 * @param chapterId - 章节 ID
 * @returns Promise<Chapter & { mdxContent: MDXLoadResult }>
 * @throws {MDXLoadError} 当章节不存在或加载失败时
 */
export async function getChapterWithContent(chapterId: string): Promise<Chapter & { mdxContent: MDXLoadResult }> {
  const chapter = getChapterById(chapterId);
  
  if (!chapter) {
    throw new MDXLoadError(
      `章节不存在: ${chapterId}`,
      chapterId,
      MDXErrorType.INVALID_CHAPTER
    );
  }

  try {
    const mdxContent = await loadMDXContent(chapterId);
    
    return {
      ...chapter,
      mdxContent,
    };
  } catch (error) {
    if (error instanceof MDXLoadError) {
      throw error;
    }
    
    throw new MDXLoadError(
      `获取章节内容失败: ${error instanceof Error ? error.message : String(error)}`,
      chapterId,
      MDXErrorType.LOAD_FAILED,
      error
    );
  }
}

/**
 * 安全获取章节的完整信息（不抛出异常）
 * 
 * @param chapterId - 章节 ID
 * @returns Promise<Chapter & { mdxContent: MDXLoadResult } | null>
 */
export async function getChapterWithContentSafe(
  chapterId: string
): Promise<(Chapter & { mdxContent: MDXLoadResult }) | null> {
  try {
    return await getChapterWithContent(chapterId);
  } catch (error) {
    console.error(`获取章节内容失败: ${chapterId}`, error);
    return null;
  }
}

/**
 * 批量预加载章节内容
 * 
 * @param chapterIds - 章节 ID 列表
 * @returns Promise<Map<string, MDXLoadResult>>
 */
export async function preloadChapters(chapterIds: string[]): Promise<Map<string, MDXLoadResult>> {
  const results = new Map<string, MDXLoadResult>();
  
  await Promise.allSettled(
    chapterIds.map(async (chapterId) => {
      try {
        const content = await loadMDXContent(chapterId);
        results.set(chapterId, content);
      } catch (error) {
        console.error(`预加载章节失败: ${chapterId}`, error);
      }
    })
  );
  
  return results;
}
