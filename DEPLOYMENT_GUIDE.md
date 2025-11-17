# Claude Code 教程 - GitHub Pages 部署指引

本指南将帮助你将项目部署到 GitHub Pages。

## 前置要求

- GitHub 账号（已有 ✓）
- Git 已安装在本地
- Node.js 18+ 已安装
- 项目已在本地成功运行

## 部署步骤

### 第一步：在 GitHub 创建新仓库

1. 访问 [GitHub](https://github.com/new)
2. 填写仓库信息：
   - **Repository name**: `claude-code-tutorial-zh`（或你喜欢的名称）
   - **Description**: Claude Code 中文教程
   - **Public**: 选择公开（GitHub Pages 需要）
   - **Initialize this repository**: 不勾选（我们已有本地代码）
3. 点击 **Create repository**

### 第二步：配置项目的 base 路径

由于部署到 `username.github.io/claude-code-tutorial-zh`，需要配置 base 路径。

编辑 `vite.config.ts`，修改为：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default defineConfig({
  base: '/claude-code-tutorial-zh/',  // 添加这一行，替换为你的仓库名
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }) },
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### 第三步：本地构建测试

在项目根目录运行：

```bash
# 安装依赖（如果还没安装）
npm install

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

如果看到 "Local: http://localhost:4173" 且页面正常显示，说明构建成功。

### 第四步：初始化 Git 仓库并推送代码

在项目根目录执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: Claude Code tutorial"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 第五步：配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 **Deploy from a branch**
   - **Branch**: 选择 **main** 和 **/ (root)**
5. 点击 **Save**

### 第六步：创建部署脚本（可选但推荐）

创建文件 `deploy.sh`，用于快速部署：

```bash
#!/bin/bash

# 构建项目
npm run build

# 进入构建目录
cd dist

# 初始化 git（如果还没有）
git init
git add -A
git commit -m "Deploy: $(date)"

# 推送到 gh-pages 分支
git push -f https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git main:gh-pages

# 返回项目根目录
cd ..

echo "✅ 部署完成！访问 https://YOUR_USERNAME.github.io/claude-code-tutorial-zh"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

### 第七步：验证部署

1. 等待 2-5 分钟
2. 访问 `https://YOUR_USERNAME.github.io/claude-code-tutorial-zh`
3. 如果看到教程首页，说明部署成功！

## 常见问题

### Q1: 部署后页面显示 404

**原因**: 可能是 base 路径配置错误或分支设置不对

**解决**:
1. 检查 `vite.config.ts` 中的 base 路径是否正确
2. 检查 GitHub Pages 设置中的分支是否为 `main`
3. 清除浏览器缓存后重新访问

### Q2: 样式没有加载

**原因**: base 路径配置不正确导致资源路径错误

**解决**:
1. 确保 `vite.config.ts` 中的 base 路径以 `/` 开头和结尾
2. 重新构建：`npm run build`
3. 重新推送代码

### Q3: 路由不工作（页面刷新后 404）

**原因**: GitHub Pages 不支持 SPA 路由

**解决方案 A**: 使用 hash 路由（修改 `src/main.tsx`）

```typescript
import { BrowserRouter } from 'react-router-dom'

// 改为
import { HashRouter } from 'react-router-dom'

// 在 App 中使用 HashRouter 替代 BrowserRouter
```

**解决方案 B**: 添加 404 重定向（推荐）

创建 `public/404.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

然后在 `src/main.tsx` 中处理重定向：

```typescript
// 在 App 组件中添加
useEffect(() => {
  if (window.location.pathname.includes('/?/')) {
    const path = window.location.pathname.split('/?/')[1];
    window.history.replaceState(null, '', '/' + path);
  }
}, []);
```

### Q4: 如何更新已部署的内容？

**步骤**:
```bash
# 1. 修改代码
# 2. 提交到 Git
git add .
git commit -m "Update: 描述你的更改"

# 3. 推送到 GitHub
git push origin main

# 4. GitHub Pages 会自动重新部署（通常 1-2 分钟）
```

### Q5: 如何使用自定义域名？

1. 在 GitHub 仓库 Settings > Pages 中
2. 在 **Custom domain** 输入你的域名
3. 在你的域名 DNS 设置中添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
4. 等待 DNS 生效（通常 24 小时内）

## 快速参考

| 操作 | 命令 |
|------|------|
| 本地开发 | `npm run dev` |
| 构建生产版本 | `npm run build` |
| 预览构建结果 | `npm run preview` |
| 代码检查 | `npm run lint` |
| 代码格式化 | `npm run format` |

## 部署检查清单

- [ ] 已创建 GitHub 仓库
- [ ] 已修改 `vite.config.ts` 中的 base 路径
- [ ] 已本地构建并测试（`npm run build && npm run preview`）
- [ ] 已推送代码到 GitHub
- [ ] 已在 GitHub Pages 设置中选择 main 分支
- [ ] 已等待 2-5 分钟让 GitHub 部署
- [ ] 已访问部署地址验证成功

## 需要帮助？

如果遇到问题，请检查：
1. GitHub 仓库的 Actions 标签，查看部署日志
2. 浏览器开发者工具的 Console 标签，查看错误信息
3. 确保所有文件都已正确推送到 GitHub

## 下一步

部署成功后，你可以：
- 添加自定义域名
- 配置自动部署（GitHub Actions）
- 添加 CI/CD 流程
- 设置分支保护规则

祝部署顺利！🚀
