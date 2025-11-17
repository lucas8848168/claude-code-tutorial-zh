import React, { useEffect, useState, useCallback } from 'react';

/**
 * 目录项接口
 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * TableOfContents 组件属性
 */
export interface TableOfContentsProps {
  /** 额外的 CSS 类名 */
  className?: string;
  /** 是否在移动端默认折叠 */
  collapsedOnMobile?: boolean;
}

/**
 * TableOfContents 组件
 * 
 * 从页面中的标题（h2, h3）自动生成目录，支持：
 * - 自动提取标题并生成目录结构
 * - 当前阅读位置高亮（使用 Intersection Observer）
 * - 点击平滑滚动到对应标题
 * - 响应式设计（桌面端固定，移动端可折叠）
 * - 空目录处理
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({
  className = '',
  collapsedOnMobile = true,
}) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(collapsedOnMobile);

  /**
   * 从 DOM 中提取标题生成目录
   */
  const extractHeadings = useCallback(() => {
    // 查找所有 h2 和 h3 标题
    const headings = document.querySelectorAll('h2, h3');
    const items: TocItem[] = [];

    headings.forEach((heading) => {
      // 获取或生成 ID
      let id = heading.id;
      if (!id) {
        // 如果标题没有 ID，从文本生成一个
        id = heading.textContent
          ?.toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
          .replace(/^-+|-+$/g, '') || '';
        heading.id = id;
      }

      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1)); // h2 -> 2, h3 -> 3

      items.push({ id, text, level });
    });

    setTocItems(items);
  }, []);

  /**
   * 使用 Intersection Observer 监听标题可见性
   */
  useEffect(() => {
    // 提取标题
    extractHeadings();

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px', // 顶部留出 header 空间，底部留出大部分空间
        threshold: 0.5,
      }
    );

    // 观察所有标题
    const headings = document.querySelectorAll('h2, h3');
    headings.forEach((heading) => observer.observe(heading));

    // 清理函数
    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [extractHeadings]);

  /**
   * 处理点击目录项，平滑滚动到对应标题
   */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 计算滚动位置（考虑固定 header 的高度）
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // 更新 URL hash（不触发滚动）
      history.pushState(null, '', `#${id}`);
      setActiveId(id);

      // 在移动端点击后自动折叠
      if (window.innerWidth < 1024 && collapsedOnMobile) {
        setIsCollapsed(true);
      }
    }
  };

  /**
   * 切换折叠状态
   */
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 如果没有目录项，不渲染组件
  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav
      className={`toc-container ${className}`}
      aria-label="目录"
    >
      {/* 移动端折叠按钮 */}
      <button
        onClick={toggleCollapse}
        className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-expanded={!isCollapsed}
        aria-controls="toc-list"
      >
        <span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          目录
        </span>
        <svg
          className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
            isCollapsed ? '' : 'rotate-180'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 桌面端标题 */}
      <div className="hidden lg:block mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          目录
        </h3>
      </div>

      {/* 目录列表 */}
      <ul
        id="toc-list"
        className={`space-y-2 ${isCollapsed ? 'hidden lg:block' : 'block'}`}
      >
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;

          return (
            <li
              key={item.id}
              className={`${isH3 ? 'ml-4' : ''}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`
                  block py-1.5 px-3 rounded text-sm transition-colors
                  ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium border-l-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-2 border-transparent'
                  }
                `}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>

      {/* 空状态提示（理论上不会显示，因为上面有 return null） */}
      {tocItems.length === 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400 italic">
          本页面暂无目录
        </div>
      )}
    </nav>
  );
};

export default TableOfContents;
