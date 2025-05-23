import { readdirSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

function getCommentCounts(commentsDir: string): Record<string, number> {
  const counts: Record<string, number> = {};

  const postDirs = readdirSync(commentsDir);

  for (const postSlug of postDirs) {
    const postDirPath = join(commentsDir, postSlug);
    if (statSync(postDirPath).isDirectory()) {
      const commentFiles = readdirSync(postDirPath).filter(file =>
        file.endsWith('.md')
      );
      counts[`/${postSlug}`] = commentFiles.length;
    }
  }

  return counts;
}

function main() {
  const commentsPath = join(process.cwd(), 'content/comments');
  const outputPath = join(process.cwd(), 'public/comments.json');

  const commentCounts = getCommentCounts(commentsPath);

  writeFileSync(outputPath, JSON.stringify(commentCounts, null, 2));
  console.log('✅ comments.json generated at', outputPath);
}

main();
