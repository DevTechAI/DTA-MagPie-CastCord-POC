import { useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import Modal from "../components/Modal";

export default function CastingForm() {
  const { eventId } = useParams();
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);

  const submitForm = async () => {
    await supabase.from("casting_applications").insert([
      {
        event_id: eventId,
        ...form,
      },
    ]);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Apply to this casting call</h1>
        <p>Fill in your details below. All fields are optional but recommended.</p>
      </header>

      <div className="card">
        <h2 className="card-title">Personal information</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Your full name"
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              value={form.age ?? ""}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={form.phone ?? ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            placeholder="City, Country"
            value={form.location ?? ""}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <h2 className="card-title" style={{ marginTop: "1.5rem" }}>
          Profile
        </h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <input
              id="gender"
              placeholder="e.g. Male, Female, Non-binary"
              value={form.gender ?? ""}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="native_state">Native state</label>
            <input
              id="native_state"
              placeholder="State / Region"
              value={form.native_state ?? ""}
              onChange={(e) => setForm({ ...form, native_state: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="languages">Languages spoken</label>
          <input
            id="languages"
            placeholder="e.g. English, Hindi, Tamil"
            value={form.languages ?? ""}
            onChange={(e) => setForm({ ...form, languages: e.target.value })}
          />
        </div>

        <button className="btn btn-primary" onClick={submitForm}>
          Submit application
        </button>
      </div>

      {showModal && <Modal data={form} onClose={closeModal} />}
    </div>
  );
}
