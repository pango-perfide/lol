"use client";

import { useEffect, useState, type FormEvent } from "react";

const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];
const levels = ["Iron / Bronze", "Silver / Gold", "Platinum / Emerald", "Diamond", "Master+"];

type RecruitmentForm = {
  role: string;
  niveauMinimum: string;
  description: string;
  horaires: string;
  places: string;
};

export default function RecruitmentPage() {
  const [teamName, setTeamName] = useState("Mon équipe");
  const [announcement, setAnnouncement] = useState<RecruitmentForm>({
    role: "",
    niveauMinimum: "",
    description: "",
    horaires: "",
    places: "1",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("leagueTeamHubTeam");

    if (savedTeam) {
      const team = JSON.parse(savedTeam);
      setTeamName(team.nom || "Mon équipe");
    }
  }, []);

  function updateField(field: keyof RecruitmentForm, value: string) {
    setAnnouncement((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !announcement.role ||
      !announcement.niveauMinimum ||
      !announcement.description ||
      !announcement.horaires ||
      !announcement.places
    ) {
      setMessage("Remplis tous les champs avant de publier.");
      return;
    }

    setSaving(true);
    setMessage("");
    setPostId(null);

    try {
      const response = await fetch("/api/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipe: teamName, ...announcement }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "L'annonce n'a pas pu être publiée.");
        return;
      }

      setMessage(result.message);
      setPostId(result.postId);
      setAnnouncement({
        role: "",
        niveauMinimum: "",
        description: "",
        horaires: "",
        places: "1",
      });
    } catch {
      setMessage("Impossible de joindre le serveur.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={eyebrowStyle}>RECRUTEMENT</p>
        <h1>Publier une annonce</h1>
        <p style={mutedStyle}>Équipe concernée : <strong>{teamName}</strong></p>

        <form onSubmit={handleSubmit} noValidate style={formStyle}>
          <label>Rôle recherché
            <select value={announcement.role} onChange={(event) => updateField("role", event.target.value)} style={inputStyle}>
              <option value="">Sélectionne un rôle</option>
              {roles.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
          </label>

          <label>Niveau minimum
            <select value={announcement.niveauMinimum} onChange={(event) => updateField("niveauMinimum", event.target.value)} style={inputStyle}>
              <option value="">Sélectionne un niveau</option>
              {levels.map((level) => <option key={level} value={level}>{level}</option>)}
            </select>
          </label>

          <label>Nombre de places
            <input type="number" min="1" max="5" value={announcement.places} onChange={(event) => updateField("places", event.target.value)} style={inputStyle} />
          </label>

          <label>Horaires de l'équipe
            <input type="text" placeholder="Exemple : mardi et jeudi, 20h à 22h" value={announcement.horaires} onChange={(event) => updateField("horaires", event.target.value)} style={inputStyle} />
          </label>

          <label>Description de l'annonce
            <textarea rows={6} placeholder="Présente le profil du joueur recherché..." value={announcement.description} onChange={(event) => updateField("description", event.target.value)} style={{ ...inputStyle, paddingTop: "12px", resize: "vertical" }} />
          </label>

          <button type="submit" disabled={saving} style={buttonStyle}>
            {saving ? "Publication en cours..." : "Publier l'annonce"}
          </button>

          {message && <p style={messageStyle}>{message}</p>}
          {postId && <p style={linkStyle}>Identifiant de l'annonce : {postId}. Utilise-le pour ouvrir la candidature correspondante.</p>}
        </form>
      </section>
    </main>
  );
}

const pageStyle = { minHeight: "100vh", padding: "40px 20px", background: "#0d0b18", color: "white", fontFamily: "Arial, sans-serif" };
const cardStyle = { maxWidth: "700px", margin: "0 auto", padding: "32px", borderRadius: "20px", background: "#19152b" };
const formStyle = { display: "flex", flexDirection: "column" as const, gap: "18px" };
const inputStyle = { display: "block", width: "100%", marginTop: "8px", padding: "12px", boxSizing: "border-box" as const, border: "1px solid #40395d", borderRadius: "8px", background: "#121020", color: "white", fontSize: "15px" };
const eyebrowStyle = { color: "#a98cff", fontWeight: "bold", letterSpacing: "2px" };
const mutedStyle = { color: "#bdb7cf" };
const buttonStyle = { padding: "14px", border: 0, borderRadius: "10px", background: "#8d62f5", color: "white", fontWeight: "bold", cursor: "pointer" };
const messageStyle = { padding: "12px", borderRadius: "8px", background: "#183b2c", color: "#7de0aa" };
const linkStyle = { color: "#bdb7cf", fontSize: "14px" };
