/**
 * Blog Page Generator
 * 为 /blog/ 路径生成博客列表页
 */

hexo.extend.generator.register('blog', function(locals) {
  const config = this.config;
  const posts = locals.posts.sort('-date');
  const perPage = config.per_page || 10;
  const paginationDir = config.pagination_dir || 'page';

  return {
    path: 'blog/index.html',
    layout: ['blog', 'index'],
    data: Object.assign({}, locals, {
      posts: posts,
      current: 1,
      total: Math.ceil(posts.length / perPage),
      per_page: perPage,
      base: 'blog/',
      prev_link: null,
      next_link: posts.length > perPage ? `blog/${paginationDir}/2/` : null
    })
  };
});

// 生成分页
hexo.extend.generator.register('blog-pagination', function(locals) {
  const config = this.config;
  const posts = locals.posts.sort('-date');
  const perPage = config.per_page || 10;
  const paginationDir = config.pagination_dir || 'page';
  const total = Math.ceil(posts.length / perPage);

  const pages = [];

  for (let i = 2; i <= total; i++) {
    const pageStart = (i - 1) * perPage;
    const pagePosts = posts.slice(pageStart, pageStart + perPage);

    pages.push({
      path: `blog/${paginationDir}/${i}/index.html`,
      layout: ['blog', 'index'],
      data: Object.assign({}, locals, {
        posts: pagePosts,
        current: i,
        total: total,
        per_page: perPage,
        base: 'blog/',
        prev_link: i > 1 ? (i === 2 ? 'blog/' : `blog/${paginationDir}/${i - 1}/`) : null,
        next_link: i < total ? `blog/${paginationDir}/${i + 1}/` : null
      })
    });
  }

  return pages;
});
