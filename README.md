# Claude Code 中文教程

从零开始学习 Claude Code 的完整中文教程。

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Router** - 路由管理
- **Zustand** - 状态管理
- **MDX** - 内容管理
- **ESLint & Prettier** - 代码规范

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 部署到 GitHub Pages

查看以下文档获取详细部署指引：

- **[快速部署指南](./QUICK_START_DEPLOY.md)** - 5 分钟快速部署
- **[完整部署指南](./DEPLOYMENT_GUIDE.md)** - 详细步骤和常见问题
- **[部署检查清单](./DEPLOYMENT_CHECKLIST.md)** - 部署前检查清单

**快速命令**（macOS/Linux）：
```bash
chmod +x deploy.sh
./deploy.sh
```

**快速命令**（Windows）：
```bash
deploy.bat
```

## 项目结构

```
src/
├── components/       # React 组件
│   ├── layout/      # 布局组件
│   ├── content/     # 内容展示组件
│   ├── interactive/ # 交互组件
│   ├── navigation/  # 导航组件
│   └── ui/          # 基础 UI 组件
├── pages/           # 页面组件
├── content/         # MDX 教程内容
│   ├── 01-getting-started/
│   ├── 02-basics/
│   ├── 03-advanced/
│   └── 04-mastery/
├── store/           # Zustand 状态管理
├── utils/           # 工具函数
├── types/           # TypeScript 类型定义
└── config/          # 配置文件
```

## 许可证

MIT
