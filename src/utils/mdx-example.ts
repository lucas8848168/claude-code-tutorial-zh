/**
 * MDX 工具函数使用示例
 * 
 * 这个文件展示了如何使用 mdx.ts 中的各种工具函数
 */

import {
  loadMDXContent,
  loadMDXContentSafe,
  getChapterWithContent,
  getChapterWithContentSafe,
  getMDXFilePath,
  getChapterIdFromSlugPath,
  mdxFileExists,
  chapterExists,
  getAvailableMDXFiles,
  preloadChapters,
  MDXLoadError,
  MDXErrorType,
} from './mdx';

/**
 * 示例 1: 基本的 MDX 内容加载
 */
export async function example1_BasicLoad() {
  try {
    // 加载一个章节的 MDX 内容
    const content = await loadMDXContent('01-01-introduction');
    
    // 使用 MDX 组件
    const MDXComponent = content.default;
    
    // 访问 frontmatter 数据
    console.log('标题:', content.frontmatter.title);
    console.log('描述:', content.frontmatter.description);
    console.log('难度:', content.frontmatter.level);
    console.log('预计时间:', content.frontmatter.estimatedMinutes, '分钟');
    
    return MDXComponent;
  } catch (error) {
    if (error instanceof MDXLoadError) {
      console.error('加载失败:', error.message);
      console.error('章节 ID:', error.chapterId);
      console.error('错误类型:', error.errorType);
      
      // 检查是否为 404 错误
      if (error.is404()) {
        console.error('这是一个 404 错误');
      }
    }
    throw error;
  }
}

/**
 * 示例 2: 安全加载（不抛出异常）
 */
export async function example2_SafeLoad() {
  const result = await loadMDXContentSafe('01-01-introduction');
  
  if (result.status === 'success') {
    console.log('加载成功:', result.data.frontmatter.title);
    return result.data;
  } else if (result.status === 'error') {
    console.error('加载失败:', result.error.message);
    return null;
  }
}

/**
 * 示例 3: 获取章节完整信息
 */
export async function example3_GetChapterWithContent() {
  try {
    const chapter = await getChapterWithContent('01-01-introduction');
    
    // 访问章节配置信息
    console.log('章节 ID:', chapter.id);
    console.log('章节标题:', chapter.title);
    console.log('章节 slug:', chapter.slug);
    console.log('父章节 ID:', chapter.parentId);
    
    // 访问 MDX 内容
    console.log('MDX 组件:', chapter.mdxContent.default);
    console.log('MDX 标题:', chapter.mdxContent.frontmatter.title);
    
    return chapter;
  } catch (error) {
    console.error('获取章节失败:', error);
    throw error;
  }
}

/**
 * 示例 4: 安全获取章节信息
 */
export async function example4_GetChapterSafe() {
  const chapter = await getChapterWithContentSafe('01-01-introduction');
  
  if (chapter) {
    console.log('章节加载成功:', chapter.title);
    return chapter;
  } else {
    console.log('章节加载失败');
    return null;
  }
}

/**
 * 示例 5: 从 URL slug 路径获取章节 ID
 */
export function example5_SlugToId() {
  // 单层 slug（父章节）
  const parentId = getChapterIdFromSlugPath('getting-started');
  console.log('父章节 ID:', parentId); // '01-getting-started'
  
  // 两层 slug（子章节）
  const childId = getChapterIdFromSlugPath('getting-started/introduction');
  console.log('子章节 ID:', childId); // '01-01-introduction'
  
  // 无效的 slug
  const invalidId = getChapterIdFromSlugPath('non-existent');
  console.log('无效 slug:', invalidId); // undefined
}

/**
 * 示例 6: 检查章节和文件是否存在
 */
export function example6_CheckExistence() {
  // 检查章节配置是否存在
  const configExists = chapterExists('01-01-introduction');
  console.log('章节配置存在:', configExists);
  
  // 检查 MDX 文件是否存在
  const fileExists = mdxFileExists('01-01-introduction');
  console.log('MDX 文件存在:', fileExists);
  
  // 获取文件路径
  try {
    const filePath = getMDXFilePath('01-01-introduction');
    console.log('文件路径:', filePath);
  } catch (error) {
    console.error('获取路径失败:', error);
  }
}

/**
 * 示例 7: 获取所有可用的 MDX 文件
 */
export function example7_ListFiles() {
  const files = getAvailableMDXFiles();
  console.log('可用的 MDX 文件数量:', files.length);
  console.log('文件列表:', files);
}

/**
 * 示例 8: 批量预加载章节
 */
export async function example8_PreloadChapters() {
  const chapterIds = [
    '01-01-introduction',
    '01-02-installation',
    '01-03-first-steps',
  ];
  
  const results = await preloadChapters(chapterIds);
  
  console.log('预加载成功的章节数:', results.size);
  
  // 访问预加载的内容
  for (const [chapterId, content] of results.entries()) {
    console.log(`章节 ${chapterId}:`, content.frontmatter.title);
  }
  
  return results;
}

/**
 * 示例 9: 错误处理的完整示例
 */
export async function example9_ErrorHandling() {
  try {
    // 尝试加载不存在的章节
    await loadMDXContent('non-existent-chapter');
  } catch (error) {
    if (error instanceof MDXLoadError) {
      // 根据错误类型进行不同的处理
      switch (error.errorType) {
        case MDXErrorType.NOT_FOUND:
          console.error('文件未找到，显示 404 页面');
          break;
        case MDXErrorType.INVALID_CHAPTER:
          console.error('无效的章节 ID，重定向到首页');
          break;
        case MDXErrorType.LOAD_FAILED:
          console.error('加载失败，显示错误提示');
          break;
        case MDXErrorType.PARSE_FAILED:
          console.error('解析失败，检查文件格式');
          break;
      }
      
      // 记录详细错误信息
      console.error('错误详情:', {
        message: error.message,
        chapterId: error.chapterId,
        errorType: error.errorType,
        cause: error.cause,
      });
    }
  }
}

/**
 * 示例 10: 在 React 组件中使用
 */
export function example10_ReactUsage() {
  // 这是一个伪代码示例，展示如何在 React 组件中使用
  
  /*
  import { useState, useEffect } from 'react';
  import { loadMDXContentSafe, type MDXLoadState } from './utils/mdx';
  
  function ChapterPage({ chapterId }: { chapterId: string }) {
    const [loadState, setLoadState] = useState<MDXLoadState>({ status: 'idle' });
    
    useEffect(() => {
      setLoadState({ status: 'loading', chapterId });
      
      loadMDXContentSafe(chapterId).then(result => {
        setLoadState(result);
      });
    }, [chapterId]);
    
    if (loadState.status === 'loading') {
      return <div>加载中...</div>;
    }
    
    if (loadState.status === 'error') {
      if (loadState.error.is404()) {
        return <div>章节不存在</div>;
      }
      return <div>加载失败: {loadState.error.message}</div>;
    }
    
    if (loadState.status === 'success') {
      const MDXComponent = loadState.data.default;
      return (
        <div>
          <h1>{loadState.data.frontmatter.title}</h1>
          <MDXComponent />
        </div>
      );
    }
    
    return null;
  }
  */
}
