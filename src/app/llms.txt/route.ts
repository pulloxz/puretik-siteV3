import { getDictionary } from "@/i18n/get-dictionary";
import { appMeta } from "@/data/apps";
import { projectMeta } from "@/data/projects";
import { COMPANY } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

// A plain-text summary of the company for AI assistants (the llms.txt
// convention). Built from the same data as the pages, so it never drifts.
export const dynamic = "force-static";

export function GET() {
  const en = getDictionary("en");
  const ar = getDictionary("ar");

  const services = en.services.items
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");

  const products = en.projects.items
    .map((p) => {
      const url = projectMeta[p.slug as keyof typeof projectMeta]?.url;
      return `- [${p.name}](${url}): ${p.category}. ${p.summary}`;
    })
    .join("\n");

  const apps = en.apps.items
    .map((a) => {
      const meta = appMeta[a.slug as keyof typeof appMeta] as {
        apple?: string;
        google?: string;
      };
      const links = [
        meta.apple && `[App Store](${meta.apple})`,
        meta.google && `[Google Play](${meta.google})`,
      ]
        .filter(Boolean)
        .join(", ");
      return `- ${a.name}: ${a.description} ${links}`;
    })
    .join("\n");

  const body = `# ${COMPANY.name} (${ar.meta.title.split("|")[0].trim()})

> ${en.meta.description}

PureTik is a software company based in Baghdad, Iraq, founded in ${COMPANY.founded}. We design and build websites, mobile apps, online stores and custom business systems for clients in Iraq. The site is available in Arabic and English.

## Services

${services}

## Products and projects

${products}

## Mobile apps

${apps}

## Contact

- Website (Arabic): ${SITE_URL}/ar
- Website (English): ${SITE_URL}/en
- Email: ${COMPANY.email}
- Phone: ${COMPANY.phoneDisplay}, ${COMPANY.phone2Display}
- Address: ${en.contact.address}, Baghdad, Iraq
- Instagram: ${COMPANY.social.instagram}
- LinkedIn: ${COMPANY.social.linkedin}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
