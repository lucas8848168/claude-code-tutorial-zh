import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { useThemeStore } from '../../store/themeStore';

/**
 * 验证结果类型
 */
export interface ValidationResult {
  /** 是否通过验证 */
  success: boolean;
  /** 验证消息 */
  message: string;
  /** 错误详情（可选） */
  error?: string;
}

/**
 * CodeEditor 组件属性
 */
export interface CodeEditorProps {
  /** 初始代码内容 */
  initialCode: string;
  /** 编程语言 */
  language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css';
  /** 验证函数（可选） */
  onValidate?: (code: string) => Promise<ValidationResult> | ValidationResult;
  /** 代码变化回调（可选） */
  onChange?: (code: string) => void;
  /** 是否只读 */
  readOnly?: boolean;
  /** 最小高度 */
  minHeight?: string;
  /** 额外的 CSS 类名 */
  className?: string;
}

/**
 * 获取语言扩展
 */
const getLanguageExtension = (language: string) => {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return javascript({ typescript: language === 'typescript' });
    case 'python':
      return python();
    case 'html':
      return html();
    case 'css':
      return css();
    default:
      return javascript();
  }
};

/**
 * 创建亮色主题
 */
const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: '#ffffff',
    color: '#24292e',
  },
  '.cm-content': {
    caretColor: '#24292e',
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: '#24292e',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: '#d7d4f0',
  },
  '.cm-activeLine': {
    backgroundColor: '#f6f8fa',
  },
  '.cm-gutters': {
    backgroundColor: '#f6f8fa',
    color: '#6e7781',
    border: 'none',
  },
}, { dark: false });

/**
 * CodeEditor 组件
 * 
 * 交互式代码编辑器，支持语法高亮、代码验证等功能
 * 
 * @example
 * ```tsx
 * <CodeEditor
 *   initialCode="console.log('Hello');"
 *   language="javascript"
 *   onValidate={async (code) => {
 *     // 验证逻辑
 *     return { success: true, message: '验证通过' };
 *   }}
 * />
 * ```
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language = 'javascript',
  onValidate,
  onChange,
  readOnly = false,
  minHeight = '200px',
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [code, setCode] = useState(initialCode);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);

  /**
   * 初始化编辑器
   */
  useEffect(() => {
    if (!editorRef.current) return;

    const isDark = resolvedTheme === 'dark';
    
    const startState = EditorState.create({
      doc: initialCode,
      extensions: [
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        getLanguageExtension(language),
        isDark ? oneDark : lightTheme,
        EditorView.editable.of(!readOnly),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newCode = update.state.doc.toString();
            setCode(newCode);
            onChange?.(newCode);
          }
        }),
        EditorView.theme({
          '&': {
            fontSize: '14px',
            minHeight,
          },
          '.cm-scroller': {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [initialCode, language, readOnly, minHeight, onChange, resolvedTheme]);

  /**
   * 重置代码到初始状态
   */
  const handleReset = () => {
    if (viewRef.current) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: initialCode,
        },
      });
      viewRef.current.dispatch(transaction);
      setCode(initialCode);
      setValidationResult(null);
    }
  };

  /**
   * 运行验证
   */
  const handleValidate = async () => {
    if (!onValidate) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = await Promise.resolve(onValidate(code));
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        success: false,
        message: '验证失败',
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className={`border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {/* 编辑器容器 */}
      <div ref={editorRef} className="overflow-auto" />

      {/* 操作按钮栏 */}
      <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
            aria-label="重置代码"
          >
            重置
          </button>
          
          {onValidate && (
            <button
              onClick={handleValidate}
              disabled={isValidating}
              className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded transition-colors"
              aria-label="运行验证"
            >
              {isValidating ? '验证中...' : '运行'}
            </button>
          )}
        </div>

        {/* 验证结果显示 */}
        {validationResult && (
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm ${
              validationResult.success
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}
          >
            <span className="font-medium">
              {validationResult.success ? '✓' : '✗'}
            </span>
            <span>{validationResult.message}</span>
          </div>
        )}
      </div>

      {/* 错误详情 */}
      {validationResult && !validationResult.success && validationResult.error && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border-t border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300 font-mono">
            {validationResult.error}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
