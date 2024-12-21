import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const converter = new showdown.Converter();
  const feed = new RSS({
    title: "lotte's space :3",
    description: "a feed for everything i'm up to",
    site_url: "https://comforttiger.space",
    feed_url: `https://comforttiger.space/rss.xml`,
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
    let placeholderTitle = "";
    if (doc.image != undefined) {
      content =
        content +
        `<img src='https://comforttiger.space${doc.image}' alt='${doc.image_description}' />`;
    }

    if (doc.photos != undefined) {
      for (const photo of doc.photos) {
        content =
          content + `<img src='https://comforttiger.space${photo}' />`;
      }
    }

    let description = doc.description

    if (doc.ask) {
      const ask = await serverQueryContent(event).where({ _path: {$eq: `/asks/${doc.ask}`} }).findOne();
      const askText = await readPost(join(process.cwd(), "content/asks/", `${doc.ask}.md`))
      const formattedAskText = converter.makeHtml(askText)
      const titleText = `${ask.name} asked: ${askText}`;
      placeholderTitle = titleText.length <= 100 ? titleText : titleText.slice(0, 100) + "...";
      content = content + `<p>${ask.name} asked:</p> ${formattedAskText}<hr><p>answer:</p>`
      description = `${ask.name} asked: ${formattedAskText}`
    }

    const postText = await readPost(join(process.cwd(), "content", doc._file ?? ""))
    const formattedPostText = converter.makeHtml(postText)
    content = content + formattedPostText

    placeholderTitle = placeholderTitle ? placeholderTitle : postText.length <= 100 ? postText : postText.slice(0, 100) + "...";

    feed.item({
      title: doc.no_title ? placeholderTitle : doc.title,
      url: `https://comforttiger.space${doc._path}`,
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

async function readPost(filename: string): Promise<string> {
  const markdownText = await readFile(filename, "utf8");
  let contentWithoutFrontmatter = markdownText;
  const frontmatterEndIndex = markdownText.indexOf("---", 3);
  if (frontmatterEndIndex !== -1) {
    contentWithoutFrontmatter = markdownText
      .slice(frontmatterEndIndex + 3)
      .trim();
  }
  return contentWithoutFrontmatter;
}
