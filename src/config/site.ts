/**
 * 站点配置
 */
export const siteConfig = {
  /** 站点名称 */
  name: 'Claude Code 中文教程',
  
  /** 站点描述 */
  description: '从零开始学习 Claude Code - 为编程新手打造的完整中文教程',
  
  /** 站点 URL */
  url: 'https://claude-code-tutorial.example.com',
  
  /** 站点作者 */
  author: 'Claude Code 中文社区',
  
  /** 版权信息 */
  copyright: `© ${new Date().getFullYear()} Claude Code 中文教程. All rights reserved.`,
  
  /** 社交媒体链接 */
  links: {
    github: 'https://github.com/example/claude-code-tutorial-zh',
    officialDocs: 'https://code.claude.com/docs/zh-CN/overview',
    community: 'https://community.claude.com',
  },
  
  /** 导航配置 */
  navigation: [
    {
      title: '首页',
      href: '/',
    },
    {
      title: '教程',
      href: '/chapters',
    },
    {
      title: '搜索',
      href: '/search',
    },
  ],
  
  /** 页脚链接 */
  footerLinks: [
    {
      title: '资源',
      links: [
        { title: '官方文档', href: 'https://code.claude.com/docs/zh-CN/overview' },
        { title: 'GitHub', href: 'https://github.com/example/claude-code-tutorial-zh' },
        { title: '社区论坛', href: 'https://community.claude.com' },
      ],
    },
    {
      title: '关于',
      links: [
        { title: '关于本教程', href: '/about' },
        { title: '贡献指南', href: '/contributing' },
        { title: '许可协议', href: '/license' },
      ],
    },
  ],
} as const;

/**
 * 主题配置
 */
export const themeConfig = {
  /** 默认主题 */
  defaultTheme: 'light' as 'light' | 'dark' | 'system',
  
  /** 是否启用主题切换 */
  enableThemeToggle: true,
} as const;

/**
 * 搜索配置
 */
export const searchConfig = {
  /** 搜索快捷键 */
  shortcut: {
    key: 'k',
    modifiers: ['ctrl', 'cmd'],
  },
  
  /** 最大搜索结果数 */
  maxResults: 20,
  
  /** 搜索历史最大条数 */
  maxHistoryItems: 10,
  
  /** 搜索延迟（毫秒） */
  debounceDelay: 300,
} as const;

/**
 * 进度追踪配置
 */
export const progressConfig = {
  /** LocalStorage 键名 */
  storageKey: 'claude-code-tutorial-progress',
  
  /** 是否启用自动保存 */
  autoSave: true,
  
  /** 自动保存间隔（毫秒） */
  autoSaveInterval: 30000, // 30 秒
} as const;
