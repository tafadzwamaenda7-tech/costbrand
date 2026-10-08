import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { siteMeta } from "@/lib/site-meta";
import { contactSchema } from "@/lib/contact-schema";
import { submitEnquiry } from "@/lib/contact.functions";
import { assets } from "@/lib/site-assets";

export const Route = createFileRoute("/contact-us")({
  head: () =>
    siteMeta(
      "Contact Us",
      "Contact Costbrand Private Limited, a Zimbabwean company, for premium vegetables, fresh fruit and global produce sourcing enquiries.",
    ),
  component: ContactPage,
});

function ContactPage() {
  const submit = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
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
      website: form.get("website"),
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

  return (
    <main className="contact-page-shell">
      <div className="contact-reference-layout">
        <aside className="contact-brand">
          <Link to="/" className="brand-lockup brand-lockup-inverse" aria-label="Costbrand home">
            <img className="contact-logo" src={assets.logo} alt="Costbrand" />
          </Link>
          <h2>From farm to market. From Zimbabwe to the world.</h2>
          <div className="contact-brand-grid">
            <span>Agriculture</span>
            <span>Horticulture</span>
            <span>Machinery</span>
            <span>International sourcing</span>
          </div>
        </aside>

        <div className="contact-form-panel">
          <div className="contact-form-content">
            <p className="section-eyebrow">Contact us</p>
            <h1 className="section-heading" data-reveal="drop">
              Send us a message
            </h1>
            <p className="contact-intro">
              Share your requirements and a member of our team will get back to you with a tailored
              response.
            </p>

            {status === "success" ? (
              <div className="form-success" role="status">
                Thanks for contacting us! Your enquiry has been received.
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <fieldset>
                  <legend>
                    Name <span className="required">*</span>
                  </legend>
                  <div className="form-row">
                    <div className="form-field">
                      <input
                        id="firstName"
                        name="firstName"
                        aria-label="First name"
                        autoComplete="given-name"
                        required
                        maxLength={100}
                      />
                      <small>First</small>
                    </div>
                    <div className="form-field">
                      <input
                        id="lastName"
                        name="lastName"
                        aria-label="Last name"
                        autoComplete="family-name"
                        required
                        maxLength={100}
                      />
                      <small>Last</small>
                    </div>
                  </div>
                </fieldset>

                <div className="form-field narrow-field">
                  <label htmlFor="companyName">
                    Company Name <span className="required">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    autoComplete="organization"
                    required
                    maxLength={200}
                  />
                </div>

                <div className="form-field narrow-field">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </div>

                <fieldset>
                  <legend>
                    Enquiry area <span className="required">*</span>
                  </legend>
                  <div className="radio-options">
                    {[
                      "Vegetables",
                      "Fruit",
                      "Agriculture",
                      "Machinery and Equipment",
                      "International Sourcing",
                      "Projects and Partnerships",
                      "General Enquiry",
                    ].map((subject) => (
                      <label key={subject}>
                        <input type="radio" name="subject" value={subject} required />
                        {subject}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="form-field">
                  <label htmlFor="message">Comment or Message</label>
                  <textarea id="message" name="message" rows={5} maxLength={5000} />
                </div>

                <fieldset>
                  <legend>
                    I agree to the <Link to="/privacy">Privacy Policy</Link> and{" "}
                    <Link to="/terms">Terms of Use</Link>
                  </legend>
                  <label className="consent-label">
                    <input type="checkbox" name="consent" required />I agree
                  </label>
                </fieldset>

                <div hidden aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  className="contact-submit w-fit"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Submitting…" : "Submit"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="copyright-band">
        <p>Copyright {new Date().getFullYear()} Costbrand Private Limited. All Rights Reserved.</p>
        <p>Company No: 16360088 | GB042115663000</p>
      </div>
    </main>
  );
}
