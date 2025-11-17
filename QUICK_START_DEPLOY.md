# 🚀 快速部署指南（5 分钟版）

## 前置条件
- ✅ GitHub 账号
- ✅ Git 已安装
- ✅ Node.js 18+ 已安装

## 快速步骤

### 1️⃣ 创建 GitHub 仓库
访问 https://github.com/new，创建新仓库：
- 名称：`claude-code-tutorial-zh`
- 选择 **Public**
- 不初始化任何文件

### 2️⃣ 配置项目（重要！）

编辑 `vite.config.ts`，在 `defineConfig` 中添加 `base` 配置：

```typescript
export default defineConfig({
  base: '/claude-code-tutorial-zh/',  // ← 添加这一行
  plugins: [
    // ... 其他配置
  ],
})
```

### 3️⃣ 本地测试

```bash
npm install
npm run build
npm run preview
```

访问 http://localhost:4173，确保页面正常显示。

### 4️⃣ 推送代码到 GitHub

```bash
# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git

# 推送代码
git branch -M main
git push -u origin main
```

### 5️⃣ 启用 GitHub Pages

1. 进入仓库 → **Settings** → **Pages**
2. **Source** 选择 **Deploy from a branch**
3. **Branch** 选择 **main** 和 **/ (root)**
4. 点击 **Save**

### 6️⃣ 等待部署完成

等待 2-5 分钟，然后访问：
```
https://YOUR_USERNAME.github.io/claude-code-tutorial-zh
```

## 使用部署脚本（可选）

### macOS/Linux
```bash
chmod +x deploy.sh
./deploy.sh
```

### Windows
```bash
deploy.bat
```

## 常见问题速查

| 问题 | 解决方案 |
|------|--------|
| 页面 404 | 检查 `vite.config.ts` 的 base 路径 |
| 样式丢失 | 清除浏览器缓存，重新访问 |
| 路由不工作 | 已配置 404.html，应该可以工作 |
| 部署失败 | 检查 GitHub Pages 设置中的分支 |

## 更新已部署的内容

```bash
# 修改代码后
git add .
git commit -m "Update: 描述"
git push origin main

# GitHub Pages 会自动重新部署（1-2 分钟）
```

## 需要详细帮助？

查看 `DEPLOYMENT_GUIDE.md` 获取完整指南。

---

**祝部署顺利！** 🎉
