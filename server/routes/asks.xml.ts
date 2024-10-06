import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  // Create a new RSS feed for replies to comments made by this hashed email
  const feed = new RSS({
    title: `tiger's website :3 - all comments`,
    description: "rss feed for asks, so i can get notified about new unanswered asks! this one's really just for me, i dunno why you'd want it!",
    site_url: "https://tiger.kittycat.homes",
    feed_url: `https://tiger.kittycat.homes/asks.xml`,
  });

  // Query all comments made with this hashed email
  const asks = await serverQueryContent(event)
    .where({ _path: { $regex: /^\/asks\// } })
    .sort({ timestamp: -1 })
    .find();

  // For each comment, find its replies
  for (const ask of asks) {

      const post = await serverQueryContent(event)
        .where({ ask: ask._path?.split('/').at(-1) })
        .findOne();

        let title = ""
        let timestamp = 0
        let url = ""

        if (post) {
          title = `ask from ${ask.name} (ANSWERED)`
          url = `https://tiger.kittycat.homes${post._path}`
          timestamp = post.timestamp
        } else {
          title = `ask from ${ask.name}`
          url = `https://tiger.kittycat.homes${ask._path}`
          timestamp = ask.timestamp
        }

        let content = ""
        const body = await readMarkdown(join(process.cwd(), "content", ask._file ?? ""))
        content = content + `<p>${ask.name} asked:</p> ${body}`

      // Add each reply to the RSS feed
      feed.item({
        title: title,
        url: url,
        date: timestamp,
        description: ask.description,
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