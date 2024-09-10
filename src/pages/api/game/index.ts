import type { APIRoute } from "astro";
import { createGame } from "../../../handlers/game";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const wolves = formData.get("wolves")?.toString();
    const players = formData.get("players")?.toString();
    const addSeer = formData.get("seer") === "on";
    const addWitch = formData.get("witch") === "on";

    if (wolves === undefined || players === undefined) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    const config: GameConfig = {
      wolves: parseInt(wolves),
      addSeer,
      addWitch,
      dessiredPlayers: parseInt(players),
    };
    const gameId = await createGame(config);
    return redirect(`/game/${gameId}`);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
