import{j as n}from"./index-BSHmrj-c.js";function r(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...i.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h1,{id:"第一步创建你的第一个项目",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#第一步创建你的第一个项目",children:n.jsx(e.span,{className:"icon icon-link"})}),"第一步：创建你的第一个项目"]}),`
`,n.jsx(e.p,{children:"现在你已经安装好了 Claude Code，让我们通过一个简单的示例来体验它的强大功能。"}),`
`,n.jsxs(e.h2,{id:"创建新项目",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#创建新项目",children:n.jsx(e.span,{className:"icon icon-link"})}),"创建新项目"]}),`
`,n.jsxs(e.h3,{id:"1-打开-claude-code",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-打开-claude-code",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 打开 Claude Code"]}),`
`,n.jsx(e.p,{children:"启动 Claude Code 应用程序，你会看到欢迎界面。"}),`
`,n.jsxs(e.h3,{id:"2-创建项目文件夹",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-创建项目文件夹",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 创建项目文件夹"]}),`
`,n.jsx(e.p,{children:"有两种方式创建新项目："}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"方式一：通过界面"})}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'点击"文件" > "打开文件夹"'}),`
`,n.jsxs(e.li,{children:["选择或创建一个新文件夹（例如 ",n.jsx(e.code,{children:"my-first-project"}),"）"]}),`
`,n.jsx(e.li,{children:'点击"选择文件夹"'}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"方式二：通过命令行"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# 创建项目文件夹
mkdir my-first-project
cd my-first-project

# 使用 Claude Code 打开
claude .
`})}),`
`,n.jsxs(e.h2,{id:"第一个-python-示例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#第一个-python-示例",children:n.jsx(e.span,{className:"icon icon-link"})}),"第一个 Python 示例"]}),`
`,n.jsx(e.p,{children:"让我们创建一个简单的 Python 程序，体验 Claude Code 的代码补全和 AI 助手功能。"}),`
`,n.jsxs(e.h3,{id:"1-创建-python-文件",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-创建-python-文件",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 创建 Python 文件"]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:'在左侧文件浏览器中，点击"新建文件"图标'}),`
`,n.jsxs(e.li,{children:["输入文件名：",n.jsx(e.code,{children:"hello.py"})]}),`
`,n.jsx(e.li,{children:"按 Enter 键创建文件"}),`
`]}),`
`,n.jsxs(e.h3,{id:"2-使用代码补全",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-使用代码补全",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 使用代码补全"]}),`
`,n.jsxs(e.p,{children:["在 ",n.jsx(e.code,{children:"hello.py"})," 文件中，开始输入以下代码："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-python",children:`# 这是我的第一个 Python 程序
def greet(name):
    """向用户打招呼"""
    message = f"你好，{name}！欢迎使用 Claude Code。"
    return message

# 主程序
if __name__ == "__main__":
    user_name = input("请输入你的名字：")
    greeting = greet(user_name)
    print(greeting)
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"体验智能补全："})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["当你输入 ",n.jsx(e.code,{children:"def"})," 时，Claude Code 会自动建议函数定义"]}),`
`,n.jsxs(e.li,{children:["输入 ",n.jsx(e.code,{children:'f"'})," 时，会提示 f-string 格式"]}),`
`,n.jsxs(e.li,{children:["输入 ",n.jsx(e.code,{children:"if __name__"})," 时，会自动补全完整的主程序模板"]}),`
`]}),`
`,n.jsxs(e.h3,{id:"3-运行程序",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-运行程序",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 运行程序"]}),`
`,n.jsx(e.p,{children:"在终端中运行你的第一个程序："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`python hello.py
`})}),`
`,n.jsx(e.p,{children:"输入你的名字，程序会向你打招呼！"}),`
`,n.jsxs(e.h2,{id:"使用-ai-助手",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#使用-ai-助手",children:n.jsx(e.span,{className:"icon icon-link"})}),"使用 AI 助手"]}),`
`,n.jsx(e.p,{children:"Claude Code 最强大的功能之一是 AI 助手。让我们用它来改进我们的程序。"}),`
`,n.jsxs(e.h3,{id:"1-打开-chat-面板",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-打开-chat-面板",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 打开 Chat 面板"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"点击左侧的聊天图标，或"}),`
`,n.jsxs(e.li,{children:["使用快捷键 ",n.jsx(e.code,{children:"Ctrl+L"}),"（Windows/Linux）或 ",n.jsx(e.code,{children:"Cmd+L"}),"（macOS）"]}),`
`]}),`
`,n.jsxs(e.h3,{id:"2-与-ai-对话",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-与-ai-对话",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 与 AI 对话"]}),`
`,n.jsx(e.p,{children:"在聊天框中输入："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`请帮我改进这个程序，添加以下功能：
1. 支持多种语言的问候（中文、英文、日文）
2. 添加错误处理
3. 让代码更加优雅
`})}),`
`,n.jsx(e.p,{children:"AI 助手会分析你的代码，并提供改进建议。你可以直接应用这些建议，或者继续讨论。"}),`
`,n.jsxs(e.h3,{id:"3-应用建议",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-应用建议",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 应用建议"]}),`
`,n.jsx(e.p,{children:"AI 可能会建议类似这样的改进代码："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-python",children:`# 改进后的多语言问候程序
def greet(name, language="zh"):
    """
    向用户打招呼
    
    参数:
        name (str): 用户名字
        language (str): 语言代码 ('zh', 'en', 'ja')
    
    返回:
        str: 问候消息
    """
    greetings = {
        "zh": f"你好，{name}！欢迎使用 Claude Code。",
        "en": f"Hello, {name}! Welcome to Claude Code.",
        "ja": f"こんにちは、{name}さん！Claude Code へようこそ。"
    }
    
    return greetings.get(language, greetings["zh"])

def get_user_input(prompt):
    """安全地获取用户输入"""
    try:
        return input(prompt).strip()
    except (KeyboardInterrupt, EOFError):
        print("\\n程序已退出。")
        return None

def main():
    """主程序"""
    print("=== 多语言问候程序 ===")
    
    # 获取用户名
    user_name = get_user_input("请输入你的名字：")
    if not user_name:
        return
    
    # 选择语言
    print("\\n选择语言：")
    print("1. 中文 (zh)")
    print("2. English (en)")
    print("3. 日本語 (ja)")
    
    lang_choice = get_user_input("请输入选项 (1-3)：")
    
    # 语言映射
    lang_map = {"1": "zh", "2": "en", "3": "ja"}
    language = lang_map.get(lang_choice, "zh")
    
    # 显示问候
    greeting = greet(user_name, language)
    print(f"\\n{greeting}")

if __name__ == "__main__":
    main()
`})}),`
`,n.jsx(e.p,{children:'点击代码块旁边的"应用"按钮，AI 会自动更新你的文件。'}),`
`,n.jsxs(e.h2,{id:"第一个-javascript-示例",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#第一个-javascript-示例",children:n.jsx(e.span,{className:"icon icon-link"})}),"第一个 JavaScript 示例"]}),`
`,n.jsx(e.p,{children:"让我们再创建一个 JavaScript 示例，体验不同语言的开发体验。"}),`
`,n.jsxs(e.h3,{id:"1-创建-html-和-javascript-文件",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-创建-html-和-javascript-文件",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 创建 HTML 和 JavaScript 文件"]}),`
`,n.jsxs(e.p,{children:["创建 ",n.jsx(e.code,{children:"index.html"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        #output {
            margin-top: 20px;
            padding: 15px;
            background-color: #e8f5e9;
            border-radius: 5px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>欢迎使用 Claude Code</h1>
        <p>点击按钮查看当前时间：</p>
        <button onclick="showTime()">显示时间</button>
        <div id="output"></div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>
`})}),`
`,n.jsxs(e.p,{children:["创建 ",n.jsx(e.code,{children:"script.js"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`// 显示当前时间的函数
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const output = document.getElementById('output');
    output.textContent = \`当前时间：\${timeString}\`;
    output.style.display = 'block';
    
    // 添加动画效果
    output.style.animation = 'fadeIn 0.5s';
}

// 添加 CSS 动画
const style = document.createElement('style');
st
yle.textContent = \`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
\`;
document.head.appendChild(style);

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Claude Code 示例页面已加载');
    
    // 添加键盘事件监听
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            showTime();
        }
    });
});
`})})]})}function a(i={}){const{wrapper:e}=i.components||{};return e?n.jsx(e,{...i,children:n.jsx(r,{...i})}):r(i)}export{a as default};
