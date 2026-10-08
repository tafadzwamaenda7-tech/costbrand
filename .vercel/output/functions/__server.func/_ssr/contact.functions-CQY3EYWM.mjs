import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { t as contactSchema } from "./contact-schema-BkoDvjED.mjs";
import { t as getRequestHeader } from "./request-response-C1EYbiNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact.functions-CQY3EYWM.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var submitEnquiry_createServerFn_handler = createServerRpc({
	id: "3477bbe8085620ba9289f59e66cf1dd7377291ec33cebc9aefe265ae382244ea",
	name: "submitEnquiry",
	filename: "src/lib/contact.functions.ts"
}, (opts) => submitEnquiry.__executeServer(opts));
var submitEnquiry = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(submitEnquiry_createServerFn_handler, async ({ data }) => {
	const source = `${getRequestHeader("cf-connecting-ip") ?? "unknown"}:${data.email.toLowerCase()}`;
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
	const rateKey = Array.from(new Uint8Array(digest)).map((n) => n.toString(16).padStart(2, "0")).join("");
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("contact_submissions").insert({
		first_name: data.firstName,
		last_name: data.lastName,
		company_name: data.companyName,
		email: data.email,
		subject: data.subject,
		message: data.message,
		consent: data.consent,
		rate_key: rateKey
	});
	if (error) return {
		ok: false,
		message: error.message.includes("Too many enquiries") ? "Too many enquiries. Please try again later." : "Your enquiry could not be saved. Please try again."
	};
	return {
		ok: true,
		message: "Thanks for contacting us! Your enquiry has been received."
	};
});
//#endregion
export { submitEnquiry_createServerFn_handler };
