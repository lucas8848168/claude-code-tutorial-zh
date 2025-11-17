import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { MDXRenderer } from '../components/content/MDXRenderer'
import { ChapterNav, TableOfContents } from '../components/navigation'
import { loadMDXContent, MDXLoadError, type MDXLoadResult } from '../utils/mdx'
import { getChapterById, getNextChapter, getAllChapters, chaptersConfig } from '../config/chapters'
import { useProgressStore } from '../store/progressStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import type { Chapter } from '../types/content'

/**
 * 加载状态类型
 */
type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * 难度级别标签颜色映射
 */
const levelColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  advanced: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  expert: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

/**
 * 难度级别中文标签
 */
const levelLabels = {
  beginner: '入门',
  intermediate: '中级',
  advanced: '进阶',
  expert: '专家',
}

export default function ChapterPage() {
  const { chapterId, sectionId } = useParams<{ chapterId: string; sectionId?: string }>()
  const navigate = useNavigate()
  
  // 将 slug 转换为 ID
  const resolveChapterId = (): string | null => {
    console.log('Resolving chapter ID:', { chapterId, sectionId });
    
    // 如果有 sectionId，说明是两层路径：/chapter/parent-slug/child-slug
    if (sectionId) {
      // 先找父章节
      const parentChapter = chaptersConfig.find(c => c.slug === chapterId);
      console.log('Found parent chapter:', parentChapter?.id);
      
      if (parentChapter?.children) {
        // 再找子章节
        const childChapter = parentChapter.children.find(c => c.slug === sectionId);
        console.log('Found child chapter:', childChapter?.id);
        
        if (childChapter) {
          return childChapter.id;
        }
      }
      
      // 如果找不到，返回 null
      console.warn('Could not find chapter with parent slug:', chapterId, 'and child slug:', sectionId);
      return null;
    }
    
    // 如果只有 chapterId，可能是 slug 或 id
    // 先尝试作为 ID 查找
    let chapter = getChapterById(chapterId || '');
    if (chapter) {
      console.log('Found chapter by ID:', chapter.id);
      return chapter.id;
    }
    
    // 再尝试作为 slug 查找
    const allChapters = getAllChapters();
    chapter = allChapters.find(c => c.slug === chapterId);
    if (chapter) {
      console.log('Found chapter by slug:', chapter.id);
      return chapter.id;
    }
    
    console.warn('Could not find chapter with slug or ID:', chapterId);
    return null;
  };
  
  const currentChapterId = resolveChapterId() || '';
  
  // 状态管理
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [mdxContent, setMdxContent] = useState<MDXLoadResult | null>(null)
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // 进度追踪
  const { 
    markChapterComplete, 
    setCurrentChapter, 
    isChapterCompleted 
  } = useProgressStore()
  
  const isCompleted = isChapterCompleted(currentChapterId)
  const nextChapter = getNextChapter(currentChapterId)
  
  // 加载 MDX 内容
  useEffect(() => {
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    if (!currentChapterId) {
      setLoadingState('error')
      setError('章节 ID 不能为空')
      return
    }
    
    // 重置状态
    setLoadingState('loading')
    setError(null)
    setMdxContent(null)
    
    // 获取章节信息
    const chapterInfo = getChapterById(currentChapterId)
    if (!chapterInfo) {
      setLoadingState('error')
      setError(`章节不存在: ${currentChapterId}`)
      // 延迟跳转到 404 页面
      setTimeout(() => {
        navigate('/404', { replace: true })
      }, 2000)
      return
    }
    
    setChapter(chapterInfo)
    
    // 设置当前章节（用于进度追踪）
    setCurrentChapter(currentChapterId)
    
    // 加载 MDX 内容
    loadMDXContent(currentChapterId)
      .then((content) => {
        setMdxContent(content)
        setLoadingState('success')
      })
      .catch((err) => {
        console.error('加载 MDX 内容失败:', err)
        
        if (err instanceof MDXLoadError) {
          setError(err.message)
        } else {
          setError('加载内容时发生未知错误')
        }
        
        setLoadingState('error')
      })
  }, [currentChapterId, navigate, setCurrentChapter])
  
  // 处理章节完成
  const handleMarkComplete = () => {
    markChapterComplete(currentChapterId)
  }
  
  // 渲染加载状态
  if (loadingState === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentChapterId && <Breadcrumb currentChapterId={currentChapterId} />}
          
          {/* 骨架屏 */}
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // 渲染错误状态
  if (loadingState === 'error') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentChapterId && <Breadcrumb currentChapterId={currentChapterId} />}
          
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  加载失败
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  {error || '无法加载章节内容'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    重新加载
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    返回首页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // 渲染成功状态
  if (loadingState === 'success' && mdxContent && chapter) {
    // 安全获取 frontmatter，提供默认值
    const frontmatter = mdxContent.frontmatter || {
      title: chapter?.title || '章节标题',
      description: chapter?.description || '章节描述',
      level: chapter?.level || 'beginner',
      estimatedMinutes: chapter?.estimatedMinutes || 10,
      tags: chapter?.tags || [],
      lastUpdated: chapter?.lastUpdated?.toISOString() || new Date().toISOString(),
    }
    
    // 安全获取 level，提供默认值
    const level = frontmatter?.level || 'beginner'
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {currentChapterId && <Breadcrumb currentChapterId={currentChapterId} />}
          
          {/* 三栏布局：左侧空白（用于未来扩展）、中间内容、右侧目录 */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* 主内容区域 */}
            <div className="lg:col-span-9">
              {/* 章节元数据 */}
              <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {frontmatter?.title || chapter?.title || '章节标题'}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {frontmatter?.description || chapter?.description || '章节描述'}
            </p>
            
            {/* 元数据标签 */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {/* 难度级别 */}
              <span className={`px-3 py-1 rounded-full font-medium ${levelColors[level]}`}>
                {levelLabels[level]}
              </span>
              
              {/* 预计时间 */}
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                约 {frontmatter?.estimatedMinutes || chapter?.estimatedMinutes || 10} 分钟
              </span>
              
              {/* 最后更新时间 */}
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                更新于 {new Date(frontmatter?.lastUpdated || chapter?.lastUpdated || new Date()).toLocaleDateString('zh-CN')}
              </span>
            </div>
            
            {/* 标签 */}
            {frontmatter?.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* MDX 内容 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <MDXRenderer Component={mdxContent.default} />
            
            {/* 章节完成按钮 */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">已完成</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMarkComplete}
                      >
                        重新标记
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleMarkComplete}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      标记为已完成
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* 下一章节推荐 */}
            {isCompleted && nextChapter && (
              <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          继续学习
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {nextChapter?.title || '下一章节'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {nextChapter?.description || '继续学习下一章节'}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          约 {nextChapter?.estimatedMinutes || 10} 分钟
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {levelLabels[nextChapter?.level || 'beginner']}
                        </span>
                      </div>
                    </div>
                    <Link to={nextChapter?.parentId 
                      ? `/chapter/${chaptersConfig.find(c => c.id === nextChapter?.parentId)?.slug}/${nextChapter?.slug || ''}`
                      : `/chapter/${nextChapter?.slug || ''}`}>
                      <Button variant="primary">
                        开始学习
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* 章节导航 */}
            <ChapterNav currentChapterId={currentChapterId} />
          </div>
            </div>
            
            {/* 右侧目录栏 - 桌面端固定，移动端在内容上方 */}
            <aside className="lg:col-span-3 mb-8 lg:mb-0 order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
  }
  
  // 默认返回 null（不应该到达这里）
  return null
}
