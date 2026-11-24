"use client";

import { useState } from "react";

const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];

const levels = [
  "Iron / Bronze",
  "Silver / Gold",
  "Platinum / Emerald",
  "Diamond",
  "Master+",
];

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

type PlayerProfile = {
  pseudo: string;
  role: string;
  niveau: string;
  jours: string[];
  heureDebut: string;
  heureFin: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<PlayerProfile>({
    pseudo: "",
    role: "",
    niveau: "",
    jours: [],
    heureDebut: "",
    heureFin: "",
  });

  const [message, setMessage] = useState("");

  function updateField(
    field: keyof PlayerProfile,
    value: string
  ) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  function toggleDay(day: string) {
    setProfile((currentProfile) => {
      const dayAlreadySelected = currentProfile.jours.includes(day);

      return {
        ...currentProfile,
        jours: dayAlreadySelected
          ? currentProfile.jours.filter(
              (selectedDay) => selectedDay !== day
            )
          : [...currentProfile.jours, day],
      };
    });
  }

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const missingField =
    !profile.pseudo ||
    !profile.role ||
    !profile.niveau ||
    profile.jours.length === 0 ||
    !profile.heureDebut ||
    !profile.heureFin;

  if (missingField) {
    setMessage(
      "Remplis le pseudo, le rôle, le niveau, un jour et les deux horaires."
    );
    return;
  }

  setMessage("Ton profil joueur a bien été créé.");

  try {
    localStorage.setItem(
      "leagueTeamHubPlayerProfile",
      JSON.stringify(profile)
    );
  } catch {
    setMessage(
      "Le profil est créé, mais il n'a pas pu être conservé dans ce navigateur."
    );
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
          maxWidth: "680px",
          margin: "0 auto",
          padding: "32px",
          borderRadius: "20px",
          background: "#19152b",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
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
            Crée ton profil joueur
          </h1>

          <p
            style={{
              margin: 0,
              color: "#bdb7cf",
              lineHeight: 1.6,
            }}
          >
            Indique ton rôle, ton niveau et tes disponibilités
            pour rejoindre une équipe.
          </p>
        </div>

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
            <span> pseudo</span>

            <input
              type="text"
              placeholder="Exemple : FakerFR"
              value={profile.pseudo}
              onChange={(event) =>
                updateField("pseudo", event.target.value)
              }
              required
              style={inputStyle}
            />
          </label>

          <label>
            <span>Rôle principal</span>

            <select
              value={profile.role}
              onChange={(event) =>
                updateField("role", event.target.value)
              }
              required
              style={inputStyle}
            >
              <option value="">Sélectionne ton rôle</option>

              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Niveau</span>

            <select
              value={profile.niveau}
              onChange={(event) =>
                updateField("niveau", event.target.value)
              }
              required
              style={inputStyle}
            >
              <option value="">Sélectionne ton niveau</option>

              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
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
              Jours disponibles
            </legend>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "10px",
              }}
            >
              {days.map((day) => {
                const selected = profile.jours.includes(day);

                return (
                  <label
                    key={day}
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
                      onChange={() => toggleDay(day)}
                    />

                    <span>{day}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <label>
              <span>Disponible à partir de</span>

              <input
                type="time"
                value={profile.heureDebut}
                onChange={(event) =>
                  updateField("heureDebut", event.target.value)
                }
                required
                style={inputStyle}
              />
            </label>

            <label>
              <span>Disponible jusqu'à</span>

              <input
                type="time"
                value={profile.heureFin}
                onChange={(event) =>
                  updateField("heureFin", event.target.value)
                }
                required
                style={inputStyle}
              />
            </label>
          </div>

          <button
            type="submit"
            style={{
              minHeight: "52px",
              border: 0,
              borderRadius: "10px",
              background: "#8d62f5",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Créer mon profil
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
