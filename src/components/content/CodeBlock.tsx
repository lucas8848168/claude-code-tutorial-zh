import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useThemeStore } from '../../store/themeStore';

/**
 * CodeBlock 组件属性
 */
export interface CodeBlockProps {
  /** 代码内容 */
  children: string;
  /** 编程语言 */
  language?: string;
  /** 文件名（可选） */
  filename?: string;
  /** 是否显示行号 */
  showLineNumbers?: boolean;
  /** 高亮的行号（可选，例如 "1,3-5,7" 或 [1, 3, 4, 5, 7]） */
  highlightLines?: string | number[];
  /** 额外的 CSS 类名 */
  className?: string;
}

/**
 * 解析高亮行配置
 * 支持格式: "1,3-5,7" 或 [1, 3, 4, 5, 7]
 */
const parseHighlightLines = (highlightLines?: string | number[]): number[] => {
  if (!highlightLines) return [];
  
  if (Array.isArray(highlightLines)) {
    return highlightLines;
  }
  
  const lines: number[] = [];
  const parts = highlightLines.split(',');
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        lines.push(i);
      }
    } else {
      lines.push(Number(trimmed));
    }
  }
  
  return lines;
};

/**
 * CodeBlock 组件
 * 
 * 用于展示代码块，支持语法高亮、复制功能、行号显示等
 * 
 * @example
 * ```tsx
 * <CodeBlock language="typescript" filename="example.ts" showLineNumbers>
 *   {`const greeting = "Hello, World!";
 * console.log(greeting);`}
 * </CodeBlock>
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = 'text',
  filename,
  showLineNumbers = false,
  highlightLines,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  
  // 选择主题样式
  const style = resolvedTheme === 'dark' ? oneDark : oneLight;
  
  // 解析需要高亮的行
  const linesToHighlight = parseHighlightLines(highlightLines);
  
  /**
   * 复制代码到剪贴板
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };
  
  return (
    <div className={`relative group my-4 ${className}`}>
      {/* 文件名标签 */}
      {filename && (
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-300 dark:border-gray-700">
          <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
            {filename}
          </span>
        </div>
      )}
      
      {/* 代码容器 */}
      <div className="relative">
        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          aria-label="复制代码"
        >
          {copied ? '已复制!' : '复制'}
        </button>
        
        {/* 语法高亮器 */}
        <SyntaxHighlighter
          language={language}
          style={style}
          showLineNumbers={showLineNumbers}
          wrapLines={!!highlightLines}
          lineProps={(lineNumber: number) => {
            const shouldHighlight = linesToHighlight.includes(lineNumber);
            return {
              style: shouldHighlight
                ? {
                    backgroundColor: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    display: 'block',
                    width: '100%',
                  }
                : {},
            };
          }}
          customStyle={{
            margin: 0,
            borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
