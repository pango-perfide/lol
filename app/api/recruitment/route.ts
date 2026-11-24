import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.equipe ||
      !body.role ||
      !body.niveauMinimum ||
      !body.description ||
      !body.horaires ||
      !body.places
    ) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    const [teamRows] = await db.execute(
      "SELECT id FROM teams WHERE nom = ? ORDER BY id DESC LIMIT 1",
      [body.equipe]
    );

    const teams = teamRows as Array<{ id: number }>;

    if (!teams.length) {
      return NextResponse.json(
        { message: "Crée d'abord l'équipe dans /team." },
        { status: 404 }
      );
    }

    const [result] = await db.execute(
      `INSERT INTO recruitment_posts
        (team_id, role_recherche, niveau_minimum, description, horaires, places)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        teams[0].id,
        body.role,
        body.niveauMinimum,
        body.description,
        body.horaires,
        Number(body.places),
      ]
    );

    return NextResponse.json({
      message: "Ton annonce de recrutement a bien été publiée.",
      postId: (result as { insertId: number }).insertId,
    });
  } catch (error) {
    console.error("Recruitment post creation error:", error);

    return NextResponse.json(
      { message: "Impossible d'enregistrer l'annonce dans la base." },
      { status: 500 }
    );
  }
}
