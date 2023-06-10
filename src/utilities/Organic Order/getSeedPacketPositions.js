import constants from './constants';
const {
  WindowHeight,
  WindowWidth,
  SeedPacketHeight,
  SeedPacketWidth,
  PlantPotHeight,
} = constants;

const getSeedPacketPositions = values => {
  const num_of_seed_packets = values.length;
  const gap = SeedPacketWidth * 0.2;
  const totalWidth =
    SeedPacketWidth * num_of_seed_packets + gap * (num_of_seed_packets - 1);
  const initialX = WindowWidth / 2 - totalWidth / 2 + SeedPacketWidth / 2;
  const initialY = WindowHeight - PlantPotHeight * 2 - SeedPacketHeight * 2;

  const items = [];

  for (let j = 0; j < num_of_seed_packets; j++) {
    items.push({
      position: {
        x: -SeedPacketWidth / 2 + initialX + j * (SeedPacketWidth + gap),
        y: initialY,
      },
      isBlank: true,
      id: j,
    });
  }

  return items;
};

export default getSeedPacketPositions;
