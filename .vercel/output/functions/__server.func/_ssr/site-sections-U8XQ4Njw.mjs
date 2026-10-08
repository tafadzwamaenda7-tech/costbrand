import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as assets, t as Button } from "./site-assets-C9zmdWbE.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowDown, a as MessageCircle, f as ChartNoAxesCombined, g as ArrowLeft, h as ArrowRight, i as Route, l as Handshake, m as ArrowUpRight, n as Tractor, s as MapPin, u as Globe } from "../_libs/lucide-react.mjs";
import { t as contactSchema } from "./contact-schema-BkoDvjED.mjs";
import { n as useServerFn, t as submitEnquiry } from "./contact.functions-CK1O4Wb5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-sections-U8XQ4Njw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var machineryRequestTypes = [
	"Land Preparation",
	"Planting and Harvesting",
	"Water and Irrigation",
	"Processing and Feed",
	"Not sure yet"
];
var sourcingRequestTypes = [
	"Machinery",
	"Equipment",
	"Inputs",
	"Produce",
	"Other"
];
var machineryCategories = {
	"Land Preparation": [{
		label: "Tractors",
		products: ["Tractors"]
	}, {
		label: "Tillage equipment",
		products: [
			"Implements",
			"Disc harrows",
			"Cultivators"
		]
	}],
	"Planting and Harvesting": [{
		label: "Planting equipment",
		products: ["Planters"]
	}, {
		label: "Harvesting equipment",
		products: ["Harvesting machinery"]
	}],
	"Water and Irrigation": [{
		label: "Irrigation systems",
		products: ["Irrigation equipment", "Solar irrigation systems"]
	}, {
		label: "Pumps",
		products: ["Pumps"]
	}],
	"Processing and Feed": [{
		label: "Processing machinery",
		products: ["Processing machinery"]
	}, {
		label: "Feed equipment",
		products: ["Animal-feed equipment"]
	}]
};
var sourcingCategories = {
	Machinery: [
		{
			label: "Land preparation",
			products: [
				"Tractors",
				"Implements",
				"Disc harrows",
				"Cultivators"
			]
		},
		{
			label: "Planting and harvesting",
			products: ["Planters", "Harvesting machinery"]
		},
		{
			label: "Water and irrigation",
			products: [
				"Irrigation equipment",
				"Pumps",
				"Solar irrigation systems"
			]
		},
		{
			label: "Processing and feed",
			products: ["Processing machinery", "Animal-feed equipment"]
		}
	],
	Equipment: [{ label: "Equipment" }],
	Inputs: [
		{ label: "Seeds" },
		{ label: "Fertiliser" },
		{ label: "Crop protection" }
	],
	Produce: [{
		label: "Vegetables",
		products: [
			"Tomatoes",
			"Onions",
			"Watermelons",
			"Peas",
			"Chillies",
			"Broccoli",
			"Carrots",
			"Peppers"
		]
	}, {
		label: "Fruit",
		products: ["Avocados", "Passion fruit"]
	}],
	Other: [{ label: "Other" }]
};
var units = [
	"pieces",
	"units",
	"sets",
	"kilograms",
	"tonnes",
	"litres",
	"hectares",
	"containers"
];
var timelines = [
	"ASAP",
	"One to three months",
	"Three to six months",
	"Just exploring"
];
var initialValues = {
	requestType: "",
	category: "",
	product: "",
	productDetails: "",
	quantity: "",
	unit: "",
	timeline: "",
	notes: "",
	name: "",
	company: "",
	phone: "",
	sameAsPhone: true,
	whatsappPhone: "",
	email: "",
	country: "Zimbabwe",
	consent: false
};
var pageCopy = {
	machinery: {
		subject: "Machinery and Equipment",
		label: "Machinery"
	},
	sourcing: {
		subject: "International Sourcing",
		label: "International sourcing"
	}
};
function RequestForm({ kind }) {
	const submit = useServerFn(submitEnquiry);
	const [values, setValues] = (0, import_react.useState)(initialValues);
	const [step, setStep] = (0, import_react.useState)(1);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)("");
	const [whatsappUrl, setWhatsappUrl] = (0, import_react.useState)("");
	const config = pageCopy[kind];
	const requestTypes = kind === "machinery" ? machineryRequestTypes : sourcingRequestTypes;
	const categories = getCategories(kind, values.requestType);
	const knownProducts = categories.find(({ label }) => label === values.category)?.products;
	function update(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
	}
	function nextStep() {
		setError("");
		if (step === 1 && !values.requestType) {
			setError("Choose the area you need help with.");
			return;
		}
		if (step === 2) {
			if (!values.category) {
				setError("Choose a category.");
				return;
			}
			if (knownProducts?.length ? !values.product : !values.productDetails.trim()) {
				setError(knownProducts?.length ? "Choose a product." : "Tell us what you are looking for.");
				return;
			}
			if (!Number.isFinite(Number(values.quantity)) || Number(values.quantity) <= 0) {
				setError("Enter a quantity greater than zero.");
				return;
			}
			if (!values.unit) {
				setError("Choose a unit.");
				return;
			}
			if (!values.timeline) {
				setError("Choose a timeline.");
				return;
			}
		}
		setStep((current) => Math.min(current + 1, 3));
	}
	async function onSubmit(event) {
		event.preventDefault();
		setError("");
		const parts = values.name.trim().split(/\s+/);
		const firstName = parts[0] ?? "";
		const lastName = parts.slice(1).join(" ") || "Not provided";
		const whatsapp = values.sameAsPhone ? values.phone.trim() : values.whatsappPhone.trim();
		const selectedProduct = knownProducts?.length ? values.product : values.productDetails.trim();
		const message = [
			"Request details",
			`Request area: ${config.label}`,
			`Request type: ${values.requestType}`,
			`Name: ${values.name.trim()}`,
			`Email: ${values.email.trim()}`,
			`Category: ${values.category}`,
			`Product: ${selectedProduct}`,
			`Quantity: ${values.quantity} ${values.unit}`,
			`Timeline: ${values.timeline}`,
			`Phone: ${values.phone.trim()}`,
			`WhatsApp: ${whatsapp || "Not provided"}`,
			`Country: ${values.country.trim()}`,
			`Company: ${values.company.trim() || "Not provided"}`,
			values.notes.trim() ? `Notes: ${values.notes.trim()}` : ""
		].filter(Boolean).join("\n");
		const result = contactSchema.safeParse({
			firstName,
			lastName,
			companyName: values.company.trim() || "Not provided",
			email: values.email.trim(),
			subject: config.subject,
			message,
			consent: values.consent,
			website: event.currentTarget.elements.namedItem("website")?.value ?? ""
		});
		if (!result.success) {
			setError(result.error.issues[0]?.message ?? "Please check the form.");
			return;
		}
		setStatus("sending");
		try {
			const response = await submit({ data: result.data });
			if (response.ok) {
				setWhatsappUrl(`https://wa.me/?text=${encodeURIComponent(message)}`);
				setStatus("success");
			} else {
				setError(response.message);
				setStatus("idle");
			}
		} catch {
			setError("Your enquiry could not be saved. Please try again.");
			setStatus("idle");
		}
	}
	if (status === "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "request-success",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "request-success-mark",
			"aria-hidden": "true",
			children: "✓"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Thank you. We'll respond within twenty-four hours." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your request has been received. You can also share the request details with us on WhatsApp." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "request-whatsapp-action",
				href: whatsappUrl,
				target: "_blank",
				rel: "noreferrer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
					size: 17,
					"aria-hidden": "true"
				}), "Continue on WhatsApp"]
			})
		] })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "request-form",
		onSubmit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "request-progress",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "request-progress-label",
					children: "Your request"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Step ",
					step,
					" of 3"
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					"aria-label": `Progress: step ${step} of 3`,
					children: [
						1,
						2,
						3
					].map((number) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: number <= step ? "is-complete" : "",
						"aria-current": number === step ? "step" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: number === step ? "Current step" : number < step ? "Complete" : "Not started"
						})]
					}, number))
				})]
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "request-step-fields",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "What are you looking for?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "request-step-hint",
						children: "Choose the closest fit. We can refine the details together."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "request-choice-grid",
						children: requestTypes.map((requestType) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `request-choice${values.requestType === requestType ? " is-selected" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "requestType",
								value: requestType,
								checked: values.requestType === requestType,
								onChange: () => {
									update("requestType", requestType);
									update("category", "");
									update("product", "");
									update("productDetails", "");
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: requestType })]
						}, requestType))
					})
				]
			}),
			step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "request-step-fields",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Tell us a little more." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "request-step-hint",
						children: "A few details help us prepare a useful response."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "request-field-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-category",
									children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "request-category",
									value: values.category,
									onChange: (event) => {
										update("category", event.target.value);
										update("product", "");
										update("productDetails", "");
									},
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a category"
									}), categories.map(({ label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: label,
										children: label
									}, label))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-product",
									children: [
										knownProducts?.length ? "Product" : "What do you need?",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "required",
											children: "*"
										})
									]
								}), knownProducts?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "request-product",
									value: values.product,
									onChange: (event) => update("product", event.target.value),
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a product"
									}), knownProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: product }, product))]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "request-product",
									value: values.productDetails,
									onChange: (event) => update("productDetails", event.target.value),
									placeholder: "Describe the product or specification",
									maxLength: 300,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-quantity",
									children: ["Quantity ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "request-quantity-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "request-quantity",
										type: "number",
										min: "0.01",
										step: "any",
										value: values.quantity,
										onChange: (event) => update("quantity", event.target.value),
										placeholder: "e.g. 2",
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": "Quantity unit",
										value: values.unit,
										onChange: (event) => update("unit", event.target.value),
										required: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Unit"
										}), units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: unit }, unit))]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-timeline",
									children: ["When do you need it? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "request-timeline",
									value: values.timeline,
									onChange: (event) => update("timeline", event.target.value),
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Choose a timeline"
									}), timelines.map((timeline) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: timeline }, timeline))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field request-notes-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-notes",
									children: ["Anything else we should know? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "request-optional",
										children: "(optional)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "request-notes",
									rows: 3,
									maxLength: 1500,
									value: values.notes,
									onChange: (event) => update("notes", event.target.value)
								})]
							})
						]
					})
				]
			}),
			step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "request-step-fields",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "How can we reach you?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "request-step-hint",
						children: "Your contact details are sent securely with your enquiry."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "request-field-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-name",
									children: ["Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "request-name",
									autoComplete: "name",
									value: values.name,
									onChange: (event) => update("name", event.target.value),
									maxLength: 201,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-company",
									children: ["Company ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "request-optional",
										children: "(optional)"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "request-company",
									autoComplete: "organization",
									value: values.company,
									onChange: (event) => update("company", event.target.value),
									maxLength: 200
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-phone",
									children: ["Phone ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "request-phone",
									type: "tel",
									autoComplete: "tel",
									value: values.phone,
									onChange: (event) => update("phone", event.target.value),
									maxLength: 64,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-email",
									children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "request-email",
									type: "email",
									autoComplete: "email",
									value: values.email,
									onChange: (event) => update("email", event.target.value),
									maxLength: 254,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "request-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "request-country",
									children: ["Country ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "required",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "request-country",
									autoComplete: "country-name",
									value: values.country,
									onChange: (event) => update("country", event.target.value),
									maxLength: 100,
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: "request-whatsapp-field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "WhatsApp" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "request-check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: values.sameAsPhone,
											onChange: (event) => update("sameAsPhone", event.target.checked)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Same as phone" })]
									}),
									!values.sameAsPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "request-field request-alt-phone",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "request-whatsapp-phone",
											children: ["WhatsApp number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "request-optional",
												children: "(optional)"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "request-whatsapp-phone",
											type: "tel",
											autoComplete: "tel",
											value: values.whatsappPhone,
											onChange: (event) => update("whatsappPhone", event.target.value),
											maxLength: 64
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "request-check request-consent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: values.consent,
							onChange: (event) => update("consent", event.target.checked),
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"I agree to the ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								children: "Privacy Policy"
							}),
							" and ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								children: "Terms of Use"
							}),
							"."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						hidden: true,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "request-website",
							children: "Website"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "request-website",
							name: "website",
							tabIndex: -1,
							autoComplete: "off",
							defaultValue: ""
						})]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-error request-form-error",
				role: "alert",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "request-form-actions",
				children: [step > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "request-back-button",
					type: "button",
					variant: "outline",
					onClick: () => {
						setError("");
						setStep((current) => current - 1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						size: 16,
						"aria-hidden": "true"
					}), " Back"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "request-next-button",
					type: "button",
					onClick: nextStep,
					children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						size: 16,
						"aria-hidden": "true"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "request-next-button",
					type: "submit",
					disabled: status === "sending",
					children: [
						status === "sending" ? "Sending…" : "Send request",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							size: 16,
							"aria-hidden": "true"
						})
					]
				})]
			})
		]
	});
}
function getCategories(kind, requestType) {
	if (kind === "machinery") {
		if (requestType === "Not sure yet") return Object.values(machineryCategories).flat();
		return machineryCategories[requestType] ?? [];
	}
	return sourcingCategories[requestType] ?? [];
}
var pillars = [
	{
		name: "Agriculture",
		copy: "Developing productive and commercially viable agricultural enterprises.",
		to: "/agriculture",
		image: assets.farm,
		alt: "Rows of pea plants growing in a field"
	},
	{
		name: "Horticulture",
		copy: "Growing quality horticultural products for Zimbabwean and international markets.",
		to: "/horticulture",
		image: assets.snapPeas,
		alt: "Freshly picked sugar snap peas"
	},
	{
		name: "Agricultural Machinery",
		copy: "Providing farmers with access to modern agricultural machinery and equipment.",
		to: "/machinery",
		image: assets.downloadNine,
		alt: "Machinery and produce handling for a Zimbabwean agricultural operation."
	},
	{
		name: "International Sourcing",
		copy: "We find it. We verify it. We source it. We bring it to you.",
		to: "/international-sourcing",
		image: assets.globalSourcing,
		alt: "A Costbrand pea field representing its international supply chain"
	}
];
function PageIntro({ title, copy, image, imageAlt, action, to, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `page-intro${tone === "forest" ? " page-intro-forest" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-intro-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "page-intro-description",
					children: copy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "button-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						children: [action, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							"aria-hidden": "true",
							size: 16
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "page-intro-image",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: imageAlt,
				loading: "eager"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "From Zimbabwe, with purpose." })]
		})]
	});
}
function PillarsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pillars-section section-pad",
		id: "business",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-heading-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-heading",
					children: "One connected view of agriculture."
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-lead",
					children: "Costbrand brings together four related areas of work, from production and equipment to market connections."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pillar-grid",
				children: pillars.map(({ name, copy, to, image, alt }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "pillar-card",
					to,
					"aria-label": `Explore ${name}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pillar-image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image,
							alt,
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pillar-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 16,
								"aria-hidden": "true"
							})] })
						]
					})]
				}, name))
			})]
		})
	});
}
var produce = [
	"Avocados",
	"Tomatoes",
	"Onions",
	"Watermelons",
	"Peas",
	"Chillies",
	"Broccoli",
	"Carrots",
	"Peppers"
];
function ProductsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "produce-section section-pad",
		id: "produce",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "produce-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "produce-intro",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display-heading",
							children: "Good food begins with good growing."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-lead",
							children: "Explore the produce categories we work with. Specific availability is discussed around each enquiry and season."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "text-link",
							to: "/horticulture",
							children: ["Explore horticulture ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 16,
								"aria-hidden": "true"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "produce-image-stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "produce-image-main",
							src: assets.hero,
							alt: "Fresh sugar snap peas with a blue flower",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "produce-image-detail",
							src: assets.passionFruit,
							alt: "Passion fruit",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "image-note",
							children: "Fresh produce · Zimbabwe"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "produce-name-list",
				"aria-label": "Produce categories",
				children: produce.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "produce-index",
						children: ["0", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						size: 15,
						"aria-hidden": "true"
					})
				] }, item))
			})]
		})
	});
}
var plot68Photos = [
	{
		src: assets.fieldSunset,
		alt: "Pea field at Plot 68, Zimbabwe.",
		caption: "Grown at Plot 68"
	},
	{
		src: assets.plotPackedLabelled,
		alt: "Produce packed and labelled for export at Plot 68.",
		caption: "Packed and labelled"
	},
	{
		src: assets.plotPreparedExport,
		alt: "Produce prepared for export from Plot 68.",
		caption: "Prepared for export"
	}
];
function Plot68CaseStudy({ context = "horticulture" }) {
	const isAgriculture = context === "agriculture";
	const photos = isAgriculture ? plot68Photos.map((photo, index) => ({
		...photo,
		caption: [
			"Grown at Plot 68",
			"Packed for export",
			"Prepared to buyer specification"
		][index]
	})) : plot68Photos;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `plot68-section${isAgriculture ? " plot68-agriculture" : ""}`,
		"aria-labelledby": "plot68-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plot68-band",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: isAgriculture ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Agricultural Projects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "plot68-title",
					children: "From planning to production — how we develop farms and enterprises."
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Case study" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "plot68-title",
					children: [
						"Plot 68 ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "→"
						}),
						" England & the Netherlands"
					]
				})] }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "content-width plot68-gallery",
				children: photos.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photo.src,
					alt: photo.alt,
					loading: "lazy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: photo.caption })] }, photo.caption))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plot68-story",
				children: [
					isAgriculture && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "plot68-agriculture-title",
						children: "Plot 68 · Peas · Production to Export"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isAgriculture ? "In 2025, Costbrand produced and prepared peas at Plot 68 for export to England and the Netherlands. The crop moved from field to cold chain to international market." : "In 2025, Costbrand exported peas from Zimbabwe to England and the Netherlands — from our fields, through our packing process, to European buyers." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: `plot68-stats${isAgriculture ? " plot68-stats-four" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "2025" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Exported" })] }), isAgriculture ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "1 shipment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "From Plot 68" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "2 destinations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "England & the Netherlands" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "England & Netherlands" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "European markets" })] })
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "2 markets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "England & the Netherlands" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "1 shipment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Track record" })] })] })]
					})
				]
			})
		]
	});
}
var focusAreas = [
	["Vegetables", assets.fieldRows],
	["Fruits", assets.fieldSunset],
	["Export crops", assets.machineField],
	["Greenhouse production", assets.fieldRows],
	["Irrigation", assets.machineField],
	["Packhouses", assets.machineField],
	["Cold-chain solutions", assets.machineField],
	["Produce marketing", assets.peaHarvest],
	["Export development", assets.fieldWide]
];
function HorticultureFocusAreas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "focus-areas-section section-pad",
		"aria-labelledby": "focus-areas-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "focus-areas-title",
				className: "display-heading",
				children: "Focus Areas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "focus-areas-grid",
				children: focusAreas.map(([name, image]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "focus-area-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: image,
						alt: `${name} in Costbrand horticulture.`,
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name })]
				}, name))
			})]
		})
	});
}
var homeCrops = [
	[
		"Avocados",
		assets.avocado,
		"Fresh avocados from the farm."
	],
	[
		"Tomatoes",
		assets.tomato,
		"Tomatoes grown for fresh local and export markets."
	],
	[
		"Watermelons",
		assets.watermelon,
		"Watermelons grown in the field."
	],
	[
		"Chillies",
		assets.chilli,
		"Chillies grown and ready for market."
	],
	[
		"Broccoli",
		assets.broccoli,
		"Broccoli cultivated in Zimbabwe."
	],
	[
		"Carrots",
		assets.carrot,
		"Carrots ready for market."
	],
	[
		"Peppers",
		assets.pepper,
		"Peppers grown for fresh produce markets."
	]
];
function HomeHorticultureSpotlight() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "home-horticulture section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-heading",
					children: "From Zimbabwe to the World"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "home-crop-mosaic",
					children: homeCrops.map(([name, image, alt]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: `home-crop-tile crop-${name.toLowerCase()}`,
						to: "/horticulture",
						"aria-label": `Explore Horticulture — ${name}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image,
							alt,
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name })]
					}, name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home-horticulture-statement",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Zimbabwe has the land, the climate, the farmers." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Costbrand builds the connection." }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "button-primary",
							to: "/horticulture",
							children: ["Explore Horticulture ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 16,
								"aria-hidden": "true"
							})]
						})
					]
				})
			]
		})
	});
}
function HomeClosingStatement() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "home-closing-band",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: assets.fieldWide,
				alt: "The Zimbabwean landscape at dawn.",
				loading: "lazy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "home-closing-shade" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"From Farm to Market.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"From Zimbabwe to the World."
			] })
		]
	});
}
var farmJourney = [
	"Production",
	"Harvesting",
	"Packing",
	"Quality control",
	"Cold chain",
	"Export",
	"Global market"
];
function FarmJourney() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "journey-section section-pad",
		id: "farm-to-market",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width journey-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "journey-heading",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-heading",
						children: "Each step connects to the next."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-lead",
						children: "A clear view of the stages that can take a crop from production through to a buyer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "text-link",
						to: "/international-sourcing",
						children: ["How sourcing works ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							size: 16,
							"aria-hidden": "true"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "journey-list",
				children: farmJourney.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "journey-number",
						children: ["0", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step }),
					index < farmJourney.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
						size: 15,
						"aria-hidden": "true"
					})
				] }, step))
			})]
		})
	});
}
function AgricultureSection() {
	const focusAreas = [
		{
			marker: "Production",
			title: "Production",
			items: [
				"Crop production",
				"Grain production",
				"Commercial farming"
			],
			image: assets.farm,
			alt: "A commercial crop field in Zimbabwe."
		},
		{
			marker: "Infrastructure",
			title: "Infrastructure",
			items: ["Irrigation", "Farm development"],
			image: assets.machineField,
			alt: "Agricultural produce prepared for onward handling."
		},
		{
			marker: "Inputs and Projects",
			title: "Inputs and Projects",
			items: ["Agricultural inputs", "Agricultural projects"],
			image: assets.packing,
			alt: "Produce packed for agricultural supply."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Developing productive and commercially viable agricultural enterprises.",
			copy: "Costbrand develops agricultural enterprises that are productive, commercially viable, and built to last.",
			image: assets.farm,
			imageAlt: "A commercial crop field in Zimbabwe.",
			action: "Discuss an agriculture enquiry",
			to: "/contact-us"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "page-section-subnav",
			"aria-label": "Agriculture page sections",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#agriculture-focus",
				children: "Focus Areas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#agriculture-projects",
				children: "Projects"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "agriculture-intro",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "We develop agricultural enterprises that are productive, commercially viable, and built to last." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "agriculture-focus section-pad",
			id: "agriculture-focus",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-heading",
					children: "Focus Areas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "agriculture-focus-list",
					children: focusAreas.map((area, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: `agriculture-focus-row${index % 2 ? " is-reversed" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "agriculture-focus-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "agriculture-focus-marker",
									children: area.marker
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: area.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: area.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: area.image,
							alt: area.alt,
							loading: "lazy"
						})]
					}, area.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "agriculture-projects",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plot68CaseStudy, { context: "agriculture" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
			title: "Equipment for every stage of production.",
			to: "/machinery",
			label: "Explore machinery"
		})
	] });
}
function HorticulturePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Horticulture",
			copy: "Growing quality horticultural products for Zimbabwean and international markets.",
			image: assets.horticultureHero,
			imageAlt: "Peas growing in the field on a Costbrand horticulture site.",
			action: "Make a produce enquiry",
			to: "/contact-us"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "horticulture-subnav",
			"aria-label": "Horticulture page sections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#produce",
					children: "Our Produce"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#focus-areas-title",
					children: "Focus Areas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#farm-to-market",
					children: "Farm to Market"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#horticulture-markets",
					children: "Markets"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "horticulture-intro",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Growing quality horticultural products for Zimbabwean and international markets." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Costbrand will seek to develop commercially viable horticultural production for both domestic consumption and export markets." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plot68CaseStudy, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorticultureFocusAreas, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmJourney, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "horticulture-markets section-pad",
			id: "horticulture-markets",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-heading",
						children: "Markets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "horticulture-market-cards",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "England" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Fresh produce" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "02"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "The Netherlands" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Fresh produce" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "horticulture-market-proof",
						children: "In 2025, Costbrand exported peas from Zimbabwe to England and the Netherlands."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "horticulture-closing-band",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width horticulture-closing-inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-eyebrow",
						children: "Horticulture"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Our goal is to grow quality horticultural products for Zimbabwean and international markets." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Talk to us about your produce requirements." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "horticulture-closing-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact-us",
							className: "button-primary",
							children: ["Make a produce enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 17,
								"aria-hidden": "true"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact-us",
							className: "text-link",
							children: ["Contact our team ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 17,
								"aria-hidden": "true"
							})]
						})]
					})
				]
			})
		})
	] });
}
function SourcingSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "sourcing-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
				"We find it. We verify it.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"We source it. We bring it to you."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: assets.internationalSourcing,
				alt: "Fresh produce in a sourcing and logistics context.",
				loading: "eager"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "sourcing-what-we-do section-pad",
			id: "sourcing-what-we-do",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width sourcing-what-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Costbrand assists customers in sourcing agricultural machinery, equipment and products from international markets." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: assets.globalSourcing,
					alt: "Agricultural fields illustrating Costbrand's supply-chain work.",
					loading: "lazy"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "sourcing-process section-pad",
			id: "sourcing-process",
			"aria-labelledby": "sourcing-process-title",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "sourcing-process-title",
					className: "display-heading",
					children: "Our Process"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "sourcing-stepper",
					children: [
						["Requirement", "You tell us what you need."],
						["Supplier Search", "We identify credible international suppliers."],
						["Verification", "We check the supplier and the product."],
						["Negotiation", "We negotiate price, terms and lead time."],
						["Quality Control", "We inspect before it ships."],
						["Shipping", "We handle freight and documentation."],
						["Zimbabwe", "Delivered to you."]
					].map(([name, description], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: index === 2 || index === 4 ? "is-trust-step" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sourcing-step-number",
							"aria-hidden": "true",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })] })]
					}, name))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "sourcing-trust",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Why We Verify" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sourcing internationally carries risk — wrong specification, poor quality, unreliable suppliers. Our process is built to remove that risk before money changes hands." })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "sourcing-request section-pad",
			id: "sourcing-request",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-heading",
					children: "Tell us what you need."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestForm, { kind: "sourcing" })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
			title: "See the equipment we source.",
			to: "/machinery",
			label: "Explore machinery"
		})
	] });
}
function MachinerySection() {
	const groups = [
		{
			title: "Land Preparation",
			image: assets.fieldWide,
			alt: "Agricultural land in Zimbabwe.",
			products: [
				"Tractors",
				"Implements",
				"Disc harrows",
				"Cultivators"
			]
		},
		{
			title: "Planting and Harvesting",
			image: assets.fieldRows,
			alt: "Rows of crops growing in an agricultural field.",
			products: ["Planters", "Harvesting machinery"]
		},
		{
			title: "Water and Irrigation",
			image: assets.machineField,
			alt: "Agricultural produce prepared for onward handling.",
			products: [
				"Irrigation equipment",
				"Pumps",
				"Solar irrigation systems"
			]
		},
		{
			title: "Processing and Feed",
			image: assets.packing,
			alt: "Produce packed for agricultural supply.",
			products: ["Processing machinery", "Animal-feed equipment"]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Machinery",
			copy: "Providing farmers with access to modern agricultural machinery and equipment.",
			image: assets.machineryHero,
			imageAlt: "Agricultural machinery and produce handling for a Zimbabwean farm operation.",
			action: "Request a quote",
			to: "/contact-us",
			tone: "forest"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "machinery-intro",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "We supply machinery and equipment for every stage of the farming cycle — from land preparation to processing." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "machinery-groups section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "content-width",
				children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "machinery-group",
					id: `machinery-${group.title.toLowerCase().replaceAll(" ", "-")}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: group.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "machinery-group-image",
							src: group.image,
							alt: group.alt,
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "machinery-product-list",
							children: group.products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: product }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact-us",
								"aria-label": `Request a quote for ${product}`,
								children: ["Enquire ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
									size: 15,
									"aria-hidden": "true"
								})]
							})] }, product))
						})
					]
				}, group.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "machinery-sourcing-link",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sourced internationally. Verified. Delivered to Zimbabwe." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/international-sourcing",
					children: ["See how our sourcing process works ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
						size: 16,
						"aria-hidden": "true"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "machinery-request section-pad",
			id: "machinery-request",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-heading",
						children: "Tell us what your operation needs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-lead",
						children: "Equipment options, models and specifications are confirmed in response to each enquiry."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestForm, { kind: "machinery" })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
			title: "How we source and verify equipment.",
			to: "/international-sourcing",
			label: "Explore international sourcing"
		})
	] });
}
function ProjectsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Good projects start with a good conversation.",
			copy: "Costbrand welcomes enquiries from growers, agricultural businesses and potential project partners. Tell us what you are working toward and where you need support.",
			image: assets.fieldWide,
			imageAlt: "A field of growing crops beneath an open sky",
			action: "Talk about a project",
			to: "/contact-us"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "service-section section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-heading",
						children: "A framework for what comes next."
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-lead",
						children: "Project fit, scope and partners are established through discussion. No case studies are presented until details are confirmed."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "service-list",
					children: [
						["Farm development", "Discuss the goals, site context and practical requirements behind a development opportunity."],
						["Production partnerships", "Bring together growers, buyers and collaborators around a shared agricultural objective."],
						["Equipment and infrastructure", "Explore how machinery, irrigation or processing requirements fit within a wider project."]
					].map(([title, copy], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "service-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "service-index",
								children: ["0", index + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 18,
								"aria-hidden": "true"
							})
						]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
			title: "Let’s shape the next step together.",
			to: "/contact-us",
			label: "Start a conversation"
		})
	] });
}
function MarketsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "Local roots. Wider market connections.",
			copy: "We work from Zimbabwe and engage with partners across regional and international supply chains. Every opportunity begins with understanding the buyer and the requirement.",
			image: assets.fieldSunset,
			imageAlt: "Produce growing in an agricultural field",
			action: "Discuss a market enquiry",
			to: "/contact-us"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "markets-section section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-heading",
						children: "Connections shaped around the buyer."
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-lead",
						children: "Market availability, logistics and fulfilment are discussed for each enquiry. We do not assume a country or route before details are agreed."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "market-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Zimbabwe" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Our home base for agricultural work and local partnerships." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Regional Africa" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Regional opportunities approached through relevant partners and requirements." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "International" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Buyer and supplier conversations that can connect Zimbabwe to wider markets." })
						] })
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
			title: "Sourcing, production and markets work best together.",
			to: "/international-sourcing",
			label: "Explore sourcing"
		})
	] });
}
var whyCostbrand = [
	{
		icon: MapPin,
		title: "Zimbabwean Understanding",
		copy: "We understand the opportunities and challenges of the Zimbabwean agricultural environment."
	},
	{
		icon: Globe,
		title: "Global Connections",
		copy: "We connect customers with international suppliers and markets."
	},
	{
		icon: Tractor,
		title: "Modern Mechanisation",
		copy: "We promote access to efficient agricultural machinery and technology."
	},
	{
		icon: ChartNoAxesCombined,
		title: "Commercial Agriculture",
		copy: "We focus on agriculture as a business — not simply subsistence production."
	},
	{
		icon: Route,
		title: "Market Access",
		copy: "We seek to connect quality Zimbabwean agricultural products with appropriate markets."
	},
	{
		icon: Handshake,
		title: "Long-Term Partnerships",
		copy: "We aim to build sustainable relationships with farmers, suppliers, buyers and investors."
	}
];
function AboutSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			title: "A Zimbabwean company with a connected view of agriculture.",
			copy: "Costbrand brings agriculture, horticulture, machinery and international sourcing together. Our aim is to connect practical needs with thoughtful partnerships and opportunities.",
			image: assets.aboutUs,
			imageAlt: "Costbrand team and agricultural operations in Zimbabwe.",
			action: "Get in touch",
			to: "/contact-us"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-story section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width about-story-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-heading",
					children: "Who We Are"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-lead",
					children: "COSTBRAND ENTERPRISES (PRIVATE) LIMITED is a Zimbabwean agricultural and international sourcing company focused on developing productive agricultural and horticultural enterprises, supplying modern machinery and connecting Zimbabwean businesses with global markets and reliable international suppliers."
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-vision",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Our Vision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "To become a leading Zimbabwean agricultural enterprise connecting local production, modern technology and global markets." })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-mission",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Our Mission" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "To develop sustainable agricultural opportunities, improve access to modern machinery and technology, and create reliable pathways for Zimbabwean agricultural products to reach local and international markets." })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-why section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "content-width",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-heading",
					children: "Why Costbrand?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "about-why-grid",
					children: whyCostbrand.map(({ icon: Icon, title, copy }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "about-why-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 25,
								strokeWidth: 1.5,
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
						]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-brand-statement",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Costbrand is an agricultural enterprise and international supply-chain company — not simply an exporter or importer." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
			title: "Bring us your question, requirement or opportunity.",
			to: "/contact-us",
			label: "Contact Costbrand"
		})
	] });
}
function CrossLinkBand({ title, to, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "cross-link-band",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "content-width cross-link-inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: "text-link text-link-light",
				children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
					size: 17,
					"aria-hidden": "true"
				})]
			})]
		})
	});
}
function FutureBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrossLinkBand, {
		title: "Grow with the land. Connect with the world.",
		to: "/contact-us",
		label: "Start a conversation"
	});
}
//#endregion
export { HomeHorticultureSpotlight as a, MarketsSection as c, ProjectsSection as d, SourcingSection as f, HomeClosingStatement as i, PillarsSection as l, AgricultureSection as n, HorticulturePage as o, FutureBanner as r, MachinerySection as s, AboutSection as t, Plot68CaseStudy as u };
