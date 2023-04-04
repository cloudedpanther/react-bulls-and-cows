export default function generateRandomNumber() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const randomNumber = shuffle(candidates).slice(0, 4);

  return randomNumber;
}

function shuffle(array) {
  return [...array].sort(() => {
    return Math.random() - 0.5;
  });
}
