import { promises as fs } from 'fs';

export async function setMailTemplateContent(
  template: string,
  hash: string,
  title: string,
  content: string,
  entityType: string = "subscribers"
) {
  const logoLink = process.env.NEXT_PUBLIC_HOST + "/icons/logo.png";
  const unsubscribeLink =
    process.env.NEXT_PUBLIC_HOST +
    "/api/unsubscribe?hash=" +
    hash +
    "&entityType=" +
    entityType;

  let templateContent = template
    .replace("{{LOGO_LINK}}", logoLink)
    .replace("{{TITLE}}", title)
    .replace("{{CONTENT}}", content)
    .replace("{{UNSUBSCRIBE_LINK}}", unsubscribeLink);

  return templateContent;
}

export async function getTemplate(templateName = "newsletter") {
  const templatePath = process.cwd() + "/templates/" + templateName + ".html";
  const content = await fs.readFile(templatePath, "utf-8");
  return content;
}
