import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader } from 'lucide-react';
import { useSearchStore } from '../../store/searchStore';
import { chaptersConfig } from '../../config/chapters';

export function SearchBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { query, results, isSearching, searchHistory, search, clearResults, loadSearchIndex } =
    useSearchStore();

  // 初始化搜索索引
  useEffect(() => {
    loadSearchIndex();
  }, [loadSearchIndex]);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 处理快捷键 Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }

      // ESC 关闭搜索
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSearch = (value: string) => {
    search(value);
  };

  const handleResultClick = (chapterId: string) => {
    const chapter = chaptersConfig.find((c: any) => c.id === chapterId);
    if (chapter) {
      // 如果是父章节，导航到第一个子章节
      if (chapter.children && chapter.children.length > 0) {
        const firstChild = chapter.children[0];
        navigate(`/chapter/${chapter.slug}/${firstChild.slug}`);
      } else {
        // 如果是子章节或没有子章节的父章节
        navigate(`/chapter/${chapter.slug}`);
      }
      setIsOpen(false);
      clearResults();
    }
  };

  const handleClear = () => {
    clearResults();
  };

  // 获取章节标题
  const getChapterTitle = (chapterId: string): string => {
    const chapter = chaptersConfig.find((c: any) => c.id === chapterId);
    return chapter?.title || chapterId;
  };

  // 显示的内容：搜索结果或搜索历史
  const displayItems = query.trim() ? results : searchHistory;
  const showResults = isOpen && (displayItems.length > 0 || isSearching);

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="搜索"
        >
          <Search className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex flex-col">
            <div className="bg-white dark:bg-gray-900 p-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="搜索教程..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  clearResults();
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showResults && (
              <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-5 h-5 animate-spin text-blue-500" />
                  </div>
                ) : displayItems.length > 0 ? (
                  <div className="divide-y dark:divide-gray-800">
                    {displayItems.map((item) => (
                      <button
                        key={typeof item === 'string' ? item : item.id}
                        onClick={() => {
                          if (typeof item === 'string') {
                            handleSearch(item);
                          } else {
                            handleResultClick(item.chapterId);
                          }
                        }}
                        className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {typeof item === 'string' ? (
                          <div className="text-sm text-gray-600 dark:text-gray-400">{item}</div>
                        ) : (
                          <>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {item.excerpt}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {getChapterTitle(item.chapterId)}
                            </div>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    {query.trim() ? '未找到相关内容' : '搜索历史为空'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 桌面端
  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="搜索教程... (Ctrl+K)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="清空搜索"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-5 h-5 animate-spin text-blue-500" />
            </div>
          ) : displayItems.length > 0 ? (
            <div className="divide-y dark:divide-gray-800">
              {displayItems.slice(0, 5).map((item) => (
                <button
                  key={typeof item === 'string' ? item : item.id}
                  onClick={() => {
                    if (typeof item === 'string') {
                      handleSearch(item);
                    } else {
                      handleResultClick(item.chapterId);
                    }
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {typeof item === 'string' ? (
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item}</div>
                  ) : (
                    <>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-1">
                        {item.excerpt}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {getChapterTitle(item.chapterId)}
                      </div>
                    </>
                  )}
                </button>
              ))}
              {displayItems.length > 5 && (
                <button
                  onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
                  className="w-full text-left px-4 py-3 text-sm text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  查看全部结果 ({displayItems.length})
                </button>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              {query.trim() ? '未找到相关内容' : '搜索历史为空'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
