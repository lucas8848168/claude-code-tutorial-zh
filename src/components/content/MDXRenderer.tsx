import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'react-router-dom';
import { CodeBlock } from './CodeBlock';
import { CodeEditor } from './CodeEditor';
import { Exercise, Quiz } from '../interactive/index';

/**
 * MDXRenderer 组件属性
 */
export interface MDXRendererProps {
  /** MDX 组件 */
  Component: React.ComponentType;
  /** 自定义组件映射（可选） */
  components?: Record<string, React.ComponentType<any>>;
  /** 额外的 CSS 类名 */
  className?: string;
}

/**
 * 自定义链接组件 - 将内部链接转换为 React Router Link
 */
const CustomLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, children, ...props }) => {
  // 检查是否为内部链接
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  
  if (isInternal && !href.startsWith('#')) {
    return (
      <Link to={href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" {...props}>
        {children}
      </Link>
    );
  }
  
  // 外部链接或锚点链接
  return (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

/**
 * 自定义内联代码组件
 */
const InlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <code
      className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  );
};

/**
 * 自定义预格式化文本组件 - 用于代码块
 */
const CustomPre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({ children }) => {
  // 提取 code 元素的属性
  const childElement = React.Children.only(children) as React.ReactElement<any>;
  
  if (childElement?.props?.className) {
    // 从 className 中提取语言信息 (格式: language-xxx)
    const match = childElement.props.className.match(/language-(\w+)/);
    const language = match ? match[1] : 'text';
    
    // 提取代码内容
    const code = String(childElement.props.children || '').trim();
    
    // 检查是否有元数据（例如 filename）
    const metaMatch = childElement.props.className.match(/\{([^}]+)\}/);
    const meta = metaMatch ? metaMatch[1] : '';
    const filenameMatch = meta.match(/filename="([^"]+)"/);
    const filename = filenameMatch ? filenameMatch[1] : undefined;
    
    return (
      <CodeBlock language={language} filename={filename}>
        {code}
      </CodeBlock>
    );
  }
  
  // 如果没有语言信息，使用简单的 pre 标签
  return (
    <pre className="my-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
      {children}
    </pre>
  );
};

/**
 * 默认 MDX 组件映射
 * 提供基础的样式和功能，可以被外部组件覆盖
 */
const defaultComponents = {
  // 链接
  a: CustomLink,
  
  // 标题
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2" {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2" {...props} />
  ),
  
  // 段落
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  
  // 列表
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 ml-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 ml-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="ml-2" {...props} />
  ),
  
  // 引用
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-950 text-gray-700 dark:text-gray-300 italic"
      {...props}
    />
  ),
  
  // 代码
  code: InlineCode,
  pre: CustomPre,
  
  // 自定义组件
  CodeBlock,
  CodeEditor,
  Exercise,
  Quiz,
  
  // 表格
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props} />
  ),
  
  // 水平线
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),
  
  // 强调
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),
  
  // 删除线
  del: (props: React.HTMLAttributes<HTMLElement>) => (
    <del className="line-through text-gray-500 dark:text-gray-400" {...props} />
  ),
  
  // 图片
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className="max-w-full h-auto rounded-lg shadow-md my-4"
      loading="lazy"
      {...props}
    />
  ),
};

/**
 * MDXRenderer 组件
 * 
 * 用于渲染 MDX 内容，提供自定义组件映射和样式优化
 * 
 * @example
 * ```tsx
 * import { MDXRenderer } from '@/components/content/MDXRenderer';
 * import MyMDXContent from './content.mdx';
 * 
 * function MyPage() {
 *   return (
 *     <MDXRenderer
 *       Component={MyMDXContent}
 *       components={{
 *         CodeBlock: MyCodeBlock,
 *         ImageViewer: MyImageViewer,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export const MDXRenderer: React.FC<MDXRendererProps> = ({
  Component,
  components = {},
  className = '',
}) => {
  // 合并默认组件和自定义组件
  const mergedComponents = {
    ...defaultComponents,
    ...components,
  };
  
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <MDXProvider components={mergedComponents}>
        <Component />
      </MDXProvider>
    </div>
  );
};

export default MDXRenderer;
