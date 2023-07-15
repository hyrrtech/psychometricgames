function adjustHexColor(hexColor, amount) {
  // Remove the # symbol if present
  hexColor = hexColor.replace('#', '');

  // Convert the hex color to RGB
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  // Calculate the darkened RGB values
  const darkenedR = Math.max(r - amount, 0);
  const darkenedG = Math.max(g - amount, 0);
  const darkenedB = Math.max(b - amount, 0);

  // Convert the darkened RGB values back to hex
  const darkenedHex =
    '#' +
    darkenedR.toString(16).padStart(2, '0') +
    darkenedG.toString(16).padStart(2, '0') +
    darkenedB.toString(16).padStart(2, '0');

  // Calculate the lightened RGB values
  const lightenedR = Math.min(r + amount, 255);
  const lightenedG = Math.min(g + amount, 255);
  const lightenedB = Math.min(b + amount, 255);

  // Convert the lightened RGB values back to hex
  const lightenedHex =
    '#' +
    lightenedR.toString(16).padStart(2, '0') +
    lightenedG.toString(16).padStart(2, '0') +
    lightenedB.toString(16).padStart(2, '0');

  return {
    darkened: darkenedHex,
    lightened: lightenedHex,
  };
}
export default adjustHexColor;
