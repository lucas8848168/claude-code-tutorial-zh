import{j as n}from"./index-BQaKkhZN.js";function i(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h1,{id:"mcp-集成指南",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mcp-集成指南",children:n.jsx(e.span,{className:"icon icon-link"})}),"MCP 集成指南"]}),`
`,n.jsx(e.p,{children:"Model Context Protocol（MCP）是一个开放标准，允许 Claude Code 与外部工具和服务集成。通过 MCP，你可以扩展 Claude Code 的功能，连接到数据库、API、文档系统等。"}),`
`,n.jsxs(e.h2,{id:"什么是-mcp",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#什么是-mcp",children:n.jsx(e.span,{className:"icon icon-link"})}),"什么是 MCP？"]}),`
`,n.jsx(e.p,{children:"MCP 是一个协议，定义了 Claude Code 与外部工具之间的通信方式。它允许："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"数据访问"}),"：访问数据库、文件系统、API"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"工具集成"}),"：集成开发工具、构建系统、部署工具"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"知识库"}),"：连接文档、代码库、参考资料"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"自定义功能"}),"：创建特定于项目的工具和功能"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"mcp-的优势",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mcp-的优势",children:n.jsx(e.span,{className:"icon icon-link"})}),"MCP 的优势"]}),`
`,n.jsxs(e.h3,{id:"1-扩展功能",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-扩展功能",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 扩展功能"]}),`
`,n.jsx(e.p,{children:"通过 MCP，你可以为 Claude Code 添加自定义功能。"}),`
`,n.jsxs(e.h3,{id:"2-数据访问",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-数据访问",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 数据访问"]}),`
`,n.jsx(e.p,{children:"AI 可以访问你的数据库、API 和文件系统，提供更准确的建议。"}),`
`,n.jsxs(e.h3,{id:"3-工具集成",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-工具集成",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 工具集成"]}),`
`,n.jsx(e.p,{children:"集成你已经使用的开发工具，创建统一的工作流程。"}),`
`,n.jsxs(e.h3,{id:"4-知识增强",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-知识增强",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 知识增强"]}),`
`,n.jsx(e.p,{children:"连接你的文档和代码库，让 AI 更好地理解你的项目。"}),`
`,n.jsxs(e.h2,{id:"配置-mcp",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#配置-mcp",children:n.jsx(e.span,{className:"icon icon-link"})}),"配置 MCP"]}),`
`,n.jsxs(e.h3,{id:"配置文件位置",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#配置文件位置",children:n.jsx(e.span,{className:"icon icon-link"})}),"配置文件位置"]}),`
`,n.jsx(e.p,{children:"MCP 配置文件有两个位置："}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"工作区级别"}),"：",n.jsx(e.code,{children:".kiro/settings/mcp.json"}),"（项目特定）"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"用户级别"}),"：",n.jsx(e.code,{children:"~/.kiro/settings/mcp.json"}),"（全局）"]}),`
`]}),`
`,n.jsx(e.p,{children:"工作区级别的配置优先级更高。"}),`
`,n.jsxs(e.h3,{id:"基本配置结构",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#基本配置结构",children:n.jsx(e.span,{className:"icon icon-link"})}),"基本配置结构"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "server-name": {
      "command": "uvx",
      "args": ["package@version"],
      "env": {
        "KEY": "value"
      },
      "disabled": false,
      "autoApprove": ["tool1", "tool2"]
    }
  }
}
`})}),`
`,n.jsxs(e.h2,{id:"常见-mcp-服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见-mcp-服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见 MCP 服务器"]}),`
`,n.jsxs(e.h3,{id:"1-aws-文档服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-aws-文档服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. AWS 文档服务器"]}),`
`,n.jsx(e.p,{children:"访问 AWS 官方文档："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"使用示例"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`你：@aws-docs 如何在 AWS Lambda 中使用环境变量？

AI：根据 AWS 文档，你可以通过以下方式在 Lambda 中使用环境变量...
`})}),`
`,n.jsxs(e.h3,{id:"2-文件系统服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-文件系统服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 文件系统服务器"]}),`
`,n.jsx(e.p,{children:"访问项目文件系统："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "filesystem": {
      "command": "uvx",
      "args": ["mcp-server-filesystem"],
      "disabled": false,
      "autoApprove": ["read_file", "list_directory"]
    }
  }
}
`})}),`
`,n.jsxs(e.h3,{id:"3-git-服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-git-服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. Git 服务器"]}),`
`,n.jsx(e.p,{children:"访问 Git 仓库信息："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git"],
      "disabled": false,
      "autoApprove": ["get_repository_status", "get_commit_history"]
    }
  }
}
`})}),`
`,n.jsxs(e.h3,{id:"4-数据库服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-数据库服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 数据库服务器"]}),`
`,n.jsx(e.p,{children:"连接到数据库："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "database": {
      "command": "uvx",
      "args": ["mcp-server-database"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost/dbname"
      },
      "disabled": false,
      "autoApprove": ["query_database"]
    }
  }
}
`})}),`
`,n.jsxs(e.h2,{id:"创建自定义-mcp-服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#创建自定义-mcp-服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"创建自定义 MCP 服务器"]}),`
`,n.jsxs(e.h3,{id:"基本结构",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#基本结构",children:n.jsx(e.span,{className:"icon icon-link"})}),"基本结构"]}),`
`,n.jsx(e.p,{children:"创建一个简单的 MCP 服务器："}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-python",children:`# mcp_server.py
import json
from typing import Any

class MCPServer:
    def __init__(self):
        self.tools = {
            "get_project_info": self.get_project_info,
            "analyze_code": self.analyze_code,
            "generate_report": self.generate_report,
        }
    
    def get_project_info(self, project_id: str) -> dict:
        """获取项目信息"""
        return {
            "id": project_id,
            "name": "My Project",
            "description": "Project description",
            "technologies": ["React", "TypeScript", "Node.js"]
        }
    
    def analyze_code(self, file_path: str) -> dict:
        """分析代码文件"""
        return {
            "file": file_path,
            "lines": 150,
            "complexity": "medium",
            "issues": []
        }
    
    def generate_report(self, project_id: str) -> dict:
        """生成项目报告"""
        return {
            "project_id": project_id,
            "report": "Project analysis report",
            "timestamp": "2025-11-16T10:00:00Z"
        }
    
    def handle_request(self, tool_name: str, params: dict) -> Any:
        """处理请求"""
        if tool_name in self.tools:
            return self.tools[tool_name](**params)
        else:
            raise ValueError(f"Unknown tool: {tool_name}")

# 主程序
if __name__ == "__main__":
    server = MCPServer()
    
    # 示例调用
    result = server.handle_request("get_project_info", {"project_id": "123"})
    print(json.dumps(result, indent=2))
`})}),`
`,n.jsxs(e.h3,{id:"注册自定义服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#注册自定义服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"注册自定义服务器"]}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"将服务器代码保存为 Python 包"}),`
`,n.jsxs(e.li,{children:["在 ",n.jsx(e.code,{children:"mcp.json"})," 中配置："]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "my-custom-server": {
      "command": "python",
      "args": ["/path/to/mcp_server.py"],
      "disabled": false,
      "autoApprove": ["get_project_info", "analyze_code"]
    }
  }
}
`})}),`
`,n.jsxs(e.h2,{id:"实际应用场景",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#实际应用场景",children:n.jsx(e.span,{className:"icon icon-link"})}),"实际应用场景"]}),`
`,n.jsxs(e.h3,{id:"场景-1代码分析和优化",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#场景-1代码分析和优化",children:n.jsx(e.span,{className:"icon icon-link"})}),"场景 1：代码分析和优化"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "code-analyzer": {
      "command": "uvx",
      "args": ["mcp-server-code-analyzer"],
      "disabled": false,
      "autoApprove": ["analyze_complexity", "find_issues"]
    }
  }
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"使用"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`你：@code-analyzer 分析这个函数的复杂度

AI：根据代码分析，这个函数的圈复杂度是 8，建议拆分为更小的函数...
`})}),`
`,n.jsxs(e.h3,{id:"场景-2文档生成",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#场景-2文档生成",children:n.jsx(e.span,{className:"icon icon-link"})}),"场景 2：文档生成"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "doc-generator": {
      "command": "uvx",
      "args": ["mcp-server-doc-generator"],
      "disabled": false,
      "autoApprove": ["generate_api_docs", "generate_readme"]
    }
  }
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"使用"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`你：@doc-generator 为这个 API 生成文档

AI：我将为你的 API 生成完整的文档，包括端点、参数和示例...
`})}),`
`,n.jsxs(e.h3,{id:"场景-3部署和监控",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#场景-3部署和监控",children:n.jsx(e.span,{className:"icon icon-link"})}),"场景 3：部署和监控"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "deployment": {
      "command": "uvx",
      "args": ["mcp-server-deployment"],
      "env": {
        "DEPLOY_TOKEN": "your-token"
      },
      "disabled": false,
      "autoApprove": ["check_deployment_status", "view_logs"]
    }
  }
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"使用"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`你：@deployment 检查生产环境的部署状态

AI：根据部署系统，你的应用已成功部署到生产环境...
`})}),`
`,n.jsxs(e.h3,{id:"场景-4知识库集成",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#场景-4知识库集成",children:n.jsx(e.span,{className:"icon icon-link"})}),"场景 4：知识库集成"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "knowledge-base": {
      "command": "uvx",
      "args": ["mcp-server-knowledge-base"],
      "env": {
        "KB_URL": "https://knowledge.example.com"
      },
      "disabled": false,
      "autoApprove": ["search_knowledge", "get_article"]
    }
  }
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"使用"}),"："]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`你：@knowledge-base 查找关于 React Hooks 的最佳实践

AI：根据知识库，React Hooks 的最佳实践包括...
`})}),`
`,n.jsxs(e.h2,{id:"mcp-最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#mcp-最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"MCP 最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-安全性",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-安全性",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 安全性"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"不要在配置文件中硬编码敏感信息"}),`
`,n.jsx(e.li,{children:"使用环境变量存储 API 密钥和令牌"}),`
`,n.jsx(e.li,{children:"定期更新 MCP 服务器"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "mcpServers": {
    "api-server": {
      "command": "uvx",
      "args": ["mcp-server-api"],
      "env": {
        "API_KEY": "\${API_KEY}",  // 从环境变量读取
        "API_URL": "https://api.example.com"
      }
    }
  }
}
`})}),`
`,n.jsxs(e.h3,{id:"2-性能",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-性能",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 性能"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"只启用需要的 MCP 服务器"}),`
`,n.jsxs(e.li,{children:["使用 ",n.jsx(e.code,{children:"autoApprove"})," 加快常用工具的执行"]}),`
`,n.jsx(e.li,{children:"定期检查和清理未使用的服务器"}),`
`]}),`
`,n.jsxs(e.h3,{id:"3-错误处理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-错误处理",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 错误处理"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"为 MCP 服务器配置适当的超时"}),`
`,n.jsx(e.li,{children:"实现重试机制"}),`
`,n.jsx(e.li,{children:"记录错误日志"}),`
`]}),`
`,n.jsxs(e.h3,{id:"4-文档",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#4-文档",children:n.jsx(e.span,{className:"icon icon-link"})}),"4. 文档"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"为自定义 MCP 服务器编写文档"}),`
`,n.jsx(e.li,{children:"记录可用的工具和参数"}),`
`,n.jsx(e.li,{children:"提供使用示例"}),`
`]}),`
`,n.jsxs(e.h2,{id:"常见问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见问题"]}),`
`,n.jsxs(e.h3,{id:"q-如何安装-mcp-服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何安装-mcp-服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何安装 MCP 服务器？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 大多数 MCP 服务器使用 ",n.jsx(e.code,{children:"uvx"})," 命令运行，无需单独安装。如果需要安装 ",n.jsx(e.code,{children:"uv"}),"，请访问 ",n.jsx(e.a,{href:"https://docs.astral.sh/uv/getting-started/installation/",children:"https://docs.astral.sh/uv/getting-started/installation/"})]}),`
`,n.jsxs(e.h3,{id:"q-如何调试-mcp-服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何调试-mcp-服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何调试 MCP 服务器？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 查看 Claude Code 的输出面板，可以看到 MCP 服务器的日志。你也可以在配置中设置 ",n.jsx(e.code,{children:"FASTMCP_LOG_LEVEL"})," 为 ",n.jsx(e.code,{children:"DEBUG"}),"。"]}),`
`,n.jsxs(e.h3,{id:"q-可以同时使用多个-mcp-服务器吗",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-可以同时使用多个-mcp-服务器吗",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 可以同时使用多个 MCP 服务器吗？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 可以。在 ",n.jsx(e.code,{children:"mcp.json"})," 中配置多个服务器，它们会同时运行。"]}),`
`,n.jsxs(e.h3,{id:"q-如何禁用-mcp-服务器",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-如何禁用-mcp-服务器",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: 如何禁用 MCP 服务器？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 在配置中设置 ",n.jsx(e.code,{children:'"disabled": true'}),"，或通过命令面板禁用。"]}),`
`,n.jsxs(e.h3,{id:"q-mcp-服务器会影响性能吗",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#q-mcp-服务器会影响性能吗",children:n.jsx(e.span,{className:"icon icon-link"})}),"Q: MCP 服务器会影响性能吗？"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"A:"})," 如果配置正确，MCP 服务器的性能影响很小。建议只启用需要的服务器。"]}),`
`,n.jsxs(e.h2,{id:"下一步",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#下一步",children:n.jsx(e.span,{className:"icon icon-link"})}),"下一步"]}),`
`,n.jsx(e.p,{children:"现在你已经了解了 MCP 集成，可以继续学习："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/04-mastery/best-practices",children:"最佳实践"})," - 深入了解编程最佳实践"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/04-mastery/advanced-tips",children:"高级技巧"})," - 学习高级使用技巧"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"小结",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#小结",children:n.jsx(e.span,{className:"icon icon-link"})}),"小结"]}),`
`,n.jsx(e.p,{children:"MCP 是一个强大的扩展机制，可以帮助你："}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"✅ 连接外部工具和服务"}),`
`,n.jsx(e.li,{children:"✅ 扩展 Claude Code 的功能"}),`
`,n.jsx(e.li,{children:"✅ 访问项目特定的数据和知识"}),`
`,n.jsx(e.li,{children:"✅ 创建自定义工作流程"}),`
`,n.jsx(e.li,{children:"✅ 提高开发效率"}),`
`]}),`
`,n.jsx(e.p,{children:"通过有效使用 MCP，你可以创建一个高度定制化的、强大的开发环境。"})]})}function d(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{d as default};
