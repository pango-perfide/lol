"use client"

import { useMemo, useState } from "react"

type Player = {
  name: string
  role: string
  rank: string
  region: string
  availability: string
  initials: string
  color: string
}

const players: Player[] = [
  {
    name: "Kairo",
    role: "Jungle",
    rank: "Diamond",
    region: "EUW",
    availability: "Disponible",
    initials: "K",
    color: "#8b5cf6",
  },
  {
    name: "Mikael",
    role: "Mid",
    rank: "Master",
    region: "EUW",
    availability: "Disponible",
    initials: "M",
    color: "#06b6d4",
  },
  {
    name: "Nova",
    role: "Bot / ADC",
    rank: "Emerald",
    region: "EUNE",
    availability: "Disponible bientôt",
    initials: "N",
    color: "#ec4899",
  },
  {
    name: "Rivenx",
    role: "Top",
    rank: "Diamond",
    region: "EUW",
    availability: "Disponible",
    initials: "R",
    color: "#f97316",
  },
  {
    name: "Sx le gros singe",
    role: "Support",
    rank: "Platinum",
    region: "EUW",
    availability: "Disponible",
    initials: "S",
    color: "#22c55e",
  },
  {
    name: "Vexel",
    role: "Jungle",
    rank: "Grandmaster",
    region: "EUW",
    availability: "Disponible",
    initials: "V",
    color: "#eab308",
  },
]

const roles = ["Tous les rôles", "Top", "Jungle", "Mid", "Bot / ADC", "Support"]

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState("Tous les rôles")
  const [search, setSearch] = useState("")

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesRole =
        selectedRole === "Tous les rôles" || player.role === selectedRole

      const searchValue = search.toLowerCase()

      const matchesSearch =
        player.name.toLowerCase().includes(searchValue) ||
        player.rank.toLowerCase().includes(searchValue) ||
        player.region.toLowerCase().includes(searchValue)

      return matchesRole && matchesSearch
    })
  }, [selectedRole, search])

  return (
    <main className="site">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <span>League Team Hub</span>
        </div>

        <div className="nav-links">
          <a href="#players">Joueurs</a>
          <a href="#teams">Équipes</a>
          <a href="#recruitment">Recrutement</a>
        </div>

        <a href="/profile" className="nav-button">
  Créer un profil
</a>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot" />
            La plateforme de recrutement League of Legends
          </div>

          <h1>
            Trouve ton équipe.
            <br />
            <span>Construis ta légende.</span>
          </h1>

          <p className="hero-text">
            League Team Hub connecte les joueurs motivés avec des équipes
            ambitieuses grâce aux rôles, aux rangs et aux objectifs communs.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#players">
              Trouver des joueurs
            </a>
            <a className="secondary-button" href="#recruitment">
              Voir les recrutements
            </a>
          </div>

          <div className="hero-note">
            Profils vérifiés · Recrutement simplifié · Communauté compétitive
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span className="mini-label">ACTIVITÉ RÉCENTE</span>
            <span className="live-label">● EN DIRECT</span>
          </div>

          <div className="match-card">
            <div className="match-icon purple">✦</div>
            <div>
              <strong>Équipe Eclipse</strong>
              <span>Recherche un Support</span>
            </div>
            <span className="rank-badge">DIA+</span>
          </div>

          <div className="match-card">
            <div className="match-icon cyan">◆</div>
            <div>
              <strong>Nova rejoint une équipe</strong>
              <span>Bot / ADC · Emerald</span>
            </div>
            <span className="green-check">✓</span>
          </div>

          <div className="match-card">
            <div className="match-icon orange">★</div>
            <div>
              <strong>Nouvelle annonce</strong>
              <span>Équipe compétitive EUW</span>
            </div>
            <span className="orange-arrow">→</span>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>1 240+</strong>
          <span>Joueurs inscrits</span>
        </div>
        <div>
          <strong>186</strong>
          <span>Équipes actives</span>
        </div>
        <div>
          <strong>432</strong>
          <span>Annonces ouvertes</span>
        </div>
        <div>
          <strong>5</strong>
          <span>Rôles disponibles</span>
        </div>
      </section>

      <section className="section" id="players">
        <div className="section-heading">
          <div>
            <span className="section-kicker">EXPLORER</span>
            <h2>Joueurs disponibles</h2>
            <p>
              Trouvez le joueur qui complète votre composition et vos objectifs.
            </p>
          </div>

          <button className="text-button">Voir tous les joueurs →</button>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="Rechercher un joueur, un rang ou une région..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>

          <button className="filter-button">Filtres avancés</button>
        </div>

        <div className="player-grid">
          {filteredPlayers.map((player) => (
            <article className="player-card" key={player.name}>
              <div className="player-card-header">
                <div
                  className="avatar"
                  style={{ backgroundColor: player.color }}
                >
                  {player.initials}
                </div>

                <div className="player-identity">
                  <h3>{player.name}</h3>
                  <span>{player.region} · {player.availability}</span>
                </div>

                <button className="more-button">•••</button>
              </div>

              <div className="player-details">
                <div>
                  <span>Rôle principal</span>
                  <strong>{player.role}</strong>
                </div>
                <div>
                  <span>Rang actuel</span>
                  <strong>{player.rank}</strong>
                </div>
              </div>

              <button className="card-button">Voir le profil</button>
            </article>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="empty-state">
            Aucun joueur ne correspond à votre recherche.
          </div>
        )}
      </section>

      <section className="section dark-section" id="teams">
        <div className="section-heading">
          <div>
            <span className="section-kicker">ÉQUIPES</span>
            <h2>Équipes à la recherche de talents</h2>
            <p>
              Rejoignez une équipe qui partage votre niveau et vos ambitions.
            </p>
          </div>

          <button className="text-button light-button">
            Voir toutes les équipes →
          </button>
        </div>

        <div className="team-grid">
          <article className="team-card">
            <div className="team-logo purple-logo">E</div>
            <div>
              <h3>Eclipse Academy</h3>
              <p>EUW · Compétitif</p>
            </div>
            <span className="team-open">3 postes ouverts</span>
          </article>

          <article className="team-card">
            <div className="team-logo cyan-logo">N</div>
            <div>
              <h3>Nova Five</h3>
              <p>EUW · Tournois</p>
            </div>
            <span className="team-open">2 postes ouverts</span>
          </article>

          <article className="team-card">
            <div className="team-logo orange-logo">R</div>
            <div>
              <h3>Rift Raiders</h3>
              <p>EUNE · Classé</p>
            </div>
            <span className="team-open">1 poste ouvert</span>
          </article>
        </div>
      </section>

      <section className="recruitment-section" id="recruitment">
        <div>
          <span className="section-kicker">PRÊT À JOUER ?</span>
          <h2>Votre prochaine équipe commence ici.</h2>
          <p>
            Créez votre profil, publiez votre recherche et trouvez des joueurs
            qui partagent votre vision du jeu.
          </p>
        </div>

        <button className="primary-button">Commencer gratuitement</button>
      </section>

      <footer className="footer">
        <div className="brand">
          <div className="brand-mark">L</div>
          <span>League Team Hub</span>
        </div>
        <span>La communauté qui forme les meilleures équipes.</span>
      </footer>

      <style jsx global>{`
        :root {
          --background: #080b16;
          --panel: #111627;
          --panel-light: #171d31;
          --text: #f8fafc;
          --muted: #94a3b8;
          --purple: #8b5cf6;
          --cyan: #06b6d4;
          --border: rgba(148, 163, 184, 0.18);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--background);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        select {
          font: inherit;
        }

        .site {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 10%, rgba(91, 33, 182, 0.22), transparent 32rem),
            radial-gradient(circle at 90% 20%, rgba(8, 145, 178, 0.13), transparent 28rem),
            var(--background);
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .brand-mark {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--purple), var(--cyan));
          color: white;
          font-size: 20px;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          color: var(--muted);
          font-size: 14px;
        }

        .nav-links a:hover {
          color: white;
        }

        .nav-button,
        .primary-button {
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--purple), #6366f1);
          color: white;
          cursor: pointer;
          font-weight: 700;
        }

        .nav-button {
          padding: 11px 17px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 80px;
          max-width: 1240px;
          margin: 0 auto;
          padding: 100px 28px 80px;
        }

        .eyebrow,
        .section-kicker {
          color: #a78bfa;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 22px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 14px #22c55e;
        }

        h1 {
          max-width: 700px;
          margin: 0;
          font-size: clamp(3rem, 7vw, 6.4rem);
          line-height: 0.98;
          letter-spacing: -0.07em;
        }

        h1 span {
          color: #a78bfa;
        }

        .hero-text {
          max-width: 590px;
          margin: 28px 0;
          color: var(--muted);
          font-size: 18px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .primary-button,
        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 20px;
        }

        .secondary-button {
          border: 1px solid var(--border);
          border-radius: 10px;
          color: #e2e8f0;
        }

        .hero-note {
          margin-top: 24px;
          color: #64748b;
          font-size: 12px;
        }

        .hero-card {
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: 24px;
          background: rgba(17, 22, 39, 0.82);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
        }

        .hero-card-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .mini-label {
          color: #64748b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .live-label {
          color: #22c55e;
          font-size: 11px;
          font-weight: 800;
        }

        .match-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }

        .match-card:last-child {
          border-bottom: 0;
        }

        .match-card > div:nth-child(2) {
          display: grid;
          flex: 1;
          gap: 5px;
        }

        .match-card span {
          color: var(--muted);
          font-size: 12px;
        }

        .match-card strong {
          font-size: 14px;
        }

        .match-icon {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 12px;
          font-size: 20px;
        }

        .purple {
          background: rgba(139, 92, 246, 0.2);
          color: #c4b5fd;
        }

        .cyan {
          background: rgba(6, 182, 212, 0.2);
          color: #67e8f9;
        }

        .orange {
          background: rgba(249, 115, 22, 0.2);
          color: #fdba74;
        }

        .rank-badge {
          padding: 5px 8px;
          border-radius: 6px;
          background: rgba(139, 92, 246, 0.2);
          color: #c4b5fd !important;
          font-size: 10px !important;
          font-weight: 800;
        }

        .green-check {
          color: #22c55e !important;
          font-size: 20px !important;
        }

        .orange-arrow {
          color: #fb923c !important;
          font-size: 22px !important;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1184px;
          margin: 0 auto;
          padding: 26px 28px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .stats div {
          display: grid;
          gap: 7px;
          padding: 12px 24px;
          border-right: 1px solid var(--border);
        }

        .stats div:last-child {
          border-right: 0;
        }

        .stats strong {
          font-size: 27px;
        }

        .stats span,
        .section-heading p,
        .recruitment-section p {
          color: var(--muted);
          font-size: 14px;
        }

        .section {
          max-width: 1240px;
          margin: 0 auto;
          padding: 110px 28px;
        }

        .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 34px;
        }

        h2 {
          margin: 10px 0;
          font-size: clamp(2rem, 4vw, 3.5rem);
          letter-spacing: -0.05em;
        }

        .section-heading p {
          margin: 0;
        }

        .text-button {
          border: 0;
          background: transparent;
          color: #c4b5fd;
          cursor: pointer;
          font-weight: 700;
          white-space: nowrap;
        }

        .filters {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .filters input,
        .filters select,
        .filter-button {
          min-height: 46px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: rgba(17, 22, 39, 0.85);
          color: #e2e8f0;
        }

        .filters input {
          flex: 1;
          min-width: 220px;
          padding: 0 15px;
          outline: none;
        }

        .filters select,
        .filter-button {
          padding: 0 14px;
        }

        .filter-button {
          cursor: pointer;
        }

        .player-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .player-card,
        .team-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          background: rgba(17, 22, 39, 0.72);
        }

        .player-card {
          padding: 20px;
        }

        .player-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar,
        .team-logo {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: white;
          font-weight: 900;
        }

        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 13px;
        }

        .player-identity {
          display: grid;
          flex: 1;
          gap: 5px;
        }

        .player-identity h3,
        .team-card h3 {
          margin: 0;
          font-size: 15px;
        }

        .player-identity span,
        .team-card p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
        }

        .more-button {
          border: 0;
          background: transparent;
          color: #64748b;
          cursor: pointer;
        }

        .player-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 24px 0;
        }

        .player-details div {
          display: grid;
          gap: 6px;
          padding: 11px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.04);
        }

        .player-details span {
          color: #64748b;
          font-size: 11px;
        }

        .player-details strong {
          font-size: 13px;
        }

        .card-button {
          width: 100%;
          min-height: 40px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          color: #e2e8f0;
          cursor: pointer;
          font-weight: 700;
        }

        .empty-state {
          padding: 35px;
          border: 1px dashed var(--border);
          border-radius: 14px;
          color: var(--muted);
          text-align: center;
        }

        .dark-section {
          max-width: none;
          background: rgba(17, 22, 39, 0.58);
        }

        .dark-section > * {
          max-width: 1184px;
          margin-left: auto;
          margin-right: auto;
        }

        .light-button {
          color: #c4b5fd;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .team-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 18px;
        }

        .team-logo {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          font-size: 21px;
        }

        .purple-logo {
          background: #7c3aed;
        }

        .cyan-logo {
          background: #0891b2;
        }

        .orange-logo {
          background: #ea580c;
        }

        .team-card div:nth-child(2) {
          flex: 1;
        }

        .team-card p {
          margin-top: 5px;
        }

        .team-open {
          color: #4ade80;
          font-size: 11px;
          white-space: nowrap;
        }

        .recruitment-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          max-width: 1184px;
          margin: 0 auto;
          padding: 110px 28px;
        }

        .recruitment-section h2 {
          max-width: 600px;
        }

        .recruitment-section p {
          max-width: 570px;
          line-height: 1.7;
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1184px;
          margin: 0 auto;
          padding: 30px 28px 45px;
          border-top: 1px solid var(--border);
          color: #64748b;
          font-size: 12px;
        }

        @media (max-width: 850px) {
          .nav-links {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
            gap: 45px;
            padding-top: 65px;
          }

          .stats,
          .player-grid,
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-heading,
          .recruitment-section {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 580px) {
          .navbar {
            padding: 18px;
          }

          .nav-button {
            display: none;
          }

          .hero,
          .section,
          .recruitment-section {
            padding-right: 18px;
            padding-left: 18px;
          }

          .hero {
            padding-top: 55px;
          }

          .hero-text {
            font-size: 16px;
          }

          .stats,
          .player-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }

          .stats {
            margin-right: 18px;
            margin-left: 18px;
            padding: 10px 0;
          }

          .stats div {
            border-right: 0;
            border-bottom: 1px solid var(--border);
          }

          .stats div:last-child {
            border-bottom: 0;
          }

          .filters {
            flex-direction: column;
          }

          .footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
            padding-right: 18px;
            padding-left: 18px;
          }
        }
      `}</style>
    </main>
  )
}
