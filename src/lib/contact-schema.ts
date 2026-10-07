import { z } from 'zod';
export const contactSchema = z.object({
 firstName: z.string().trim().min(1, 'First name is required.').max(100),
 lastName: z.string().trim().min(1, 'Last name is required.').max(100),
 companyName: z.string().trim().min(1, 'Company name is required.').max(200),
 email: z.string().trim().email('Please enter a valid email address.').max(254),
 subject: z.enum(['Vegetables', 'Fruit', 'General Enquiry']),
 message: z.string().trim().max(5000),
 consent: z.boolean().refine(v => v, 'Please agree to the Privacy Policy and Terms of Use.'),
 website: z.string().max(0),
});
