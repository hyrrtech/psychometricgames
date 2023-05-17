const generateFish = number_of_fishes => {
  const fishes = [];
  for (let i = 0; i < number_of_fishes; i++) {
    fishes.push({id: i});
  }
  return fishes;
};

export default generateFish;
