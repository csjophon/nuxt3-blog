import RSS from 'rss';
//@ts-ignore
import { serverQueryContent } from '#content/server'
import { MarkdownNode, MarkdownRoot } from '@nuxt/content';

const SITE_URL = 'http://rwilds.top'

// @ts-ignore
export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: "Jory Joestar's blog ",
    site_url: SITE_URL,
    feed_url: SITE_URL + '/rss.xml',
  })

  const contentList = await serverQueryContent(event).find()

  for (const doc of contentList) {
    const extractedContent = extractContent(doc.body);

    feed.item({
      title: doc.title ?? '-',
      url: `${SITE_URL}${doc._path}`,
      date: doc.date,
      description: doc.desc,
      custom_elements: [{ "content:encoded": extractedContent }],
    })
  }
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feed.xml({ indent: true }))
});


export function extractContent(
  node: MarkdownRoot | MarkdownNode | MarkdownNode[] | null
): string {
  if (!node) return "";
  if (typeof node === "string") {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractContent).join("");
  }
  if (typeof node === "object" && node !== null) {
    if (node.type === "text" && typeof node.value === "string") {
      return node.value;
    }
    if ("tag" in node && typeof node.tag === "string") {
      // 忽略 style 标签
      if (node.tag === "style") {
        return "";
      }

      let attributes = "";
      if (node.props && node.tag !== "pre" && node.tag !== "code") {
        attributes = Object.entries(node.props)
          .filter(([key]) => !["style"].includes(key))
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ");

        if (attributes) {
          attributes = ` ${attributes}`;
        }
      }

      const content = Array.isArray(node.children)
        ? extractContent(node.children)
        : "";

      return `<${node.tag}${attributes}>${content}</${node.tag}>`;
    }
    if (Array.isArray(node.children)) {
      return extractContent(node.children);
    }
  }
  return "";
}
