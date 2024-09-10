import { expect, test, describe } from "vitest";
import { SEER, VILLAGER, WITCH, WOLF } from "../src/constants";
import { generatePlayerRol } from "../src/domain/rol";

describe("Generate Player Rol", () => {
  test("should return only available roles", () => {
    const witchCard: Card = { isPicked: true, rol: WITCH };
    const villagerCard: Card = { isPicked: false, rol: VILLAGER };
    const wolfCard: Card = { isPicked: true, rol: WOLF };
    const seerCard: Card = { isPicked: true, rol: SEER };
    const cards = [villagerCard, witchCard, wolfCard, seerCard];
    const rol = generatePlayerRol(cards);
    expect(rol).toBe(VILLAGER);
  });
});
