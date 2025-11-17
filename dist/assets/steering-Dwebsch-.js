import{j as n}from"./index-BQaKkhZN.js";function i(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",input:"input",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h1,{id:"steering-配置指南",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#steering-配置指南",children:n.jsx(e.span,{className:"icon icon-link"})}),"Steering 配置指南"]}),`
`,n.jsx(e.p,{children:"Steering 是 Claude Code 的一个高级功能，它允许你为团队定制 AI 的行为、建议和输出。通过 Steering，你可以确保 AI 遵循团队的编码规范、最佳实践和项目特定的要求。"}),`
`,n.jsxs(e.h2,{id:"什么是-steering",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#什么是-steering",children:n.jsx(e.span,{className:"icon icon-link"})}),"什么是 Steering？"]}),`
`,n.jsx(e.p,{children:"Steering 是一组配置规则，用于指导 Claude Code 的 AI 如何理解和响应你的请求。它包括："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"编码规范"}),"：命名约定、代码风格、项目结构"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"最佳实践"}),"：设计模式、性能优化、安全性要求"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"项目特定规则"}),"：技术栈、依赖项、特殊要求"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"团队指南"}),"：沟通风格、文档标准、审查流程"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"steering-的优势",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#steering-的优势",children:n.jsx(e.span,{className:"icon icon-link"})}),"Steering 的优势"]}),`
`,n.jsxs(e.h3,{id:"1-一致的代码风格",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-一致的代码风格",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 一致的代码风格"]}),`
`,n.jsx(e.p,{children:"确保 AI 生成的代码与团队的编码规范一致。"}),`
`,n.jsxs(e.h3,{id:"2-更好的建议",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-更好的建议",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 更好的建议"]}),`
`,n.jsx(e.p,{children:"AI 能够理解团队的特定需求和偏好，提供更相关的建议。"}),`
`,n.jsxs(e.h3,{id:"3-知识共享",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-知识共享",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 知识共享"]}),`
`,n.jsx(e.p,{children:"将团队的最佳实践和经验编码到 Steering 中，新成员可以快速学习。"}),`
`,n.jsxs(e.h3,{id:"4-自动化合规性",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-自动化合规性",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 自动化合规性"]}),`
`,n.jsx(e.p,{children:"确保所有代码都遵循团队的规范和最佳实践。"}),`
`,n.jsxs(e.h2,{id:"创建-steering-文件",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#创建-steering-文件",children:n.jsx(e.span,{className:"icon icon-link"})}),"创建 Steering 文件"]}),`
`,n.jsxs(e.h3,{id:"基本结构",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#基本结构",children:n.jsx(e.span,{className:"icon icon-link"})}),"基本结构"]}),`
`,n.jsxs(e.p,{children:["Steering 文件位于 ",n.jsx(e.code,{children:".kiro/steering/"})," 目录中，使用 Markdown 格式："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-markdown",children:`---
inclusion: always  # always, fileMatch, manual
fileMatchPattern: "src/**/*.ts"  # 可选，用于 fileMatch
---

# 团队编码规范

## 命名约定

- 变量和函数：camelCase
- 类和接口：PascalCase
- 常量：UPPER_SNAKE_CASE
- 文件名：kebab-case（除了组件）

## 代码风格

- 使用 2 个空格缩进
- 行长度限制：100 字符
- 使用分号
- 使用单引号

## 最佳实践

- 始终添加类型注解
- 编写单元测试
- 添加 JSDoc 注释
`})}),`
`,n.jsxs(e.h3,{id:"实际示例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#实际示例",children:n.jsx(e.span,{className:"icon icon-link"})}),"实际示例"]}),`
`,n.jsx(e.p,{children:"让我们创建一个完整的 Steering 文件："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-markdown",children:`---
inclusion: always
---

# 我们的编码规范

## 项目概述

这是一个 React + TypeScript 的前端项目。我们遵循以下规范来确保代码质量和一致性。

## 技术栈

- **框架**：React 18+
- **语言**：TypeScript 5+
- **样式**：Tailwind CSS
- **状态管理**：Zustand
- **测试**：Jest + React Testing Library
- **构建工具**：Vite

## 命名约定

### 文件和文件夹

- 组件文件：PascalCase（\`UserProfile.tsx\`）
- 工具函数：camelCase（\`formatDate.ts\`）
- 样式文件：kebab-case（\`user-profile.css\`）
- 测试文件：\`*.test.ts\` 或 \`*.spec.ts\`
- 文件夹：kebab-case（\`user-profile/\`）

### 代码

- 变量和函数：camelCase
- 类和接口：PascalCase
- 常量：UPPER_SNAKE_CASE
- 私有属性：前缀 \`_\`
- 布尔变量：前缀 \`is\`, \`has\`, \`can\`

### 示例

\`\`\`typescript
// ✅ 好的命名
const MAX_RETRIES = 3;
const isLoading = false;
const getUserById = (id: string) => { ... };
interface UserProfile { ... }
class UserService { ... }

// ❌ 不好的命名
const max_retries = 3;
const loading = false;
const get_user_by_id = (id: string) => { ... };
interface userProfile { ... }
class userService { ... }
`})}),`
`,n.jsxs(e.h2,{id:"代码风格",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#代码风格",children:n.jsx(e.span,{className:"icon icon-link"})}),"代码风格"]}),`
`,n.jsxs(e.h3,{id:"缩进和格式",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#缩进和格式",children:n.jsx(e.span,{className:"icon icon-link"})}),"缩进和格式"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"使用 2 个空格缩进（不使用 Tab）"}),`
`,n.jsx(e.li,{children:"行长度限制：100 字符"}),`
`,n.jsx(e.li,{children:"使用分号"}),`
`,n.jsx(e.li,{children:"使用单引号（字符串）"}),`
`,n.jsx(e.li,{children:"使用双引号（JSX 属性）"}),`
`]}),`
`,n.jsxs(e.h3,{id:"导入顺序",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#导入顺序",children:n.jsx(e.span,{className:"icon icon-link"})}),"导入顺序"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// 1. 外部库
import React from 'react';
import { useEffect } from 'react';

// 2. 内部模块
import { UserService } from '@/services';
import { useUserStore } from '@/store';

// 3. 组件
import { UserCard } from '@/components';

// 4. 样式
import styles from './User.module.css';
`})}),`
`,n.jsxs(e.h3,{id:"类型注解",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#类型注解",children:n.jsx(e.span,{className:"icon icon-link"})}),"类型注解"]}),`
`,n.jsx(e.p,{children:"始终为函数参数和返回值添加类型注解："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 好的
function getUserById(id: string): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}

// ❌ 不好的
function getUserById(id) {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}
`})}),`
`,n.jsxs(e.h2,{id:"react-组件规范",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#react-组件规范",children:n.jsx(e.span,{className:"icon icon-link"})}),"React 组件规范"]}),`
`,n.jsxs(e.h3,{id:"组件结构",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#组件结构",children:n.jsx(e.span,{className:"icon icon-link"})}),"组件结构"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`import React, { FC, useState } from 'react';
import styles from './UserProfile.module.css';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

/**
 * 用户资料组件
 * 
 * @param userId - 用户 ID
 * @param onUpdate - 用户更新时的回调
 */
export const UserProfile: FC<UserProfileProps> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 逻辑代码

  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
};
`})}),`
`,n.jsxs(e.h3,{id:"组件最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#组件最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"组件最佳实践"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"使用函数组件和 Hooks"}),`
`,n.jsx(e.li,{children:"使用 TypeScript 接口定义 Props"}),`
`,n.jsx(e.li,{children:"添加 JSDoc 注释"}),`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"FC"})," 类型注解"]}),`
`,n.jsx(e.li,{children:"避免内联样式，使用 CSS 模块或 Tailwind"}),`
`,n.jsx(e.li,{children:"提取复杂逻辑到自定义 Hooks"}),`
`]}),`
`,n.jsxs(e.h2,{id:"测试规范",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#测试规范",children:n.jsx(e.span,{className:"icon icon-link"})}),"测试规范"]}),`
`,n.jsxs(e.h3,{id:"测试文件位置",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#测试文件位置",children:n.jsx(e.span,{className:"icon icon-link"})}),"测试文件位置"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["单元测试：",n.jsx(e.code,{children:"src/__tests__/"})," 或 ",n.jsx(e.code,{children:"src/**/*.test.ts"})]}),`
`,n.jsxs(e.li,{children:["集成测试：",n.jsx(e.code,{children:"src/__tests__/integration/"})]}),`
`,n.jsxs(e.li,{children:["端到端测试：",n.jsx(e.code,{children:"e2e/"})]}),`
`]}),`
`,n.jsxs(e.h3,{id:"测试覆盖率",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#测试覆盖率",children:n.jsx(e.span,{className:"icon icon-link"})}),"测试覆盖率"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"最小覆盖率：80%"}),`
`,n.jsx(e.li,{children:"关键路径：100%"}),`
`,n.jsx(e.li,{children:"工具函数：100%"}),`
`]}),`
`,n.jsxs(e.h3,{id:"测试示例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#测试示例",children:n.jsx(e.span,{className:"icon icon-link"})}),"测试示例"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should render user name', () => {
    const mockUser = { id: '1', name: 'Alice' };
    render(<UserProfile userId="1" />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('should call onUpdate when user is updated', () => {
    const onUpdate = jest.fn();
    render(<UserProfile userId="1" onUpdate={onUpdate} />);
    
    // 触发更新
    // 验证 onUpdate 被调用
    expect(onUpdate).toHaveBeenCalled();
  });
});
`})}),`
`,n.jsxs(e.h2,{id:"文档规范",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#文档规范",children:n.jsx(e.span,{className:"icon icon-link"})}),"文档规范"]}),`
`,n.jsxs(e.h3,{id:"jsdoc-注释",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#jsdoc-注释",children:n.jsx(e.span,{className:"icon icon-link"})}),"JSDoc 注释"]}),`
`,n.jsx(e.p,{children:"为所有导出的函数、类和接口添加 JSDoc 注释："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`/**
 * 获取用户信息
 * 
 * @param userId - 用户 ID
 * @returns 用户对象
 * @throws 如果用户不存在
 * 
 * @example
 * const user = await getUser('123');
 */
export async function getUser(userId: string): Promise<User> {
  // ...
}
`})}),`
`,n.jsxs(e.h3,{id:"readme-文档",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#readme-文档",children:n.jsx(e.span,{className:"icon icon-link"})}),"README 文档"]}),`
`,n.jsx(e.p,{children:"每个主要模块应该有 README 文件，包含："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"模块的目的"}),`
`,n.jsx(e.li,{children:"主要功能"}),`
`,n.jsx(e.li,{children:"使用示例"}),`
`,n.jsx(e.li,{children:"API 文档"}),`
`]}),`
`,n.jsxs(e.h2,{id:"性能指南",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#性能指南",children:n.jsx(e.span,{className:"icon icon-link"})}),"性能指南"]}),`
`,n.jsxs(e.h3,{id:"优化建议",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#优化建议",children:n.jsx(e.span,{className:"icon icon-link"})}),"优化建议"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"使用 React.memo 避免不必要的重新渲染"}),`
`,n.jsx(e.li,{children:"使用 useMemo 和 useCallback 优化性能"}),`
`,n.jsx(e.li,{children:"代码分割和懒加载"}),`
`,n.jsx(e.li,{children:"图片优化和压缩"}),`
`,n.jsx(e.li,{children:"避免在渲染中创建新对象"}),`
`]}),`
`,n.jsxs(e.h3,{id:"性能指标",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#性能指标",children:n.jsx(e.span,{className:"icon icon-link"})}),"性能指标"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"首屏加载时间：< 3 秒"}),`
`,n.jsx(e.li,{children:"交互时间：< 100ms"}),`
`,n.jsx(e.li,{children:"最大内容绘制：< 2.5 秒"}),`
`]}),`
`,n.jsxs(e.h2,{id:"安全性指南",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#安全性指南",children:n.jsx(e.span,{className:"icon icon-link"})}),"安全性指南"]}),`
`,n.jsxs(e.h3,{id:"常见安全问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见安全问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见安全问题"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["避免 XSS 攻击：不要使用 ",n.jsx(e.code,{children:"dangerouslySetInnerHTML"})]}),`
`,n.jsx(e.li,{children:"避免 CSRF 攻击：使用 CSRF 令牌"}),`
`,n.jsx(e.li,{children:"验证用户输入"}),`
`,n.jsx(e.li,{children:"不要在代码中硬编码敏感信息"}),`
`,n.jsx(e.li,{children:"使用 HTTPS"}),`
`]}),`
`,n.jsxs(e.h3,{id:"安全检查清单",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#安全检查清单",children:n.jsx(e.span,{className:"icon icon-link"})}),"安全检查清单"]}),`
`,n.jsxs(e.ul,{className:"contains-task-list",children:[`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","所有用户输入都已验证"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","敏感数据已加密"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","没有硬编码的密钥或令牌"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","依赖项已更新到最新版本"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","已运行安全审计工具"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"提交和审查流程",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#提交和审查流程",children:n.jsx(e.span,{className:"icon icon-link"})}),"提交和审查流程"]}),`
`,n.jsxs(e.h3,{id:"提交消息格式",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#提交消息格式",children:n.jsx(e.span,{className:"icon icon-link"})}),"提交消息格式"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`<type>(<scope>): <subject>

<body>

<footer>
`})}),`
`,n.jsx(e.p,{children:"类型："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"feat"}),": 新功能"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"fix"}),": 修复 bug"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"docs"}),": 文档更新"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"style"}),": 代码风格"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"refactor"}),": 代码重构"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"test"}),": 测试"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"chore"}),": 构建、依赖等"]}),`
`]}),`
`,n.jsxs(e.h3,{id:"示例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#示例",children:n.jsx(e.span,{className:"icon icon-link"})}),"示例"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`feat(user): add user profile page

- Create UserProfile component
- Add user data fetching
- Implement edit functionality

Closes #123
`})}),`
`,n.jsxs(e.h3,{id:"代码审查清单",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#代码审查清单",children:n.jsx(e.span,{className:"icon icon-link"})}),"代码审查清单"]}),`
`,n.jsxs(e.ul,{className:"contains-task-list",children:[`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","代码遵循命名约定"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","添加了必要的类型注解"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","包含单元测试"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","添加了 JSDoc 注释"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","没有控制台日志"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","性能符合要求"]}),`
`,n.jsxs(e.li,{className:"task-list-item",children:[n.jsx(e.input,{type:"checkbox",disabled:!0})," ","没有安全问题"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"常见问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见问题"]}),`
`,n.jsxs(e.h3,{id:"q-如何在项目中应用-steering",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何在项目中应用-steering",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何在项目中应用 Steering？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 将 Steering 文件放在 ",n.jsx(e.code,{children:".kiro/steering/"})," 目录中，Claude Code 会自动应用这些规则。"]}),`
`,n.jsxs(e.h3,{id:"q-可以有多个-steering-文件吗",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-可以有多个-steering-文件吗",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 可以有多个 Steering 文件吗？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 可以。你可以为不同的文件类型或模块创建不同的 Steering 文件。"]}),`
`,n.jsxs(e.h3,{id:"q-如何更新-steering-规则",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何更新-steering-规则",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何更新 Steering 规则？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 编辑 ",n.jsx(e.code,{children:".kiro/steering/"})," 中的文件，Claude Code 会自动重新加载规则。"]}),`
`,n.jsxs(e.h3,{id:"q-steering-会强制执行吗",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-steering-会强制执行吗",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: Steering 会强制执行吗？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," Steering 是指导性的，不是强制性的。AI 会尽力遵循规则，但最终的决定权在你。"]}),`
`,n.jsxs(e.h2,{id:"下一步",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#下一步",children:n.jsx(e.span,{className:"icon icon-link"})}),"下一步"]}),`
`,n.jsx(e.p,{children:"现在你已经了解了 Steering 配置，可以继续学习："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/03-advanced/mcp",children:"MCP 集成"})," - 连接外部工具和服务"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/04-mastery/best-practices",children:"最佳实践"})," - 深入了解编程最佳实践"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"小结",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#小结",children:n.jsx(e.span,{className:"icon icon-link"})}),"小结"]}),`
`,n.jsx(e.p,{children:"Steering 是一个强大的工具，可以帮助你："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"✅ 确保代码一致性"}),`
`,n.jsx(e.li,{children:"✅ 传播团队最佳实践"}),`
`,n.jsx(e.li,{children:"✅ 提高代码质量"}),`
`,n.jsx(e.li,{children:"✅ 加快新成员的学习"}),`
`,n.jsx(e.li,{children:"✅ 自动化合规性检查"}),`
`]}),`
`,n.jsx(e.p,{children:"通过有效使用 Steering，你可以创建一个高质量、一致的代码库。"})]})}function c(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{c as default};
