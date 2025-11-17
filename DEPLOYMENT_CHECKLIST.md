# 📋 部署检查清单

使用此清单确保部署过程顺利进行。

## 前置准备

- [ ] GitHub 账号已创建
- [ ] Git 已安装在本地
- [ ] Node.js 18+ 已安装
- [ ] 项目在本地可以正常运行（`npm run dev`）

## 代码配置

- [ ] 已编辑 `vite.config.ts`，添加了 `base: '/claude-code-tutorial-zh/'`
- [ ] 已检查 `public/404.html` 文件存在
- [ ] 已运行 `npm run build` 成功构建
- [ ] 已运行 `npm run preview` 验证构建结果

## GitHub 仓库设置

- [ ] 已在 GitHub 创建新仓库 `claude-code-tutorial-zh`
- [ ] 仓库设置为 **Public**
- [ ] 已初始化本地 Git：`git init`
- [ ] 已添加远程仓库：`git remote add origin https://github.com/YOUR_USERNAME/claude-code-tutorial-zh.git`
- [ ] 已提交代码：`git add . && git commit -m "Initial commit"`
- [ ] 已推送到 main 分支：`git push -u origin main`

## GitHub Pages 配置

- [ ] 进入仓库 Settings → Pages
- [ ] Source 设置为 **Deploy from a branch**
- [ ] Branch 设置为 **main** 和 **/ (root)**
- [ ] 点击 **Save** 保存设置

## 部署验证

- [ ] 等待 2-5 分钟
- [ ] 访问 `https://YOUR_USERNAME.github.io/claude-code-tutorial-zh`
- [ ] 页面正常加载（不是 404）
- [ ] 样式正确显示（不是白页）
- [ ] 导航链接可以点击
- [ ] 页面刷新后不会 404

## 可选配置

- [ ] 已配置 GitHub Actions 自动部署（`.github/workflows/deploy.yml`）
- [ ] 已配置自定义域名（可选）
- [ ] 已添加 README 说明（可选）

## 部署后

- [ ] 已在 GitHub 仓库中验证代码已推送
- [ ] 已在 GitHub Pages 设置中看到部署状态
- [ ] 已测试所有主要功能
- [ ] 已分享部署链接

## 常见问题排查

### 如果页面显示 404

- [ ] 检查 `vite.config.ts` 中的 base 路径是否正确
- [ ] 检查 GitHub Pages 设置中的分支是否为 main
- [ ] 清除浏览器缓存后重新访问
- [ ] 检查 GitHub Actions 日志是否有错误

### 如果样式没有加载

- [ ] 检查浏览器开发者工具的 Network 标签
- [ ] 确认 base 路径以 `/` 开头和结尾
- [ ] 重新构建：`npm run build`
- [ ] 重新推送代码

### 如果路由不工作

- [ ] 确认 `public/404.html` 文件存在
- [ ] 尝试刷新页面
- [ ] 检查浏览器控制台是否有错误信息

## 更新部署

每次更新代码后：

```bash
# 1. 修改代码
# 2. 提交更改
git add .
git commit -m "Update: 描述你的更改"

# 3. 推送到 GitHub
git push origin main

# 4. 等待 1-2 分钟，GitHub Pages 会自动重新部署
```

## 需要帮助？

- 查看 `DEPLOYMENT_GUIDE.md` 获取详细指南
- 查看 `QUICK_START_DEPLOY.md` 获取快速步骤
- 检查 GitHub 仓库的 Actions 标签查看部署日志
- 查看浏览器开发者工具的 Console 标签查看错误

---

**部署完成后，记得分享你的成果！** 🎉
