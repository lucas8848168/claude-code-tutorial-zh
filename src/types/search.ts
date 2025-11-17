/**
 * 搜索文档接口
 */
export interface SearchDocument {
  /** 文档 ID */
  id: string;
  /** 文档标题 */
  title: string;
  /** 文档内容 */
  content: string;
  /** 所属章节 ID */
  chapterId: string;
  /** 标签列表 */
  tags: string[];
  /** 难度级别 */
  level: string;
}

/**
 * 搜索结果接口
 */
export interface SearchResult {
  /** 结果 ID */
  id: string;
  /** 结果标题 */
  title: string;
  /** 内容摘要 */
  excerpt: string;
  /** 所属章节 ID */
  chapterId: string;
  /** 相关性分数 */
  score: number;
}

/**
 * 搜索状态管理接口
 */
export interface SearchState {
  /** 搜索查询字符串 */
  query: string;
  /** 搜索结果列表 */
  results: SearchResult[];
  /** 是否正在搜索 */
  isSearching: boolean;
  /** 搜索历史 */
  searchHistory: string[];
  
  /** 执行搜索 */
  search: (query: string) => void;
  /** 清空搜索结果 */
  clearResults: () => void;
  /** 添加到搜索历史 */
  addToHistory: (query: string) => void;
  /** 清空搜索历史 */
  clearHistory: () => void;
}
