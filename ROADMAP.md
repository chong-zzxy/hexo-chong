# Hexo 博客框架重构计划

## 项目概况
- **项目路径**: `/Users/chong/Code/hexo-blog`
- **当前状态**: 已有完整Hexo项目 + 自定义主题 (caochong-theme, 4423行CSS)
- **Hexo版本**: 7.1.1
- **主题特性**: 蓝色系、响应式、暗黑模式、搜索、统计、相册

## ✅ 已完成功能

### 相册灯箱系统
- ✅ 动态背景颜色提取（根据图片主色调自动调整）
- ✅ 高级毛玻璃效果文字信息框
- ✅ 平滑缩放淡入动画
- ✅ 优化计数器位置（移至顶部）
- ✅ 隐晦优雅的导航箭头（hover显示）
- ✅ 响应式布局和扁平化设计
- ✅ 键盘快捷键支持（ESC关闭，方向键切换）

## 总体目标
按优先级分阶段实施：
1. **快速见效** - RSS、SEO、TOC、懒加载（1-2天）
2. **代码重构** - CSS/JS模块化（3-5天）
3. **功能扩展** - 评论、分享、统计（2-3天）
4. **性能优化** - 压缩、缓存、预加载（1-2天）

---

## 第一阶段：快速见效功能（1-2天）

### 1. RSS订阅支持 ⏱️ 30分钟

**安装依赖**:
```bash
npm install hexo-generator-feed
```

**配置 `_config.yml`**:
```yaml
feed:
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content: true
  content_limit: 140
  order_by: -date
```

**添加订阅链接**:
- 修改 `themes/caochong-theme/layout/_partial/header.ejs`
- 添加RSS图标和链接

---

### 2. Sitemap和SEO优化 ⏱️ 1小时

**安装依赖**:
```bash
npm install hexo-generator-sitemap hexo-generator-baidu-sitemap
```

**配置 `_config.yml`**:
```yaml
sitemap:
  path: sitemap.xml
  template: ./sitemap_template.xml
  rel: false
  tags: true
  categories: true

baidusitemap:
  path: baidusitemap.xml
```

**创建 `source/robots.txt`**:
```txt
User-agent: *
Allow: /
Disallow: /js/
Disallow: /css/

Sitemap: https://chong-zzxy.github.io/sitemap.xml
Sitemap: https://chong-zzxy.github.io/baidusitemap.xml
```

**优化Meta标签**:
- 创建 `themes/caochong-theme/layout/_partial/meta.ejs`
- 添加 Open Graph 标签
- 添加 Twitter Card
- 添加结构化数据（JSON-LD）

---

### 3. 文章目录导航（TOC） ⏱️ 2-3小时

**创建TOC组件**:
- 文件: `themes/caochong-theme/layout/_partial/toc.ejs`
- 功能: 自动解析文章标题，生成导航
- 样式: 浮动侧边栏，滚动高亮

**JavaScript交互**:
- 平滑滚动
- 高亮当前章节
- 自动展开/收起

**集成位置**: `themes/caochong-theme/layout/post.ejs`

---

### 4. 图片懒加载 ⏱️ 1小时

**安装依赖**:
```bash
npm install hexo-lazyload-image
```

**配置 `_config.yml`**:
```yaml
lazyload:
  enable: true
  onlypost: false
  loadingImg: /img/loading.svg
```

---

## 第二阶段：代码重构（3-5天）

### 1. CSS模块化重构 ⏱️ 2-3天

**目标**: 将4423行CSS拆分为可维护的模块结构

**新目录结构**:
```
themes/caochong-theme/source/css/
├── style.scss                 # 主入口文件
├── _variables.scss            # 全局变量（颜色、间距、字体）
├── _mixins.scss              # 可复用mixins
├── base/
│   ├── _reset.scss           # CSS重置
│   ├── _typography.scss      # 字体系统
│   └── _utilities.scss       # 工具类
├── layout/
│   ├── _header.scss          # 导航栏
│   ├── _footer.scss          # 页脚
│   ├── _sidebar.scss         # 侧边栏
│   └── _container.scss       # 容器布局
├── components/
│   ├── _card.scss            # 卡片组件
│   ├── _button.scss          # 按钮
│   ├── _form.scss            # 表单
│   ├── _modal.scss           # 模态框
│   ├── _toc.scss             # TOC导航
│   ├── _lightbox.scss        # 相册灯箱
│   └── _search.scss          # 搜索框
├── pages/
│   ├── _index.scss           # 首页
│   ├── _post.scss            # 文章页
│   ├── _archive.scss         # 归档页
│   ├── _gallery.scss         # 相册页
│   └── _about.scss           # 关于页
└── vendors/
    └── _prism.scss           # 代码高亮
```

**实施步骤**:
1. 安装 Sass 渲染器: `npm install hexo-renderer-sass`
2. 创建上述目录结构
3. 分析现有CSS，按模块拆分
4. 提取CSS变量到 `_variables.scss`
5. 创建常用mixins（响应式、动画等）
6. 在 `style.scss` 中 `@import` 所有模块

---

### 2. JavaScript模块化 ⏱️ 1-2天

**新目录结构**:
```
themes/caochong-theme/source/js/
├── main.js                   # 入口文件
├── modules/
│   ├── search.js             # 搜索功能（已有）
│   ├── darkmode.js           # 暗黑模式切换
│   ├── toc.js                # TOC导航交互
│   ├── gallery.js            # 相册和灯箱
│   ├── share.js              # 社交分享
│   ├── lazyload.js           # 图片懒加载增强
│   └── comments.js           # 评论系统
└── utils/
    ├── dom.js                # DOM操作工具
    ├── scroll.js             # 滚动相关
    └── storage.js            # 本地存储
```

---

### 3. 模板组件化 ⏱️ 1天

**新partial组件**:
```
themes/caochong-theme/layout/_partial/
├── head.ejs              # <head> 标签
├── header.ejs            # 导航栏
├── footer.ejs            # 页脚
├── meta.ejs              # Meta标签集中管理（新增）
├── schema.ejs            # 结构化数据（新增）
├── toc.ejs               # TOC组件（新增）
├── share.ejs             # 分享按钮（新增）
├── comments.ejs          # 评论区（新增）
└── analytics.ejs         # 统计代码（新增）
```

---

## 第三阶段：功能扩展（2-3天）

### 1. 评论系统 ⏱️ 1-2小时

**推荐**: Waline 或 Giscus

**Waline配置**:
```bash
npm install @waline/hexo-next
```

**主题配置** `themes/caochong-theme/_config.yml`:
```yaml
waline:
  enable: true
  serverURL: https://your-waline-server.vercel.app
  avatar: monsterid
  meta: ['nick', 'mail', 'link']
  pageSize: 10
  lang: zh-CN
```

---

### 2. 社交分享 ⏱️ 2-3小时

**支持平台**:
- 微信（二维码）
- 微博
- Twitter
- Facebook
- 复制链接

**功能**:
- 原生分享API（移动端）
- 自定义分享链接（桌面端）
- 一键复制链接

---

### 3. 阅读体验增强 ⏱️ 2-3小时

**阅读进度条**:
- 顶部进度条显示阅读位置
- 平滑动画

**阅读时间统计**:
- 显示预计阅读时间
- 基于字数计算（中文约300字/分钟）

**代码块增强**:
- 一键复制代码
- 显示语言标签
- 行号显示

---

## 第四阶段：性能优化（1-2天）

### 1. CSS/JS压缩 ⏱️ 1-2小时

**安装依赖**:
```bash
npm install --save-dev postcss postcss-cli cssnano autoprefixer terser
```

**创建 `postcss.config.js`**:
```javascript
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true }
      }]
    })
  ]
};
```

---

### 2. 资源优化 ⏱️ 2-3小时

**图片优化**:
```bash
npm install hexo-filter-responsive-images
```

**资源预加载** - 修改 `head.ejs`:
```html
<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">

<!-- 关键资源预加载 -->
<link rel="preload" href="/css/style.css" as="style">
<link rel="preload" href="/js/main.js" as="script">
```

---

## 第五阶段：自动化部署（1天）

### GitHub Actions配置

**创建 `.github/workflows/deploy.yml`**:
```yaml
name: Deploy Hexo

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

---

## 验证清单

### 功能验证
- [ ] RSS订阅链接可访问
- [ ] Sitemap生成正确
- [ ] TOC导航正常工作
- [ ] 图片懒加载生效
- [ ] 评论系统加载正常
- [ ] 分享按钮功能正常
- [ ] 搜索功能不受影响
- [ ] 暗黑模式切换正常
- [x] 相册灯箱效果完美

### 性能验证
- [ ] Lighthouse性能分数 > 90
- [ ] Lighthouse SEO分数 > 95
- [ ] CSS体积减少 > 30%
- [ ] 首屏加载时间 < 2s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

### SEO验证
- [ ] robots.txt可访问
- [ ] sitemap.xml正确生成
- [ ] Open Graph标签完整
- [ ] 结构化数据通过验证

---

## 时间估算

| 阶段 | 内容 | 预计时间 |
|------|------|----------|
| 第一阶段 | RSS + SEO + TOC + 懒加载 | 1-2天 |
| 第二阶段 | CSS/JS/模板重构 | 3-5天 |
| 第三阶段 | 评论 + 分享 + 阅读增强 | 2-3天 |
| 第四阶段 | 性能优化 | 1-2天 |
| 第五阶段 | 自动化部署 | 1天 |
| **总计** | | **8-13天** |

---

## 依赖包完整清单

### 生产依赖
```bash
npm install hexo-generator-feed
npm install hexo-generator-sitemap
npm install hexo-generator-baidu-sitemap
npm install hexo-lazyload-image
npm install hexo-filter-responsive-images
npm install hexo-renderer-sass
npm install @waline/hexo-next
```

### 开发依赖
```bash
npm install --save-dev postcss postcss-cli
npm install --save-dev cssnano autoprefixer
npm install --save-dev terser
```

---

## 风险和注意事项

### 潜在风险
1. **CSS重构**可能破坏现有样式
2. **依赖冲突**新插件可能与现有插件冲突
3. **性能回退**过度优化可能影响功能

### 缓解措施
1. **Git分支管理**: 每个阶段创建feature分支
2. **版本控制**: 每个阶段完成后打tag
3. **备份**: 重构前完整备份
4. **渐进式**: 可以先完成部分阶段，逐步推进
5. **测试**: 每个阶段完成后充分测试

---

## 后续维护建议

### 日常工作流
```bash
# 写作
hexo new post "文章标题"

# 本地预览
hexo server

# 构建
hexo generate

# 部署
hexo deploy
```

### 定期维护
- **每月**: 更新依赖 `npm update`
- **每季度**: Lighthouse性能审计
- **持续**: 添加内容，保持博客活跃
