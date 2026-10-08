import { i as stringType, n as enumType, r as objectType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-schema-BkoDvjED.js
var contactSchema = objectType({
	firstName: stringType().trim().min(1, "First name is required.").max(100),
	lastName: stringType().trim().min(1, "Last name is required.").max(100),
	companyName: stringType().trim().min(1, "Company name is required.").max(200),
	email: stringType().trim().email("Please enter a valid email address.").max(254),
	subject: enumType([
		"Vegetables",
		"Fruit",
		"Agriculture",
		"Machinery and Equipment",
		"International Sourcing",
		"Projects and Partnerships",
		"General Enquiry"
	]),
	message: stringType().trim().max(5e3),
	consent: booleanType().refine((v) => v, "Please agree to the Privacy Policy and Terms of Use."),
	website: stringType().max(0)
});
//#endregion
export { contactSchema as t };
