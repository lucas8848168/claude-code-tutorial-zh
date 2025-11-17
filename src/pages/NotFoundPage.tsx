import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { chaptersConfig, getAllChapters } from '../config/chapters'
import { useProgressStore } from '../store/progressStore'
import { Home, Search, BookOpen, Zap, Rocket, Trophy } from 'lucide-react'

export default function NotFoundPage() {
  const { currentChapter, completedChapters } = useProgressStore()
  
  // Get popular chapters (main chapters with high order priority)
  const popularChapters = chaptersConfig.slice(0, 3)
  
  // Get recently visited chapter if available
  const recentChapter = currentChapter ? getAllChapters().find(ch => ch.id === currentChapter) : null
  
  // Get suggested chapters based on progress
  const suggestedChapters = chaptersConfig.filter(ch => {
    const isCompleted = completedChapters.has(ch.id)
    return !isCompleted
  }).slice(0, 2)
  
  // Quick links with icons
  const quickLinks = [
    {
      id: '01-getting-started',
      title: '入门指南',
      description: '快速开始使用 Claude Code',
      icon: Home,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      id: '02-basics',
      title: '基础功能',
      description: '学习核心功能和日常技巧',
      icon: BookOpen,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      id: '03-advanced',
      title: '进阶功能',
      description: '探索高级特性和工作流',
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      id: '04-mastery',
      title: '精通与实战',
      description: '最佳实践和完整项目案例',
      icon: Trophy,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
    },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Main 404 Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-100 dark:bg-red-950 mb-4">
              <span className="text-4xl md:text-5xl font-bold text-red-600 dark:text-red-400">
                404
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            哎呀，页面未找到
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            您访问的页面似乎不存在或已被移除。但别担心，我们为您准备了一些有用的链接！
          </p>
          
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                返回首页
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                搜索内容
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Recent Chapter Suggestion */}
        {recentChapter && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                继续学习
              </h3>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {recentChapter.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {recentChapter.description}
                  </p>
                </div>
                <Link to={`/chapter/${recentChapter.id}`}>
                  <Button variant="ghost" size="md">
                    继续 →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Links Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            常用章节
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon
              const chapter = chaptersConfig.find(ch => ch.id === link.id)
              
              return (
                <Link key={link.id} to={`/chapter/${link.id}`}>
                  <div className={`${link.bgColor} rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700`}>
                    <div className="flex items-start gap-4">
                      <div className={`${link.color} flex-shrink-0 mt-1`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {link.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {link.description}
                        </p>
                        {chapter && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            ⏱ 约 {chapter.estimatedMinutes} 分钟
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        
        {/* Suggested Next Chapters */}
        {suggestedChapters.length > 0 && (
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              推荐学习
            </h2>
            
            <div className="space-y-3">
              {suggestedChapters.map((chapter) => (
                <Link key={chapter.id} to={`/chapter/${chapter.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Rocket className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Popular Chapters */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            热门章节
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularChapters.map((chapter) => (
              <Link key={chapter.id} to={`/chapter/${chapter.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                      {chapter.title}
                    </h3>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 ml-2 flex-shrink-0">
                      {chapter.level === 'beginner' && '入门'}
                      {chapter.level === 'intermediate' && '中级'}
                      {chapter.level === 'advanced' && '进阶'}
                      {chapter.level === 'expert' && '精通'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {chapter.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    ⏱ 约 {chapter.estimatedMinutes} 分钟
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
