import { Link } from 'react-router-dom';
import { getChapterById } from '../../config/chapters';

interface BreadcrumbProps {
  currentChapterId: string;
}

interface BreadcrumbItem {
  title: string;
  path: string;
}

/**
 * 面包屑导航组件
 * 自动生成当前章节的路径导航
 */
export function Breadcrumb({ currentChapterId }: BreadcrumbProps) {
  const currentChapter = getChapterById(currentChapterId);
  
  if (!currentChapter) {
    return null;
  }
  
  // 构建面包屑路径
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: '首页',
      path: '/',
    },
  ];
  
  // 如果有父章节，添加父章节
  if (currentChapter.parentId) {
    const parentChapter = getChapterById(currentChapter.parentId);
    if (parentChapter) {
      breadcrumbs.push({
        title: parentChapter.title,
        path: `/chapter/${parentChapter.id}`,
      });
    }
  }
  
  // 添加当前章节
  breadcrumbs.push({
    title: currentChapter.title,
    path: `/chapter/${currentChapter.id}`,
  });
  
  return (
    <nav aria-label="面包屑导航" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
              
              {isLast ? (
                <span
                  className="font-medium text-gray-900 dark:text-gray-100"
                  aria-current="page"
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
