import { readdirSync, readFileSync, statSync } from 'fs'; // Import synchronous file system functions
import path from 'path'; // Import path for resolving file paths

// Define an interface for the parsed frontmatter
interface Frontmatter {
  email?: string; // Email is optional
  [key: string]: any; // Allow other optional frontmatter fields
}

// Function to parse frontmatter from the Markdown content
function parseFrontmatter(content: string): Frontmatter {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/; // Regex to match frontmatter
  const match = content.match(frontmatterRegex);
  
  if (match) {
    const frontmatter = match[1];
    const lines = frontmatter.split('\n');
    const frontmatterObj: Frontmatter = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(': ');
      if (key && value) {
        frontmatterObj[key.trim()] = value.trim();
      }
    });
    
    return frontmatterObj; // Return the frontmatter as an object
  }

  return {}; // Return an empty object if no frontmatter is found
}

// Function to recursively read files from a directory
function readDirRecursively(dir: string): string[] {
  const results: string[] = [];
  const list = readdirSync(dir); // Read the contents of the directory

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = statSync(filePath); // Get the file status

    if (stat && stat.isDirectory()) {
      // If it's a directory, recurse into it
      results.push(...readDirRecursively(filePath));
    } else if (path.extname(file) === '.md') {
      // If it's a Markdown file, add it to the results
      results.push(filePath);
    }
  });

  return results; // Return the array of file paths
}

function generateEmailRoutes(): string[] {
  const commentsDir = path.join(process.cwd(), 'content/comments'); // Directory path for comments
  const routes: string[] = []; // Array to hold email routes

  // Recursively read all Markdown files in the comments directory
  const markdownFiles = readDirRecursively(commentsDir);

  // Iterate over each Markdown file
  for (const filePath of markdownFiles) {
    const content: string = readFileSync(filePath, 'utf-8'); // Read the file content synchronously

    // Parse frontmatter to extract email
    const { email } = parseFrontmatter(content); // Get the email from the parsed frontmatter

    // If the email exists, add it to the routes
    if (email && email.length) {
      routes.push(`/replies/${email}.xml`);
    }
  }

  return routes; // Return the array of routes
}

function generatePageRoutes(): string[] {
  const contentDir = path.join(process.cwd(), 'content');
  const commentsDir = path.join(contentDir, 'comments'); // Path to comments directory
  const routes: string[] = []; // Array to hold the page routes

  // Recursively read all Markdown files in the content directory
  const markdownFiles = readDirRecursively(contentDir);

  // Iterate over each Markdown file
  for (const filePath of markdownFiles) {
    // Check if the file path starts with the comments directory
    if (filePath.startsWith(commentsDir)) {
      continue; // Skip any files in the comments directory
    }

    // Convert the file path to a route
    const relativePath = path.relative(contentDir, filePath); // Get the path relative to content directory
    const route = '/' + relativePath.replace(/\.md$/, '').replace(/\\/g, '/'); // Remove .md and replace backslashes with forward slashes

    // Add the generated route to the routes array
    routes.push(route);
  }

  return routes; // Return the array of routes
}

// Main function to generate routes
export function generateRoutes(): string[] {
  return [
    ...generateEmailRoutes(),
    ...generatePageRoutes(), // Include the page routes in the final routes
  ];
}

