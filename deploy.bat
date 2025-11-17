@echo off
REM Claude Code 教程 - GitHub Pages 部署脚本 (Windows)
REM 使用方法: 双击运行此文件或在命令行执行 deploy.bat

setlocal enabledelayedexpansion

echo.
echo 🚀 开始部署 Claude Code 教程...
echo.

REM 检查是否在项目根目录
if not exist "package.json" (
  echo ❌ 错误: 请在项目根目录运行此脚本
  pause
  exit /b 1
)

REM 检查 Git 是否已初始化
if not exist ".git" (
  echo ❌ 错误: Git 仓库未初始化
  echo 请先运行: git init ^&^& git remote add origin ^<你的仓库URL^>
  pause
  exit /b 1
)

REM 获取仓库信息
for /f "tokens=*" %%i in ('git remote get-url origin') do set REPO_URL=%%i

if "!REPO_URL!"=="" (
  echo ❌ 错误: 未配置远程仓库
  echo 请先运行: git remote add origin ^<你的仓库URL^>
  pause
  exit /b 1
)

echo 📦 仓库信息:
echo    URL: !REPO_URL!
echo.

REM 步骤 1: 安装依赖
echo 📥 安装依赖...
call npm install
if errorlevel 1 (
  echo ❌ 安装依赖失败
  pause
  exit /b 1
)

REM 步骤 2: 构建项目
echo.
echo 🔨 构建项目...
call npm run build
if errorlevel 1 (
  echo ❌ 构建失败
  pause
  exit /b 1
)

REM 步骤 3: 检查构建结果
if not exist "dist" (
  echo ❌ 错误: 构建失败，dist 目录不存在
  pause
  exit /b 1
)

echo ✅ 构建成功
echo.

REM 步骤 4: 提交主分支
echo 📝 提交代码到 main 分支...
git add .
git commit -m "chore: update before deployment" 2>nul
git push origin main
if errorlevel 1 (
  echo ⚠️  推送失败，继续部署...
)

echo ✅ 代码已推送
echo.

REM 步骤 5: 部署到 gh-pages 分支
echo 🌐 部署到 GitHub Pages...
cd dist

if not exist ".git" (
  git init
  git config user.email "deploy@github.com"
  git config user.name "GitHub Pages Deploy"
)

git add -A
git commit -m "Deploy: %date% %time%" 2>nul

git push -f "!REPO_URL!" main:gh-pages
if errorlevel 1 (
  echo ❌ 部署失败
  cd ..
  pause
  exit /b 1
)

cd ..

echo.
echo ✅ 部署完成！
echo.
echo 📍 访问地址:
echo    https://YOUR_USERNAME.github.io/claude-code-tutorial-zh
echo    (请将 YOUR_USERNAME 替换为你的 GitHub 用户名)
echo.
echo 💡 提示:
echo    - 部署通常需要 1-5 分钟
echo    - 如果看到 404，请检查 GitHub Pages 设置
echo    - 清除浏览器缓存后重新访问
echo.
echo 🎉 部署脚本执行完成！
echo.
pause
