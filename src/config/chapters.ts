import type { Chapter } from '../types/content';

/**
 * 章节结构配置
 * 定义教程的完整章节层次结构
 */
export const chaptersConfig: Chapter[] = [
  {
    id: '01-getting-started',
    title: '入门指南',
    slug: 'getting-started',
    description: '了解 Claude Code 的基础知识，完成安装和配置',
    level: 'beginner',
    estimatedMinutes: 30,
    order: 1,
    content: '',
    tags: ['入门', '安装', '配置'],
    lastUpdated: new Date('2025-11-14'),
    children: [
      {
        id: '01-01-introduction',
        title: 'Claude Code 简介',
        slug: 'introduction',
        description: '了解 Claude Code 是什么以及它能做什么',
        level: 'beginner',
        estimatedMinutes: 5,
        order: 1,
        parentId: '01-getting-started',
        content: '',
        tags: ['简介', '概述'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '01-02-installation',
        title: '安装与配置',
        slug: 'installation',
        description: '在不同操作系统上安装和配置 Claude Code',
        level: 'beginner',
        estimatedMinutes: 15,
        order: 2,
        parentId: '01-getting-started',
        content: '',
        tags: ['安装', 'Windows', 'macOS', 'Linux'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '01-03-first-steps',
        title: '第一个示例',
        slug: 'first-steps',
        description: '创建你的第一个 Claude Code 项目',
        level: 'beginner',
        estimatedMinutes: 10,
        order: 3,
        parentId: '01-getting-started',
        content: '',
        tags: ['示例', '快速开始'],
        lastUpdated: new Date('2025-11-14'),
      },
    ],
  },
  {
    id: '02-basics',
    title: '基础功能',
    slug: 'basics',
    description: '掌握 Claude Code 的核心功能和日常使用技巧',
    level: 'beginner',
    estimatedMinutes: 60,
    order: 2,
    content: '',
    tags: ['基础', '功能', '教程'],
    lastUpdated: new Date('2025-11-14'),
    children: [
      {
        id: '02-01-code-completion',
        title: '代码补全',
        slug: 'code-completion',
        description: '学习如何使用智能代码补全功能',
        level: 'beginner',
        estimatedMinutes: 15,
        order: 1,
        parentId: '02-basics',
        content: '',
        tags: ['代码补全', 'AI 辅助'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '02-02-chat',
        title: '对话式编程',
        slug: 'chat',
        description: '通过对话与 AI 助手协作编程',
        level: 'beginner',
        estimatedMinutes: 20,
        order: 2,
        parentId: '02-basics',
        content: '',
        tags: ['Chat', '对话', 'AI 助手'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '02-03-file-operations',
        title: '文件操作',
        slug: 'file-operations',
        description: '使用 Claude Code 进行文件和文件夹操作',
        level: 'beginner',
        estimatedMinutes: 15,
        order: 3,
        parentId: '02-basics',
        content: '',
        tags: ['文件', '操作', '管理'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '02-04-code-examples',
        title: '代码示例集',
        slug: 'code-examples',
        description: '常见编程场景的实用代码示例',
        level: 'beginner',
        estimatedMinutes: 10,
        order: 4,
        parentId: '02-basics',
        content: '',
        tags: ['示例', '实践'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '02-05-practice',
        title: '实践练习',
        slug: 'practice',
        description: '通过交互式练习和测验巩固你的学习',
        level: 'beginner',
        estimatedMinutes: 15,
        order: 5,
        parentId: '02-basics',
        content: '',
        tags: ['练习', '测验', '交互式'],
        lastUpdated: new Date('2025-11-16'),
      },
    ],
  },
  {
    id: '03-advanced',
    title: '进阶功能',
    slug: 'advanced',
    description: '探索 Claude Code 的高级特性和工作流',
    level: 'intermediate',
    estimatedMinutes: 90,
    order: 3,
    content: '',
    tags: ['进阶', '高级', '特性'],
    lastUpdated: new Date('2025-11-14'),
    children: [
      {
        id: '03-01-specs',
        title: 'Specs 规格驱动开发',
        slug: 'specs',
        description: '使用 Specs 功能进行结构化项目开发',
        level: 'intermediate',
        estimatedMinutes: 25,
        order: 1,
        parentId: '03-advanced',
        content: '',
        tags: ['Specs', '规格', '项目管理'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '03-02-hooks',
        title: 'Agent Hooks 代理钩子',
        slug: 'hooks',
        description: '创建自动化工作流和触发器',
        level: 'intermediate',
        estimatedMinutes: 20,
        order: 2,
        parentId: '03-advanced',
        content: '',
        tags: ['Hooks', '自动化', '触发器'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '03-03-steering',
        title: 'Steering 引导规则',
        slug: 'steering',
        description: '配置 AI 助手的行为和偏好',
        level: 'intermediate',
        estimatedMinutes: 20,
        order: 3,
        parentId: '03-advanced',
        content: '',
        tags: ['Steering', '配置', '定制'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '03-04-mcp',
        title: 'MCP 模型上下文协议',
        slug: 'mcp',
        description: '集成外部工具和服务',
        level: 'advanced',
        estimatedMinutes: 25,
        order: 4,
        parentId: '03-advanced',
        content: '',
        tags: ['MCP', '集成', '扩展'],
        lastUpdated: new Date('2025-11-14'),
      },
    ],
  },
  {
    id: '04-mastery',
    title: '精通与实战',
    slug: 'mastery',
    description: '最佳实践、高级技巧和完整项目案例',
    level: 'advanced',
    estimatedMinutes: 120,
    order: 4,
    content: '',
    tags: ['精通', '实战', '最佳实践'],
    lastUpdated: new Date('2025-11-14'),
    children: [
      {
        id: '04-01-best-practices',
        title: '最佳实践',
        slug: 'best-practices',
        description: '使用 Claude Code 的最佳实践和技巧',
        level: 'advanced',
        estimatedMinutes: 30,
        order: 1,
        parentId: '04-mastery',
        content: '',
        tags: ['最佳实践', '技巧', '优化'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '04-02-advanced-tips',
        title: '高级技巧',
        slug: 'advanced-tips',
        description: '提升效率的高级使用技巧',
        level: 'advanced',
        estimatedMinutes: 30,
        order: 2,
        parentId: '04-mastery',
        content: '',
        tags: ['技巧', '效率', '进阶'],
        lastUpdated: new Date('2025-11-14'),
      },
      {
        id: '04-03-real-world-projects',
        title: '实战项目',
        slug: 'real-world-projects',
        description: '完整的实战项目案例和解析',
        level: 'expert',
        estimatedMinutes: 60,
        order: 3,
        parentId: '04-mastery',
        content: '',
        tags: ['实战', '项目', '案例'],
        lastUpdated: new Date('2025-11-14'),
      },
    ],
  },
];

/**
 * 获取所有章节的扁平列表
 */
export function getAllChapters(): Chapter[] {
  const allChapters: Chapter[] = [];
  
  function traverse(chapters: Chapter[]) {
    for (const chapter of chapters) {
      allChapters.push(chapter);
      if (chapter.children) {
        traverse(chapter.children);
      }
    }
  }
  
  traverse(chaptersConfig);
  return allChapters;
}

/**
 * 根据 ID 查找章节
 */
export function getChapterById(id: string): Chapter | undefined {
  return getAllChapters().find(chapter => chapter.id === id);
}

/**
 * 根据 slug 查找章节
 */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return getAllChapters().find(chapter => chapter.slug === slug);
}

/**
 * 获取章节的下一个章节
 */
export function getNextChapter(currentId: string): Chapter | undefined {
  const allChapters = getAllChapters();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === currentId);
  
  if (currentIndex === -1 || currentIndex === allChapters.length - 1) {
    return undefined;
  }
  
  return allChapters[currentIndex + 1];
}

/**
 * 获取章节的上一个章节
 */
export function getPreviousChapter(currentId: string): Chapter | undefined {
  const allChapters = getAllChapters();
  const currentIndex = allChapters.findIndex(chapter => chapter.id === currentId);
  
  if (currentIndex <= 0) {
    return undefined;
  }
  
  return allChapters[currentIndex - 1];
}

/**
 * 获取总章节数
 */
export function getTotalChaptersCount(): number {
  return getAllChapters().length;
}
