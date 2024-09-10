/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
  displayName?: string;
  uid?: string;
}

declare namespace App {
  interface Locals {
    user: User;
  }
}

declare module "bulma-slider/dist/js/bulma-slider.min.js";

interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly FIREBASE_PRIVATE_KEY_ID: string;
  readonly FIREBASE_PRIVATE_KEY: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_CLIENT_EMAIL: string;
  readonly FIREBASE_CLIENT_ID: string;
  readonly FIREBASE_AUTH_URI: string;
  readonly FIREBASE_TOKEN_URI: string;
  readonly FIREBASE_AUTH_CERT_URL: string;
  readonly FIREBASE_CLIENT_CERT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Game {
  config: GameConfig;
  cards: Card[];
  players: Player[];
}

interface GameConfig {
  wolves: number;
  addSeer: boolean;
  addWitch: boolean;
  dessiredPlayers: number;
}

interface Player {
  rol: Rol;
  user: User;
}

interface Card {
  rol: Rol;
  isPicked: boolean;
}

interface CreatePlayerRequest {
  gameId: string;
}

type Rol = "Villager" | "Seer" | "Wolf" | "Witch";
