# 📚 部署文档总结

本项目已为 GitHub Pages 部署做好了完整准备。以下是所有相关文档的快速导航。

## 📖 文档导航

### 🚀 快速开始（推荐新手）
**文件**: `QUICK_START_DEPLOY.md`
- ⏱️ 5 分钟快速部署
- 📝 简明扼要的步骤
- ✅ 包含常见问题速查表

**适合**: 想快速部署的用户

### 📋 完整部署指南
**文件**: `DEPLOYMENT_GUIDE.md`
- 📖 详细的分步骤说明
- 🔧 所有配置选项
- ❓ 常见问题详细解答
- 🎯 高级配置（自定义域名等）

**适合**: 需要详细了解的用户

### ✓ 部署检查清单
**文件**: `DEPLOYMENT_CHECKLIST.md`
- ☑️ 部署前检查项
- 🔍 排查问题的步骤
- 📊 验证部署成功的方法

**适合**: 想确保没有遗漏任何步骤的用户

## 🛠️ 部署工具

### 自动部署脚本

#### macOS/Linux
```bash
chmod +x deploy.sh
./deploy.sh
```

#### Windows
```bash
deploy.bat
```

这些脚本会自动完成以下步骤：
1. 安装依赖
2. 构建项目
3. 提交代码到 main 分支
4. 部署到 GitHub Pages

### GitHub Actions 自动部署
**文件**: `.github/workflows/deploy.yml`

配置后，每次推送到 main 分支时，GitHub 会自动构建和部署。

## 📋 部署前检查

在开始部署前，请确保：

- [ ] 已安装 Git 和 Node.js 18+
- [ ] 已创建 GitHub 账号
- [ ] 已在 GitHub 创建新仓库
- [ ] 已编辑 `vite.config.ts` 添加 base 路径
- [ ] 已本地测试构建（`npm run build && npm run preview`）

## 🎯 部署步骤概览

### 方案 A：手动部署（推荐学习）

1. **配置项目**
   ```typescript
   // vite.config.ts
   base: '/claude-code-tutorial-zh/'
   ```

2. **本地测试**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

3. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git
   git push -u origin main
   ```

4. **启用 GitHub Pages**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)

5. **访问部署地址**
   ```
   https://YOUR_USERNAME.github.io/claude-code-tutorial-zh
   ```

### 方案 B：使用部署脚本（推荐快速）

1. **配置项目**（同上）

2. **运行部署脚本**
   ```bash
   # macOS/Linux
   chmod +x deploy.sh && ./deploy.sh
   
   # Windows
   deploy.bat
   ```

3. **访问部署地址**（脚本会显示）

## 🔧 配置说明

### vite.config.ts 配置

```typescript
export default defineConfig({
  base: '/claude-code-tutorial-zh/',  // 必须配置！
  plugins: [
    // ... 其他配置
  ],
})
```

**为什么需要 base 路径？**
- GitHub Pages 将项目部署在 `username.github.io/repo-name/` 下
- 所有资源路径都需要加上 `/repo-name/` 前缀
- 不配置会导致样式和资源加载失败

### 404.html 配置

**文件**: `public/404.html`

这个文件处理 SPA 路由问题：
- 当访问不存在的路由时，GitHub Pages 会返回 404.html
- 404.html 会重定向到首页，让 React Router 处理路由
- 这样就能支持 SPA 的所有路由

## 📊 部署后验证

部署完成后，请检查：

1. **页面加载**
   - [ ] 访问 `https://YOUR_USERNAME.github.io/claude-code-tutorial-zh`
   - [ ] 页面正常显示（不是 404）

2. **样式加载**
   - [ ] 页面有正确的样式和颜色
   - [ ] 不是白页或样式混乱

3. **功能测试**
   - [ ] 导航链接可以点击
   - [ ] 页面刷新后不会 404
   - [ ] 所有交互功能正常

4. **浏览器控制台**
   - [ ] 没有 404 错误
   - [ ] 没有 CORS 错误
   - [ ] 没有其他错误信息

## 🆘 常见问题

### Q: 部署后页面显示 404

**原因**: 通常是 base 路径配置错误

**解决**:
1. 检查 `vite.config.ts` 中的 base 路径
2. 确保格式为 `/repo-name/`（前后都有斜杠）
3. 重新构建：`npm run build`
4. 重新推送代码

### Q: 样式没有加载

**原因**: 资源路径错误

**解决**:
1. 清除浏览器缓存
2. 检查浏览器开发者工具的 Network 标签
3. 确认 base 路径配置正确
4. 重新构建和部署

### Q: 路由不工作（页面刷新后 404）

**原因**: GitHub Pages 不支持 SPA 路由

**解决**: 已配置 404.html，应该可以工作
- 如果还是不行，尝试清除浏览器缓存
- 或者等待 GitHub Pages 缓存更新（通常 5 分钟内）

### Q: 如何更新已部署的内容？

**步骤**:
```bash
# 修改代码
# 提交更改
git add .
git commit -m "Update: 描述"

# 推送到 GitHub
git push origin main

# GitHub Pages 会自动重新部署（1-2 分钟）
```

## 📞 获取帮助

1. **查看详细文档**
   - `QUICK_START_DEPLOY.md` - 快速步骤
   - `DEPLOYMENT_GUIDE.md` - 完整指南
   - `DEPLOYMENT_CHECKLIST.md` - 检查清单

2. **检查部署日志**
   - GitHub 仓库 → Actions 标签
   - 查看最新的部署工作流日志

3. **浏览器开发者工具**
   - F12 打开开发者工具
   - Console 标签查看错误信息
   - Network 标签查看资源加载情况

## 🎉 部署成功标志

当你看到以下情况时，说明部署成功了：

✅ 访问部署地址能看到教程首页
✅ 页面有正确的样式和布局
✅ 导航链接可以点击
✅ 页面刷新后不会 404
✅ 浏览器控制台没有错误

## 📚 相关资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [React Router 文档](https://reactrouter.com/)

## 🚀 下一步

部署成功后，你可以：

1. **配置自定义域名**
   - 在 GitHub Pages 设置中添加自定义域名
   - 在域名 DNS 设置中添加 CNAME 记录

2. **设置自动部署**
   - 已配置 GitHub Actions（`.github/workflows/deploy.yml`）
   - 每次推送到 main 分支时自动部署

3. **添加更多内容**
   - 在 `src/content/` 目录添加新的 MDX 文件
   - 在 `src/config/chapters.ts` 中注册新章节
   - 推送代码，自动部署

4. **分享你的成果**
   - 分享部署链接给朋友
   - 在社交媒体上宣传
   - 邀请他人贡献内容

---

**祝部署顺利！如有问题，请查看相关文档或检查浏览器控制台的错误信息。** 🎊
