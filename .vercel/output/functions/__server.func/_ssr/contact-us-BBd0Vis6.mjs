import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as assets, t as Button } from "./site-assets-C9zmdWbE.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as contactSchema } from "./contact-schema-BkoDvjED.mjs";
import { n as useServerFn, t as submitEnquiry } from "./contact.functions-CK1O4Wb5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-us-BBd0Vis6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const submit = useServerFn(submitEnquiry);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		setError("");
		const result = contactSchema.safeParse({
			firstName: form.get("firstName"),
			lastName: form.get("lastName"),
			companyName: form.get("companyName"),
			email: form.get("email"),
			subject: form.get("subject"),
			message: form.get("message"),
			consent: form.get("consent") === "on",
			website: form.get("website")
		});
		if (!result.success) {
			setError(result.error.issues[0]?.message ?? "Please check the form.");
			return;
		}
		setStatus("sending");
		try {
			const response = await submit({ data: result.data });
			if (response.ok) setStatus("success");
			else {
				setError(response.message);
				setStatus("idle");
			}
		} catch {
			setError("Your enquiry could not be saved. Please try again.");
			setStatus("idle");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "contact-page-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "contact-reference-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "contact-brand",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "brand-lockup brand-lockup-inverse",
						"aria-label": "Costbrand home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "contact-logo",
							src: assets.logo,
							alt: "Costbrand"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "From farm to market. From Zimbabwe to the world." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-brand-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Agriculture" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Horticulture" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Machinery" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "International sourcing" })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "contact-form-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "contact-form-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-eyebrow",
							children: "Contact us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "section-heading",
							children: "Send us a message"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "contact-intro",
							children: "Share your requirements and a member of our team will get back to you with a tailored response."
						}),
						status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "form-success",
							role: "status",
							children: "Thanks for contacting us! Your enquiry has been received."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "contact-form",
							onSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "required",
									children: "*"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "firstName",
											name: "firstName",
											"aria-label": "First name",
											autoComplete: "given-name",
											required: true,
											maxLength: 100
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "First" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "lastName",
											name: "lastName",
											"aria-label": "Last name",
											autoComplete: "family-name",
											required: true,
											maxLength: 100
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Last" })]
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field narrow-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "companyName",
										children: ["Company Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "required",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "companyName",
										name: "companyName",
										autoComplete: "organization",
										required: true,
										maxLength: 200
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field narrow-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "email",
										children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "required",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "email",
										name: "email",
										type: "email",
										autoComplete: "email",
										required: true,
										maxLength: 254
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: ["Enquiry area ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "required",
									children: "*"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "radio-options",
									children: [
										"Vegetables",
										"Fruit",
										"Agriculture",
										"Machinery and Equipment",
										"International Sourcing",
										"Projects and Partnerships",
										"General Enquiry"
									].map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "subject",
										value: subject,
										required: true
									}), subject] }, subject))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "message",
										children: "Comment or Message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "message",
										name: "message",
										rows: 5,
										maxLength: 5e3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
									"I agree to the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/privacy",
										children: "Privacy Policy"
									}),
									" and",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										children: "Terms of Use"
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "consent-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "consent",
										required: true
									}), "I agree"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									hidden: true,
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "website",
										children: "Website"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "website",
										name: "website",
										tabIndex: -1,
										autoComplete: "off",
										defaultValue: ""
									})]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "form-error",
									role: "alert",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "contact-submit w-fit",
									type: "submit",
									disabled: status === "sending",
									children: status === "sending" ? "Submitting…" : "Submit"
								})
							]
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "copyright-band",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Copyright ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Costbrand Private Limited. All Rights Reserved."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Company No: 16360088 | GB042115663000" })]
		})]
	});
}
//#endregion
export { ContactPage as component };
