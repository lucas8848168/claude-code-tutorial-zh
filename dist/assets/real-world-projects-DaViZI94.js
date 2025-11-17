import{j as n}from"./index-BSHmrj-c.js";function r(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",input:"input",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h1,{id:"实战项目案例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#实战项目案例",children:n.jsx(e.span,{className:"icon icon-link"})}),"实战项目案例"]}),`
`,n.jsx(e.p,{children:"本章节通过完整的实战项目案例，展示如何使用 Claude Code 开发真实应用。这些案例涵盖了从需求分析到部署的完整开发流程。"}),`
`,n.jsxs(e.h2,{id:"项目-1任务管理应用",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目-1任务管理应用",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目 1：任务管理应用"]}),`
`,n.jsxs(e.h3,{id:"项目概述",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目概述",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目概述"]}),`
`,n.jsx(e.p,{children:"构建一个功能完整的任务管理应用，包括任务创建、编辑、删除、分类和搜索功能。"}),`
`,n.jsxs(e.h3,{id:"技术栈",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#技术栈",children:n.jsx(e.span,{className:"icon icon-link"})}),"技术栈"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"前端"}),"：React + TypeScript + Tailwind CSS"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"状态管理"}),"：Zustand"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"存储"}),"：LocalStorage"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"测试"}),"：Jest + React Testing Library"]}),`
`]}),`
`,n.jsxs(e.h3,{id:"项目结构",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目结构",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目结构"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`todo-app/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskFilter.tsx
│   ├── store/
│   │   └── taskStore.ts
│   ├── types/
│   │   └── task.ts
│   ├── App.tsx
│   └── index.css
├── tests/
│   ├── taskStore.test.ts
│   └── TaskList.test.tsx
└── package.json
`})}),`
`,n.jsxs(e.h3,{id:"核心实现",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#核心实现",children:n.jsx(e.span,{className:"icon icon-link"})}),"核心实现"]}),`
`,n.jsxs(e.h4,{id:"1-类型定义",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-类型定义",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 类型定义"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'work' | 'personal' | 'shopping';
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFilter {
  category?: string;
  completed?: boolean;
  searchTerm?: string;
}
`})}),`
`,n.jsxs(e.h4,{id:"2-状态管理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-状态管理",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 状态管理"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// src/store/taskStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskFilter } from '../types/task';

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  
  // 操作
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  
  // 查询
  getFilteredTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: {},
      
      addTask: (task) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date() }
            : task
        )
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      })),
      
      setFilter: (filter) => set({ filter }),
      
      getFilteredTasks: () => {
        const { tasks, filter } = get();
        return tasks.filter(task => {
          if (filter.category && task.category !== filter.category) {
            return false;
          }
          if (filter.completed !== undefined && task.completed !== filter.completed) {
            return false;
          }
          if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            return (
              task.title.toLowerCase().includes(term) ||
              task.description?.toLowerCase().includes(term)
            );
          }
          return true;
        });
      }
    }),
    {
      name: 'task-store'
    }
  )
);
`})}),`
`,n.jsxs(e.h4,{id:"3-组件实现",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-组件实现",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 组件实现"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// src/components/TaskList.tsx
import React from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';

export const TaskList: React.FC = () => {
  const { getFilteredTasks } = useTaskStore();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-4">
      <TaskFilter />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          没有找到任务
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
`})}),`
`,n.jsxs(e.h3,{id:"常见问题和解决方案",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见问题和解决方案",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见问题和解决方案"]}),`
`,n.jsxs(e.h4,{id:"q-如何处理任务的持久化",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何处理任务的持久化",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何处理任务的持久化？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 使用 Zustand 的 ",n.jsx(e.code,{children:"persist"})," 中间件自动保存到 LocalStorage。"]}),`
`,n.jsxs(e.h4,{id:"q-如何实现搜索功能",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何实现搜索功能",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何实现搜索功能？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 在 ",n.jsx(e.code,{children:"getFilteredTasks"})," 中添加搜索逻辑，支持标题和描述的模糊搜索。"]}),`
`,n.jsxs(e.h4,{id:"q-如何测试异步操作",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何测试异步操作",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何测试异步操作？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 使用 ",n.jsx(e.code,{children:"jest.useFakeTimers()"})," 和 ",n.jsx(e.code,{children:"waitFor"})," 来测试异步操作。"]}),`
`,n.jsxs(e.h2,{id:"项目-2博客系统",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目-2博客系统",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目 2：博客系统"]}),`
`,n.jsxs(e.h3,{id:"项目概述-1",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目概述-1",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目概述"]}),`
`,n.jsx(e.p,{children:"构建一个完整的博客系统，包括文章管理、评论系统、标签分类和搜索功能。"}),`
`,n.jsxs(e.h3,{id:"技术栈-1",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#技术栈-1",children:n.jsx(e.span,{className:"icon icon-link"})}),"技术栈"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"前端"}),"：React + TypeScript"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"后端"}),"：Node.js + Express"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"数据库"}),"：MongoDB"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"认证"}),"：JWT"]}),`
`]}),`
`,n.jsxs(e.h3,{id:"核心功能",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#核心功能",children:n.jsx(e.span,{className:"icon icon-link"})}),"核心功能"]}),`
`,n.jsxs(e.h4,{id:"1-文章管理-api",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-文章管理-api",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 文章管理 API"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// backend/routes/articles.ts
import express from 'express';
import { Article } from '../models/Article';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// 获取所有文章
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query;
    
    let query: any = { published: true };
    
    if (tag) {
      query.tags = tag;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const articles = await Article.find(query)
      .limit(limit as number)
      .skip((page as number - 1) * (limit as number))
      .sort({ createdAt: -1 });
    
    const total = await Article.countDocuments(query);
    
    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / (limit as number))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// 创建文章
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content, tags, excerpt } = req.body;
    
    // 验证输入
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const article = new Article({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200),
      tags: tags || [],
      author: req.user.id,
      published: false
    });
    
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// 更新文章
router.put('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    Object.assign(article, req.body);
    await article.save();
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// 删除文章
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await Article.deleteOne({ _id: req.params.id });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;
`})}),`
`,n.jsxs(e.h4,{id:"2-评论系统",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-评论系统",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 评论系统"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// backend/routes/comments.ts
import express from 'express';
import { Comment } from '../models/Comment';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// 获取文章的评论
router.get('/article/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// 添加评论
router.post('/', authenticate, async (req, res) => {
  try {
    const { articleId, content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const comment = new Comment({
      articleId,
      content,
      author: req.user.id
    });
    
    await comment.save();
    await comment.populate('author', 'name avatar');
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// 删除评论
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await Comment.deleteOne({ _id: req.params.id });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;
`})}),`
`,n.jsxs(e.h3,{id:"调试技巧",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#调试技巧",children:n.jsx(e.span,{className:"icon icon-link"})}),"调试技巧"]}),`
`,n.jsxs(e.h4,{id:"1-使用-mongodb-compass",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-使用-mongodb-compass",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 使用 MongoDB Compass"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"连接到本地 MongoDB"}),`
`,n.jsx(e.li,{children:"查看数据库结构"}),`
`,n.jsx(e.li,{children:"执行查询和修改数据"}),`
`]}),`
`,n.jsxs(e.h4,{id:"2-使用-postman-测试-api",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-使用-postman-测试-api",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 使用 Postman 测试 API"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"创建请求集合"}),`
`,n.jsx(e.li,{children:"设置环境变量"}),`
`,n.jsx(e.li,{children:"自动化测试"}),`
`]}),`
`,n.jsxs(e.h4,{id:"3-浏览器开发者工具",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-浏览器开发者工具",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 浏览器开发者工具"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"查看网络请求"}),`
`,n.jsx(e.li,{children:"检查 LocalStorage"}),`
`,n.jsx(e.li,{children:"调试 JavaScript"}),`
`]}),`
`,n.jsxs(e.h2,{id:"项目-3电商平台",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目-3电商平台",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目 3：电商平台"]}),`
`,n.jsxs(e.h3,{id:"项目概述-2",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#项目概述-2",children:n.jsx(e.span,{className:"icon icon-link"})}),"项目概述"]}),`
`,n.jsx(e.p,{children:"构建一个完整的电商平台，包括商品管理、购物车、订单管理和支付功能。"}),`
`,n.jsxs(e.h3,{id:"核心流程",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#核心流程",children:n.jsx(e.span,{className:"icon icon-link"})}),"核心流程"]}),`
`,n.jsxs(e.h4,{id:"1-购物流程",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-购物流程",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 购物流程"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`浏览商品 → 添加到购物车 → 查看购物车 → 结账 → 支付 → 订单确认
`})}),`
`,n.jsxs(e.h4,{id:"2-订单管理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-订单管理",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 订单管理"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 订单状态流转
待支付 → 已支付 → 已发货 → 已收货 → 已完成
  ↓
  已取消
`})}),`
`,n.jsxs(e.h3,{id:"常见问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见问题"]}),`
`,n.jsxs(e.h4,{id:"q-如何处理库存管理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何处理库存管理",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何处理库存管理？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 在创建订单时锁定库存，支付成功后确认扣减，支付失败后释放库存。"]}),`
`,n.jsxs(e.h4,{id:"q-如何实现支付功能",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何实现支付功能",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何实现支付功能？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 集成第三方支付网关（如 Stripe、支付宝），处理支付回调。"]}),`
`,n.jsxs(e.h4,{id:"q-如何处理并发订单",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何处理并发订单",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何处理并发订单？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 使用数据库事务确保库存操作的原子性。"]}),`
`,n.jsxs(e.h2,{id:"调试和优化",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#调试和优化",children:n.jsx(e.span,{className:"icon icon-link"})}),"调试和优化"]}),`
`,n.jsxs(e.h3,{id:"常见问题解决",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见问题解决",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见问题解决"]}),`
`,n.jsxs(e.h4,{id:"问题-1页面加载缓慢",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#问题-1页面加载缓慢",children:n.jsx(e.span,{className:"icon icon-link"})}),"问题 1：页面加载缓慢"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"原因"}),"："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"大量数据加载"}),`
`,n.jsx(e.li,{children:"未优化的查询"}),`
`,n.jsx(e.li,{children:"未压缩的资源"}),`
`]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"解决方案"}),"："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"实现分页"}),`
`,n.jsx(e.li,{children:"添加数据库索引"}),`
`,n.jsx(e.li,{children:"启用 Gzip 压缩"}),`
`]}),`
`,n.jsxs(e.h4,{id:"问题-2内存泄漏",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#问题-2内存泄漏",children:n.jsx(e.span,{className:"icon icon-link"})}),"问题 2：内存泄漏"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"原因"}),"："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"未清理事件监听器"}),`
`,n.jsx(e.li,{children:"未取消定时器"}),`
`,n.jsx(e.li,{children:"循环引用"}),`
`]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"解决方案"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 正确的清理
useEffect(() => {
  const timer = setInterval(() => {
    // ...
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
`})}),`
`,n.jsxs(e.h4,{id:"问题-3并发问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#问题-3并发问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"问题 3：并发问题"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"原因"}),"："]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"竞态条件"}),`
`,n.jsx(e.li,{children:"未同步的状态"}),`
`]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"解决方案"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 使用 AbortController 取消请求
const controller = new AbortController();

fetch('/api/data', { signal: controller.signal })
  .then(r => r.json())
  .catch(e => {
    if (e.name !== 'AbortError') {
      console.error(e);
    }
  });

// 组件卸载时取消请求
return () => controller.abort();
`})}),`
`,n.jsxs(e.h2,{id:"性能优化案例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#性能优化案例",children:n.jsx(e.span,{className:"icon icon-link"})}),"性能优化案例"]}),`
`,n.jsxs(e.h3,{id:"案例-1列表渲染优化",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#案例-1列表渲染优化",children:n.jsx(e.span,{className:"icon icon-link"})}),"案例 1：列表渲染优化"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 优化前：每次都重新渲染所有项
{items.map(item => <Item key={item.id} item={item} />)}

// 优化后：使用虚拟滚动
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <Item style={style} item={items[index]} />
  )}
</FixedSizeList>
`})}),`
`,n.jsxs(e.h3,{id:"案例-2api-调用优化",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#案例-2api-调用优化",children:n.jsx(e.span,{className:"icon icon-link"})}),"案例 2：API 调用优化"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 优化前：每次都调用 API
useEffect(() => {
  fetchData();
}, []);

// 优化后：使用缓存和去重
const cache = useRef(new Map());

const fetchData = useCallback(async (id: string) => {
  if (cache.current.has(id)) {
    return cache.current.get(id);
  }
  
  const data = await api.get(\`/data/\${id}\`);
  cache.current.set(id, data);
  return data;
}, []);
`})}),`
`,n.jsxs(e.h2,{id:"部署和上线",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#部署和上线",children:n.jsx(e.span,{className:"icon icon-link"})}),"部署和上线"]}),`
`,n.jsxs(e.h3,{id:"部署检查清单",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#部署检查清单",children:n.jsx(e.span,{className:"icon icon-link"})}),"部署检查清单"]}),`
`,n.jsxs(e.ul,{className:"contains-task-list",children:[`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","所有测试通过"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","代码审查完成"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","性能指标达到要求"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","安全审计完成"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","文档已更新"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","环境变量已配置"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","备份已创建"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","监控已设置"]}),`
`]}),`
`,n.jsxs(e.h3,{id:"部署流程",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#部署流程",children:n.jsx(e.span,{className:"icon icon-link"})}),"部署流程"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# 1. 构建
npm run build

# 2. 测试
npm run test

# 3. 部署到暂存环境
npm run deploy:staging

# 4. 验证
npm run test:e2e

# 5. 部署到生产环境
npm run deploy:production

# 6. 监控
npm run monitor
`})}),`
`,n.jsxs(e.h2,{id:"下一步",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#下一步",children:n.jsx(e.span,{className:"icon icon-link"})}),"下一步"]}),`
`,n.jsx(e.p,{children:"现在你已经学习了完整的实战项目案例，可以："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"应用这些知识到你自己的项目"}),`
`,n.jsx(e.li,{children:"探索更复杂的场景"}),`
`,n.jsx(e.li,{children:"参与开源项目"}),`
`]}),`
`,n.jsxs(e.h2,{id:"小结",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#小结",children:n.jsx(e.span,{className:"icon icon-link"})}),"小结"]}),`
`,n.jsx(e.p,{children:"通过这些实战项目案例，你学到了："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"✅ 如何设计和实现完整的应用"}),`
`,n.jsx(e.li,{children:"✅ 如何处理常见的技术问题"}),`
`,n.jsx(e.li,{children:"✅ 如何优化性能和用户体验"}),`
`,n.jsx(e.li,{children:"✅ 如何调试和解决问题"}),`
`,n.jsx(e.li,{children:"✅ 如何部署和维护应用"}),`
`]}),`
`,n.jsx(e.p,{children:"记住，实践是最好的学习方式。开始构建你自己的项目，应用这些知识和技巧。"})]})}function t(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}export{t as default};
