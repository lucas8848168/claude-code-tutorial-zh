#!/bin/bash

# Claude Code 教程 - GitHub Pages 部署脚本
# 使用方法: chmod +x deploy.sh && ./deploy.sh

set -e

echo "🚀 开始部署 Claude Code 教程..."

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
  echo "❌ 错误: 请在项目根目录运行此脚本"
  exit 1
fi

# 检查 Git 是否已初始化
if [ ! -d ".git" ]; then
  echo "❌ 错误: Git 仓库未初始化"
  echo "请先运行: git init && git remote add origin <你的仓库URL>"
  exit 1
fi

# 检查远程仓库是否已配置
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "❌ 错误: 未配置远程仓库"
  echo "请先运行: git remote add origin <你的仓库URL>"
  exit 1
fi

# 获取仓库信息
REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename "$REPO_URL" .git)

echo "📦 仓库信息:"
echo "   URL: $REPO_URL"
echo "   名称: $REPO_NAME"
echo ""

# 步骤 1: 安装依赖
echo "📥 安装依赖..."
npm install

# 步骤 2: 构建项目
echo "🔨 构建项目..."
npm run build

# 步骤 3: 检查构建结果
if [ ! -d "dist" ]; then
  echo "❌ 错误: 构建失败，dist 目录不存在"
  exit 1
fi

echo "✅ 构建成功"
echo ""

# 步骤 4: 提交主分支
echo "📝 提交代码到 main 分支..."
git add .
git commit -m "chore: update before deployment" || true
git push origin main

echo "✅ 代码已推送"
echo ""

# 步骤 5: 部署到 gh-pages 分支
echo "🌐 部署到 GitHub Pages..."
cd dist

# 初始化 git（如果还没有）
if [ ! -d ".git" ]; then
  git init
  git config user.email "deploy@github.com"
  git config user.name "GitHub Pages Deploy"
fi

git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || true

# 推送到 gh-pages 分支
git push -f "$REPO_URL" main:gh-pages

cd ..

echo "✅ 部署完成！"
echo ""
echo "📍 访问地址:"
echo "   https://$(git config user.name | tr ' ' '-' | tr '[:upper:]' '[:lower:]').github.io/$REPO_NAME"
echo ""
echo "💡 提示:"
echo "   - 部署通常需要 1-5 分钟"
echo "   - 如果看到 404，请检查 GitHub Pages 设置"
echo "   - 清除浏览器缓存后重新访问"
echo ""
echo "🎉 部署脚本执行完成！"
