const getLastSwitchChanged = (prevDirections, currentDirections) => {
  for (let i = currentDirections.length - 1; i >= 0; i--) {
    if (prevDirections[i] !== currentDirections[i]) {
      return i + 1;
    }
  }
  return 0;
};
export default getLastSwitchChanged;
