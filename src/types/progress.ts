/**
 * 练习题完成结果
 */
export interface ExerciseResult {
  /** 练习题 ID */
  exerciseId: string;
  /** 是否完成 */
  completed: boolean;
  /** 尝试次数 */
  attempts: number;
  /** 最后尝试时间（ISO 格式） */
  lastAttempt: string;
}

/**
 * 用户学习进度
 */
export interface UserProgress {
  /** 用户 ID（可选，用于未来扩展） */
  userId?: string;
  /** 已完成的章节 ID 列表 */
  completedChapters: string[];
  /** 当前正在学习的章节 ID */
  currentChapter: string | null;
  /** 最后访问时间（ISO 格式） */
  lastVisited: string;
  /** 总学习时间（分钟） */
  totalTimeSpent: number;
  /** 练习题完成记录 */
  exerciseResults: Record<string, ExerciseResult>;
  /** 测验分数记录 */
  quizScores: Record<string, number>;
}

/**
 * 进度状态管理接口
 */
export interface ProgressState {
  /** 已完成的章节 ID 集合 */
  completedChapters: Set<string>;
  /** 当前章节 ID */
  currentChapter: string | null;
  /** 最后访问时间 */
  lastVisited: Date;
  /** 总学习时间（分钟） */
  totalTimeSpent: number;
  
  /** 标记章节为已完成 */
  markChapterComplete: (chapterId: string) => void;
  /** 设置当前章节 */
  setCurrentChapter: (chapterId: string) => void;
  /** 更新学习时间 */
  updateTimeSpent: (minutes: number) => void;
  /** 重置所有进度 */
  resetProgress: () => void;
  /** 获取学习进度百分比 */
  getProgress: () => number;
}
