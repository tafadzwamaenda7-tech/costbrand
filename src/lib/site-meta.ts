export function siteMeta(title: string, description: string) {
 return { meta: [{ title: `${title} — Costbrand Private Limited` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Costbrand Private Limited` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
