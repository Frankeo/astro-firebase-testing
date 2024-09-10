import { SEER, VILLAGER, WITCH, WOLF } from "../constants";

function createNewCard(rol: Rol): Card {
  const card: Card = { isPicked: false, rol };
  return card;
}

export function generateCards(config: GameConfig): Card[] {
  const cards: Card[] = [];
  if (config.addSeer) cards.push(createNewCard(SEER));
  if (config.addWitch) cards.push(createNewCard(WITCH));
  for (let index = 0; index < config.wolves; index++) {
    cards.push(createNewCard(WOLF));
  }
  for (let index = cards.length; index < config.dessiredPlayers; index++) {
    cards.push(createNewCard(VILLAGER));
  }
  return cards;
}

export function pickCard(cards: Card[], rol: Rol): Card[] {
  const newCards = [...cards];
  for (const card of newCards) {
    if (card.rol === rol && !card.isPicked) {
      card.isPicked = true;
      break;
    }
  }
  return newCards;
}
