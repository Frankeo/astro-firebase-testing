/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { getFirestore } from "firebase-admin/firestore";
import { FIREBASE_GAMES } from "../constants";
import { generateCards, pickCard } from "../domain/card";
import { generatePlayerRol } from "../domain/rol";
import { app } from "../firebase/server";

const savePlayers = async (
  players: Player[],
  gameId: string,
): Promise<void> => {
  const db = getFirestore(app);
  const gamesRef = db.collection(FIREBASE_GAMES);
  await gamesRef.doc(gameId).update({ players });
};

const saveCards = async (cards: Card[], gameId: string): Promise<void> => {
  const db = getFirestore(app);
  const gamesRef = db.collection(FIREBASE_GAMES);
  await gamesRef.doc(gameId).update({ cards });
};

export const createNewPlayer = async (
  game: Game,
  user: User,
  gameId: string,
): Promise<Player> => {
  const existingPlayer = game.players.filter(
    (p) => p.user.uid === user.uid,
  )?.[0];
  if (existingPlayer !== undefined) return existingPlayer;
  const rol = generatePlayerRol(game.cards);
  const cards = pickCard(game.cards, rol);
  const player = {
    rol,
    user,
  } as Player;
  await savePlayers([...game.players, player], gameId);
  await saveCards(cards, gameId);
  return player;
};

export const createGame = async (config: GameConfig): Promise<string> => {
  const db = getFirestore(app);
  const gamesRef = db.collection(FIREBASE_GAMES);
  const cards = generateCards(config);
  const gameDoc = await gamesRef.add({ config, cards, players: [] } as Game);
  return gameDoc.id;
};
