import { serverQueryContent } from "#content/server";
import RSS from "rss";
import showdown from "showdown";
import { join } from "path";
import { readFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const converter = new showdown.Converter();
  const feed = new RSS({
    title: "tiger's website :3 ~ blog posts",
    description: "a feed for my postss",
    site_url: "https://tiger.kittycat.homes/blog",
    feed_url: `https://tiger.kittycat.homes/blog/rss.xml`,
    custom_namespaces: {
      "media": "http://search.yahoo.com/mrss/",
    },
  });

  const docs = await serverQueryContent(event)
    .sort({ date: -1 })
    .where({ _partial: false })
    .find();
  const posts = docs.filter((doc) => doc?._path?.includes("/blog"));

  for (const doc of posts) {
    const filename = join(process.cwd(), "content", doc._file ?? "");
    const markdownText = await readFile(filename, "utf8");
    let contentWithoutFrontmatter = markdownText;
    const frontmatterEndIndex = markdownText.indexOf("---", 3);
    if (frontmatterEndIndex !== -1) {
      contentWithoutFrontmatter = markdownText
        .slice(frontmatterEndIndex + 3)
        .trim();
    }
    const html = converter.makeHtml(contentWithoutFrontmatter);

    let img = '';

    if (doc.image != undefined) {
      img = `<img src='https://tiger.kittycat.homes${doc.image}' />`;
    }

    feed.item({
      title: doc.title,
      url: `https://tiger.kittycat.homes${doc._path}`,
      date: doc.date,
      description: doc.description,
      custom_elements: [
        {
          "content:encoded": { _cdata: img + html },
        },
      ],
    });
  }

  const feedString = feed.xml({ indent: true });

  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
});
