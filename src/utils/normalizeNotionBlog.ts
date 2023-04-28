export const normalizeNotionFrontMatter = (frontmatter: any) => {
  return {
    slug: frontmatter.slug,
    status: frontmatter.status.name,
    title: frontmatter.title,
    author: frontmatter.author.name,
    category: frontmatter.category.name,
    price: frontmatter.price,
    order: frontmatter.order ?? 999,
    cover: frontmatter.cover[0].file.url,
    date: frontmatter.publish_date.start,
    summary: frontmatter.summary,
  };
};
