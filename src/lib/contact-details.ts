export type ContactNumber = {
  /** Display form, e.g. "+263 77 475 7162". */
  label: string;
  /** Dial form for tel: links. */
  tel: string;
  /** Country code + subscriber number, without punctuation, for wa.me links. */
  whatsapp: string;
  region: string;
};

export const contactNumbers: [ContactNumber, ...ContactNumber[]] = [
  {
    label: "+263 77 475 7162",
    tel: "+263774757162",
    whatsapp: "263774757162",
    region: "Zimbabwe",
  },
  {
    label: "+44 789 487 2902",
    tel: "+447894872902",
    whatsapp: "447894872902",
    region: "UK",
  },
];

export const contactDetails = {
  email: "info@costbrand.co.zw",
  address: {
    street: "Plot 68, Sable Bush Park",
    town: "Chegutu",
    province: "Mashonaland West Province",
    country: "Zimbabwe",
  },
  numbers: contactNumbers,
};

/** Single-target calls to action (floating button, search, 404) use this number. */
export const primaryNumber: ContactNumber = contactNumbers[0];

export function whatsappLink(number: ContactNumber, message: string) {
  return `https://wa.me/${number.whatsapp}?text=${encodeURIComponent(message)}`;
}

const { street, town, province, country } = contactDetails.address;
const mapsQuery = `${street}, ${town}, ${province}, ${country}`;

/** Keyless Google Maps embed, pinned from the postal address text. */
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`;
