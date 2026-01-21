# 曹冲个人博客使用指南

## 📦 仓库说明

- **源码仓库**: [hexo-chong](https://github.com/chong-zzxy/hexo-chong) - 博客源文件、主题、配置
- **部署仓库**: [chong-zzxy.github.io](https://github.com/chong-zzxy/chong-zzxy.github.io) - 自动生成的静态网站
- **在线地址**: https://chong-zzxy.github.io

---

## 🚀 首次设置（新电脑）

### 1. 克隆源码仓库
```bash
cd ~/Code
git clone https://github.com/chong-zzxy/hexo-chong.git
cd hexo-chong
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置 Git 凭证（用于自动部署）
```bash
git config credential.helper store
echo "https://YOUR_GITHUB_TOKEN@github.com" > ~/.git-credentials
```

> **注意**: 将 `YOUR_GITHUB_TOKEN` 替换为你的 GitHub Personal Access Token

### 4. 配置 Git 用户信息（如果尚未配置）
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

---

## ✍️ 日常写作流程

### 创建新文章
```bash
cd ~/Code/hexo-chong
hexo new post "文章标题"
```

这会在 `source/_posts/` 目录下创建 `文章标题.md` 文件。

### 编辑文章
文章使用 Markdown 格式，基本结构：

```markdown
---
title: 文章标题
date: 2026-01-21 22:00:00
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
---

这里是文章摘要，会显示在首页。

<!-- more -->

这里是文章正文...
```

### 本地预览
```bash
npm run server
```

然后在浏览器打开 http://localhost:4000 预览效果。

按 `Ctrl + C` 停止服务器。

---

## 🌐 发布博客

### 一键部署到 GitHub Pages
```bash
npm run deploy
```

等待几分钟后，访问 https://chong-zzxy.github.io 即可看到更新。

### 推送源码到 GitHub（备份）
```bash
git add .
git commit -m "新增文章：文章标题"
git push origin main
```

---

## 📸 添加图片

### 方法一：使用图床（推荐）
将图片上传到图床（如 GitHub、imgur），然后在文章中使用 URL：

```markdown
![图片描述](https://图床URL/图片.jpg)
```

### 方法二：本地图片
将图片放在 `source/img/` 目录下，然后在文章中引用：

```markdown
![图片描述](/img/图片.jpg)
```

---

## 🎨 主题和配置

### 主题配置
- **主题名称**: caochong-theme（自定义主题）
- **配置文件**: `themes/caochong-theme/_config.yml`
- **样式文件**: `themes/caochong-theme/source/css/style.css`

### 网站配置
- **主配置文件**: `_config.yml`
- **常用配置项**:
  - `title`: 网站标题
  - `author`: 作者名称
  - `url`: 网站地址
  - `language`: 语言（zh-CN 或 en）

---

## 📝 常用命令

| 命令 | 说明 |
|------|------|
| `hexo new post "标题"` | 创建新文章 |
| `hexo new page "页面名"` | 创建新页面 |
| `npm run server` | 本地预览（http://localhost:4000） |
| `npm run build` | 生成静态文件到 public/ |
| `npm run deploy` | 部署到 GitHub Pages |
| `npm run clean` | 清理缓存和已生成的文件 |

---

## 🔧 高级操作

### 修改导航栏
编辑 `themes/caochong-theme/_config.yml`，找到 `menu` 部分：

```yaml
menu:
  首页: /
  博客: /blog/
  归档: /archives/
  相册: /gallery/
  关于: /about/
```

### 创建新页面
```bash
hexo new page "页面名称"
```

然后编辑 `source/页面名称/index.md`。

### 修改主题样式
编辑 `themes/caochong-theme/source/css/style.css`，修改后运行：

```bash
npm run deploy
```

---

## 🐛 常见问题

### 1. 部署后网站显示 404
- 清除浏览器缓存，强制刷新（Cmd + Shift + R）
- 等待 2-5 分钟让 GitHub Pages 完成部署

### 2. 本地预览样式错误
```bash
npm run clean
npm run server
```

### 3. 部署失败
检查 Git 凭证是否配置正确：
```bash
cat ~/.git-credentials
```

应该显示：
```
https://YOUR_GITHUB_TOKEN@github.com
```

### 4. 图片显示不出来
- 检查图片路径是否正确
- 使用浏览器开发者工具查看图片 URL
- 确保图片文件在 `source/img/` 目录下

---

## 📚 项目结构

```
hexo-chong/
├── _config.yml                 # 网站配置
├── package.json                # 依赖配置
├── source/                     # 源文件目录
│   ├── _posts/                # 文章目录
│   │   └── *.md              # Markdown 文章
│   ├── about/                 # 关于页面
│   ├── gallery/               # 相册页面
│   └── img/                   # 图片资源
├── themes/                     # 主题目录
│   └── caochong-theme/        # 自定义主题
│       ├── _config.yml        # 主题配置
│       ├── layout/            # 模板文件
│       └── source/            # 主题资源
│           ├── css/           # 样式文件
│           └── js/            # 脚本文件
├── public/                     # 生成的静态文件（不提交到 Git）
└── .deploy_git/               # 部署临时文件（不提交到 Git）
```

---

## 🎯 快速参考

### 完整发布流程
```bash
# 1. 进入项目目录
cd ~/Code/hexo-chong

# 2. 写文章
hexo new post "文章标题"
vim source/_posts/文章标题.md  # 或用你喜欢的编辑器

# 3. 预览（可选）
npm run server

# 4. 部署
npm run deploy

# 5. 备份源码
git add .
git commit -m "新增文章：文章标题"
git push origin main
```

### 只修改样式/配置
```bash
# 1. 修改文件
vim themes/caochong-theme/source/css/style.css

# 2. 部署
npm run deploy

# 3. 备份
git add .
git commit -m "更新样式"
git push origin main
```

---

## 📖 相关文档

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Markdown 语法](https://markdown.com.cn/basic-syntax/)
- [GitHub Pages 文档](https://docs.github.com/zh/pages)

---

## 🔐 安全提示

⚠️ **重要**: `~/.git-credentials` 文件包含 GitHub Token，请勿分享或提交到公共仓库！

如果 Token 泄露，立即到 GitHub 删除旧 Token 并生成新的：
https://github.com/settings/tokens

---

最后更新：2026-01-21
