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
            letterSpacing: "2px",
          }}
        >
          LEAGUE TEAM HUB
        </p>

        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "38px",
          }}
        >
          Crée ton équipe
        </h1>

        <p
          style={{
            margin: "0 0 28px",
            color: "#bdb7cf",
            lineHeight: 1.6,
          }}
        >
          Présente ton équipe et indique les joueurs que tu recherches.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <label>
            <span>Nom de l'équipe</span>

            <input
              type="text"
              placeholder="Exemple : Les Invocateurs"
              value={team.nom}
              onChange={(event) =>
                updateField("nom", event.target.value)
              }
              style={inputStyle}
            />
          </label>

          <label>
            <span>Description</span>

            <textarea
              placeholder="Présente ton équipe en quelques mots..."
              value={team.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              rows={5}
              style={{
                ...inputStyle,
                paddingTop: "14px",
                resize: "vertical",
              }}
            />
          </label>

          <label>
            <span>Niveau recherché</span>

            <select
              value={team.niveau}
              onChange={(event) =>
                updateField("niveau", event.target.value)
              }
              style={inputStyle}
            >
              <option value="">Sélectionne un niveau</option>

              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Objectif de l'équipe</span>

            <select
              value={team.objectif}
              onChange={(event) =>
                updateField("objectif", event.target.value)
              }
              style={inputStyle}
            >
              <option value="">Sélectionne un objectif</option>

              {objectives.map((objective) => (
                <option key={objective} value={objective}>
                  {objective}
                </option>
              ))}
            </select>
          </label>

          <fieldset
            style={{
              border: 0,
              padding: 0,
              margin: 0,
            }}
          >
            <legend style={{ marginBottom: "12px" }}>
              Rôles recherchés
            </legend>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "10px",
              }}
            >
              {roles.map((role) => {
                const selected = team.roles.includes(role);

                return (
                  <label
                    key={role}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px",
                      borderRadius: "10px",
                      border: selected
                        ? "1px solid #a98cff"
                        : "1px solid #40395d",
                      background: selected
                        ? "#302252"
                        : "#121020",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleRole(role)}
                    />

                    <span>{role}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label>
            <span>Horaires habituels</span>

            <input
              type="text"
              placeholder="Exemple : mardi et jeudi, 20h à 22h"
              value={team.horaires}
              onChange={(event) =>
                updateField("horaires", event.target.value)
              }
              style={inputStyle}
            />
          </label>

          <button
            type="submit"
            style={{
              minHeight: "52px",
              border: 0,
              borderRadius: "10px",
              background: "#8d62f5",
              color: "white",
              fontSize: "16px",
              fontWeight: 
