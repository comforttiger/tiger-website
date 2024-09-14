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
    .find();
  // const posts = docs.filter((doc) => doc?._path?.includes("/blog"));

  for (const doc of posts) {
    let content = "";
    if (doc.image != undefined) {
      content =
        content + `<img src='https://tiger.kittycat.homes${doc.image}' alt='${doc.image_description}' />`;
    }

    if (doc.photos != undefined) {
      for (let photo in doc.photos) {
        content =
          content + `<img src='https://tiger.kittycat.homes${doc.image}' />`;
      }
    }

    const filename = join(process.cwd(), "content", doc._file ?? "");
    const markdownText = await readFile(filename, "utf8");
    let contentWithoutFrontmatter = markdownText;
    const frontmatterEndIndex = markdownText.indexOf("---", 3);
    if (frontmatterEndIndex !== -1) {
      contentWithoutFrontmatter = markdownText
        .slice(frontmatterEndIndex + 3)
        .trim();
    }
    content = content + converter.makeHtml(contentWithoutFrontmatter);

    feed.item({
      title: doc.title,
      url: `https://tiger.kittycat.homes${doc._path}`,
      date: doc.timestamp,
      categories: doc.tags,
      description: content,
      // custom_elements: [
      //   {
      //     "content:encoded": { _cdata: img + html },
      //   },
      // ],
    });
  }

  // const made_posts = docs.filter((doc) => doc?._path?.includes("/made"));

  // for (const doc of made_posts) {
  //   let content = '';
  //   if (doc.photos != undefined) {
  //     for (let photo of doc.photos) {
  //       content = content + `<img src='https://tiger.kittycat.homes${photo}' />`
  //     }
  //   } else if (doc.image != undefined) {
  //     content = `<img src='https://tiger.kittycat.homes${doc.image}' />`
  //   }
  //   if (doc.description != undefined) {
  //     content = content + " <p>" + doc.description + "</p>"
  //   }
  //   if (doc.taken_with != undefined) {
  //     content = content + " <p>taken with " + doc.taken_with + "</p>"
  //   }

  //   if (doc.has_content) {
  //     const filename = join(process.cwd(), "content", doc._file ?? "");
  //     const markdownText = await readFile(filename, "utf8");
  //     let contentWithoutFrontmatter = markdownText;
  //     const frontmatterEndIndex = markdownText.indexOf("---", 3);
  //     if (frontmatterEndIndex !== -1) {
  //       contentWithoutFrontmatter = markdownText
  //         .slice(frontmatterEndIndex + 3)
  //         .trim();
  //     }
  //     const html = converter.makeHtml(contentWithoutFrontmatter);
  //     content = content + html
  //   }

  //   feed.item({
  //     title: doc.title,
  //     url: doc.url,
  //     date: doc.date,
  //     description: doc.description,
  //     custom_elements: [
  //       {
  //         "content:encoded": { _cdata: content },
  //       },
  //     ],
  //   });
  // }

  const feedString = feed.xml({ indent: true });

  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedString);
});
