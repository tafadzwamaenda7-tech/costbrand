CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 first_name text NOT NULL CHECK (length(first_name) BETWEEN 1 AND 100),
 last_name text NOT NULL CHECK (length(last_name) BETWEEN 1 AND 100),
 company_name text NOT NULL CHECK (length(company_name) BETWEEN 1 AND 200),
 email text NOT NULL CHECK (length(email) <= 254),
 subject text NOT NULL CHECK (subject IN ('Vegetables','Fruit','General Enquiry')),
 message text NOT NULL DEFAULT '' CHECK (length(message) <= 5000),
 consent boolean NOT NULL CHECK (consent = true),
 rate_key text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_submissions_rate_idx ON public.contact_submissions(rate_key, created_at);
CREATE FUNCTION public.validate_contact_submission() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(NEW.rate_key,0));
 IF (SELECT count(*) FROM public.contact_submissions WHERE rate_key = NEW.rate_key AND created_at > now() - interval '1 hour') >= 5 THEN
 RAISE EXCEPTION 'Too many enquiries. Please try again later.';
 END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER contact_submission_rate_limit BEFORE INSERT ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION public.validate_contact_submission();
CREATE FUNCTION public.touch_contact_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER touch_contact_submission BEFORE UPDATE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION public.touch_contact_updated_at();