import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  // Create a new RSS feed for replies to comments made by this hashed email
  const feed = new RSS({
    title: `tiger's website :3 - all comments`,
    description: "rss feed for all comments to my blog.",
    site_url: "https://tiger.kittycat.homes",
    feed_url: `https://tiger.kittycat.homes/comments.xml`,
  });

  // Query all comments made with this hashed email
  const comments = await serverQueryContent(event)
    .where({ _path: { $regex: /^\/comments\// } })
    .where({ pending: {$exists: false}})
    .sort({ timestamp: -1 })
    .find();

  // For each comment, find its replies
  for (const comment of comments) {

      const post = await serverQueryContent(event)
        .where({ _path: "/" + comment._path!.split("/").at(-2)! })
        .findOne();

        let content = ""
        const body = await readMarkdown(join(process.cwd(), "content", comment._file ?? ""))
        content = content + body

      // Add each reply to the RSS feed
      feed.item({
        title: `${comment.name} commented on "${post ? post.title : 'guestbook'}"!`,
        url: `https://tiger.kittycat.homes${post ? post._path : 'guestbook'}#${comment.timestamp}`,
        date: comment.timestamp,
        description: comment.description,
        custom_elements: [
          {
            "content:encoded": { _cdata: content },
          },
        ],
      });
    }

  // Output the RSS feed as XML
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