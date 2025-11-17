import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader, Clock, Tag } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { chaptersConfig } from '../config/chapters';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  const {
    query,
    results,
    isSearching,
    searchHistory,
    documents,
    search,
    loadSearchIndex,
    setQuery,
  } = useSearchStore();

  const initialQuery = searchParams.get('q') || '';

  // 初始化搜索索引
  useEffect(() => {
    loadSearchIndex();
  }, [loadSearchIndex]);

  // 提取所有标签
  useEffect(() => {
    if (documents.length > 0) {
      const tags = Array.from(new Set(documents.flatMap((doc) => doc.tags)));
      setAllTags(tags);
    }
  }, [documents]);

  // 初始化搜索查询
  useEffect(() => {
    if (initialQuery && !query) {
      setQuery(initialQuery);
      search(initialQuery);
    }
  }, [initialQuery, query, setQuery, search]);

  const handleSearch = (value: string) => {
    setQuery(value);
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
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleHistoryClick = (historyQuery: string) => {
    handleSearch(historyQuery);
  };

  // 获取章节标题
  const getChapterTitle = (chapterId: string): string => {
    const chapter = chaptersConfig.find((c: any) => c.id === chapterId);
    return chapter?.title || chapterId;
  };

  // 过滤结果
  const filteredResults =
    selectedTags.length > 0
      ? results.filter((result) => {
          const doc = documents.find((d) => d.id === result.id);
          return doc && selectedTags.some((tag) => doc.tags.includes(tag));
        })
      : results;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          搜索教程
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          在 Claude Code 教程中查找你需要的内容
        </p>

        {/* 搜索框 */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="搜索教程内容..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 - 标签筛选 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                标签筛选
              </h2>

              {allTags.length > 0 ? (
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">暂无标签</p>
              )}

              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-4 w-full px-3 py-2 text-sm text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                >
                  清除筛选
                </button>
              )}

              {/* 搜索历史 */}
              {searchHistory.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    搜索历史
                  </h3>
                  <div className="space-y-2">
                    {searchHistory.slice(0, 5).map((historyItem) => (
                      <button
                        key={historyItem}
                        onClick={() => handleHistoryClick(historyItem)}
                        className="w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 truncate transition-colors"
                      >
                        {historyItem}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 主内容区 - 搜索结果 */}
          <div className="lg:col-span-3">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : query.trim() ? (
              <>
                {filteredResults.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      找到 <span className="font-semibold">{filteredResults.length}</span> 个结果
                    </p>

                    <div className="space-y-4">
                      {filteredResults.map((result) => {
                        const doc = documents.find((d) => d.id === result.id);
                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result.chapterId)}
                            className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg hover:border-blue-500 border border-transparent transition-all"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                  {result.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                                  {result.excerpt}
                                </p>

                                <div className="flex items-center gap-4 flex-wrap">
                                  <span className="text-xs text-gray-500 dark:text-gray-500">
                                    {getChapterTitle(result.chapterId)}
                                  </span>

                                  {doc && doc.level && (
                                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                      {doc.level === 'beginner'
                                        ? '入门'
                                        : doc.level === 'intermediate'
                                          ? '中级'
                                          : doc.level === 'advanced'
                                            ? '进阶'
                                            : '精通'}
                                    </span>
                                  )}

                                  {doc && doc.tags.length > 0 && (
                                    <div className="flex gap-1 flex-wrap">
                                      {doc.tags.slice(0, 2).map((tag) => (
                                        <span
                                          key={tag}
                                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                      {doc.tags.length > 2 && (
                                        <span className="text-xs px-2 py-1 text-gray-600 dark:text-gray-400">
                                          +{doc.tags.length - 2}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {result.score && (
                                <div className="flex-shrink-0 text-right">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    相关性: {Math.round(result.score * 100)}%
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      未找到与 "<span className="font-semibold">{query}</span>" 相关的内容
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      请尝试其他关键词或浏览章节目录
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  请输入搜索关键词开始搜索
                </p>

                {searchHistory.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                      或查看最近搜索：
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {searchHistory.slice(0, 5).map((historyItem) => (
                        <button
                          key={historyItem}
                          onClick={() => handleHistoryClick(historyItem)}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {historyItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
