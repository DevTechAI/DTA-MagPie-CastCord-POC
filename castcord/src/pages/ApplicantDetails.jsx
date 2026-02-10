import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

const DETAIL_FIELDS = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "gender", label: "Gender" },
  { key: "native_state", label: "Native State" },
  { key: "languages", label: "Languages Spoken" },
  { key: "youtube_link", label: "YouTube Link", isLink: true },
  { key: "portfolio_link", label: "Portfolio Link", isLink: true },
];

export default function ApplicantDetails() {
  const { eventId, applicationId } = useParams();
  const [event, setEvent] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: eventData, error: eventError } = await supabase
        .from("casting_events")
        .select("title")
        .eq("id", eventId)
        .single();

      if (eventError) {
        setError(eventError.message);
        setLoading(false);
        return;
      }
      setEvent(eventData);

      const { data: appData, error: appError } = await supabase
        .from("casting_applications")
        .select("*")
        .eq("id", applicationId)
        .eq("event_id", eventId)
        .single();

      if (appError) {
        setError(appError.message);
        setLoading(false);
        return;
      }
      setApplication(appData);
      setLoading(false);
    }
    fetchData();
  }, [eventId, applicationId]);

  if (loading) {
    return (
      <div className="page">
        <p className="page-header" style={{ color: "var(--color-text-muted)" }}>
          Loading applicant details…
        </p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Applicant Not Found</h1>
          <p>{error || "This application may have been removed."}</p>
        </header>
        <Link to={`/event/${eventId}`} className="btn btn-secondary" style={{ display: "inline-flex", width: "auto", padding: "0.75rem 1.5rem" }}>
          ← Back to event
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <Link to={`/event/${eventId}`} className="back-link" style={{ marginBottom: "1rem", display: "inline-block" }}>
          ← Back to event
        </Link>
        <h1>Applicant Details</h1>
        <p>{event?.title || "Casting Call"} – {application.name || "Unnamed Applicant"}</p>
      </header>

      <div className="card applicant-details-card">
        {application.candidate_photo_url && (
          <div className="applicant-detail-photo">
            <img src={application.candidate_photo_url} alt={application.name || "Applicant"} />
          </div>
        )}
        <div className="applicant-details-grid">
          {DETAIL_FIELDS.map(({ key, label, isLink }) => {
            const value = application[key];
            if (value == null || value === "") return null;
            return (
              <div key={key} className="applicant-detail-row">
                <span className="applicant-detail-label">{label}:</span>
                <span className="applicant-detail-value">
                  {isLink ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <Link to={`/event/${eventId}`} className="btn btn-secondary" style={{ display: "inline-flex", width: "auto", padding: "0.75rem 1.5rem", textDecoration: "none" }}>
          ← Back to event
        </Link>
      </div>
    </div>
  );
}
