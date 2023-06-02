export const STARTING_DECK = [...Array(52).keys()].map((i) => `${i + 1}`);

export const generateShuffle = (inputArray: number[]) => {
  const outputArray = [...inputArray];
  let currentUserDecryptedIndex = inputArray.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentUserDecryptedIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentUserDecryptedIndex);
    currentUserDecryptedIndex--;

    // And swap it with the current element.
    [outputArray[currentUserDecryptedIndex], outputArray[randomIndex]] = [
      outputArray[randomIndex],
      outputArray[currentUserDecryptedIndex],
    ];
  }

  return outputArray;
};
