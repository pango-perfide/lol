import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.nom ||
      !body.description ||
      !body.niveau ||
      !body.objectif ||
      !Array.isArray(body.roles) ||
      body.roles.length === 0 ||
      !body.horaires
    ) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    await db.execute(
      `INSERT INTO teams
        (nom, description, niveau, objectif, roles_recherches, horaires)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        body.nom,
        body.description,
        body.niveau,
        body.objectif,
        JSON.stringify(body.roles),
        body.horaires,
      ]
    );

    return NextResponse.json({
      message: "Ton équipe a bien été enregistrée dans la base.",
    });
  } catch (error) {
    console.error("Team creation error:", error);

    return NextResponse.json(
      { message: "Impossible d'enregistrer l'équipe dans la base." },
      { status: 500 }
    );
  }
}
