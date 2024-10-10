import RSS from 'rss';
//@ts-ignore
import { serverQueryContent } from '#content/server'

const SITE_URL = 'http://rwilds.top'

//@ts-ignore
export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: "Jory Joestar's blog ",
    site_url: SITE_URL,
    feed_url: SITE_URL + '/rss.xml',
  })

  const contentList = await serverQueryContent(event).find()

  const posts = contentList

  console.log(posts)

  for (const doc of posts) {
    feed.item({
      title: doc.title ?? '-',
      url: `${SITE_URL}${doc._path}`,
      date: doc.date,
      description: doc.desc,
    })
  }
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feed.xml({ indent: true }))
});
