import{j as n}from"./index-BSHmrj-c.js";function s(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h1,{id:"agent-hooks-自动化工作流",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#agent-hooks-自动化工作流",children:n.jsx(e.span,{className:"icon icon-link"})}),"Agent Hooks 自动化工作流"]}),`
`,n.jsx(e.p,{children:"Agent Hooks 是 Claude Code 的一个强大功能，它允许你创建自动化的工作流程，在特定事件发生时自动执行 AI 任务。通过 Hooks，你可以消除重复性的工作，提高开发效率。"}),`
`,n.jsxs(e.h2,{id:"什么是-agent-hooks",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#什么是-agent-hooks",children:n.jsx(e.span,{className:"icon icon-link"})}),"什么是 Agent Hooks？"]}),`
`,n.jsx(e.p,{children:"Agent Hooks 是事件驱动的自动化规则。当特定事件发生时（例如保存文件、提交代码、更新文档），Hook 会自动触发 Claude Code 执行预定义的任务。"}),`
`,n.jsxs(e.h3,{id:"核心概念",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#核心概念",children:n.jsx(e.span,{className:"icon icon-link"})}),"核心概念"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"事件"}),"：触发 Hook 的条件（文件保存、代码提交等）"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"条件"}),"：可选的额外条件（文件类型、路径匹配等）"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"操作"}),"：Hook 触发时执行的任务（运行测试、生成文档等）"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"常见-hook-场景",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见-hook-场景",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见 Hook 场景"]}),`
`,n.jsxs(e.h3,{id:"1-自动测试",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-自动测试",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 自动测试"]}),`
`,n.jsx(e.p,{children:"当你保存代码文件时，自动运行相关的测试："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`name: Auto Test on Save
trigger: file_saved
condition:
  path: "src/**/*.ts"
action:
  type: run_command
  command: "npm test -- --testPathPattern=src"
`})}),`
`,n.jsxs(e.h3,{id:"2-代码审查",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-代码审查",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 代码审查"]}),`
`,n.jsx(e.p,{children:"当你提交代码时，自动进行代码审查："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`name: Auto Code Review
trigger: before_commit
action:
  type: chat
  prompt: "请审查这些代码变更，指出潜在问题和改进建议"
`})}),`
`,n.jsxs(e.h3,{id:"3-文档更新",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-文档更新",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 文档更新"]}),`
`,n.jsx(e.p,{children:"当你修改 API 时，自动更新相关文档："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`name: Update API Docs
trigger: file_saved
condition:
  path: "src/api/**/*.ts"
action:
  type: chat
  prompt: "为这个 API 文件生成或更新 JSDoc 注释"
`})}),`
`,n.jsxs(e.h3,{id:"4-翻译同步",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-翻译同步",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 翻译同步"]}),`
`,n.jsx(e.p,{children:"当你更新英文文档时，自动更新其他语言版本："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`name: Sync Translations
trigger: file_saved
condition:
  path: "docs/en/**/*.md"
action:
  type: chat
  prompt: "将这个文档翻译成中文、日文和西班牙文"
`})}),`
`,n.jsxs(e.h2,{id:"创建-agent-hooks",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#创建-agent-hooks",children:n.jsx(e.span,{className:"icon icon-link"})}),"创建 Agent Hooks"]}),`
`,n.jsxs(e.h3,{id:"方法-1通过-ui",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#方法-1通过-ui",children:n.jsx(e.span,{className:"icon icon-link"})}),"方法 1：通过 UI"]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开 Claude Code"}),`
`,n.jsxs(e.li,{children:["打开命令面板（",n.jsx(e.code,{children:"Ctrl+Shift+P"})," 或 ",n.jsx(e.code,{children:"Cmd+Shift+P"}),"）"]}),`
`,n.jsx(e.li,{children:'搜索"Open Kiro Hook UI"'}),`
`,n.jsx(e.li,{children:'点击"创建新 Hook"'}),`
`,n.jsx(e.li,{children:"填写 Hook 配置"}),`
`]}),`
`,n.jsxs(e.h3,{id:"方法-2编辑配置文件",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#方法-2编辑配置文件",children:n.jsx(e.span,{className:"icon icon-link"})}),"方法 2：编辑配置文件"]}),`
`,n.jsxs(e.p,{children:["在 ",n.jsx(e.code,{children:".kiro/hooks/"})," 目录中创建 YAML 文件："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# .kiro/hooks/auto-test.yaml
name: "自动运行测试"
description: "当保存 TypeScript 文件时自动运行测试"
enabled: true

trigger:
  type: "file_saved"
  
condition:
  path: "src/**/*.ts"
  exclude: "src/**/*.test.ts"

action:
  type: "run_command"
  command: "npm test -- --testPathPattern=\${file_name}"
  
notification:
  on_success: "✅ 测试通过"
  on_failure: "❌ 测试失败"
`})}),`
`,n.jsxs(e.h2,{id:"hook-配置详解",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hook-配置详解",children:n.jsx(e.span,{className:"icon icon-link"})}),"Hook 配置详解"]}),`
`,n.jsxs(e.h3,{id:"触发器类型",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#触发器类型",children:n.jsx(e.span,{className:"icon icon-link"})}),"触发器类型"]}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"触发器"}),n.jsx(e.th,{children:"说明"}),n.jsx(e.th,{children:"示例"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"file_saved"})}),n.jsx(e.td,{children:"文件保存时"}),n.jsx(e.td,{children:"自动格式化、运行测试"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"file_created"})}),n.jsx(e.td,{children:"文件创建时"}),n.jsx(e.td,{children:"生成模板、添加许可证"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"file_deleted"})}),n.jsx(e.td,{children:"文件删除时"}),n.jsx(e.td,{children:"更新导入、清理引用"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"before_commit"})}),n.jsx(e.td,{children:"提交前"}),n.jsx(e.td,{children:"代码审查、运行检查"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"after_commit"})}),n.jsx(e.td,{children:"提交后"}),n.jsx(e.td,{children:"更新文档、发送通知"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"manual"})}),n.jsx(e.td,{children:"手动触发"}),n.jsx(e.td,{children:"通过命令面板触发"})]})]})]}),`
`,n.jsxs(e.h3,{id:"条件配置",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#条件配置",children:n.jsx(e.span,{className:"icon icon-link"})}),"条件配置"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`condition:
  # 路径匹配（支持 glob 模式）
  path: "src/**/*.ts"
  
  # 排除路径
  exclude: "src/**/*.test.ts"
  
  # 文件大小限制（字节）
  maxSize: 10000
  
  # 自定义条件
  custom: "file.name.includes('Component')"
`})}),`
`,n.jsxs(e.h3,{id:"操作类型",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#操作类型",children:n.jsx(e.span,{className:"icon icon-link"})}),"操作类型"]}),`
`,n.jsxs(e.h4,{id:"1-运行命令",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-运行命令",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 运行命令"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`action:
  type: "run_command"
  command: "npm test"
  cwd: "."  # 工作目录
  timeout: 30000  # 超时时间（毫秒）
`})}),`
`,n.jsxs(e.h4,{id:"2-chat-对话",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-chat-对话",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. Chat 对话"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`action:
  type: "chat"
  prompt: "请审查这个文件并提出改进建议"
  context: "file"  # 包含文件内容作为上下文
`})}),`
`,n.jsxs(e.h4,{id:"3-文件操作",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-文件操作",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 文件操作"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`action:
  type: "file_operation"
  operation: "create"  # create, update, delete
  path: "docs/\${file_name}.md"
  content: "# \${file_name}\\n\\n自动生成的文档"
`})}),`
`,n.jsxs(e.h4,{id:"4-格式化",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-格式化",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 格式化"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`action:
  type: "format"
  formatter: "prettier"  # prettier, eslint, black 等
  options:
    semi: true
    singleQuote: true
`})}),`
`,n.jsxs(e.h2,{id:"实际-hook-示例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#实际-hook-示例",children:n.jsx(e.span,{className:"icon icon-link"})}),"实际 Hook 示例"]}),`
`,n.jsxs(e.h3,{id:"示例-1自动生成测试",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#示例-1自动生成测试",children:n.jsx(e.span,{className:"icon icon-link"})}),"示例 1：自动生成测试"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# .kiro/hooks/generate-tests.yaml
name: "自动生成测试文件"
description: "为新创建的 TypeScript 文件自动生成测试框架"
enabled: true

trigger:
  type: "file_created"

condition:
  path: "src/**/*.ts"
  exclude: "src/**/*.test.ts"

action:
  type: "chat"
  prompt: |
    为这个文件生成完整的单元测试。
    
    要求：
    1. 使用 Jest 框架
    2. 覆盖所有导出的函数
    3. 包含边界情况测试
    4. 添加详细的测试描述
    
    将测试文件保存为 \${file_name}.test.ts
  context: "file"

notification:
  on_success: "✅ 测试文件已生成"
  on_failure: "❌ 生成测试文件失败"
`})}),`
`,n.jsxs(e.h3,{id:"示例-2代码审查",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#示例-2代码审查",children:n.jsx(e.span,{className:"icon icon-link"})}),"示例 2：代码审查"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# .kiro/hooks/code-review.yaml
name: "自动代码审查"
description: "在提交前自动审查代码变更"
enabled: true

trigger:
  type: "before_commit"

action:
  type: "chat"
  prompt: |
    请审查这些代码变更。检查以下方面：
    
    1. 代码质量和可读性
    2. 潜在的 bug 和性能问题
    3. 安全性问题
    4. 是否遵循项目的编码规范
    5. 是否需要添加测试或文档
    
    如果发现问题，请列出具体的改进建议。
  context: "git_diff"

notification:
  on_success: "✅ 代码审查完成"
  on_failure: "❌ 代码审查失败"
`})}),`
`,n.jsxs(e.h3,{id:"示例-3文档同步",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#示例-3文档同步",children:n.jsx(e.span,{className:"icon icon-link"})}),"示例 3：文档同步"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# .kiro/hooks/sync-docs.yaml
name: "同步文档翻译"
description: "当英文文档更新时，自动更新其他语言版本"
enabled: true

trigger:
  type: "file_saved"

condition:
  path: "docs/en/**/*.md"

action:
  type: "chat"
  prompt: |
    这个英文文档已更新。请：
    
    1. 将内容翻译成中文
    2. 将内容翻译成日文
    3. 将内容翻译成西班牙文
    
    为每种语言创建对应的文件：
    - docs/zh/\${file_name}
    - docs/ja/\${file_name}
    - docs/es/\${file_name}
    
    确保翻译准确且符合各语言的表达习惯。
  context: "file"

notification:
  on_success: "✅ 文档已翻译"
  on_failure: "❌ 文档翻译失败"
`})}),`
`,n.jsxs(e.h3,{id:"示例-4自动格式化和-lint",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#示例-4自动格式化和-lint",children:n.jsx(e.span,{className:"icon icon-link"})}),"示例 4：自动格式化和 Lint"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# .kiro/hooks/format-on-save.yaml
name: "保存时自动格式化"
description: "保存文件时自动格式化和运行 Lint 检查"
enabled: true

trigger:
  type: "file_saved"

condition:
  path: "src/**/*.{ts,tsx,js,jsx}"

actions:
  - type: "format"
    formatter: "prettier"
    options:
      semi: true
      singleQuote: true
      trailingComma: "es5"
  
  - type: "run_command"
    command: "npm run lint -- --fix \${file_path}"

notification:
  on_success: "✅ 文件已格式化"
  on_failure: "❌ 格式化失败"
`})}),`
`,n.jsxs(e.h2,{id:"hook-管理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hook-管理",children:n.jsx(e.span,{className:"icon icon-link"})}),"Hook 管理"]}),`
`,n.jsxs(e.h3,{id:"查看所有-hooks",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#查看所有-hooks",children:n.jsx(e.span,{className:"icon icon-link"})}),"查看所有 Hooks"]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开命令面板"}),`
`,n.jsx(e.li,{children:'搜索"Kiro: List Hooks"'}),`
`,n.jsx(e.li,{children:"查看所有已配置的 Hooks"}),`
`]}),`
`,n.jsxs(e.h3,{id:"启用禁用-hooks",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#启用禁用-hooks",children:n.jsx(e.span,{className:"icon icon-link"})}),"启用/禁用 Hooks"]}),`
`,n.jsxs(e.p,{children:["在 Hook 配置中修改 ",n.jsx(e.code,{children:"enabled"})," 字段："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`enabled: false  # 禁用此 Hook
`})}),`
`,n.jsx(e.p,{children:"或通过命令面板："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'搜索"Kiro: Toggle Hook"'}),`
`,n.jsx(e.li,{children:"选择要切换的 Hook"}),`
`]}),`
`,n.jsxs(e.h3,{id:"手动触发-hook",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#手动触发-hook",children:n.jsx(e.span,{className:"icon icon-link"})}),"手动触发 Hook"]}),`
`,n.jsxs(e.p,{children:["对于 ",n.jsx(e.code,{children:"manual"})," 类型的 Hook，可以通过命令面板手动触发："]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"打开命令面板"}),`
`,n.jsx(e.li,{children:'搜索"Kiro: Run Hook"'}),`
`,n.jsx(e.li,{children:"选择要运行的 Hook"}),`
`]}),`
`,n.jsxs(e.h2,{id:"hook-最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hook-最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"Hook 最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-明确的目的",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-明确的目的",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 明确的目的"]}),`
`,n.jsx(e.p,{children:"每个 Hook 应该有明确的目的，不要创建过于复杂的 Hook。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# ✅ 好的 Hook
name: "运行单元测试"

# ❌ 不好的 Hook
name: "做一些事情"
`})}),`
`,n.jsxs(e.h3,{id:"2-合理的触发条件",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-合理的触发条件",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 合理的触发条件"]}),`
`,n.jsx(e.p,{children:"避免过于频繁的触发，以免影响开发效率。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# ✅ 好的条件
condition:
  path: "src/**/*.ts"
  exclude: "src/**/*.test.ts"

# ❌ 不好的条件
condition:
  path: "**/*"  # 太宽泛
`})}),`
`,n.jsxs(e.h3,{id:"3-快速的执行时间",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-快速的执行时间",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 快速的执行时间"]}),`
`,n.jsx(e.p,{children:"Hook 应该快速执行，不要阻塞开发工作流程。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`# ✅ 快速的操作
action:
  type: "format"
  formatter: "prettier"

# ❌ 耗时的操作
action:
  type: "run_command"
  command: "npm run build && npm run test && npm run deploy"
`})}),`
`,n.jsxs(e.h3,{id:"4-清晰的通知",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-清晰的通知",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 清晰的通知"]}),`
`,n.jsx(e.p,{children:"提供清晰的成功和失败通知。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`notification:
  on_success: "✅ 测试通过"
  on_failure: "❌ 测试失败，请检查错误"
`})}),`
`,n.jsxs(e.h3,{id:"5-错误处理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#5-错误处理",children:n.jsx(e.span,{className:"icon icon-link"})}),"5. 错误处理"]}),`
`,n.jsx(e.p,{children:"定义 Hook 失败时的处理方式。"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-yaml",children:`on_error:
  action: "notify"  # notify, ignore, abort
  message: "Hook 执行失败"
`})}),`
`,n.jsxs(e.h2,{id:"常见问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见问题"]}),`
`,n.jsxs(e.h3,{id:"q-hook-会影响性能吗",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-hook-会影响性能吗",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: Hook 会影响性能吗？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 如果 Hook 执行时间过长，可能会影响性能。建议为 Hook 设置合理的超时时间，并避免过于频繁的触发。"]}),`
`,n.jsxs(e.h3,{id:"q-如何调试-hook",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何调试-hook",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何调试 Hook？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 查看 Claude Code 的输出面板，可以看到 Hook 的执行日志。"]}),`
`,n.jsxs(e.h3,{id:"q-可以在-hook-中使用环境变量吗",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-可以在-hook-中使用环境变量吗",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 可以在 Hook 中使用环境变量吗？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 可以。在 Hook 配置中使用 ",n.jsx(e.code,{children:"${ENV_VAR_NAME}"})," 来引用环境变量。"]}),`
`,n.jsxs(e.h3,{id:"q-如何禁用所有-hooks",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何禁用所有-hooks",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何禁用所有 Hooks？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"}),' 在设置中搜索"Kiro Hooks"，然后禁用所有 Hooks。']}),`
`,n.jsxs(e.h2,{id:"下一步",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#下一步",children:n.jsx(e.span,{className:"icon icon-link"})}),"下一步"]}),`
`,n.jsx(e.p,{children:"现在你已经了解了 Agent Hooks，可以继续学习："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/03-advanced/steering",children:"Steering 配置"})," - 为团队定制 AI 行为"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/03-advanced/mcp",children:"MCP 集成"})," - 连接外部工具和服务"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"小结",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#小结",children:n.jsx(e.span,{className:"icon icon-link"})}),"小结"]}),`
`,n.jsx(e.p,{children:"Agent Hooks 是一个强大的自动化工具，可以帮助你："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"✅ 自动化重复性的开发任务"}),`
`,n.jsx(e.li,{children:"✅ 提高代码质量和一致性"}),`
`,n.jsx(e.li,{children:"✅ 减少手动工作"}),`
`,n.jsx(e.li,{children:"✅ 提高开发效率"}),`
`,n.jsx(e.li,{children:"✅ 确保最佳实践的遵循"}),`
`]}),`
`,n.jsx(e.p,{children:"通过有效使用 Hooks，你可以创建一个高效的、自动化的开发工作流程。"})]})}function d(i={}){const{wrapper:e}=i.components||{};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{d as default};
