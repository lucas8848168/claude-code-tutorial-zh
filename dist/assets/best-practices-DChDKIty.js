import{j as n}from"./index-BSHmrj-c.js";function r(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsxs(e.h1,{id:"最佳实践指南",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#最佳实践指南",children:n.jsx(e.span,{className:"icon icon-link"})}),"最佳实践指南"]}),`
`,n.jsx(e.p,{children:"本章节深入探讨编程最佳实践，帮助你避免常见陷阱，提高代码质量和开发效率。这些实践基于多年的行业经验和最新的技术趋势。"}),`
`,n.jsxs(e.h2,{id:"代码质量最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#代码质量最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"代码质量最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-清晰的代码结构",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-清晰的代码结构",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 清晰的代码结构"]}),`
`,n.jsxs(e.h4,{id:"原则",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#原则",children:n.jsx(e.span,{className:"icon icon-link"})}),"原则"]}),`
`,n.jsx(e.p,{children:"代码应该像讲故事一样清晰易懂。优先考虑可读性而不是简洁性。"}),`
`,n.jsxs(e.h4,{id:"好的实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 清晰的代码结构
class UserService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor(userRepository: UserRepository, emailService: EmailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  /**
   * 创建新用户并发送欢迎邮件
   */
  async createUserWithWelcomeEmail(userData: CreateUserDTO): Promise<User> {
    // 验证输入
    this.validateUserData(userData);

    // 创建用户
    const user = await this.userRepository.create(userData);

    // 发送欢迎邮件
    await this.emailService.sendWelcomeEmail(user.email);

    return user;
  }

  private validateUserData(data: CreateUserDTO): void {
    if (!data.email || !data.name) {
      throw new Error('Email and name are required');
    }
  }
}
`})}),`
`,n.jsxs(e.h4,{id:"常见陷阱",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见陷阱",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见陷阱"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ❌ 混乱的代码结构
class US {
  ur: UR;
  es: ES;
  c(d) {
    if (!d.e || !d.n) throw new Error('E');
    const u = this.ur.c(d);
    this.es.s(u.e);
    return u;
  }
}
`})}),`
`,n.jsxs(e.h3,{id:"2-单一职责原则srp",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-单一职责原则srp",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 单一职责原则（SRP）"]}),`
`,n.jsxs(e.h4,{id:"原则-1",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#原则-1",children:n.jsx(e.span,{className:"icon icon-link"})}),"原则"]}),`
`,n.jsx(e.p,{children:"每个类或函数应该只有一个改变的理由。"}),`
`,n.jsxs(e.h4,{id:"好的实践-1",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-1",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 遵循 SRP
class UserValidator {
  validate(user: User): ValidationResult {
    // 只负责验证
    return {
      isValid: user.email && user.name,
      errors: []
    };
  }
}

class UserRepository {
  async create(user: User): Promise<User> {
    // 只负责数据持久化
    return await db.users.insert(user);
  }
}

class UserService {
  constructor(
    private validator: UserValidator,
    private repository: UserRepository
  ) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    // 协调验证和持久化
    const validation = this.validator.validate(userData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    return await this.repository.create(userData);
  }
}
`})}),`
`,n.jsxs(e.h4,{id:"常见陷阱-1",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见陷阱-1",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见陷阱"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ❌ 违反 SRP
class UserManager {
  // 混合了验证、持久化、邮件发送等多个职责
  async createUser(userData) {
    // 验证
    if (!userData.email) throw new Error('Email required');
    
    // 持久化
    const user = await db.users.insert(userData);
    
    // 发送邮件
    await sendEmail(user.email);
    
    // 记录日志
    console.log('User created:', user.id);
    
    // 更新缓存
    cache.set(\`user:\${user.id}\`, user);
    
    return user;
  }
}
`})}),`
`,n.jsxs(e.h3,{id:"3-dry-原则dont-repeat-yourself",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-dry-原则dont-repeat-yourself",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. DRY 原则（Don't Repeat Yourself）"]}),`
`,n.jsxs(e.h4,{id:"原则-2",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#原则-2",children:n.jsx(e.span,{className:"icon icon-link"})}),"原则"]}),`
`,n.jsx(e.p,{children:"避免重复代码，提取公共逻辑。"}),`
`,n.jsxs(e.h4,{id:"好的实践-2",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-2",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 提取公共逻辑
function formatDate(date: Date, format: string): string {
  // 统一的日期格式化逻辑
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

// 在多个地方使用
const createdDate = formatDate(user.createdAt, 'YYYY-MM-DD');
const updatedDate = formatDate(user.updatedAt, 'YYYY-MM-DD');
`})}),`
`,n.jsxs(e.h4,{id:"常见陷阱-2",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见陷阱-2",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见陷阱"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ❌ 重复的代码
function getUserInfo(userId: string) {
  const user = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
  const formatted = new Intl.DateTimeFormat('zh-CN').format(user.createdAt);
  return { ...user, createdAt: formatted };
}

function getPostInfo(postId: string) {
  const post = await fetch(\`/api/posts/\${postId}\`).then(r => r.json());
  const formatted = new Intl.DateTimeFormat('zh-CN').format(post.createdAt);
  return { ...post, createdAt: formatted };
}
`})}),`
`,n.jsxs(e.h2,{id:"性能最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#性能最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"性能最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-避免-n1-查询",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-避免-n1-查询",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 避免 N+1 查询"]}),`
`,n.jsxs(e.h4,{id:"问题",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#问题",children:n.jsx(e.span,{className:"icon icon-link"})}),"问题"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ❌ N+1 查询问题
async function getUsersWithPosts(userIds: string[]) {
  const users = await db.users.find({ id: { $in: userIds } });
  
  // 这会执行 N 次查询
  const usersWithPosts = await Promise.all(
    users.map(user => 
      db.posts.find({ userId: user.id })
    )
  );
  
  return usersWithPosts;
}
`})}),`
`,n.jsxs(e.h4,{id:"解决方案",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#解决方案",children:n.jsx(e.span,{className:"icon icon-link"})}),"解决方案"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 使用 JOIN 或批量查询
async function getUsersWithPosts(userIds: string[]) {
  // 方案 1：使用 JOIN
  const usersWithPosts = await db.query(\`
    SELECT u.*, p.* FROM users u
    LEFT JOIN posts p ON u.id = p.userId
    WHERE u.id IN (?)
  \`, [userIds]);
  
  // 方案 2：批量查询
  const users = await db.users.find({ id: { $in: userIds } });
  const posts = await db.posts.find({ userId: { $in: userIds } });
  
  return users.map(user => ({
    ...user,
    posts: posts.filter(p => p.userId === user.id)
  }));
}
`})}),`
`,n.jsxs(e.h3,{id:"2-缓存策略",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-缓存策略",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 缓存策略"]}),`
`,n.jsxs(e.h4,{id:"好的实践-3",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-3",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 实现缓存
class UserService {
  private cache = new Map<string, User>();
  private cacheExpiry = new Map<string, number>();

  async getUser(userId: string): Promise<User> {
    // 检查缓存
    if (this.cache.has(userId)) {
      const expiry = this.cacheExpiry.get(userId);
      if (expiry && expiry > Date.now()) {
        return this.cache.get(userId)!;
      }
      // 缓存过期，删除
      this.cache.delete(userId);
      this.cacheExpiry.delete(userId);
    }

    // 从数据库获取
    const user = await db.users.findById(userId);

    // 缓存结果（5 分钟）
    this.cache.set(userId, user);
    this.cacheExpiry.set(userId, Date.now() + 5 * 60 * 1000);

    return user;
  }

  invalidateCache(userId: string): void {
    this.cache.delete(userId);
    this.cacheExpiry.delete(userId);
  }
}
`})}),`
`,n.jsxs(e.h3,{id:"3-异步处理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-异步处理",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 异步处理"]}),`
`,n.jsxs(e.h4,{id:"好的实践-4",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-4",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 正确的异步处理
async function processUsers(userIds: string[]) {
  // 并行处理
  const results = await Promise.all(
    userIds.map(id => processUser(id))
  );
  return results;
}

// 使用 Promise.allSettled 处理可能失败的操作
async function processUsersWithErrorHandling(userIds: string[]) {
  const results = await Promise.allSettled(
    userIds.map(id => processUser(id))
  );
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<any>).value);
  
  const failed = results
    .filter(r => r.status === 'rejected')
    .map(r => (r as PromiseRejectedResult).reason);
  
  return { successful, failed };
}
`})}),`
`,n.jsxs(e.h2,{id:"安全性最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#安全性最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"安全性最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-输入验证",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-输入验证",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 输入验证"]}),`
`,n.jsxs(e.h4,{id:"好的实践-5",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-5",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 完整的输入验证
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// 使用
const emailValidation = validateEmail(userInput.email);
const passwordValidation = validatePassword(userInput.password);

if (!emailValidation || !passwordValidation.valid) {
  throw new Error('Invalid input');
}
`})}),`
`,n.jsxs(e.h3,{id:"2-防止-sql-注入",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-防止-sql-注入",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 防止 SQL 注入"]}),`
`,n.jsxs(e.h4,{id:"好的实践-6",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-6",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 使用参数化查询
async function getUserByEmail(email: string) {
  // 使用参数化查询，防止 SQL 注入
  const user = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return user;
}

// 使用 ORM
async function getUserByEmailORM(email: string) {
  const user = await User.findOne({ email });
  return user;
}
`})}),`
`,n.jsxs(e.h4,{id:"常见陷阱-3",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见陷阱-3",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见陷阱"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ❌ 字符串拼接（容易被注入）
async function getUserByEmailUnsafe(email: string) {
  const user = await db.query(
    \`SELECT * FROM users WHERE email = '\${email}'\`
  );
  return user;
}
`})}),`
`,n.jsxs(e.h3,{id:"3-敏感数据处理",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#3-敏感数据处理",children:n.jsx(e.span,{className:"icon icon-link"})}),"3. 敏感数据处理"]}),`
`,n.jsxs(e.h4,{id:"好的实践-7",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-7",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 正确处理敏感数据
class UserService {
  async createUser(userData: CreateUserDTO): Promise<User> {
    // 密码加密
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // 创建用户（不返回密码）
    const user = await db.users.create({
      ...userData,
      password: hashedPassword
    });
    
    // 返回用户信息（不包含密码）
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: any): User {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
`})}),`
`,n.jsxs(e.h2,{id:"测试最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#测试最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"测试最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-测试金字塔",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-测试金字塔",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 测试金字塔"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`        E2E 测试
      /        \\
    集成测试
   /            \\
单元测试
`})}),`
`,n.jsxs(e.h4,{id:"好的实践-8",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-8",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 单元测试
describe('UserValidator', () => {
  it('should validate correct email', () => {
    const result = validateEmail('test@example.com');
    expect(result).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = validateEmail('invalid-email');
    expect(result).toBe(false);
  });
});

// ✅ 集成测试
describe('UserService', () => {
  it('should create user with valid data', async () => {
    const user = await userService.createUser({
      email: 'test@example.com',
      name: 'Test User'
    });
    expect(user.id).toBeDefined();
  });
});

// ✅ E2E 测试
describe('User Registration Flow', () => {
  it('should complete registration', async () => {
    await page.goto('/register');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'SecurePass123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
});
`})}),`
`,n.jsxs(e.h3,{id:"2-测试覆盖率",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-测试覆盖率",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. 测试覆盖率"]}),`
`,n.jsxs(e.h4,{id:"目标",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#目标",children:n.jsx(e.span,{className:"icon icon-link"})}),"目标"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"关键路径：100%"}),`
`,n.jsx(e.li,{children:"工具函数：100%"}),`
`,n.jsx(e.li,{children:"业务逻辑：80%+"}),`
`,n.jsx(e.li,{children:"总体：70%+"}),`
`]}),`
`,n.jsxs(e.h4,{id:"好的实践-9",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-9",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 完整的测试覆盖
describe('calculateTotal', () => {
  it('should calculate total for single item', () => {
    const result = calculateTotal([{ price: 100, quantity: 1 }]);
    expect(result).toBe(100);
  });

  it('should calculate total for multiple items', () => {
    const result = calculateTotal([
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 }
    ]);
    expect(result).toBe(250);
  });

  it('should handle empty array', () => {
    const result = calculateTotal([]);
    expect(result).toBe(0);
  });

  it('should handle zero quantity', () => {
    const result = calculateTotal([{ price: 100, quantity: 0 }]);
    expect(result).toBe(0);
  });
});
`})}),`
`,n.jsxs(e.h2,{id:"文档最佳实践",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#文档最佳实践",children:n.jsx(e.span,{className:"icon icon-link"})}),"文档最佳实践"]}),`
`,n.jsxs(e.h3,{id:"1-代码注释",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#1-代码注释",children:n.jsx(e.span,{className:"icon icon-link"})}),"1. 代码注释"]}),`
`,n.jsxs(e.h4,{id:"好的实践-10",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-10",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ✅ 有意义的注释
/**
 * 计算用户的订单总额
 * 
 * @param orders - 订单数组
 * @param discountRate - 折扣率（0-1）
 * @returns 折扣后的总额
 * 
 * @example
 * const total = calculateOrderTotal(orders, 0.1); // 10% 折扣
 */
function calculateOrderTotal(orders: Order[], discountRate: number): number {
  const subtotal = orders.reduce((sum, order) => sum + order.amount, 0);
  return subtotal * (1 - discountRate);
}
`})}),`
`,n.jsxs(e.h4,{id:"常见陷阱-4",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#常见陷阱-4",children:n.jsx(e.span,{className:"icon icon-link"})}),"常见陷阱"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`// ❌ 无用的注释
// 增加 i
i++;

// ❌ 过时的注释
// 这个函数计算总数（实际上计算的是平均值）
function calculateAverage(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}
`})}),`
`,n.jsxs(e.h3,{id:"2-readme-文档",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#2-readme-文档",children:n.jsx(e.span,{className:"icon icon-link"})}),"2. README 文档"]}),`
`,n.jsxs(e.h4,{id:"好的实践-11",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#好的实践-11",children:n.jsx(e.span,{className:"icon icon-link"})}),"好的实践"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-markdown",children:`# 项目名称

简要描述项目的目的。

## 功能

- 功能 1
- 功能 2
- 功能 3

## 安装

\`\`\`bash
npm install
`})}),`
`,n.jsxs(e.h2,{id:"使用",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#使用",children:n.jsx(e.span,{className:"icon icon-link"})}),"使用"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`import { MyClass } from 'my-package';

const instance = new MyClass();
instance.doSomething();
`})}),`
`,n.jsxs(e.h2,{id:"api-文档",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#api-文档",children:n.jsx(e.span,{className:"icon icon-link"})}),"API 文档"]}),`
`,n.jsxs(e.h3,{id:"myclass",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#myclass",children:n.jsx(e.span,{className:"icon icon-link"})}),"MyClass"]}),`
`,n.jsxs(e.h4,{id:"方法",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#方法",children:n.jsx(e.span,{className:"icon icon-link"})}),"方法"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"doSomething()"}),": 描述"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"doOtherThing(param)"}),": 描述"]}),`
`]}),`
`,n.jsxs(e.h2,{id:"贡献",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#贡献",children:n.jsx(e.span,{className:"icon icon-link"})}),"贡献"]}),`
`,n.jsx(e.p,{children:"欢迎提交 PR 和 Issue。"}),`
`,n.jsxs(e.h2,{id:"许可证",children:[n.jsx(e.a,{"aria-hidden":"true",tabIndex:"-1",href:"#许可证",children:n.jsx(e.span,{className:"icon icon-link"})}),"许可证"]}),`
`,n.jsx(e.p,{children:"MIT"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{children:`
## 常见陷阱和解决方案

### 陷阱 1：过度设计

**问题**：为了未来的需求而过度设计代码。

**解决方案**：遵循 YAGNI（You Aren't Gonna Need It）原则，只实现当前需要的功能。

### 陷阱 2：忽视错误处理

**问题**：假设一切都会成功，忽视错误情况。

**解决方案**：为所有可能失败的操作添加错误处理。

### 陷阱 3：性能优化过度

**问题**：在没有测量的情况下进行性能优化。

**解决方案**：先测量，找到真正的瓶颈，然后优化。

### 陷阱 4：忽视可维护性

**问题**：为了快速完成而写出难以维护的代码。

**解决方案**：投入时间编写清晰、可维护的代码。

## 效率技巧

### 1. 使用 IDE 快捷键

- \`Ctrl+Shift+P\`：打开命令面板
- \`Ctrl+P\`：快速打开文件
- \`Ctrl+Shift+F\`：全局搜索
- \`F2\`：重命名

### 2. 代码片段

创建常用代码片段，加快开发速度。

### 3. 自动化工具

使用 Linter、Formatter 和测试工具自动化质量检查。

### 4. 代码审查

定期进行代码审查，学习最佳实践。

## 下一步

现在你已经了解了最佳实践，可以继续学习：

- [高级技巧](/04-mastery/advanced-tips) - 学习高级使用技巧
- [实战项目](/04-mastery/real-world-projects) - 完整的实战项目案例

## 小结

遵循最佳实践可以帮助你：

- ✅ 编写高质量的代码
- ✅ 提高开发效率
- ✅ 减少 bug 和安全问题
- ✅ 提高代码可维护性
- ✅ 促进团队协作

记住，最佳实践不是规则，而是指导原则。根据项目的具体情况灵活应用。
`})})]})}function i(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}export{i as default};
