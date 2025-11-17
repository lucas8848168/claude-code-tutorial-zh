# 🗂️ 部署文档索引

快速找到你需要的部署文档和工具。

## 🎯 按用户类型分类

### 👤 我是新手，想快速部署
**推荐阅读顺序**:
1. 📄 [`DEPLOY_QUICK_REFERENCE.txt`](./DEPLOY_QUICK_REFERENCE.txt) - 2 分钟快速参考
2. 📖 [`QUICK_START_DEPLOY.md`](./QUICK_START_DEPLOY.md) - 5 分钟快速部署
3. ✓ [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) - 验证部署

**推荐工具**:
- 🐧 [`deploy.sh`](./deploy.sh) (macOS/Linux) - 一键部署
- 🪟 [`deploy.bat`](./deploy.bat) (Windows) - 一键部署

---

### 👨‍💼 我需要详细的部署指南
**推荐阅读顺序**:
1. 📖 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - 完整部署指南
2. ✓ [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) - 检查清单
3. 📚 [`DEPLOYMENT_SUMMARY.md`](./DEPLOYMENT_SUMMARY.md) - 文档总结

**推荐工具**:
- 🤖 [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) - GitHub Actions 自动部署

---

### 🔧 我想了解所有配置细节
**推荐阅读顺序**:
1. 📚 [`DEPLOYMENT_SUMMARY.md`](./DEPLOYMENT_SUMMARY.md) - 配置说明部分
2. 📖 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - 完整指南
3. 📦 [`DEPLOYMENT_FILES_CREATED.md`](./DEPLOYMENT_FILES_CREATED.md) - 文件清单

**需要修改的文件**:
- ⚠️ `vite.config.ts` - 添加 base 路径
- 🔄 `public/404.html` - SPA 路由处理

---

### 🆘 我遇到了问题
**快速排查**:
1. 📄 [`DEPLOY_QUICK_REFERENCE.txt`](./DEPLOY_QUICK_REFERENCE.txt) - 常见问题部分
2. ✓ [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) - 排查步骤部分
3. 📖 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) - 常见问题详细解答

**常见问题速查**:
- 页面 404 → [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md#q1-部署后页面显示-404)
- 样式丢失 → [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md#q2-样式没有加载)
- 路由不工作 → [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md#q3-路由不工作页面刷新后-404)
- 如何更新 → [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md#q4-如何更新已部署的内容)

---

## 📚 按文档类型分类

### 📖 完整指南
| 文档 | 用途 | 阅读时间 |
|------|------|--------|
| [`QUICK_START_DEPLOY.md`](./QUICK_START_DEPLOY.md) | 5 分钟快速部署 | 5 分钟 |
| [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) | 详细部署指南 | 15-20 分钟 |
| [`DEPLOYMENT_SUMMARY.md`](./DEPLOYMENT_SUMMARY.md) | 文档总结和导航 | 10 分钟 |

### ✓ 检查清单
| 文档 | 用途 |
|------|------|
| [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) | 部署前后检查清单 |
| [`DEPLOY_QUICK_REFERENCE.txt`](./DEPLOY_QUICK_REFERENCE.txt) | 可打印的快速参考 |

### 📦 参考文档
| 文档 | 用途 |
|------|------|
| [`DEPLOYMENT_FILES_CREATED.md`](./DEPLOYMENT_FILES_CREATED.md) | 所有部署文件清单 |
| [`DEPLOYMENT_INDEX.md`](./DEPLOYMENT_INDEX.md) | 本文件 - 文档索引 |

---

## 🛠️ 按工具类型分类

### 🤖 自动化工具
| 工具 | 平台 | 用途 |
|------|------|------|
| [`deploy.sh`](./deploy.sh) | macOS/Linux | 一键部署脚本 |
| [`deploy.bat`](./deploy.bat) | Windows | 一键部署脚本 |
| [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) | GitHub | 自动部署工作流 |

### ⚙️ 配置文件
| 文件 | 用途 | 状态 |
|------|------|------|
| `vite.config.ts` | Vite 构建配置 | ⚠️ 需要手动修改 |
| `public/404.html` | SPA 路由处理 | ✅ 已创建 |

---

## 🚀 快速开始（3 种方式）

### 方式 1️⃣：最快（2 分钟）
```
1. 阅读 DEPLOY_QUICK_REFERENCE.txt
2. 修改 vite.config.ts
3. 运行 deploy.sh 或 deploy.bat
```

### 方式 2️⃣：推荐（10 分钟）
```
1. 阅读 QUICK_START_DEPLOY.md
2. 按步骤手动部署
3. 验证部署成功
```

### 方式 3️⃣：完整（30 分钟）
```
1. 阅读 DEPLOYMENT_GUIDE.md
2. 理解每一步的原理
3. 按步骤手动部署
4. 使用 DEPLOYMENT_CHECKLIST.md 验证
```

---

## 📋 部署步骤概览

```
┌─────────────────────────────────────────────────────────┐
│ 1. 修改 vite.config.ts 添加 base 路径                    │
│    ↓                                                     │
│ 2. 本地测试 (npm run build && npm run preview)          │
│    ↓                                                     │
│ 3. 创建 GitHub 仓库                                      │
│    ↓                                                     │
│ 4. 推送代码到 GitHub                                     │
│    ↓                                                     │
│ 5. 启用 GitHub Pages                                    │
│    ↓                                                     │
│ 6. 等待 2-5 分钟                                        │
│    ↓                                                     │
│ 7. 访问部署地址验证                                      │
│    ↓                                                     │
│ ✅ 部署完成！                                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 按问题类型分类

### ❓ 常见问题
- **页面显示 404** → [`DEPLOYMENT_GUIDE.md` Q1](./DEPLOYMENT_GUIDE.md#q1-部署后页面显示-404)
- **样式没有加载** → [`DEPLOYMENT_GUIDE.md` Q2](./DEPLOYMENT_GUIDE.md#q2-样式没有加载)
- **路由不工作** → [`DEPLOYMENT_GUIDE.md` Q3](./DEPLOYMENT_GUIDE.md#q3-路由不工作页面刷新后-404)
- **如何更新内容** → [`DEPLOYMENT_GUIDE.md` Q4](./DEPLOYMENT_GUIDE.md#q4-如何更新已部署的内容)
- **自定义域名** → [`DEPLOYMENT_GUIDE.md` Q5](./DEPLOYMENT_GUIDE.md#q5-如何使用自定义域名)

### 🔧 配置问题
- **base 路径配置** → [`DEPLOYMENT_SUMMARY.md` 配置说明](./DEPLOYMENT_SUMMARY.md#-配置说明)
- **404.html 配置** → [`DEPLOYMENT_SUMMARY.md` 404.html 配置](./DEPLOYMENT_SUMMARY.md#404html-配置)
- **GitHub Actions 配置** → [`DEPLOYMENT_SUMMARY.md` GitHub Actions 自动部署](./DEPLOYMENT_SUMMARY.md#github-actions-自动部署)

### 🚀 部署方式
- **使用部署脚本** → [`DEPLOYMENT_SUMMARY.md` 方案 B](./DEPLOYMENT_SUMMARY.md#方案-b使用部署脚本推荐快速)
- **手动部署** → [`DEPLOYMENT_SUMMARY.md` 方案 A](./DEPLOYMENT_SUMMARY.md#方案-a手动部署推荐学习)
- **GitHub Actions** → [`DEPLOYMENT_SUMMARY.md` GitHub Actions](./DEPLOYMENT_SUMMARY.md#github-actions-自动部署)

---

## 📞 获取帮助

### 第一步：查看相关文档
1. 快速问题 → `DEPLOY_QUICK_REFERENCE.txt`
2. 常见问题 → `DEPLOYMENT_GUIDE.md`
3. 排查步骤 → `DEPLOYMENT_CHECKLIST.md`

### 第二步：检查部署日志
- GitHub 仓库 → Actions 标签 → 查看最新工作流

### 第三步：浏览器开发者工具
- F12 打开 → Console 标签 → 查看错误信息

---

## ✅ 部署成功检查

部署完成后，检查以下项目：

- [ ] 访问部署地址能看到首页
- [ ] 页面有正确的样式和颜色
- [ ] 导航链接可以点击
- [ ] 页面刷新后不会 404
- [ ] 浏览器控制台没有错误

---

## 📈 下一步

部署成功后：

1. **分享你的成果** - 分享部署链接
2. **添加更多内容** - 在 `src/content/` 添加新的 MDX 文件
3. **配置自定义域名** - 见 `DEPLOYMENT_GUIDE.md` Q5
4. **设置自动部署** - 已配置 GitHub Actions

---

## 🗺️ 文件导航地图

```
部署文档
├── 快速开始
│   ├── DEPLOY_QUICK_REFERENCE.txt ← 从这里开始
│   └── QUICK_START_DEPLOY.md
├── 详细指南
│   ├── DEPLOYMENT_GUIDE.md
│   └── DEPLOYMENT_SUMMARY.md
├── 检查清单
│   └── DEPLOYMENT_CHECKLIST.md
└── 参考文档
    ├── DEPLOYMENT_FILES_CREATED.md
    └── DEPLOYMENT_INDEX.md (本文件)

部署工具
├── deploy.sh (macOS/Linux)
├── deploy.bat (Windows)
└── .github/workflows/deploy.yml (GitHub Actions)

配置文件
├── vite.config.ts (需要修改)
└── public/404.html (已创建)
```

---

## 🎓 学习路径

### 初级（快速部署）
```
DEPLOY_QUICK_REFERENCE.txt
    ↓
QUICK_START_DEPLOY.md
    ↓
deploy.sh / deploy.bat
    ↓
✅ 部署完成
```

### 中级（理解部署）
```
QUICK_START_DEPLOY.md
    ↓
DEPLOYMENT_GUIDE.md
    ↓
DEPLOYMENT_CHECKLIST.md
    ↓
✅ 部署完成并理解原理
```

### 高级（完全掌握）
```
DEPLOYMENT_GUIDE.md
    ↓
DEPLOYMENT_SUMMARY.md
    ↓
DEPLOYMENT_FILES_CREATED.md
    ↓
.github/workflows/deploy.yml
    ↓
✅ 完全掌握部署流程
```

---

## 🎉 准备好了吗？

选择你的起点：

- **⏱️ 只有 5 分钟？** → [`QUICK_START_DEPLOY.md`](./QUICK_START_DEPLOY.md)
- **📖 想要详细指南？** → [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)
- **✓ 想要检查清单？** → [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)
- **🎯 想要快速参考？** → [`DEPLOY_QUICK_REFERENCE.txt`](./DEPLOY_QUICK_REFERENCE.txt)

---

**祝你部署顺利！** 🚀
