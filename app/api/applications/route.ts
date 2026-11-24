import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const postId = Number(body.recruitment_post_id);

    if (!postId || !body.pseudo || !body.role || !body.niveau || !body.message) {
      return NextResponse.json({ message: "Tous les champs sont obligatoires." }, { status: 400 });
    }

    const [posts] = await db.execute("SELECT id FROM recruitment_posts WHERE id = ? LIMIT 1", [postId]);
    if (!(posts as Array<{ id: number }>).length) {
      return NextResponse.json({ message: "Cette annonce n'existe pas encore." }, { status: 404 });
    }

    await db.execute(`CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      recruitment_post_id INT NOT NULL,
      player_id INT NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recruitment_post_id) REFERENCES recruitment_posts(id),
      FOREIGN KEY (player_id) REFERENCES players(id)
    )`);

    const [existingPlayers] = await db.execute("SELECT id FROM players WHERE pseudo = ? LIMIT 1", [body.pseudo]);
    const players = existingPlayers as Array<{ id: number }>;
    let playerId = players[0]?.id;

    if (!playerId) {
      const [playerResult] = await db.execute(
        "INSERT INTO players (pseudo, role_principal, niveau, jours_disponibles, heure_debut, heure_fin) VALUES (?, ?, ?, ?, ?, ?)",
        [body.pseudo, body.role, body.niveau, JSON.stringify([]), "00:00", "23:59"]
      );
      playerId = (playerResult as { insertId: number }).insertId;
    }

    await db.execute(
      "INSERT INTO applications (recruitment_post_id, player_id, message, status) VALUES (?, ?, ?, 'pending')",
      [postId, playerId, body.message]
    );

    return NextResponse.json({ message: "Ta candidature a bien été envoyée." });
  } catch (error) {
    console.error("Application creation error:", error);
    return NextResponse.json({ message: "Impossible d'enregistrer la candidature." }, { status: 500 });
  }
}
