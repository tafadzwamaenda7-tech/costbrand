import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/contact-schema";
import { submitEnquiry } from "@/lib/contact.functions";

type RequestKind = "machinery" | "sourcing";

type ProductCategory = {
  label: string;
  products?: string[];
};

const machineryRequestTypes = [
  "Land Preparation",
  "Planting and Harvesting",
  "Water and Irrigation",
  "Processing and Feed",
  "Not sure yet",
] as const;

const sourcingRequestTypes = ["Machinery", "Equipment", "Inputs", "Produce", "Other"] as const;

const machineryCategories: Record<string, ProductCategory[]> = {
  "Land Preparation": [
    { label: "Tractors", products: ["Tractors"] },
    { label: "Tillage equipment", products: ["Implements", "Disc harrows", "Cultivators"] },
  ],
  "Planting and Harvesting": [
    { label: "Planting equipment", products: ["Planters"] },
    { label: "Harvesting equipment", products: ["Harvesting machinery"] },
  ],
  "Water and Irrigation": [
    { label: "Irrigation systems", products: ["Irrigation equipment", "Solar irrigation systems"] },
    { label: "Pumps", products: ["Pumps"] },
  ],
  "Processing and Feed": [
    { label: "Processing machinery", products: ["Processing machinery"] },
    { label: "Feed equipment", products: ["Animal-feed equipment"] },
  ],
};

const sourcingCategories: Record<string, ProductCategory[]> = {
  Machinery: [
    { label: "Land preparation", products: ["Tractors", "Implements", "Disc harrows", "Cultivators"] },
    { label: "Planting and harvesting", products: ["Planters", "Harvesting machinery"] },
    { label: "Water and irrigation", products: ["Irrigation equipment", "Pumps", "Solar irrigation systems"] },
    { label: "Processing and feed", products: ["Processing machinery", "Animal-feed equipment"] },
  ],
  Equipment: [{ label: "Equipment" }],
  Inputs: [{ label: "Seeds" }, { label: "Fertiliser" }, { label: "Crop protection" }],
  Produce: [
    { label: "Vegetables", products: ["Tomatoes", "Onions", "Watermelons", "Peas", "Chillies", "Broccoli", "Carrots", "Peppers"] },
    { label: "Fruit", products: ["Avocados", "Passion fruit"] },
  ],
  Other: [{ label: "Other" }],
};

const units = ["pieces", "units", "sets", "kilograms", "tonnes", "litres", "hectares", "containers"];
const timelines = ["ASAP", "One to three months", "Three to six months", "Just exploring"];

type RequestValues = {
  requestType: string;
  category: string;
  product: string;
  productDetails: string;
  quantity: string;
  unit: string;
  timeline: string;
  notes: string;
  name: string;
  company: string;
  phone: string;
  sameAsPhone: boolean;
  whatsappPhone: string;
  email: string;
  country: string;
  consent: boolean;
};

const initialValues: RequestValues = {
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
  consent: false,
};

const pageCopy: Record<RequestKind, { subject: "Machinery and Equipment" | "International Sourcing"; label: string }> = {
  machinery: { subject: "Machinery and Equipment", label: "Machinery" },
  sourcing: { subject: "International Sourcing", label: "International sourcing" },
};

export function RequestForm({ kind }: { kind: RequestKind }) {
  const submit = useServerFn(submitEnquiry);
  const [values, setValues] = useState<RequestValues>(initialValues);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const config = pageCopy[kind];
  const requestTypes = kind === "machinery" ? machineryRequestTypes : sourcingRequestTypes;
  const categories = getCategories(kind, values.requestType);
  const selectedCategory = categories.find(({ label }) => label === values.category);
  const knownProducts = selectedCategory?.products;

  function update<K extends keyof RequestValues>(key: K, value: RequestValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
      values.notes.trim() ? `Notes: ${values.notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const result = contactSchema.safeParse({
      firstName,
      lastName,
      companyName: values.company.trim() || "Not provided",
      email: values.email.trim(),
      subject: config.subject,
      message,
      consent: values.consent,
      website: (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
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

  if (status === "success") {
    return (
      <div className="request-success" role="status">
        <span className="request-success-mark" aria-hidden="true">✓</span>
        <div>
          <h3>Thank you. We'll respond within twenty-four hours.</h3>
          <p>Your request has been received. You can also share the request details with us on WhatsApp.</p>
          <a className="request-whatsapp-action" href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="request-form" onSubmit={onSubmit}>
      <div className="request-progress">
        <div>
          <span className="request-progress-label">Your request</span>
          <p>Step {step} of 3</p>
        </div>
        <ol aria-label={`Progress: step ${step} of 3`}>
          {[1, 2, 3].map((number) => (
            <li key={number} className={number <= step ? "is-complete" : ""} aria-current={number === step ? "step" : undefined}>
              <span>{number}</span>
              <span className="sr-only">{number === step ? "Current step" : number < step ? "Complete" : "Not started"}</span>
            </li>
          ))}
        </ol>
      </div>

      {step === 1 && (
        <fieldset className="request-step-fields">
          <legend>What are you looking for?</legend>
          <p className="request-step-hint">Choose the closest fit. We can refine the details together.</p>
          <div className="request-choice-grid">
            {requestTypes.map((requestType) => (
              <label className={`request-choice${values.requestType === requestType ? " is-selected" : ""}`} key={requestType}>
                <input
                  type="radio"
                  name="requestType"
                  value={requestType}
                  checked={values.requestType === requestType}
                  onChange={() => {
                    update("requestType", requestType);
                    update("category", "");
                    update("product", "");
                    update("productDetails", "");
                  }}
                />
                <span>{requestType}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="request-step-fields">
          <legend>Tell us a little more.</legend>
          <p className="request-step-hint">A few details help us prepare a useful response.</p>
          <div className="request-field-grid">
            <div className="request-field">
              <label htmlFor="request-category">Category <span className="required">*</span></label>
              <select
                id="request-category"
                value={values.category}
                onChange={(event) => {
                  update("category", event.target.value);
                  update("product", "");
                  update("productDetails", "");
                }}
                required
              >
                <option value="">Select a category</option>
                {categories.map(({ label }) => <option key={label} value={label}>{label}</option>)}
              </select>
            </div>
            <div className="request-field">
              <label htmlFor="request-product">{knownProducts?.length ? "Product" : "What do you need?"} <span className="required">*</span></label>
              {knownProducts?.length ? (
                <select id="request-product" value={values.product} onChange={(event) => update("product", event.target.value)} required>
                  <option value="">Select a product</option>
                  {knownProducts.map((product) => <option key={product}>{product}</option>)}
                </select>
              ) : (
                <input
                  id="request-product"
                  value={values.productDetails}
                  onChange={(event) => update("productDetails", event.target.value)}
                  placeholder="Describe the product or specification"
                  maxLength={300}
                  required
                />
              )}
            </div>
            <div className="request-field">
              <label htmlFor="request-quantity">Quantity <span className="required">*</span></label>
              <div className="request-quantity-row">
                <input
                  id="request-quantity"
                  type="number"
                  min="0.01"
                  step="any"
                  value={values.quantity}
                  onChange={(event) => update("quantity", event.target.value)}
                  placeholder="e.g. 2"
                  required
                />
                <select aria-label="Quantity unit" value={values.unit} onChange={(event) => update("unit", event.target.value)} required>
                  <option value="">Unit</option>
                  {units.map((unit) => <option key={unit}>{unit}</option>)}
                </select>
              </div>
            </div>
            <div className="request-field">
              <label htmlFor="request-timeline">When do you need it? <span className="required">*</span></label>
              <select id="request-timeline" value={values.timeline} onChange={(event) => update("timeline", event.target.value)} required>
                <option value="">Choose a timeline</option>
                {timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
              </select>
            </div>
            <div className="request-field request-notes-field">
              <label htmlFor="request-notes">Anything else we should know? <span className="request-optional">(optional)</span></label>
              <textarea id="request-notes" rows={3} maxLength={1500} value={values.notes} onChange={(event) => update("notes", event.target.value)} />
            </div>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="request-step-fields">
          <legend>How can we reach you?</legend>
          <p className="request-step-hint">Your contact details are sent securely with your enquiry.</p>
          <div className="request-field-grid">
            <div className="request-field">
              <label htmlFor="request-name">Name <span className="required">*</span></label>
              <input id="request-name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} maxLength={201} required />
            </div>
            <div className="request-field">
              <label htmlFor="request-company">Company <span className="request-optional">(optional)</span></label>
              <input id="request-company" autoComplete="organization" value={values.company} onChange={(event) => update("company", event.target.value)} maxLength={200} />
            </div>
            <div className="request-field">
              <label htmlFor="request-phone">Phone <span className="required">*</span></label>
              <input id="request-phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} maxLength={64} required />
            </div>
            <div className="request-field">
              <label htmlFor="request-email">Email <span className="required">*</span></label>
              <input id="request-email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} maxLength={254} required />
            </div>
            <div className="request-field">
              <label htmlFor="request-country">Country <span className="required">*</span></label>
              <input id="request-country" autoComplete="country-name" value={values.country} onChange={(event) => update("country", event.target.value)} maxLength={100} required />
            </div>
            <fieldset className="request-whatsapp-field">
              <legend>WhatsApp</legend>
              <label className="request-check">
                <input type="checkbox" checked={values.sameAsPhone} onChange={(event) => update("sameAsPhone", event.target.checked)} />
                <span>Same as phone</span>
              </label>
              {!values.sameAsPhone && (
                <div className="request-field request-alt-phone">
                  <label htmlFor="request-whatsapp-phone">WhatsApp number <span className="request-optional">(optional)</span></label>
                  <input id="request-whatsapp-phone" type="tel" autoComplete="tel" value={values.whatsappPhone} onChange={(event) => update("whatsappPhone", event.target.value)} maxLength={64} />
                </div>
              )}
            </fieldset>
          </div>

          <label className="request-check request-consent">
            <input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} required />
            <span>I agree to the <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>.</span>
          </label>
          <div hidden aria-hidden="true">
            <label htmlFor="request-website">Website</label>
            <input id="request-website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
        </fieldset>
      )}

      {error && <p className="form-error request-form-error" role="alert">{error}</p>}

      <div className="request-form-actions">
        {step > 1 ? (
          <Button className="request-back-button" type="button" variant="outline" onClick={() => { setError(""); setStep((current) => current - 1); }}>
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </Button>
        ) : <span />}
        {step < 3 ? (
          <Button className="request-next-button" type="button" onClick={nextStep}>
            Next <ArrowRight size={16} aria-hidden="true" />
          </Button>
        ) : (
          <Button className="request-next-button" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send request"} <ArrowRight size={16} aria-hidden="true" />
          </Button>
        )}
      </div>
    </form>
  );
}

function getCategories(kind: RequestKind, requestType: string) {
  if (kind === "machinery") {
    if (requestType === "Not sure yet") return Object.values(machineryCategories).flat();
    return machineryCategories[requestType] ?? [];
  }
  return sourcingCategories[requestType] ?? [];
}
