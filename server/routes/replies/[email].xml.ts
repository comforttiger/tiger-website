import { serverQueryContent } from "#content/server";
import RSS from "rss";

export default defineEventHandler(async (event) => {
  // Access dynamic params from the event context directly
  const email = event.context.params!['email.xml']
    ? event.context.params!['email.xml'].replace('.xml', '')
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
    title: `replies to your comments on tiger's blog :3`,
    description: `rss feed for replies to comments made by the user with the email hash ${hashedEmail}`,
    site_url: "https://tiger.kittycat.homes",
    feed_url: `https://tiger.kittycat.homes/replies/${hashedEmail}.xml`,
  });

  // Query all comments made with this hashed email
  const comments = await serverQueryContent(event)
    .where({ email: hashedEmail }) // Query using the MD5-hashed email
    .find();

  // For each comment, find its replies
  for (const comment of comments) {
    
    const replies = await serverQueryContent(event)
      .where({ reply: comment._id })
      .where({ email: { $ne: hashedEmail } })
      .find();

    for (const reply of replies) {
      const post = await serverQueryContent(event)
        .where({ _path: "/" + reply._path!.split("/").at(-2)! })
        .findOne();

      // Add each reply to the RSS feed
      feed.item({
        title: `${reply.name} replied to your comment on "${post.title}"!`,
        url: `https://tiger.kittycat.homes${post._path}#${reply.timestamp}`,
        description: reply.description, // Reply content
      });
    }
  }

  // Output the RSS feed as XML
  const feedString = feed.xml({ indent: true });
  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
});
