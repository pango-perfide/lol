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

export default function TeamPage() {
  const [team, setTeam] = useState({
    nom: "",
    description: "",
    niveau: "",
    objectif: "",
    roles: [] as string[],
    horaires: "",
  });

  const [message, setMessage] = useState("");

  function updateField(field: string, value: string) {
    setTeam((currentTeam) => ({
      ...currentTeam,
      [field]: value,
    }));
  }

  function toggleRole(role: string) {
    setTeam((currentTeam) => {
      const roleAlreadySelected = currentTeam.roles.includes(role);

      return {
        ...currentTeam,
        roles: roleAlreadySelected
          ? currentTeam.roles.filter(
              (selectedRole) => selectedRole !== role
            )
          : [...currentTeam.roles, role],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !team.nom ||
      !team.description ||
      !team.niveau ||
      !team.objectif ||
      team.roles.length === 0 ||
      !team.horaires
    ) {
      setMessage(
        "Remplis tous les champs et sélectionne au moins un rôle."
      );
      return;
    }

    try {
      localStorage.setItem(
        "leagueTeamHubTeam",
        JSON.stringify(team)
      );

      setMessage("Ton équipe a bien été créée.");
    } catch {
      setMessage("L'équipe a été créée, mais n'a pas pu être conservée.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px",
        background: "#0d0b18",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          padding: "32px",
          borderRadius: "20px",
          background: "#19152b",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            color: "#a98cff",
            fontSize: "12px",
        fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Créer mon équipe
          </button>

          {message && (
            <p
              style={{
                margin: 0,
                padding: "12px",
                borderRadius: "8px",
                background: "#183b2c",
                color: "#7de0aa",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  minHeight: "48px",
  marginTop: "8px",
  padding: "0 14px",
  boxSizing: "border-box" as const,
  border: "1px solid #40395d",
  borderRadius: "10px",
  background: "#121020",
  color: "white",
  fontSize: "15px",
};
