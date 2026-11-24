"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];
const levels = ["Iron / Bronze", "Silver / Gold", "Platinum / Emerald", "Diamond", "Master+"];

type ApplicationForm = {
  pseudo: string;
  role: string;
  niveau: string;
  message: string;
};

export default function ApplyPage() {
  return (
    <Suspense fallback={<p style={{ padding: "40px", color: "white", background: "#0d0b18" }}>Chargement du formulaire...</p>}>
      <ApplyForm />
    </Suspense>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId") || "1";
  const [form, setForm] = useState<ApplicationForm>({ pseudo: "", role: "", niveau: "", message: "" });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(field: keyof ApplicationForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.pseudo || !form.role || !form.niveau || !form.message) {
      setStatus("Remplis tous les champs avant d'envoyer ta candidature.");
      return;
    }

    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recruitment_post_id: Number(postId), ...form }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus(result.message || "La candidature n'a pas pu être envoyée.");
        return;
      }

      setStatus("Ta candidature a bien été envoyée.");
      setForm({ pseudo: "", role: "", niveau: "", message: "" });
    } catch {
      setStatus("Impossible de joindre le serveur.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#0d0b18", color: "white", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "32px", borderRadius: "20px", background: "#19152b" }}>
        <p style={{ color: "#a98cff", fontWeight: "bold", letterSpacing: "2px" }}>LEAGUE TEAM HUB</p>
        <h1>Postuler à une annonce</h1>
        <p style={{ color: "#bdb7cf" }}>Présente ton profil à l'équipe. Annonce sélectionnée : #{postId}</p>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <label>Ton pseudo
            <input type="text" value={form.pseudo} onChange={(event) => updateField("pseudo", event.target.value)} placeholder="Exemple : FakerFR" style={inputStyle} />
          </label>

          <label>Ton rôle principal
            <select value={form.role} onChange={(event) => updateField("role", event.target.value)} style={inputStyle}>
              <option value="">Sélectionne ton rôle</option>
              {roles.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
          </label>

          <label>Ton niveau
            <select value={form.niveau} onChange={(event) => updateField("niveau", event.target.value)} style={inputStyle}>
              <option value="">Sélectionne ton niveau</option>
              {levels.map((level) => <option key={level} value={level}>{level}</option>)}
            </select>
          </label>

          <label>Message à l'équipe
            <textarea rows={6} value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Présente ton expérience, tes disponibilités et ta motivation..." style={{ ...inputStyle, resize: "vertical" }} />
          </label>

          <button type="submit" disabled={saving} style={{ padding: "14px", border: 0, borderRadius: "10px", background: "#8d62f5", color: "white", fontWeight: "bold", cursor: "pointer" }}>
            {saving ? "Envoi en cours..." : "Envoyer ma candidature"}
          </button>

          {status && <p style={{ padding: "12px", borderRadius: "8px", background: "#183b2c", color: "#7de0aa" }}>{status}</p>}
        </form>
      </section>
    </main>
  );
}

const inputStyle = { display: "block", width: "100%", marginTop: "8px", padding: "12px", boxSizing: "border-box" as const, border: "1px solid #40395d", borderRadius: "8px", background: "#121020", color: "white", fontSize: "15px" };
