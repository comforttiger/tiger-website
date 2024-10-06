import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const converter = new showdown.Converter();
  const feed = new RSS({
    title: "tiger's website :3",
    description: "a feed for everything i'm up to",
    site_url: "https://tiger.kittycat.homes",
    feed_url: `https://tiger.kittycat.homes/rss.xml`,
    custom_namespaces: {
      media: "http://search.yahoo.com/mrss/",
    },
  });

  const posts = await serverQueryContent(event)
    .sort({ timestamp: -1 })
    .where({ _partial: false })
    .where({ tags: { $exists: true } })
    .where({ tags: { $not: { $contains: "draft" } } })
    .find();

  for (const doc of posts) {
    let content = "";
    if (doc.image != undefined) {
      content =
        content +
        `<img src='https://tiger.kittycat.homes${doc.image}' alt='${doc.image_description}' />`;
    }

    if (doc.photos != undefined) {
      for (let photo in doc.photos) {
        content =
          content + `<img src='https://tiger.kittycat.homes${doc.image}' />`;
      }
    }

    let description = doc.description

    if (doc.ask) {
      const ask = await serverQueryContent(event).where({ _path: {$eq: `/asks/${doc.ask}`} }).findOne();
      const askText = await readMarkdown(join(process.cwd(), "content/asks/", `${doc.ask}.md`))
      content = content + `<p>${ask.name} asked:</p> ${askText}<hr>`
      description = `${ask.name} asked: ${askText}`
    }

    const postText = await readMarkdown(join(process.cwd(), "content", doc._file ?? ""))
    content = content + postText

    feed.item({
      title: doc.title,
      url: `https://tiger.kittycat.homes${doc._path}`,
      date: doc.timestamp,
      categories: doc.tags,
      description: description,
      custom_elements: [
        {
          "content:encoded": { _cdata: content },
        },
      ],
    });
  }

  const feedString = feed.xml({ indent: true });

  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
});

async function readMarkdown(filename: string): Promise<string> {
  const converter = new showdown.Converter();

  const markdownText = await readFile(filename, "utf8");
  let contentWithoutFrontmatter = markdownText;
  const frontmatterEndIndex = markdownText.indexOf("---", 3);
  if (frontmatterEndIndex !== -1) {
    contentWithoutFrontmatter = markdownText
      .slice(frontmatterEndIndex + 3)
      .trim();
  }
  return converter.makeHtml(contentWithoutFrontmatter)
}
