import constants from './constants';
const {WindowHeight, WindowWidth, PlantPotHeight, PlantPotWidth} = constants;

const getPlantPotsPositions = num_of_pots => {
  const gap = PlantPotWidth * 0.25;
  const totalWidth = PlantPotWidth * num_of_pots + gap * (num_of_pots - 1);
  const initialX = WindowWidth / 2 - totalWidth / 2 + PlantPotWidth / 2;
  console.log(initialX, 'plant');
  const initialY = WindowHeight - PlantPotHeight * 2;

  const items = [];

  for (let j = 0; j < num_of_pots; j++) {
    items.push({
      position: {
        x: initialX + j * (PlantPotWidth + gap),
        y: initialY,
      },
      isBlank: true,
      id: j,
    });
  }

  return {plantPotsData: items};
};

export default getPlantPotsPositions;
