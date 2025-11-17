import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document } from 'flexsearch';
// import { SearchDocument, SearchResult } from '../types/search';

// 临时类型定义
interface SearchDocument {
  id: string;
  title: string;
  content: string;
  chapterId: string;
  tags: string[];
  level: string;
  [key: string]: any; // 添加索引签名以满足 FlexSearch 的 DocumentData 约束
}

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  chapterId: string;
  score: number;
}

interface SearchStoreState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  searchHistory: string[];
  searchIndex: Document<SearchDocument> | null;
  documents: SearchDocument[];

  // Methods
  loadSearchIndex: () => Promise<void>;
  search: (query: string) => void;
  clearResults: () => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  setQuery: (query: string) => void;
}

/**
 * 创建 FlexSearch 索引
 */
function createSearchIndex(documents: SearchDocument[]): Document<SearchDocument> {
  const index = new Document<SearchDocument>({
    tokenize: 'full',
  });

  // 添加所有文档到索引
  for (const doc of documents) {
    index.add(doc);
  }

  return index;
}

/**
 * 提取摘要（前 150 字）
 */
function extractExcerpt(content: string, maxLength: number = 150): string {
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
 * 高亮匹配的关键词
 * @deprecated 暂未使用，保留以备后用
 */
// function highlightMatches(text: string, query: string): string {
//   if (!query) return text;
//
//   const regex = new RegExp(`(${query})`, 'gi');
//   return text.replace(regex, '<mark>$1</mark>');
// }

export const useSearchStore = create<SearchStoreState>()(
  persist(
    (set, get) => ({
      query: '',
      results: [],
      isSearching: false,
      searchHistory: [],
      searchIndex: null,
      documents: [],

      /**
       * 从 public/search-index.json 加载搜索索引
       */
      loadSearchIndex: async () => {
        try {
          set({ isSearching: true });

          const response = await fetch('/search-index.json');
          if (!response.ok) {
            throw new Error('Failed to load search index');
          }

          const documents: SearchDocument[] = await response.json();
          const index = createSearchIndex(documents);

          set({
            searchIndex: index,
            documents,
            isSearching: false,
          });
        } catch (error) {
          console.error('Error loading search index:', error);
          set({ isSearching: false });
        }
      },

      /**
       * 执行搜索
       */
      search: (query: string) => {
        const { searchIndex } = get();

        if (!query.trim()) {
          set({ results: [], query: '' });
          return;
        }

        if (!searchIndex) {
          console.warn('Search index not loaded');
          return;
        }

        set({ isSearching: true, query });

        try {
          // 使用 FlexSearch 进行搜索
          const searchResults = searchIndex.search(query, {
            limit: 20,
            enrich: true,
          });

          // 转换搜索结果格式
          const results: SearchResult[] = searchResults
            .map((result: any) => {
              const doc = result.result as SearchDocument;
              return {
                id: doc.id,
                title: doc.title,
                excerpt: extractExcerpt(doc.content),
                chapterId: doc.chapterId,
                score: result.score || 0,
              };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // 限制返回前 10 个结果

          set({ results, isSearching: false });

          // 添加到搜索历史
          get().addToHistory(query);
        } catch (error) {
          console.error('Search error:', error);
          set({ results: [], isSearching: false });
        }
      },

      /**
       * 清空搜索结果
       */
      clearResults: () => {
        set({ results: [], query: '' });
      },

      /**
       * 添加到搜索历史
       */
      addToHistory: (query: string) => {
        const { searchHistory } = get();

        // 避免重复
        if (searchHistory[0] === query) {
          return;
        }

        // 保持最多 10 条历史记录
        const newHistory = [query, ...searchHistory.filter((q) => q !== query)].slice(0, 10);
        set({ searchHistory: newHistory });
      },

      /**
       * 清空搜索历史
       */
      clearHistory: () => {
        set({ searchHistory: [] });
      },

      /**
       * 设置查询字符串
       */
      setQuery: (query: string) => {
        set({ query });
      },
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        searchHistory: state.searchHistory,
      }),
    }
  )
);
