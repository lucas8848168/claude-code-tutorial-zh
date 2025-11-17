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