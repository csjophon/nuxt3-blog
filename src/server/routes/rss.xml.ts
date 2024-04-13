import RSS from 'rss';
import showdown from 'showdown'
import { join } from 'path'
import { readFile } from 'fs/promises'

const SITE_URL = 'http://josenong.top'

const converter = new showdown.Converter()



//@ts-ignore
export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'My Site',
    site_url: SITE_URL,
    feed_url: SITE_URL + '/rss.xml',
  })

  const blogPosts = [];
  const converter = new showdown.Converter();

  // .slice(0, 10) // limit the output to 10 posts only
  for (const doc of blogPosts) {
    const filename = join(process.cwd(), 'content', doc._file)
    const markdownText = await readFile(filename, 'utf8')
    let contentWithoutFrontmatter = markdownText
    const frontmatterEndIndex = markdownText.indexOf('---', 3)
    if (frontmatterEndIndex !== -1) {
      contentWithoutFrontmatter = markdownText.slice(frontmatterEndIndex + 3).trim()
    }
    const html = converter.makeHtml(contentWithoutFrontmatter)
    feed.item({
      title: doc.title ?? '-',
      url: `${SITE_URL}${doc._path}`,
      date: doc.createdAt,
      description: doc.description,
      custom_elements: [
        { 'content:encoded': { _cdata: html } }
      ]
    })
  }
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feed.xml({ indent: true }))
});
