import { createFileRoute } from '@tanstack/react-router';
import { PolicyPage } from '@/components/policy-page';
import { siteMeta } from '@/lib/site-meta';
export const Route = createFileRoute('/privacy-policy')({head:()=>siteMeta('Privacy Policy','How Genesis Exotics collects, uses and protects your personal information.'),component:()=> <PolicyPage slug="privacy-policy"/>});
