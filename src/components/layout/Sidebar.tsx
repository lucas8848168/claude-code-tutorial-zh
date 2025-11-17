import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { chaptersConfig } from '../../config/chapters'
import { useProgressStore } from '../../store/progressStore'
import type { Chapter } from '../../types/content'

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Load expanded chapters from localStorage
const loadExpandedChapters = (): Set<string> => {
  try {
    const stored = localStorage.getItem('sidebar-expanded-chapters')
    if (stored) {
      return new Set(JSON.parse(stored))
    }
  } catch (error) {
    console.error('Failed to load expanded chapters:', error)
  }
  return new Set()
}

// Save expanded chapters to localStorage
const saveExpandedChapters = (chapters: Set<string>) => {
  try {
    localStorage.setItem('sidebar-expanded-chapters', JSON.stringify(Array.from(chapters)))
  } catch (error) {
    console.error('Failed to save expanded chapters:', error)
  }
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()
  const { isChapterCompleted } = useProgressStore()
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(loadExpandedChapters)
  
  // Auto-expand the chapter containing the current page
  useEffect(() => {
    const pathParts = location.pathname.split('/')
    if (pathParts.length >= 3 && pathParts[1] === 'chapter') {
      const currentChapterId = pathParts[2]
      setExpandedChapters(prev => {
        const newSet = new Set(prev).add(currentChapterId)
        saveExpandedChapters(newSet)
        return newSet
      })
    }
  }, [location.pathname])
  
  // Save expanded state whenever it changes
  useEffect(() => {
    saveExpandedChapters(expandedChapters)
  }, [expandedChapters])
  
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId)
      } else {
        newSet.add(chapterId)
      }
      return newSet
    })
  }
  
  const getChapterProgress = (chapter: Chapter): number => {
    if (!chapter.children || chapter.children.length === 0) return 0
    const completedCount = chapter.children.filter(child => 
      isChapterCompleted(child.id)
    ).length
    return Math.round((completedCount / chapter.children.length) * 100)
  }
  
  const isCurrentPath = (chapterId: string, sectionSlug?: string): boolean => {
    const pathParts = location.pathname.split('/')
    if (pathParts.length < 3) return false
    
    const currentChapterId = pathParts[2]
    const currentSectionSlug = pathParts[3]
    
    if (sectionSlug) {
      return currentChapterId === chapterId && currentSectionSlug === sectionSlug
    }
    return currentChapterId === chapterId
  }
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 border-r border-gray-200 dark:border-gray-800 
          bg-white dark:bg-gray-900 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="教程导航"
      >
        <nav className="p-4 space-y-2" role="navigation">
          {chaptersConfig.map((chapter) => {
            const isExpanded = expandedChapters.has(chapter.id)
            const progress = getChapterProgress(chapter)
            const hasChildren = chapter.children && chapter.children.length > 0
            
            return (
              <div key={chapter.id} className="space-y-1">
                {/* Parent chapter header */}
                <button
                  onClick={() => hasChildren && toggleChapter(chapter.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-md
                    text-sm font-semibold transition-colors
                    ${isCurrentPath(chapter.id) && !hasChildren
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                    ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
                  `}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                  aria-controls={hasChildren ? `chapter-${chapter.id}-children` : undefined}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {hasChildren && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    <span>{chapter.title}</span>
                  </div>
                  
                  {/* Progress indicator */}
                  {hasChildren && progress > 0 && (
                    <span 
                      className="text-xs text-gray-500 dark:text-gray-400 ml-2"
                      aria-label={`完成进度 ${progress}%`}
                    >
                      {progress}%
                    </span>
                  )}
                </button>
                
                {/* Visual progress bar for parent chapters */}
                {hasChildren && progress > 0 && (
                  <div className="px-3 pb-1">
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`章节完成进度 ${progress}%`}
                      />
                    </div>
                  </div>
                )}
                
                {/* Child chapters */}
                {hasChildren && (
                  <div
                    id={`chapter-${chapter.id}-children`}
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <ul className="ml-6 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2 pt-1">
                      {chapter.children!.map((child) => {
                        const isActive = isCurrentPath(chapter.id, child.slug)
                        const isCompleted = isChapterCompleted(child.id)
                        
                        return (
                          <li key={child.id}>
                            <Link
                              to={`/chapter/${chapter.slug}/${child.slug}`}
                              onClick={onClose}
                              className={`
                                flex items-center gap-2 px-3 py-1.5 rounded-md text-sm 
                                transition-colors group
                                ${isActive
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }
                              `}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              {/* Completion indicator */}
                              <span 
                                className={`
                                  flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center
                                  transition-all duration-200
                                  ${isCompleted 
                                    ? 'bg-green-500 border-green-500' 
                                    : 'border-gray-300 dark:border-gray-600'
                                  }
                                `}
                                aria-label={isCompleted ? '已完成' : '未完成'}
                              >
                                {isCompleted && (
                                  <svg 
                                    className="w-3 h-3 text-white" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </span>
                              
                              <span className="flex-1">{child.title}</span>
                              
                              {/* Estimated time */}
                              <span 
                                className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label={`预计 ${child.estimatedMinutes} 分钟`}
                              >
                                {child.estimatedMinutes}分
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
