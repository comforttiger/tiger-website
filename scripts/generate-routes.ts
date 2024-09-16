import { blog_tags, made_tags, unlisted_tags } from "../data/tags";

export function generateRoutes() {
  const startPage = 0
  const endPage = 100
  const routes: string[] = Array.from({ length: endPage - startPage + 1 }, (_, i) => `/?page=${startPage + i}`);

  for (let tag of blog_tags) {
    Array.prototype.push.apply(routes, Array.from({ length: endPage - startPage + 1 }, (_, i) => `/?page=${startPage + i}&tag=${tag}`))
  }
  for (let tag of made_tags) {
    Array.prototype.push.apply(routes, Array.from({ length: endPage - startPage + 1 }, (_, i) => `/?page=${startPage + i}&tag=${tag}`))
  }
  for (let tag of unlisted_tags) {
    Array.prototype.push.apply(routes, Array.from({ length: endPage - startPage + 1 }, (_, i) => `/?page=${startPage + i}&tag=${tag}`))
  }

  return routes
}