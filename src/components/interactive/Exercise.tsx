import React, { useState } from 'react';
import type { ValidationResult } from '../content/CodeEditor';
import { CodeEditor } from '../content/CodeEditor';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useProgressStore } from '../../store/progressStore';

/**
 * 测试用例
 */
export interface TestCase {
  /** 测试用例 ID */
  id: string;
  /** 测试用例描述 */
  description: string;
  /** 输入数据 */
  input?: string;
  /** 预期输出 */
  expectedOutput: string;
}

/**
 * Exercise 组件属性
 */
export interface ExerciseProps {
  /** 练习题 ID */
  id: string;
  /** 练习题标题 */
  title: string;
  /** 练习题描述 */
  description: string;
  /** 初始代码 */
  initialCode: string;
  /** 参考答案 */
  solution: string;
  /** 编程语言 */
  language?: 'javascript' | 'typescript' | 'python' | 'html' | 'css';
  /** 提示列表 */
  hints?: string[];
  /** 测试用例 */
  testCases?: TestCase[];
  /** 完成回调 */
  onComplete?: (exerciseId: string) => void;
}

/**
 * Exercise 组件
 * 
 * 交互式练习题组件，包含代码编辑器、提示系统和验证功能
 * 
 * @example
 * ```tsx
 * <Exercise
 *   id="ex-1"
 *   title="编写 Hello World"
 *   description="编写一个程序输出 Hello World"
 *   initialCode="console.log('');"
 *   solution="console.log('Hello World');"
 *   language="javascript"
 *   hints={["使用 console.log 函数", "字符串需要用引号包围"]}
 *   testCases={[
 *     {
 *       id: "test-1",
 *       description: "输出正确的文本",
 *       expectedOutput: "Hello World"
 *     }
 *   ]}
 * />
 * ```
 */
export const Exercise: React.FC<ExerciseProps> = ({
  id,
  title,
  description,
  initialCode,
  solution,
  language = 'javascript',
  hints = [],
  testCases = [],
  onComplete,
}) => {
  const [showHints, setShowHints] = useState(false);
  const [unlockedHints, setUnlockedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // 从 ProgressStore 获取方法来保存练习完成状态
  // 注意：这里我们使用一个简单的方法来标记练习完成
  // 在实际应用中，可能需要扩展 ProgressStore 来支持练习完成状态

  /**
   * 解锁下一个提示
   */
  const handleUnlockHint = () => {
    if (unlockedHints.length < hints.length) {
      setUnlockedHints([...unlockedHints, unlockedHints.length]);
    }
  };

  /**
   * 验证代码
   */
  const handleValidate = async (userCode: string): Promise<ValidationResult> => {
    // 简单的验证逻辑：检查代码是否与解决方案相似
    // 在实际应用中，这应该运行真实的测试用例
    
    const normalizeCode = (c: string) => c.trim().replace(/\s+/g, ' ');
    const userNormalized = normalizeCode(userCode);
    
    // 检查是否包含关键部分
    const hasKeyParts = testCases.length === 0 || 
      testCases.every(tc => userNormalized.includes(normalizeCode(tc.expectedOutput)));
    
    if (hasKeyParts && userNormalized.length > 0) {
      setIsCompleted(true);
      
      // 保存完成状态到 ProgressStore（使用练习 ID 作为章节标识）
      // 这样可以在进度追踪中记录练习完成状态
      try {
        useProgressStore.getState().markChapterComplete(`exercise-${id}`);
      } catch (error) {
        console.warn('Failed to save exercise completion state:', error);
      }
      
      // 调用外部回调
      onComplete?.(id);
      
      return {
        success: true,
        message: '恭喜！练习完成',
      };
    }
    
    return {
      success: false,
      message: '代码还不完整，请继续尝试',
    };
  };

  /**
   * 显示解决方案
   */
  const handleShowSolution = () => {
    setShowSolution(true);
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* 标题和描述 */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full whitespace-nowrap">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">已完成</span>
            </div>
          )}
        </div>
      </div>

      {/* 代码编辑器 */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700">
        <CodeEditor
          initialCode={showSolution ? solution : initialCode}
          language={language}
          onValidate={handleValidate}
          minHeight="250px"
          readOnly={showSolution}
        />
      </div>

      {/* 提示系统 */}
      {hints.length > 0 && (
        <div className="border-b border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setShowHints(!showHints)}
            className="w-full px-4 py-3 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-900 dark:text-blue-200 transition-colors"
          >
            <span className="font-medium">
              💡 提示 ({unlockedHints.length}/{hints.length})
            </span>
            {showHints ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showHints && (
            <div className="p-4 space-y-3">
              {hints.map((hint, index) => (
                <div
                  key={index}
                  className={`p-3 rounded border-l-4 ${
                    unlockedHints.includes(index)
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-gray-900 dark:text-gray-100'
                      : 'bg-gray-100 dark:bg-gray-800 border-gray-400 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {unlockedHints.includes(index) ? (
                    <p>{hint}</p>
                  ) : (
                    <p className="italic">提示已锁定</p>
                  )}
                </div>
              ))}

              {unlockedHints.length < hints.length && (
                <button
                  onClick={handleUnlockHint}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
                >
                  解锁下一个提示
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 查看答案按钮 */}
      <div className="p-4 flex gap-2 justify-end bg-gray-50 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        {!showSolution && (
          <button
            onClick={handleShowSolution}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors text-sm font-medium"
          >
            查看答案
          </button>
        )}
      </div>

      {/* 测试用例信息 */}
      {testCases.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">测试用例</h4>
          <div className="space-y-2">
            {testCases.map((testCase) => (
              <div
                key={testCase.id}
                className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded text-sm"
              >
                <p className="font-medium text-gray-900 dark:text-white mb-1">
                  {testCase.description}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-mono">
                  预期输出: {testCase.expectedOutput}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
