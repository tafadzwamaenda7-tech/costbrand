import { Navigation } from "lucide-react";
import { contactDetails, mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/contact-details";

export function LocationMap() {
  const { street, town, province, country } = contactDetails.address;
  return (
    <div className="location-map">
      <iframe
        className="location-map-frame"
        title={`Map of ${street}, ${town}, ${province}, ${country}`}
        src={mapsEmbedUrl}
        loading="lazy"
        allowFullScreen
      />
      <div className="location-map-meta">
        <address>
          {street}
          <br />
          {town}, {province}
          <br />
          {country}
        </address>
        <a
          className="location-map-directions"
          href={mapsDirectionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Navigation size={15} aria-hidden="true" />
          Get directions
        </a>
      </div>
    </div>
  );
}
