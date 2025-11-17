import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { getNextChapter, getPreviousChapter, chaptersConfig } from '../../config/chapters';
import type { Chapter } from '../../types/content';

export interface ChapterNavProps {
  currentChapterId: string;
}

/**
 * 章节导航组件
 * 提供上一章和下一章的导航按钮
 */
export const ChapterNav: React.FC<ChapterNavProps> = ({ currentChapterId }) => {
  const previousChapter = getPreviousChapter(currentChapterId);
  const nextChapter = getNextChapter(currentChapterId);

  // 如果没有上一章和下一章，不显示导航
  if (!previousChapter && !nextChapter) {
    return null;
  }

  /**
   * 生成章节路径
   */
  const getChapterPath = (chapter: Chapter): string => {
    // 如果有父章节，使用 /chapter/parent-slug/child-slug 格式
    if (chapter.parentId) {
      // 需要找到父章节的 slug
      const parentChapter = chaptersConfig.find(c => c.id === chapter.parentId);
      if (parentChapter) {
        return `/chapter/${parentChapter.slug}/${chapter.slug}`;
      }
    }
    // 否则使用 /chapter/slug 格式
    return `/chapter/${chapter.slug}`;
  };

  return (
    <nav
      className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
      aria-label="章节导航"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {/* 上一章按钮 */}
        <div className="flex-1">
          {previousChapter ? (
            <Link
              to={getChapterPath(previousChapter)}
              className="block group"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto text-left"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      上一章
                    </div>
                    <div className="font-medium line-clamp-1">
                      {previousChapter.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      约 {previousChapter.estimatedMinutes} 分钟
                    </div>
                  </div>
                </div>
              </Button>
            </Link>
          ) : (
            <div className="h-full" />
          )}
        </div>

        {/* 下一章按钮 */}
        <div className="flex-1 flex justify-end">
          {nextChapter ? (
            <Link
              to={getChapterPath(nextChapter)}
              className="block group"
            >
              <Button
                variant="primary"
                className="w-full sm:w-auto text-right"
              >
                <div className="flex items-center">
                  <div>
                    <div className="text-xs text-white/80 mb-1">
                      下一章
                    </div>
                    <div className="font-medium line-clamp-1">
                      {nextChapter.title}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      约 {nextChapter.estimatedMinutes} 分钟
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
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
                </div>
              </Button>
            </Link>
          ) : (
            <div className="h-full" />
          )}
        </div>
      </div>
    </nav>
  );
};
