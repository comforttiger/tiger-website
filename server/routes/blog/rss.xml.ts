import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const converter = new showdown.Converter();
  const feed = new RSS({
    title: "tiger's blog :3",
    site_url: "https://tiger.kittycat.homes",
    feed_url: `https://tiger.kittycat.homes/blog/rss.xml`,
  });

  const docs = await serverQueryContent(event)
    .sort({ date: -1 })
    .where({ _partial: false })
    .find();
  const posts = docs.filter((doc) => doc?._path?.includes("/blog"));

  for (const doc of posts) {
    const filename = join(process.cwd(), 'content', doc._file ?? "")
    const markdownText = await readFile(filename, 'utf8')
    let contentWithoutFrontmatter = markdownText
    const frontmatterEndIndex = markdownText.indexOf('---', 3)
    if (frontmatterEndIndex !== -1) {
      contentWithoutFrontmatter = markdownText.slice(frontmatterEndIndex + 3).trim()
    }
    const html = converter.makeHtml(contentWithoutFrontmatter)

    feed.item({
      title: doc.title,
      url: `https://tiger.kittycat.homes${doc._path}`,
      date: doc.date,
      description: doc.description,
      custom_elements: [
        { 'content:encoded': { _cdata: html } }
      ]
    });
  }
  const feedString = feed.xml({ indent: true });

  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
});