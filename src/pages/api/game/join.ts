import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const gameId = formData.get("game-id")?.toString();

    if (gameId === undefined) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    return redirect(`/game/${gameId}`);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
