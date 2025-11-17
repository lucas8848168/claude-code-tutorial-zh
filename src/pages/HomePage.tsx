import { Link, useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import { chaptersConfig, getAllChapters, getChapterById } from '../config/chapters';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Circle, Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { 
    getProgress, 
    completedChapters, 
    currentChapter, 
    isChapterCompleted,
    totalTimeSpent 
  } = useProgressStore();
  
  const progress = getProgress();
  const allChapters = getAllChapters();
  const completedCount = completedChapters.size;
  const totalCount = allChapters.length;
  
  // 格式化学习时间
  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} 分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} 小时 ${mins} 分钟` : `${hours} 小时`;
  };
  
  // 获取继续学习的章节
  const getContinueChapter = () => {
    // 如果有当前章节，返回当前章节
    if (currentChapter) {
      return getChapterById(currentChapter);
    }
    
    // 否则返回第一个未完成的章节
    const firstIncomplete = allChapters.find(chapter => !isChapterCompleted(chapter.id));
    return firstIncomplete || allChapters[0];
  };
  
  const continueChapter = getContinueChapter();
  
  const handleContinueLearning = () => {
    if (continueChapter) {
      const parentChapter = continueChapter.parentId 
        ? getChapterById(continueChapter.parentId)
        : continueChapter;
      
      if (parentChapter) {
        navigate(`/chapter/${parentChapter.slug}/${continueChapter.slug}`);
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* 欢迎信息 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          欢迎来到 Claude Code 教程
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          从零开始学习使用 Claude Code，掌握 AI 辅助编程的强大功能。本教程将带你从基础入门到精通实战，
          循序渐进地掌握这个强大的 AI 编程助手。
        </p>
      </div>
      
      {/* 学习进度卡片 */}
      <Card className="mb-8" padding="lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              学习进度
            </h2>
            <Progress 
              value={progress} 
              size="lg" 
              variant={progress === 100 ? 'success' : 'default'}
              showLabel 
              className="mb-4"
            />
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>已完成 {completedCount} / {totalCount} 章节</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>总学习时间：{formatTime(totalTimeSpent)}</span>
              </div>
            </div>
          </div>
          
          {continueChapter && (
            <div className="flex flex-col gap-2">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleContinueLearning}
                className="whitespace-nowrap"
              >
                <span className="mr-2">继续学习</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {continueChapter.title}
              </p>
            </div>
          )}
        </div>
      </Card>
      
      {/* 学习统计 */}
      {progress > 0 && (
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {progress}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                完成进度
              </div>
            </div>
          </Card>
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {completedCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                已完成章节
              </div>
            </div>
          </Card>
          <Card padding="md" hover>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {formatTime(totalTimeSpent)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                学习时长
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* 章节卡片 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          学习路径
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {chaptersConfig.map((stage) => {
          const stageChildren = stage.children || [];
          const completedInStage = stageChildren.filter(child => 
            isChapterCompleted(child.id)
          ).length;
          const stageProgress = stageChildren.length > 0 
            ? Math.round((completedInStage / stageChildren.length) * 100)
            : 0;
          
          return (
            <Card key={stage.id} padding="lg" hover className="transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle>{stage.title}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stage.level === 'beginner' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : stage.level === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {stage.level === 'beginner' ? '入门' : stage.level === 'intermediate' ? '进阶' : '高级'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {stage.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    约 {stage.estimatedMinutes} 分钟
                  </span>
                  <span>
                    {completedInStage} / {stageChildren.length} 已完成
                  </span>
                </div>
                {stageChildren.length > 0 && (
                  <Progress 
                    value={stageProgress} 
                    size="sm" 
                    variant={stageProgress === 100 ? 'success' : 'default'}
                  />
                )}
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {stageChildren.map((chapter) => {
                    const isCompleted = isChapterCompleted(chapter.id);
                    
                    return (
                      <li key={chapter.id}>
                        <Link
                          to={`/chapter/${stage.slug}/${chapter.slug}`}
                          className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                              isCompleted 
                                ? 'text-gray-600 dark:text-gray-400' 
                                : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {chapter.title}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-2 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {chapter.estimatedMinutes} 分钟
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* 底部提示 */}
      {progress === 0 && (
        <Card className="mt-8" padding="lg">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              开始你的学习之旅
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              点击上方的"继续学习"按钮，或选择任意章节开始学习
            </p>
          </div>
        </Card>
      )}
      
      {progress === 100 && (
        <Card className="mt-8" padding="lg">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              恭喜你完成了所有章节！
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              你已经掌握了 Claude Code 的所有功能，现在可以在实际项目中应用这些知识了
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
