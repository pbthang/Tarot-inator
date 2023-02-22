import tarots from "../assets/tarot.json";

const cards = tarots.cards;

export const getRandomCards = (count) => {
  const randomCards = [];
  let i = 0;
  while (i < count) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];
    const reversed = Math.random() > 0.5;
    if (!randomCards.map((c) => c.name).includes(randomCard.name)) {
      randomCards.push({ ...randomCard, reversed });
      i++;
    }
  }
  return randomCards;
};

export const getRandomCard = (drawn) => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const randomCard = cards[randomIndex];
  const reversed = Math.random() > 0.5;
  if (
    drawn
      .filter((c) => c)
      .map((c) => c.name)
      .includes(randomCard.name)
  ) {
    return getRandomCard(drawn);
  }
  return { ...randomCard, reversed };
};
