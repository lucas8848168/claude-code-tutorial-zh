# 🚀 从这里开始 - GitHub Pages 部署指南

欢迎！本项目已为 GitHub Pages 部署做好了完整准备。

## ⚡ 30 秒快速开始

1. **编辑 `vite.config.ts`**，添加一行代码：
   ```typescript
   base: '/claude-code-tutorial-zh/',
   ```

2. **运行部署脚本**：
   ```bash
   # macOS/Linux
   chmod +x deploy.sh && ./deploy.sh
   
   # Windows
   deploy.bat
   ```

3. **等待 2-5 分钟**，然后访问：
   ```
   https://YOUR_USERNAME.github.io/claude-code-tutorial-zh
   ```

**就这么简单！** ✨

---

## 📚 选择你的学习路径

### 🏃 我很着急（5 分钟）
→ 打开 [`QUICK_START_DEPLOY.md`](./QUICK_START_DEPLOY.md)

### 📖 我想要详细指南（20 分钟）
→ 打开 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)

### ✓ 我想要检查清单（10 分钟）
→ 打开 [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)

### 🎯 我想要快速参考卡片（可打印）
→ 打开 [`DEPLOY_QUICK_REFERENCE.txt`](./DEPLOY_QUICK_REFERENCE.txt)

### 🗂️ 我想要完整的文档导航
→ 打开 [`DEPLOYMENT_INDEX.md`](./DEPLOYMENT_INDEX.md)

---

## 📦 已为你准备的文件

### 📄 部署文档（6 个）
- ✅ `QUICK_START_DEPLOY.md` - 5 分钟快速部署
- ✅ `DEPLOYMENT_GUIDE.md` - 完整部署指南
- ✅ `DEPLOYMENT_CHECKLIST.md` - 部署检查清单
- ✅ `DEPLOYMENT_SUMMARY.md` - 文档总结
- ✅ `DEPLOYMENT_INDEX.md` - 文档导航
- ✅ `DEPLOY_QUICK_REFERENCE.txt` - 快速参考卡片

### 🛠️ 部署工具（3 个）
- ✅ `deploy.sh` - macOS/Linux 一键部署
- ✅ `deploy.bat` - Windows 一键部署
- ✅ `.github/workflows/deploy.yml` - GitHub Actions 自动部署

### ⚙️ 配置文件（2 个）
- ✅ `public/404.html` - SPA 路由处理（已创建）
- ⚠️ `vite.config.ts` - 需要添加 base 路径

---

## 🎯 部署步骤概览

```
┌─────────────────────────────────────────────────────────┐
│ 1️⃣  修改 vite.config.ts 添加 base 路径                  │
│     base: '/claude-code-tutorial-zh/'                   │
│                                                         │
│ 2️⃣  本地测试                                            │
│     npm install && npm run build && npm run preview     │
│                                                         │
│ 3️⃣  创建 GitHub 仓库                                    │
│     https://github.com/new                             │
│                                                         │
│ 4️⃣  推送代码到 GitHub                                   │
│     git init && git add . && git commit && git push     │
│                                                         │
│ 5️⃣  启用 GitHub Pages                                  │
│     Settings → Pages → Deploy from a branch            │
│                                                         │
│ 6️⃣  等待 2-5 分钟                                      │
│                                                         │
│ 7️⃣  访问部署地址验证                                    │
│     https://YOUR_USERNAME.github.io/claude-code-...    │
│                                                         │
│ ✅ 部署完成！                                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 三种部署方式

### 方式 1️⃣：最快（推荐新手）
```bash
# 一键部署脚本
chmod +x deploy.sh && ./deploy.sh  # macOS/Linux
deploy.bat                          # Windows
```

### 方式 2️⃣：手动部署（推荐学习）
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git
git push -u origin main
# 然后在 GitHub 设置 Pages
```

### 方式 3️⃣：自动部署（推荐频繁更新）
- 已配置 GitHub Actions
- 每次推送到 main 分支时自动部署
- 无需本地操作

---

## ⚠️ 重要提醒

### 必须修改的文件
**`vite.config.ts`** - 添加 base 路径

```typescript
export default defineConfig({
  base: '/claude-code-tutorial-zh/',  // ← 添加这一行
  plugins: [
    // ... 其他配置
  ],
})
```

**为什么？** GitHub Pages 将项目部署在 `username.github.io/repo-name/` 下，所有资源路径都需要加上 `/repo-name/` 前缀。

### 已为你创建的文件
- ✅ `public/404.html` - 处理 SPA 路由问题
- ✅ `.github/workflows/deploy.yml` - GitHub Actions 配置
- ✅ 所有部署文档和脚本

---

## ❓ 常见问题速查

| 问题 | 解决方案 |
|------|--------|
| 页面显示 404 | 检查 `vite.config.ts` 的 base 路径 |
| 样式没有加载 | 清除浏览器缓存，检查 base 路径 |
| 路由不工作 | 已配置 404.html，清除缓存后重试 |
| 如何更新内容 | `git add . && git commit && git push` |
| 需要详细帮助 | 查看 `DEPLOYMENT_GUIDE.md` |

---

## 📞 获取帮助

### 快速问题
→ 查看 `DEPLOY_QUICK_REFERENCE.txt`

### 常见问题
→ 查看 `DEPLOYMENT_GUIDE.md` 的常见问题部分

### 排查问题
→ 查看 `DEPLOYMENT_CHECKLIST.md` 的排查步骤

### 完整导航
→ 查看 `DEPLOYMENT_INDEX.md`

---

## ✅ 部署成功检查

部署完成后，检查以下项目：

- [ ] 访问部署地址能看到首页
- [ ] 页面有正确的样式和颜色
- [ ] 导航链接可以点击
- [ ] 页面刷新后不会 404
- [ ] 浏览器控制台没有错误

---

## 🎉 部署成功后

1. **分享你的成果** - 分享部署链接给朋友
2. **添加更多内容** - 在 `src/content/` 添加新的 MDX 文件
3. **配置自定义域名** - 见 `DEPLOYMENT_GUIDE.md` Q5
4. **设置自动部署** - 已配置 GitHub Actions

---

## 📚 完整文档列表

### 📖 指南文档
- `QUICK_START_DEPLOY.md` - 5 分钟快速部署
- `DEPLOYMENT_GUIDE.md` - 完整部署指南（推荐）
- `DEPLOYMENT_SUMMARY.md` - 文档总结

### ✓ 检查清单
- `DEPLOYMENT_CHECKLIST.md` - 部署前后检查清单
- `DEPLOY_QUICK_REFERENCE.txt` - 可打印的快速参考

### 📦 参考文档
- `DEPLOYMENT_INDEX.md` - 文档导航
- `DEPLOYMENT_FILES_CREATED.md` - 文件清单
- `START_HERE.md` - 本文件

---

## 🚀 立即开始

### 第一步：选择你的方式

**⏱️ 只有 5 分钟？**
```bash
chmod +x deploy.sh && ./deploy.sh  # macOS/Linux
deploy.bat                          # Windows
```

**📖 想要详细指南？**
打开 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)

**✓ 想要检查清单？**
打开 [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)

### 第二步：修改配置

编辑 `vite.config.ts`，添加：
```typescript
base: '/claude-code-tutorial-zh/',
```

### 第三步：部署

运行部署脚本或按照指南手动部署。

### 第四步：验证

访问 `https://YOUR_USERNAME.github.io/claude-code-tutorial-zh`

---

## 💡 提示

- 部署通常需要 2-5 分钟
- 如果看到 404，检查 base 路径配置
- 清除浏览器缓存可以解决大多数样式问题
- 所有文档都在项目根目录，随时可以查看

---

## 🎓 学习资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [React Router 文档](https://reactrouter.com/)

---

## 🎯 下一步

1. **立即部署** - 选择上面的部署方式
2. **阅读文档** - 选择适合你的文档
3. **验证部署** - 访问部署地址
4. **分享成果** - 分享给朋友

---

**准备好了吗？让我们开始部署吧！** 🚀

选择你的起点：
- 🏃 [快速部署（5 分钟）](./QUICK_START_DEPLOY.md)
- 📖 [完整指南（20 分钟）](./DEPLOYMENT_GUIDE.md)
- ✓ [检查清单](./DEPLOYMENT_CHECKLIST.md)
- 🎯 [快速参考](./DEPLOY_QUICK_REFERENCE.txt)
- 🗂️ [文档导航](./DEPLOYMENT_INDEX.md)

---

**祝你部署顺利！** 🎉
