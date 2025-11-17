/**
 * 章节级别
 */
export type ChapterLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * 章节接口
 */
export interface Chapter {
  /** 唯一标识符 */
  id: string;
  /** 章节标题 */
  title: string;
  /** URL 友好的标识符 */
  slug: string;
  /** 章节描述 */
  description: string;
  /** 难度级别 */
  level: ChapterLevel;
  /** 预计学习时间（分钟） */
  estimatedMinutes: number;
  /** 排序顺序 */
  order: number;
  /** 父章节 ID（可选） */
  parentId?: string;
  /** 子章节列表（可选） */
  children?: Chapter[];
  /** MDX 内容 */
  content: string;
  /** 标签列表 */
  tags: string[];
  /** 最后更新时间 */
  lastUpdated: Date;
}

/**
 * 练习题测试用例
 */
export interface TestCase {
  /** 测试用例 ID */
  id: string;
  /** 输入数据 */
  input: string;
  /** 期望输出 */
  expectedOutput: string;
  /** 测试描述 */
  description?: string;
}

/**
 * 练习题接口
 */
export interface Exercise {
  /** 练习题 ID */
  id: string;
  /** 练习题标题 */
  title: string;
  /** 练习题描述 */
  description: string;
  /** 初始代码 */
  initialCode: string;
  /** 参考答案 */
  solution: string;
  /** 提示列表（可选） */
  hints?: string[];
  /** 测试用例列表（可选） */
  testCases?: TestCase[];
}

/**
 * 测验题目接口
 */
export interface Question {
  /** 题目 ID */
  id: string;
  /** 题目内容 */
  question: string;
  /** 选项列表 */
  options: string[];
  /** 正确答案索引 */
  correctAnswer: number;
  /** 答案解析 */
  explanation: string;
}

/**
 * 测验接口
 */
export interface Quiz {
  /** 测验 ID */
  id: string;
  /** 测验标题 */
  title: string;
  /** 题目列表 */
  questions: Question[];
}

/**
 * 代码验证结果
 */
export interface ValidationResult {
  /** 是否通过验证 */
  success: boolean;
  /** 错误消息（如果有） */
  message?: string;
  /** 输出结果 */
  output?: string;
}
