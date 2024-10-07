import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  // Access dynamic params from the event context directly
  const email = event.context.params!["email.xml"]
    ? event.context.params!["email.xml"].replace(".xml", "")
    : ""; // Should get the MD5 hashed email here

  // Handle case where the email hash is undefined
  if (!email) {
    throw createError({
      statusCode: 400,
      message: "there's no feed for this email yet",
    });
  }

  // Email is already an MD5 hash, so no need to decode
  const hashedEmail = email;

  // Create a new RSS feed for replies to comments made by this hashed email
  const feed = new RSS({
    title: `tiger's website :3 - replies`,
    description: `rss feed for replies to comments made by the user with the email hash ${hashedEmail}`,
    site_url: "https://tiger.kittycat.homes",
    feed_url: `https://tiger.kittycat.homes/replies/${hashedEmail}.xml`,
  });

  // Query all comments made with this hashed email
  const comments = await serverQueryContent(event)
    .where({ email: hashedEmail }) // Query using the MD5-hashed email
    .sort({ timestamp: -1 })
    .find();

  // For each comment, find its replies
  for (const comment of comments) {
    const replies = await serverQueryContent(event)
      .where({ reply: comment._id })
      .where({ email: { $ne: hashedEmail } })
      .where({ pending: { $exists: false } })
      .sort({ timestamp: -1 })
      .find();

    for (const reply of replies) {
      const post = await serverQueryContent(event)
        .where({ _path: "/" + reply._path!.split("/").at(-2)! })
        .findOne();

      let content = "";
      const parentComment = await readMarkdown(
        join(process.cwd(), "content", comment._file ?? "")
      );
      content = content + `<p>your comment:</p>${parentComment}<hr>`;

      const replyComment = await readMarkdown(
        join(process.cwd(), "content", reply._file ?? "")
      );
      content = content + `<p>reply from ${reply.name}: ${replyComment}`;

      // Add each reply to the RSS feed
      feed.item({
        title: `${reply.name} replied to your comment on "${post.title}"!`,
        url: `https://tiger.kittycat.homes${post._path}#${reply.timestamp}`,
        date: reply.timestamp,
        description: reply.description,
        custom_elements: [
          {
            "content:encoded": { _cdata: content },
          },
        ],
      });
    }
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
  return converter.makeHtml(contentWithoutFrontmatter);
}
