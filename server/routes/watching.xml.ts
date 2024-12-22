import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const converter = new showdown.Converter();
  const feed = new RSS({
    title: "lotte's movie diary :3",
    description: "stuff im watching!!!",
    site_url: "https://comforttiger.space/watching",
    feed_url: `https://comforttiger.space/watching.xml`,
    custom_namespaces: {
      media: "http://search.yahoo.com/mrss/",
    },
  });

  const posts = await serverQueryContent(event)
    .sort({ timestamp: -1 })
    .where({ _partial: false })
    .where({ watch_tags: { $exists: true } })
    .where({ watch_tags: { $not: { $contains: "draft" } } })
    .find();

  for (const doc of posts) {
    let content = "";
    let placeholderTitle = "";
    // if (doc.image != undefined) {
    //   content =
    //     content +
    //     `<img src='https://comforttiger.space${doc.image}' alt='${doc.image_description}' />`;
    // }

    let description = doc.description

    const postText = await readPost(join(process.cwd(), "content", doc._file ?? ""))
    const formattedPostText = converter.makeHtml(postText)
    content = content + formattedPostText

    placeholderTitle = placeholderTitle ? placeholderTitle : postText.length <= 100 ? postText : postText.slice(0, 100) + "...";

    feed.item({
      title: doc.no_title ? placeholderTitle : doc.title,
      url: `https://comforttiger.space/watching#${doc._path?.split('/')[2]}`,
      date: doc.timestamp,
      categories: doc.watch_tags,
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
