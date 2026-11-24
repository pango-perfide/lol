"use client";

import { useState, type FormEvent } from "react";

const levels = [
  "Iron / Bronze",
  "Silver / Gold",
  "Platinum / Emerald",
  "Diamond",
  "Master+",
];

const objectives = [
  "Jouer pour le plaisir",
  "Progresser ensemble",
  "Participer à des tournois",
  "Jouer de manière compétitive",
];

const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];

type TeamForm = {
  nom: string;
  description: string;
  niveau: string;
  objectif: string;
  roles: string[];
  horaires: string;
};

export default function TeamPage() {
  const [team, setTeam] = useState<TeamForm>({
    nom: "",
    description: "",
    niveau: "",
    objectif: "",
    roles: [],
    horaires: "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(
    field: "nom" | "description" | "niveau" | "objectif" | "horaires",
    value: string
  ) {
    setTeam((currentTeam) => ({
      ...currentTeam,
      [field]: value,
    }));
  }

  function toggleRole(role: string) {
    setTeam((currentTeam) => {
      const selected = currentTeam.roles.includes(role);

      return {
        ...currentTeam,
        roles: selected
          ? currentTeam.roles.filter((currentRole) => currentRole !== role)
          : [...currentTeam.roles, role],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !team.nom ||
      !team.description ||
      !team.niveau ||
      !team.objectif ||
      team.roles.length === 0 ||
      !team.horaires
    ) {
      setMessage("Remplis tous les champs et sélectionne au moins un rôle.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "L'équipe n'a pas pu être enregistrée.");
        return;
      }

      setMessage(result.message);
      setTeam({
        nom: "",
        description: "",
        niveau: "",
        objectif: "",
        roles: [],
        horaires: "",
      });
    } catch {
      setMessage("Impossible de joindre le serveur.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", background: "#0d0b18", color: "white", fontFamily: "Arial, sans-serif" }}>
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "32px", borderRadius: "20px", background: "#19152b" }}>
        <p style={{ color: "#a98cff", fontWeight: "bold" }}>LEAGUE TEAM HUB</p>
        <h1>Crée ton équipe</h1>
        <p style={{ color: "#bdb7cf" }}>Présente ton équipe et indique les rôles que tu recherches.</p>

        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <label>Nom de l'équipe
            <input type="text" value={team.nom} onChange={(event) => updateField("nom", event.target.value)} placeholder="Exemple : Les Invocateurs" style={inputStyle} />
          </label>

          <label>Description
            <textarea value={team.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Présente ton équipe..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />
          </label>

          <label>Niveau recherché
            <select value={team.niveau} onChange={(event) => updateField("niveau", event.target.value)} style={inputStyle}>
              <option value="">Sélectionne un niveau</option>
              {levels.map((level) => <option key={level} value={level}>{level}</option>)}
            </select>
          </label>

          <label>Objectif de l'équipe
            <select value={team.objectif} onChange={(event) => updateField("objectif", event.target.value)} style={inputStyle}>
              <option value="">Sélectionne un objectif</option>
              {objectives.map((objective) => <option key={objective} value={objective}>{objective}</option>)}
            </select>
          </label>

          <fieldset style={{ border: 0, padding: 0 }}>
            <legend>Rôles recherchés</legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "10px" }}>
              {roles.map((role) => (
                <label key={role}>
                  <input type="checkbox" checked={team.roles.includes(role)} onChange={() => toggleRole(role)} /> {role}
                </label>
              ))}
            </div>
          </fieldset>

          <label>Horaires habituels
            <input type="text" value={team.horaires} onChange={(event) => updateField("horaires", event.target.value)} placeholder="Exemple : mardi et jeudi, 20h à 22h" style={inputStyle} />
          </label>

          <button type="submit" disabled={saving} style={{ padding: "14px", border: 0, borderRadius: "10px", background: saving ? "#5d4a91" : "#8d62f5", color: "white", fontWeight: "bold", cursor: saving ? "wait" : "pointer" }}>
            {saving ? "Enregistrement..." : "Créer mon équipe"}
          </button>

          {message && <p style={{ padding: "12px", borderRadius: "8px", background: message.includes("bien") ? "#183b2c" : "#4a1f35", color: message.includes("bien") ? "#7de0aa" : "#ffb3c7" }}>{message}</p>}
        </form>
      </section>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  boxSizing: "border-box" as const,
  border: "1px solid #40395d",
  borderRadius: "8px",
  background: "#121020",
  color: "white",
  fontSize: "15px",
};
