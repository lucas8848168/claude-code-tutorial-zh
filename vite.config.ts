import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://vite.dev/config/
export default defineConfig({
  // 根据环境设置 base 路径
  // 本地开发: /
  // GitHub Pages 部署: /claude-code-tutorial-zh/
  base: process.env.NODE_ENV === 'production' ? '/claude-code-tutorial-zh/' : '/',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
// 检查结果：代码基本正确，但有以下建议改进：
// 1. alias 路径应使用 path.resolve 而不是字符串
// 2. 可以考虑添加更多构建优化配置
// 3. MDX 插件配置可能需要调整顺序

// 建议的改进版本（如果需要）：
/*
import path from 'path'

resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},
*/
