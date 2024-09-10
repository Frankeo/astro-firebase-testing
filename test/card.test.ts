import { expect, test, describe } from "vitest";
import { SEER, VILLAGER, WITCH, WOLF } from "../src/constants";
import { generateCards, pickCard } from "../src/domain/card";

describe("Cards generation", () => {
  test("should generate all VILLAGERS when there is no wolves", () => {
    const config: GameConfig = {
      dessiredPlayers: 10,
      wolves: 0,
      addSeer: false,
      addWitch: false,
    };
    const cards = generateCards(config);
    expect(cards).not.toContain({ isPicked: false, rol: WOLF });
  });

  test("should generate 2 VILLAGERS and 2 WOLVES", () => {
    const config: GameConfig = {
      dessiredPlayers: 4,
      wolves: 2,
      addSeer: false,
      addWitch: false,
    };
    const cards = generateCards(config);
    const wolfCard = { isPicked: false, rol: WOLF };
    const villagerCard = { isPicked: false, rol: VILLAGER };
    const expected = [wolfCard, wolfCard, villagerCard, villagerCard];
    expect(cards).toStrictEqual(expected);
  });

  test("should generate 1 VILLAGERS, 2 WOLVES and 1 SEER", () => {
    const config: GameConfig = {
      dessiredPlayers: 4,
      wolves: 2,
      addSeer: true,
      addWitch: false,
    };
    const cards = generateCards(config);
    const seerCard = { isPicked: false, rol: SEER };
    const wolfCard = { isPicked: false, rol: WOLF };
    const villagerCard = { isPicked: false, rol: VILLAGER };
    const expected = [seerCard, wolfCard, wolfCard, villagerCard];
    expect(cards).toStrictEqual(expected);
  });

  test("should generate 1 VILLAGERS, 2 WOLVES and 1 WITCH", () => {
    const config: GameConfig = {
      dessiredPlayers: 4,
      wolves: 2,
      addSeer: false,
      addWitch: true,
    };
    const cards = generateCards(config);
    const witchCard = { isPicked: false, rol: WITCH };
    const wolfCard = { isPicked: false, rol: WOLF };
    const villagerCard = { isPicked: false, rol: VILLAGER };
    const expected = [witchCard, wolfCard, wolfCard, villagerCard];
    expect(cards).toStrictEqual(expected);
  });

  test("should generate 1 SEER, 2 WOLVES and 1 WITCH", () => {
    const config: GameConfig = {
      dessiredPlayers: 4,
      wolves: 2,
      addSeer: true,
      addWitch: true,
    };
    const cards = generateCards(config);
    const witchCard = { isPicked: false, rol: WITCH };
    const seerCard = { isPicked: false, rol: SEER };
    const wolfCard = { isPicked: false, rol: WOLF };
    const expected = [seerCard, witchCard, wolfCard, wolfCard];
    expect(cards).toStrictEqual(expected);
  });

  test("should generate 1 SEER, 2 WOLVES, 1 WITCH and 2 VILLAGERS", () => {
    const config: GameConfig = {
      dessiredPlayers: 6,
      wolves: 2,
      addSeer: true,
      addWitch: true,
    };
    const cards = generateCards(config);
    const witchCard = { isPicked: false, rol: WITCH };
    const seerCard = { isPicked: false, rol: SEER };
    const wolfCard = { isPicked: false, rol: WOLF };
    const villagerCard = { isPicked: false, rol: VILLAGER };
    const expected = [
      seerCard,
      witchCard,
      wolfCard,
      wolfCard,
      villagerCard,
      villagerCard,
    ];
    expect(cards).toStrictEqual(expected);
  });
});

describe("Pick a Card", () => {
  test("should pick the only card left of a rol", () => {
    const witchCard: Card = { isPicked: false, rol: WITCH };
    const cards = [witchCard];
    const result = pickCard(cards, WITCH);
    const expected: Card = { ...witchCard, isPicked: true };
    expect(result).toStrictEqual([expected]);
  });
  test("should pick only one card when there are multiple cards of the same rol", () => {
    const witchCard: Card = { isPicked: false, rol: WITCH };
    const villagerCard: Card = { isPicked: false, rol: VILLAGER };
    const cards = [
      { ...villagerCard },
      { ...witchCard },
      { ...villagerCard },
      { ...witchCard },
    ];
    const result = pickCard(cards, WITCH);
    const expected = [
      { ...villagerCard },
      { ...witchCard, isPicked: true },
      { ...villagerCard },
      { ...witchCard },
    ];
    expect(result).toStrictEqual(expected);
  });
});
