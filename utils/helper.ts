export function isPathMatch(currentPath: string, pageRoute: string): boolean {
  const regex = new RegExp(`^${pageRoute.replace(/\//g, "\\/")}(\/.*)?$`);
  return regex.test(currentPath);
}
