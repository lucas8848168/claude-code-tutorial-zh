# 📘 手动部署到 GitHub Pages 指南

本指南将帮助你**手动部署**项目到 GitHub Pages，不使用自动部署。

## 📋 需要上传的文件和文件夹

### ✅ 需要上传

```
claude-code-tutorial-zh/
├── src/                    ← 所有源代码
├── public/                 ← 公共资源
├── scripts/                ← 构建脚本
├── package.json            ← 依赖配置
├── package-lock.json       ← 依赖锁定
├── vite.config.ts          ← Vite 配置
├── tsconfig.json           ← TypeScript 配置
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js      ← Tailwind 配置
├── postcss.config.js       ← PostCSS 配置
├── eslint.config.js        ← ESLint 配置
├── index.html              ← 入口 HTML
├── README.md               ← 项目说明
└── .gitignore              ← Git 忽略文件
```

### ❌ 不需要上传

这些文件夹已在 `.gitignore` 中，Git 会自动忽略：

```
node_modules/               ← 依赖包（太大，GitHub 会自动安装）
dist/                       ← 构建产物（会在 GitHub 上构建）
.DS_Store                   ← macOS 系统文件
```

---

## 🚀 部署步骤（7 步）

### 第 1 步：在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `claude-code-tutorial-zh`
   - **Description**: Claude Code 中文教程
   - **Public**: 选择公开
   - **不要**勾选任何初始化选项（README、.gitignore、license）
3. 点击 **Create repository**

---

### 第 2 步：检查 .gitignore 文件

在项目根目录运行：

```bash
cat .gitignore
```

确保包含以下内容：

```
node_modules
dist
.DS_Store
```

如果没有，创建 `.gitignore` 文件并添加以上内容。

---

### 第 3 步：初始化 Git 并提交代码

在项目根目录（`claude-code-tutorial-zh`）运行：

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 查看将要提交的文件（可选）
git status

# 提交代码
git commit -m "Initial commit: Claude Code tutorial"
```

**预期输出**：
```
[main (root-commit) abc1234] Initial commit: Claude Code tutorial
 150 files changed, 15000 insertions(+)
 create mode 100644 package.json
 create mode 100644 src/main.tsx
 ...
```

---

### 第 4 步：连接到 GitHub 仓库

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git

# 设置主分支名称
git branch -M main
```

**验证连接**：
```bash
git remote -v
```

应该显示：
```
origin  https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git (fetch)
origin  https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git (push)
```

---

### 第 5 步：推送代码到 GitHub

```bash
# 推送到 GitHub
git push -u origin main
```

**如果需要输入凭据**：
- **用户名**：你的 GitHub 用户名
- **密码**：使用 **Personal Access Token**（不是密码）

**如何获取 Personal Access Token**：
1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 勾选 **repo** 权限
4. 点击 **Generate token**
5. 复制生成的 token（只显示一次）
6. 在命令行粘贴 token 作为密码

**预期输出**：
```
Enumerating objects: 200, done.
Counting objects: 100% (200/200), done.
...
To https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

### 第 6 步：在 GitHub 启用 Pages（手动部署）

#### 6.1 进入 Pages 设置

1. 进入你的仓库：`https://github.com/YOUR_USERNAME/claude-code-tutorial-zh`
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**

#### 6.2 配置部署方式

在 **Build and deployment** 部分：
- **Source**: 选择 **GitHub Actions**（不是 Deploy from a branch）

#### 6.3 创建部署工作流

1. 点击 **Configure** 按钮（在 Static HTML 旁边）
2. 会打开一个 YAML 编辑器
3. **删除所有默认内容**
4. 粘贴以下配置：

```yaml
name: Deploy to GitHub Pages

on:
  workflow_dispatch:  # 手动触发，不自动部署

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. 点击右上角的 **Commit changes**
6. 在弹出的对话框中：
   - 选择 **Commit directly to the main branch**
   - 点击 **Commit changes**

---

### 第 7 步：手动触发部署

#### 7.1 进入 Actions 页面

1. 进入仓库的 **Actions** 标签
2. 左侧选择 **Deploy to GitHub Pages**

#### 7.2 运行工作流

1. 点击右侧的 **Run workflow** 按钮
2. 在弹出的对话框中：
   - **Use workflow from**: 选择 **Branch: main**
3. 点击绿色的 **Run workflow** 按钮

#### 7.3 等待部署完成

1. 页面会刷新，显示一个黄色的运行中状态
2. 点击工作流名称查看详细进度
3. 等待 2-5 分钟，直到显示绿色的 ✓ 标记

#### 7.4 访问部署地址

部署完成后，访问：
```
https://YOUR_USERNAME.github.io/claude-code-tutorial-zh
```

如果看到教程首页，说明部署成功！🎉

---

## 📊 上传文件统计

运行以下命令查看将要上传的文件：

```bash
cd claude-code-tutorial-zh
git ls-files | wc -l
```

大约会上传 **100-200 个文件**（不包括 node_modules 和 dist）。

查看文件大小：

```bash
du -sh .git
```

大约 **5-10 MB**（不包括 node_modules）。

---

## 🔄 后续更新流程

每次修改代码后，按以下步骤更新部署：

### 步骤 1：提交更改

```bash
# 查看修改的文件
git status

# 添加所有修改
git add .

# 提交更改
git commit -m "Update: 描述你的更改"
```

### 步骤 2：推送到 GitHub

```bash
git push origin main
```

### 步骤 3：手动触发部署

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签
3. 选择 **Deploy to GitHub Pages**
4. 点击 **Run workflow**
5. 选择 **Branch: main**
6. 点击 **Run workflow**
7. 等待 2-5 分钟

### 步骤 4：验证更新

访问 `https://YOUR_USERNAME.github.io/claude-code-tutorial-zh`，刷新页面查看更新。

---

## ✅ 部署检查清单

部署前检查：

- [ ] 已创建 GitHub 仓库
- [ ] 已检查 `.gitignore` 文件
- [ ] 已初始化 Git 并提交代码
- [ ] 已添加远程仓库
- [ ] 已推送代码到 GitHub
- [ ] 已在 GitHub Pages 设置中选择 GitHub Actions
- [ ] 已创建部署工作流文件
- [ ] 已手动触发部署

部署后验证：

- [ ] Actions 工作流运行成功（绿色 ✓）
- [ ] 访问部署地址能看到首页
- [ ] 页面样式正常显示
- [ ] 导航链接可以点击
- [ ] 主题切换功能正常

---

## ❓ 常见问题

### Q1: 推送代码时提示 "Permission denied"

**原因**：没有权限或使用了错误的凭据

**解决**：
1. 确保使用 Personal Access Token 而不是密码
2. 检查 Token 是否有 `repo` 权限
3. 重新生成 Token：https://github.com/settings/tokens

### Q2: 部署失败，显示 "Build failed"

**原因**：构建过程中出现错误

**解决**：
1. 点击失败的工作流查看详细日志
2. 检查是否有 TypeScript 错误
3. 本地运行 `npm run build` 测试
4. 修复错误后重新推送代码

### Q3: 访问部署地址显示 404

**原因**：可能是 base 路径配置错误或部署未完成

**解决**：
1. 检查 `vite.config.ts` 中的 base 路径是否正确
2. 确保工作流运行成功（绿色 ✓）
3. 等待 5 分钟后重新访问
4. 清除浏览器缓存

### Q4: 页面样式丢失

**原因**：base 路径配置错误

**解决**：
1. 检查 `vite.config.ts`：
   ```typescript
   base: process.env.NODE_ENV === 'production' 
     ? '/claude-code-tutorial-zh/' 
     : '/',
   ```
2. 确保仓库名与 base 路径一致
3. 重新构建和部署

### Q5: 如何删除部署？

**步骤**：
1. 进入仓库 Settings → Pages
2. 点击 **Remove** 按钮
3. 确认删除

---

## 📞 获取帮助

如果遇到问题：

1. **查看 Actions 日志**
   - GitHub 仓库 → Actions → 点击失败的工作流
   - 查看详细的错误信息

2. **本地测试**
   ```bash
   npm run build
   npm run preview
   ```
   确保本地构建成功

3. **检查配置**
   - `vite.config.ts` 的 base 路径
   - `.gitignore` 文件
   - GitHub Pages 设置

---

## 🎯 下一步

部署成功后，你可以：

1. **分享你的网站**
   - 分享部署链接给朋友
   - 在社交媒体上宣传

2. **添加更多内容**
   - 在 `src/content/` 添加新的 MDX 文件
   - 在 `src/config/chapters.ts` 注册新章节
   - 提交并推送代码
   - 手动触发部署

3. **配置自定义域名**（可选）
   - 在 GitHub Pages 设置中添加自定义域名
   - 在域名 DNS 设置中添加 CNAME 记录

4. **监控访问量**
   - 使用 Google Analytics
   - 使用 GitHub Insights

---

## 📚 相关文档

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Git 基础教程](https://git-scm.com/book/zh/v2)

---

## 🎉 恭喜！

你已经成功完成手动部署！

现在你的 Claude Code 教程已经在线上了：
```
https://YOUR_USERNAME.github.io/claude-code-tutorial-zh
```

每次想要更新内容时，只需：
1. 修改代码
2. 提交并推送到 GitHub
3. 手动触发部署

就这么简单！🚀

---

**祝你使用愉快！** 如有问题，随时查看本文档。
