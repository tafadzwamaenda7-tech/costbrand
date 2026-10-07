import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { contactSchema } from './contact-schema';
export const submitEnquiry = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => contactSchema.parse(input))
 .handler(async ({ data }) => {
  const ip = getRequestHeader('cf-connecting-ip') ?? 'unknown';
  const source = `${ip}:${data.email.toLowerCase()}`;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source));
  const rateKey = Array.from(new Uint8Array(digest)).map(n => n.toString(16).padStart(2,'0')).join('');
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('contact_submissions').insert({ first_name:data.firstName, last_name:data.lastName, company_name:data.companyName, email:data.email, subject:data.subject, message:data.message, consent:data.consent, rate_key:rateKey });
  if (error) return { ok:false, message:error.message.includes('Too many enquiries') ? 'Too many enquiries. Please try again later.' : 'Your enquiry could not be saved. Please try again.' };
  return { ok:true, message:'Thanks for contacting us! Your enquiry has been received.' };
 });
