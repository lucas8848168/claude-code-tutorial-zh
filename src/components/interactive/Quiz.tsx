import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

/**
 * 测验问题
 */
export interface Question {
  /** 问题 ID */
  id: string;
  /** 问题文本 */
  question: string;
  /** 选项列表 */
  options: string[];
  /** 正确答案的索引 */
  correctAnswer: number;
  /** 答案解析 */
  explanation: string;
  /** 是否为多选题（可选） */
  multipleChoice?: boolean;
  /** 多选题的正确答案索引列表（可选） */
  correctAnswers?: number[];
}

/**
 * Quiz 组件属性
 */
export interface QuizProps {
  /** 测验 ID */
  id: string;
  /** 测验标题 */
  title: string;
  /** 问题列表 */
  questions: Question[];
  /** 完成回调 */
  onComplete?: (quizId: string, score: number) => void;
}

/**
 * 用户答案记录
 */
interface UserAnswer {
  questionId: string;
  selectedAnswers: number[];
  isCorrect: boolean;
}

/**
 * Quiz 组件
 * 
 * 交互式测验组件，支持单选和多选题，提供即时反馈和分数统计
 * 
 * @example
 * ```tsx
 * <Quiz
 *   id="quiz-1"
 *   title="Claude Code 基础知识测验"
 *   questions={[
 *     {
 *       id: "q1",
 *       question: "Claude Code 是什么？",
 *       options: ["文本编辑器", "AI 编程助手", "版本控制工具"],
 *       correctAnswer: 1,
 *       explanation: "Claude Code 是一个 AI 编程助手，可以帮助开发者编写代码。"
 *     }
 *   ]}
 * />
 * ```
 */
export const Quiz: React.FC<QuizProps> = ({
  id,
  title,
  questions,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isMultipleChoice = currentQuestion.multipleChoice || false;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  /**
   * 处理答案选择
   */
  const handleSelectAnswer = (answerIndex: number) => {
    if (isMultipleChoice) {
      // 多选题：切换选择状态
      setSelectedAnswers((prev) =>
        prev.includes(answerIndex)
          ? prev.filter((i) => i !== answerIndex)
          : [...prev, answerIndex]
      );
    } else {
      // 单选题：直接选择
      setSelectedAnswers([answerIndex]);
    }
  };

  /**
   * 检查答案是否正确
   */
  const checkAnswer = (): boolean => {
    if (isMultipleChoice && currentQuestion.correctAnswers) {
      // 多选题：检查所有正确答案是否都被选中
      const correctSet = new Set(currentQuestion.correctAnswers);
      const selectedSet = new Set(selectedAnswers);
      return (
        correctSet.size === selectedSet.size &&
        Array.from(correctSet).every((i) => selectedSet.has(i))
      );
    } else {
      // 单选题：检查选中的答案是否正确
      return selectedAnswers[0] === currentQuestion.correctAnswer;
    }
  };

  /**
   * 提交答案
   */
  const handleSubmitAnswer = () => {
    if (selectedAnswers.length === 0) return;

    const isCorrect = checkAnswer();
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswers,
      isCorrect,
    };

    setUserAnswers([...userAnswers, newAnswer]);

    if (isLastQuestion) {
      // 计算分数
      const correctCount = userAnswers.filter((a) => a.isCorrect).length + (isCorrect ? 1 : 0);
      const score = Math.round((correctCount / questions.length) * 100);
      
      setShowResults(true);
      onComplete?.(id, score);
    } else {
      // 移动到下一个问题
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
    }
  };

  /**
   * 重新开始测验
   */
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setSelectedAnswers([]);
  };

  /**
   * 计算分数
   */
  const calculateScore = (): number => {
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    return Math.round((correctCount / questions.length) * 100);
  };

  /**
   * 获取用户对特定问题的答案
   */
  const getUserAnswer = (questionId: string): UserAnswer | undefined => {
    return userAnswers.find((a) => a.questionId === questionId);
  };

  if (showResults) {
    const score = calculateScore();
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;

    return (
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        {/* 结果摘要 */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            测验完成！
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">您的分数</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {score}%
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {correctCount} / {questions.length} 题正确
              </p>
            </div>
            <div className={`text-6xl ${score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}`} />
          </div>
        </div>

        {/* 详细答案 */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            答案详情
          </h3>
          {questions.map((question, index) => {
            const userAnswer = getUserAnswer(question.id);
            const isCorrect = userAnswer?.isCorrect || false;

            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg border-l-4 ${
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={20} />
                  ) : (
                    <XCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={20} />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {index + 1}. {question.question}
                    </p>
                  </div>
                </div>

                <div className="ml-8 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = userAnswer?.selectedAnswers.includes(optionIndex);
                    const isCorrectAnswer = question.multipleChoice
                      ? question.correctAnswers?.includes(optionIndex)
                      : optionIndex === question.correctAnswer;

                    return (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded text-sm ${
                          isCorrectAnswer
                            ? 'bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-200'
                            : isSelected && !isCorrect
                            ? 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="font-medium">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>{' '}
                        {option}
                        {isCorrectAnswer && ' ✓'}
                        {isSelected && !isCorrect && ' ✗'}
                      </div>
                    );
                  })}

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded italic">
                    {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 重新开始按钮 */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <RotateCcw size={18} />
            重新开始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* 进度条 */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* 标题和进度 */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          第 {currentQuestionIndex + 1} / {questions.length} 题
        </p>
      </div>

      {/* 问题内容 */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h3>

        {/* 选项 */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswers.includes(index)
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers.includes(index)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-400 dark:border-gray-600'
                  }`}
                >
                  {selectedAnswers.includes(index) && (
                    <span className="text-white text-xs font-bold">
                      {isMultipleChoice ? '✓' : '●'}
                    </span>
                  )}
                </div>
                <span className="text-gray-900 dark:text-white">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* 提示文本 */}
        {isMultipleChoice && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            💡 这是一道多选题，可以选择多个答案
          </p>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {selectedAnswers.length > 0 && (
            <span>已选择 {selectedAnswers.length} 个答案</span>
          )}
        </div>
        <button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswers.length === 0}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
        >
          {isLastQuestion ? '完成' : '下一题'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
