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

/**
 * Google's own geocode of the postal address. Sable Bush Park is not in any public
 * gazetteer, so this lands on the northern edge of Chegutu rather than the plot —
 * replace with the farm's real GPS reading as soon as one is available.
 */
const farmCoordinates = "-18.1222,30.1515";

/**
 * Keyless Google Maps embed, pinned by coordinate. Pinning by the address text
 * instead renders the area with no marker at all, because the street does not
 * resolve in Google's gazetteer.
 */
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${farmCoordinates}&z=14&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${farmCoordinates}`;
