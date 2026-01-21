# 📷 摄影图片上传完整指南

## 🎯 快速开始

### 1️⃣ 准备图片

**推荐规格**:
- **相册封面**: 1200x800px (16:10 比例)
- **照片**: 原始分辨率(建议长边不超过2400px)
- **格式**: JPG (推荐) / PNG / WebP
- **文件大小**: 单张 < 2MB (使用图片压缩工具优化)

**图片命名建议**:
- 封面: `cover.jpg`
- 照片: `1.jpg`, `2.jpg`, `3.jpg`... (按顺序)
- 或使用有意义的名称: `shanghai-bund.jpg`

### 2️⃣ 创建目录结构

```bash
cd /Users/chong/Code/hexo-blog/source

# 创建相册目录
mkdir -p img/gallery/city-night      # 城市夜景
mkdir -p img/gallery/nature          # 自然风光
mkdir -p img/gallery/portrait        # 人像摄影
mkdir -p img/gallery/street          # 街拍纪实
```

### 3️⃣ 上传图片文件

**方法1: 使用Finder拖拽**
1. 打开Finder
2. 导航到 `/Users/chong/Code/hexo-blog/source/img/gallery/city-night/`
3. 将照片拖入文件夹

**方法2: 使用命令行复制**
```bash
# 复制照片到相册目录
cp ~/Pictures/my-photos/shanghai/*.jpg /Users/chong/Code/hexo-blog/source/img/gallery/city-night/

# 重命名文件
cd /Users/chong/Code/hexo-blog/source/img/gallery/city-night/
mv photo1.jpg 1.jpg
mv photo2.jpg 2.jpg
mv photo3.jpg 3.jpg
```

**最终目录结构**:
```
/Users/chong/Code/hexo-blog/source/img/gallery/
├── city-night/
│   ├── cover.jpg          # 封面图 (必需)
│   ├── 1.jpg              # 照片1
│   ├── 2.jpg              # 照片2
│   ├── 3.jpg              # 照片3
│   ├── 4.jpg              # 照片4
│   └── 5.jpg              # 照片5
└── nature/
    ├── cover.jpg
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    └── 4.jpg
```

### 4️⃣ 创建相册文章

在 `/Users/chong/Code/hexo-blog/source/gallery/` 目录创建 markdown 文件:

**示例1: city-night.md**
```yaml
---
title: 城市夜景              # 相册标题
type: gallery                # 必须是 gallery
layout: album                # 必须是 album
date: 2026-01-15            # 拍摄日期
cover: /img/gallery/city-night/cover.jpg  # 封面图路径
description: 2025年春节期间拍摄的上海城市夜景  # 相册描述
location: 上海               # 拍摄地点(可选)
photos:                      # 照片列表
  - image: /img/gallery/city-night/1.jpg
    title: 外滩夜景
    description: 黄浦江畔的璀璨灯光，东方明珠塔在夜幕中熠熠生辉
  - image: /img/gallery/city-night/2.jpg
    title: 东方明珠
    description: 标志性建筑的光影交错，展现城市的现代感
  - image: /img/gallery/city-night/3.jpg
    title: 陆家嘴天际线
    description: 金融中心的繁华，高楼林立的壮观景象
  - image: /img/gallery/city-night/4.jpg
    title: 南京路步行街
    description: 繁华商业街的霓虹灯海
  - image: /img/gallery/city-night/5.jpg
    title: 豫园灯会
    description: 传统与现代的完美融合
---
```

**示例2: nature-landscape.md**
```yaml
---
title: 自然风光
type: gallery
layout: album
date: 2026-01-10
cover: /img/gallery/nature/cover.jpg
description: 记录大自然的四季变换与美丽瞬间
location: 各地
photos:
  - image: /img/gallery/nature/1.jpg
    title: 高山流水
    description: 清晨的山涧溪流，阳光透过树叶洒下斑驳光影
  - image: /img/gallery/nature/2.jpg
    title: 日出云海
    description: 山顶观日出，云海翻滚如梦似幻
  - image: /img/gallery/nature/3.jpg
    title: 秋色层林
    description: 秋天的枫叶红遍山野，色彩斑斓
  - image: /img/gallery/nature/4.jpg
    title: 星空银河
    description: 远离城市喧嚣，仰望璀璨星河
---
```

### 5️⃣ 生成并预览

```bash
cd /Users/chong/Code/hexo-blog

# 清理缓存并生成
hexo clean && hexo generate

# 启动本地服务器预览
hexo server
```

访问: http://localhost:4000/gallery/

---

## 📝 完整操作流程(逐步演示)

### 步骤1: 创建相册目录并上传图片

```bash
# 1. 进入项目目录
cd /Users/chong/Code/hexo-blog/source

# 2. 创建相册目录
mkdir -p img/gallery/my-album

# 3. 复制照片(假设你的照片在 ~/Pictures/vacation/)
cp ~/Pictures/vacation/photo1.jpg img/gallery/my-album/cover.jpg
cp ~/Pictures/vacation/photo2.jpg img/gallery/my-album/1.jpg
cp ~/Pictures/vacation/photo3.jpg img/gallery/my-album/2.jpg
cp ~/Pictures/vacation/photo4.jpg img/gallery/my-album/3.jpg

# 4. 验证文件
ls -lh img/gallery/my-album/
# 应该看到: cover.jpg, 1.jpg, 2.jpg, 3.jpg
```

### 步骤2: 创建相册配置文件

```bash
# 创建相册文章
cat > source/gallery/my-album.md << 'EOF'
---
title: 我的假期
type: gallery
layout: album
date: 2026-01-18
cover: /img/gallery/my-album/cover.jpg
description: 记录假期的美好时光
location: 旅行地
photos:
  - image: /img/gallery/my-album/1.jpg
    title: 照片标题1
    description: 照片描述1
  - image: /img/gallery/my-album/2.jpg
    title: 照片标题2
    description: 照片描述2
  - image: /img/gallery/my-album/3.jpg
    title: 照片标题3
    description: 照片描述3
---
EOF
```

### 步骤3: 生成网站

```bash
# 清理并重新生成
hexo clean && hexo generate

# 启动服务器
hexo server
```

### 步骤4: 查看效果

1. 打开浏览器访问: http://localhost:4000/gallery/
2. 点击相册卡片查看照片
3. 点击照片打开Lightbox全屏查看
4. 使用键盘 ←/→ 切换照片，Esc 关闭

---

## 🎨 高级配置

### 图片优化建议

**1. 压缩图片**
```bash
# 使用ImageMagick压缩
brew install imagemagick

# 批量压缩当前目录所有jpg
for file in *.jpg; do
  convert "$file" -quality 85 -resize 2000x2000\> "compressed_$file"
done

# 或使用在线工具:
# https://tinypng.com/
# https://squoosh.app/
```

**2. 生成WebP格式**(更小的文件体积)
```bash
# 安装cwebp
brew install webp

# 转换为webp
cwebp -q 85 input.jpg -o output.webp
```

**3. 生成缩略图**
```bash
# 生成封面缩略图(1200x800)
convert original.jpg -resize 1200x800^ -gravity center -extent 1200x800 cover.jpg
```

### 批量创建相册

**脚本: create-album.sh**
```bash
#!/bin/bash
# 使用方法: ./create-album.sh album-name "相册标题" "相册描述"

ALBUM_NAME=$1
ALBUM_TITLE=$2
ALBUM_DESC=$3
DATE=$(date +%Y-%m-%d)

# 创建目录
mkdir -p source/img/gallery/$ALBUM_NAME

# 创建markdown文件
cat > source/gallery/$ALBUM_NAME.md << EOF
---
title: $ALBUM_TITLE
type: gallery
layout: album
date: $DATE
cover: /img/gallery/$ALBUM_NAME/cover.jpg
description: $ALBUM_DESC
photos:
  - image: /img/gallery/$ALBUM_NAME/1.jpg
    title: 照片1
    description: 描述1
---
EOF

echo "✅ 相册创建成功: $ALBUM_NAME"
echo "📁 图片目录: source/img/gallery/$ALBUM_NAME/"
echo "📝 配置文件: source/gallery/$ALBUM_NAME.md"
```

---

## ❓ 常见问题

### Q1: 图片不显示?
**检查项**:
1. 图片路径是否正确 (路径以 `/img/gallery/` 开头)
2. 图片文件是否存在
3. 文件名大小写是否匹配
4. 是否运行了 `hexo generate`

### Q2: 相册页面显示为空?
**解决方法**:
1. 确保 Front Matter 中有 `type: gallery`
2. 确保 Front Matter 中有 `layout: album`
3. 检查 `photos` 数组格式是否正确

### Q3: Lightbox不工作?
**检查项**:
1. 确保 `main.js` 已加载
2. 浏览器控制台是否有报错
3. 清理缓存重新生成

### Q4: 图片加载太慢?
**优化建议**:
1. 压缩图片(单张建议 < 1MB)
2. 使用WebP格式
3. 开启图片懒加载(已内置)

### Q5: 如何调整相册卡片大小?
编辑 `themes/caochong-theme/source/css/style.css`:
```css
/* 找到这行(约第2857行) */
.albums-grid {
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  /* 修改 350px 为你想要的宽度 */
}
```

---

## 📊 目录结构总览

```
hexo-blog/
├── source/
│   ├── img/
│   │   └── gallery/               # 相册图片根目录
│   │       ├── city-night/        # 相册1
│   │       │   ├── cover.jpg     # 封面
│   │       │   ├── 1.jpg         # 照片
│   │       │   └── 2.jpg
│   │       ├── nature/            # 相册2
│   │       └── portrait/          # 相册3
│   └── gallery/                   # 相册配置文件
│       ├── index.md              # Gallery首页
│       ├── city-night.md         # 相册1配置
│       ├── nature.md             # 相册2配置
│       └── portrait.md           # 相册3配置
└── themes/
    └── caochong-theme/
        └── layout/
            ├── gallery.ejs        # 相册列表模板
            └── album.ejs          # 相册详情模板
```

---

## 🚀 快速命令参考

```bash
# 创建相册目录
mkdir -p source/img/gallery/album-name

# 复制图片
cp ~/Pictures/*.jpg source/img/gallery/album-name/

# 创建相册配置
touch source/gallery/album-name.md

# 生成网站
hexo clean && hexo generate

# 预览
hexo server

# 部署
hexo deploy
```

---

## 💡 最佳实践

1. **统一命名**: 使用一致的文件命名规范
2. **合理压缩**: 在保证画质的前提下尽量减小文件体积
3. **添加描述**: 为每张照片添加有意义的标题和描述
4. **按主题分类**: 创建不同主题的相册便于管理
5. **定期备份**: 记得备份原始照片文件

需要我帮你创建具体的相册或者解答其他问题吗?
