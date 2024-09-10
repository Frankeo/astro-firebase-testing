function getRandomRol(cards: Card[]): Rol {
  const limit = cards.length;
  const randomNumber = Math.floor(Math.random() * limit);
  return cards[randomNumber].rol;
}

export const generatePlayerRol = (cards: Card[]): Rol => {
  const availableCards = cards.filter((c) => !c.isPicked);
  return getRandomRol(availableCards);
};
